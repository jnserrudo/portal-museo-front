import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as eventService from '../api/eventService';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaCalendarAlt } from 'react-icons/fa';
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
    align-items: flex-start;
    gap: ${theme.spacing.md};
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
        </Header>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <LoadingSpinner size="large" />
            <p style={{ marginTop: '1rem', color: '#666' }}>{t('common.loading')}</p>
          </div>
        ) : (
          <TableContainer>
            {events.length > 0 ? (
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
                  {events.map((ev) => (
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
