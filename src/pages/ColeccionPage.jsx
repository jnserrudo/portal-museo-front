import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaArrowRight } from 'react-icons/fa';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';

const PageContainer = styled.div`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.general};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${theme.typography.sizes.h1};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.sizes.welcome};
  color: ${theme.colors.text.dark};
  max-width: 800px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;
`;

const SearchBar = styled.div`
  max-width: 600px;
  margin: 0 auto ${theme.spacing.xl};
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1.5rem 1rem 3rem;
  border: 2px solid ${theme.colors.primary};
  border-radius: 50px;
  font-size: 1rem;
  outline: none;
  transition: ${theme.transitions.default};
  
  &:focus {
    border-color: ${theme.colors.accent};
    box-shadow: 0 0 0 3px rgba(231, 168, 76, 0.2);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.primary};
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 2px solid ${({ active }) => active ? theme.colors.accent : theme.colors.primary};
  border-radius: 50px;
  background-color: ${({ active }) => active ? theme.colors.accent : 'transparent'};
  color: ${({ active }) => active ? theme.colors.text.dark : theme.colors.primary};
  font-weight: ${theme.typography.weights.bold};
  cursor: pointer;
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: ${({ active }) => !active && 'rgba(4, 107, 163, 0.1)'};
  }
`;

const CollectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const CollectionCard = styled.div`
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.light};
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
    
    .collection-image {
      transform: scale(1.05);
    }
  }
`;

const ImageWrapper = styled.div`
  height: 200px;
  overflow: hidden;
`;

const CollectionImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ imageUrl }) => `url(${imageUrl})`} center/cover no-repeat;
  transition: transform 0.5s ease;
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const CardDescription = styled.p`
  color: ${theme.colors.text.dark};
  margin-bottom: ${theme.spacing.md};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${theme.colors.text.muted};
  font-size: 0.9rem;
`;

const CategoryBadge = styled.span`
  background-color: ${theme.colors.primary}10;
  color: ${theme.colors.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: ${theme.typography.weights.bold};
`;

// Datos de ejemplo para la colección
const collectionItems = [
  {
    id: 1,
    title: 'Vasija ceremonial Moche',
    description: 'Cerámica ceremonial de la cultura Moche que representa una deidad marina. Siglos V-VIII d.C.',
    category: 'Cerámica',
    year: '500-800 d.C.',
    image: '/images/coleccion/vasija-moche.jpg'
  },
  {
    id: 2,
    title: 'Textil Paracas',
    description: 'Manto funerario de la cultura Paracas con motivos zoomorfos y geométricos. Técnica de tejido en lana de camélido.',
    category: 'Textil',
    year: '100 a.C. - 200 d.C.',
    image: '/images/coleccion/textil-paracas.jpg'
  },
  {
    id: 3,
    title: 'Oro Chimú',
    description: 'Máscara funeraria de oro repujado de la cultura Chimú. Representa a un gobernante o sacerdote.',
    category: 'Metalurgia',
    year: '900-1470 d.C.',
    image: '/images/coleccion/oro-chimu.jpg'
  },
  {
    id: 4,
    title: 'Escultura Chavín',
    description: 'Cabeza clava de piedra de la cultura Chavín. Representa una deidad felínica con rasgos estilizados.',
    category: 'Escultura',
    year: '1200-500 a.C.',
    image: '/images/coleccion/cabeza-chavin.jpg'
  },
  {
    id: 5,
    title: 'Quipu Inca',
    description: 'Sistema de contabilidad y registro de información utilizado por los incas mediante nudos en cuerdas de colores.',
    category: 'Objeto ritual',
    year: '1400-1532 d.C.',
    image: '/images/coleccion/quipu-inca.jpg'
  },
  {
    id: 6,
    title: 'Cerámica Nazca',
    description: 'Vaso ceremonial de la cultura Nazca con representación de criaturas míticas. Pintura policromada sobre arcilla.',
    category: 'Cerámica',
    year: '100-800 d.C.',
    image: '/images/coleccion/ceramica-nazca.jpg'
  }
];

// Categorías únicas para los filtros
const categories = ['Todas', ...new Set(collectionItems.map(item => item.category))];

const ColeccionPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');

  const filteredItems = collectionItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todas' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <Title>Nuestra Colección</Title>
          <Subtitle>
            Explora el patrimonio cultural de la región andina a través de nuestra colección de piezas arqueológicas y etnográficas.
            Descubre la riqueza de las culturas prehispánicas y su legado en la actualidad.
          </Subtitle>
          
          <SearchBar>
            <SearchIcon />
            <SearchInput 
              type="text" 
              placeholder="Buscar en la colección..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          
          <FilterSection>
            {categories.map(category => (
              <FilterButton 
                key={category}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </FilterSection>
        </HeroSection>

        {filteredItems.length > 0 ? (
          <CollectionGrid>
            {filteredItems.map(item => (
              <CollectionCard key={item.id}>
                <ImageWrapper>
                  <CollectionImage 
                    className="collection-image"
                    imageUrl={item.image} 
                    alt={item.title} 
                  />
                </ImageWrapper>
                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                  <CardMeta>
                    <CategoryBadge>{item.category}</CategoryBadge>
                    <span>{item.year}</span>
                  </CardMeta>
                </CardContent>
              </CollectionCard>
            ))}
          </CollectionGrid>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <h3>No se encontraron resultados</h3>
            <p>Intenta con otros términos de búsqueda o categorías</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('Todas');
              }}
              style={{ marginTop: '1rem' }}
            >
              Limpiar filtros
            </Button>
          </div>
        )}
        
        <div style={{ textAlign: 'center' }}>
          <Button variant="accent" size="large">
            Ver más piezas <FaArrowRight style={{ marginLeft: '0.5rem' }} />
          </Button>
        </div>
      </Container>
    </PageContainer>
  );
};

export default ColeccionPage;
