import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as eventService from '../api/eventService';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaSearch, FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { format, parseISO, isValid } from 'date-fns';
import { es } from 'date-fns/locale';

import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Modal from '../components/Modal';
import EventForm from '../components/EventForm';

const PageContainer = styled.div`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.general};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
  border-bottom: 2px solid ${theme.colors.primary}20;
  padding-bottom: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
    gap: ${theme.spacing.md};
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: ${theme.spacing.md};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${theme.spacing.sm};
  }
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  background: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.light};
  margin-bottom: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.border || '#eee'};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    select {
      flex: 1;
    }
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;
  
  input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid ${theme.colors.border || '#ddd'};
    border-radius: ${theme.borderRadius.md};
    font-size: 0.95rem;
    transition: all 0.2s;
    height: 42px; /* Alineado exacto con los select */
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px ${theme.colors.primary}20;
    }
  }
  
  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 160px;

  label {
    font-size: 0.8rem;
    color: ${theme.colors.text.dark};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-left: 4px;
  }
`;

const FilterSelect = styled.select`
  padding: 0 35px 0 15px;
  border: 1px solid ${theme.colors.border || '#ddd'};
  border-radius: ${theme.borderRadius.md};
  background-color: white;
  font-size: 0.95rem;
  color: ${theme.colors.text.main};
  cursor: pointer;
  height: 42px;
  appearance: none; /* Esconde la flecha nativa */
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
  background-repeat: no-repeat;
  background-position: right 12px top 50%;
  background-size: 10px auto;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  }

  &:hover {
    border-color: #bbb;
  }
`;

const TitleColumn = styled.div``;

const Title = styled.h1`
  font-size: ${theme.typography.sizes.h2};
  color: ${theme.colors.primary};
  margin: 0 0 ${theme.spacing.xs} 0;
`;

const Subtitle = styled.p`
  color: ${theme.colors.text.dark};
  font-size: 1.1rem;
  margin: 0;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.medium};
  overflow-x: auto;
  border: 1px solid ${theme.colors.border || '#eee'};
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
  
  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid ${theme.colors.border || '#eee'};
  }
  
  th {
    background-color: ${theme.colors.background.section};
    color: ${theme.colors.primary};
    font-weight: ${theme.typography.weights.bold};
    text-transform: uppercase;
    font-size: 0.85rem;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }
  
  tbody tr {
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #f9f9f9;
    }
  }
  
  td {
    color: ${theme.colors.text.dark};
    font-size: 0.95rem;
    vertical-align: middle;
  }
`;

const EventTitle = styled.div`
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.primary};
  margin-bottom: 4px;
`;

const EventDescSnippet = styled.div`
  font-size: 0.85rem;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 300px;
`;

const DateBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background-color: ${theme.colors.background.section};
  color: ${theme.colors.primary};
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
`;

const StatusBadge = styled.span`
  padding: 4px 10px;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${props => props.$published ? '#e6f4ea' : '#fef0cf'};
  color: ${props => props.$published ? '#1e8e3e' : '#f29900'};
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionBtn = styled.button`
  background: white;
  border: 1px solid ${props => props.$danger ? '#ffdcdc' : '#dae2ed'};
  color: ${props => props.$danger ? '#d32f2f' : theme.colors.primary};
  width: 34px;
  height: 34px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.$danger ? '#d32f2f' : theme.colors.primary};
    color: white;
    border-color: ${props => props.$danger ? '#d32f2f' : theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-top: 1px solid ${theme.colors.border || '#eee'};
  background-color: white;
  border-bottom-left-radius: ${theme.borderRadius.md};
  border-bottom-right-radius: ${theme.borderRadius.md};
`;

const PaginationInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const PaginationControls = styled.div`
  display: flex;
  gap: 5px;
`;

const PageButton = styled.button`
  background: ${props => props.$active ? theme.colors.primary : 'white'};
  color: ${props => props.$active ? 'white' : theme.colors.text.dark};
  border: 1px solid ${props => props.$active ? theme.colors.primary : theme.colors.border || '#ddd'};
  min-width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  
  &:hover:not(:disabled) {
    background: ${props => props.$active ? theme.colors.primary : '#f5f5f5'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #888;
  
  svg {
    font-size: 4rem;
    color: #ddd;
    margin-bottom: 16px;
  }
  
  h3 {
    color: ${theme.colors.primary};
    margin-bottom: 8px;
  }
`;

const AdminEventosPage = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  
  // States for filtering & pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all'); // all, upcoming, past
  const [locationFilter, setLocationFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Redirigir si no está autenticado
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await eventService.getEvents();
      // Ordenar por fecha (más recientes primero o futuros primero)
      const sortedEvents = [...data].sort((a, b) => {
        const dateA = new Date(a.fecha || a.date);
        const dateB = new Date(b.fecha || b.date);
        return dateB - dateA; // Descendente
      });
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
      toast.error(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Compute unique locations for the filter
  const uniqueLocations = useMemo(() => {
    const locations = events
       .map(ev => ev.lugar || ev.location)
       .filter(loc => loc && loc.trim() !== '')
       .map(loc => loc.trim());
    return [...new Set(locations)].sort();
  }, [events]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, dateFilter, locationFilter]);

  // Deriving filtered and paginated events
  const { filteredEvents, totalPages, paginatedEvents } = useMemo(() => {
    // 1. Filter
    let filtered = events;
    
    if (statusFilter !== 'all') {
      const isPublished = statusFilter === 'published';
      filtered = filtered.filter(ev => (ev.publicado !== false) === isPublished);
    }

    if (dateFilter !== 'all') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      filtered = filtered.filter(ev => {
        const dateStr = ev.fecha || ev.date;
        if (!dateStr) return false;
        
        try {
          // Normalize to a Javascript date securely
          const d = new Date(dateStr);
          if (isNaN(d.getTime())) return false; // Not a valid date String
          
          // To ignore timezone bugs on pure dates, just compare year, month, date explicitly
          // because JS might shift '2025-10-15' into Oct 14th 9PM locally.
          const evDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
          evDate.setHours(0, 0, 0, 0);
          
          if (dateFilter === 'upcoming') {
            return evDate >= today;
          } else if (dateFilter === 'past') {
            return evDate < today;
          }
          
          return false;
        } catch(e) {
          return false;
        }
      });
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(ev => {
        const loc = ev.lugar || ev.location || '';
        return loc.trim() === locationFilter;
      });
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(ev => {
        const title = (ev.titulo || ev.title || '').toLowerCase();
        const desc = (ev.descripcion || ev.description || '').toLowerCase();
        const loc = (ev.lugar || ev.location || '').toLowerCase();
        return title.includes(term) || desc.includes(term) || loc.includes(term);
      });
    }

    // 2. Pagination Math
    const total = Math.ceil(filtered.length / itemsPerPage);
    
    // 3. Slice for current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
    
    return {
      filteredEvents: filtered,
      totalPages: total || 1,
      paginatedEvents: paginated
    };
  }, [events, searchTerm, statusFilter, dateFilter, locationFilter, currentPage]);

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsFormOpen(true);
  };

  const handleCreateNew = () => {
    setCurrentEvent(null);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      if (window.confirm(t('events.confirmDelete'))) {
        await eventService.deleteEvent(id);
        toast.success(t('contact.form.success') || 'OK');
        fetchEvents();
      }
    } catch (error) {
      console.error(error);
      toast.error(t('common.error'));
    }
  };

  const handleSaveEvent = async (eventData, explicitId = null) => {
    try {
      let id = explicitId;
      if (!id) {
        const isFormData = eventData instanceof FormData;
        id = isFormData ? eventData.get('id') : eventData.id;
      }

      if (id !== null && id !== undefined && id !== '') {
        await eventService.updateEvent(id, eventData);
      } else {
        await eventService.createEvent(eventData);
      }
      
      setIsFormOpen(false);
      fetchEvents();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const formatearFecha = (dateStr) => {
    try {
      if (!dateStr) return '--';
      const date = parseISO(dateStr);
      if (!isValid(date)) return dateStr;
      return format(date, "dd MMM yyyy", { locale: es });
    } catch (e) {
      return dateStr;
    }
  };

  if (!isAuthenticated && !isLoading) return null;

  return (
    <PageContainer>
      <Container>
        <Header>
          <HeaderTop>
            <TitleColumn>
              <Title>{t('admin.events.title')}</Title>
              <Subtitle>{t('admin.events.subtitle')}</Subtitle>
            </TitleColumn>
            <Button 
              variant="primary" 
              onClick={handleCreateNew}
              startIcon={<FaPlus />}
            >
              {t('admin.events.btn.new')}
            </Button>
          </HeaderTop>
        </Header>          

        <ControlsContainer>
          <SearchContainer>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Buscar por título, lugar o descripción..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
          
          <FilterGroup>
            <FilterWrapper>
              <label>Estado</label>
              <FilterSelect 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos</option>
                <option value="published">Publicados</option>
                <option value="draft">Borradores</option>
              </FilterSelect>
            </FilterWrapper>

            <FilterWrapper>
              <label>Fecha</label>
              <FilterSelect 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">Cualquiera</option>
                <option value="upcoming">Próximos</option>
                <option value="past">Pasados</option>
              </FilterSelect>
            </FilterWrapper>

            <FilterWrapper>
              <label>Lugar</label>
              <FilterSelect 
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                disabled={uniqueLocations.length === 0}
              >
                <option value="all">Todos</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </FilterSelect>
            </FilterWrapper>
          </FilterGroup>
        </ControlsContainer>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <LoadingSpinner size="large" />
            <p style={{ marginTop: '1rem', color: '#666' }}>{t('common.loading')}</p>
          </div>
        ) : (
          <TableContainer>
            {filteredEvents.length > 0 ? (
              <>
                <StyledTable>
                  <thead>
                    <tr>
                      <th>{t('admin.events.table.title')}</th>
                      <th>{t('admin.events.table.date')}</th>
                      <th>{t('admin.events.table.time')}</th>
                      <th>{t('admin.events.table.location')}</th>
                      <th>{t('admin.events.table.status')}</th>
                      <th style={{ textAlign: 'right' }}>{t('admin.events.table.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedEvents.map((ev) => (
                      <tr key={ev.id}>
                      <td>
                        <EventTitle>{ev.titulo || ev.title}</EventTitle>
                        <EventDescSnippet>{ev.descripcion || ev.description}</EventDescSnippet>
                      </td>
                      <td>
                        <DateBadge>
                          <FaCalendarAlt size={12} />
                          {formatearFecha(ev.fecha || ev.date)}
                        </DateBadge>
                      </td>
                      <td>{ev.hora || ev.time || '--'}</td>
                      <td>{ev.lugar || ev.location || '--'}</td>
                      <td>
                        <StatusBadge $published={ev.publicado !== false}>
                          {ev.publicado !== false ? (
                            <><FaCheck size={10} style={{ marginRight: 4 }}/> {t('admin.events.status.published')}</>
                          ) : (
                            <><FaTimes size={10} style={{ marginRight: 4 }}/> {t('admin.events.status.draft')}</>
                          )}
                        </StatusBadge>
                      </td>
                      <td>
                        <ActionsContainer style={{ justifyContent: 'flex-end' }}>
                          <ActionBtn onClick={() => handleEdit(ev)} title={t('common.edit')}>
                            <FaEdit />
                          </ActionBtn>
                          <ActionBtn $danger onClick={() => handleDelete(ev.id)} title={t('common.delete')}>
                            <FaTrash />
                          </ActionBtn>
                        </ActionsContainer>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </StyledTable>
                
                {totalPages > 1 && (
                  <PaginationContainer>
                    <PaginationInfo>
                      Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, filteredEvents.length)} de {filteredEvents.length} eventos
                    </PaginationInfo>
                    <PaginationControls>
                      <PageButton 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                      >
                        <FaChevronLeft size={10} />
                      </PageButton>
                      
                      {[...Array(totalPages)].map((_, i) => (
                        <PageButton 
                          key={i + 1}
                          $active={currentPage === i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PageButton>
                      ))}
                      
                      <PageButton 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <FaChevronRight size={10} />
                      </PageButton>
                    </PaginationControls>
                  </PaginationContainer>
                )}
              </>
            ) : (
              <EmptyState>
                <FaCalendarAlt />
                <h3>{t('admin.events.empty')}</h3>
              </EmptyState>
            )}
          </TableContainer>
        )}

      </Container>

      {/* Modal para reusar el formulario */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={currentEvent ? t('common.edit') : t('common.create')}
        size="lg"
      >
        <EventForm 
          key={currentEvent ? currentEvent.id : 'new-event'}
          events={events}
          event={currentEvent}
          onSave={handleSaveEvent}
          onDelete={handleDelete}
          onSaveSuccess={() => {
            setIsFormOpen(false);
          }}
        />
      </Modal>

    </PageContainer>
  );
};

export default AdminEventosPage;
