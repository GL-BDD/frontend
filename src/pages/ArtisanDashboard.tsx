import React, { useState, useEffect } from 'react';
import { 
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Stack,
  Tabs,
  Tab,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const BASE_URL = import.meta.env.VITE_API_URL;

interface Project {
  id: number;
  title: string;
  status: 'considered' | 'working' | 'finished' | 'in_review';
  description: string;
  deadline?: string;
  clientName: string;
}

interface Quote {
  id: number;
  clientName: string;
  description: string;
  image: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  price: number;
  specialization: 'électricien' | 'plombier' | 'peintre';
  status: 'pending' | 'accepted' | 'rejected';
}

// Mock data until API is available
const mockProjects: Project[] = [
  {
    id: 1,
    title: 'Refonte du Site Web',
    status: 'working',
    description: 'Refonte complète du site web avec principes UI/UX modernes',
    deadline: '2025-02-15',
    clientName: 'Sophie Martin'
  },
  {
    id: 2,
    title: 'Interface Application Mobile',
    status: 'in_review',
    description: 'Conception interface utilisateur pour application mobile',
    deadline: '2025-03-01',
    clientName: 'Thomas Bernard'
  },
  {
    id: 3,
    title: 'Conception de Logo',
    status: 'finished',
    description: 'Création du nouveau logo de marque et directives',
    clientName: 'Marie Dubois'
  },
  {
    id: 4,
    title: 'Matériel Marketing',
    status: 'considered',
    description: 'Conception de matériel marketing pour la campagne',
    deadline: '2025-02-28',
    clientName: 'Lucas Petit'
  },
  {
    id: 5,
    title: 'Plateforme E-commerce',
    status: 'working',
    description: 'Développement boutique en ligne avec intégration paiement',
    deadline: '2025-04-15',
    clientName: 'Emma Leroy'
  },
  {
    id: 6,
    title: 'Guide de Style',
    status: 'finished',
    description: 'Création guide de style complet de la marque',
    clientName: 'Antoine Moreau'
  },
  {
    id: 7,
    title: 'Templates Réseaux Sociaux',
    status: 'in_review',
    description: 'Conception templates pour posts réseaux sociaux',
    deadline: '2025-02-20',
    clientName: 'Julie Roux'
  },
  {
    id: 8,
    title: 'Photographie Produits',
    status: 'considered',
    description: 'Séance photo professionnelle nouvelle gamme',
    deadline: '2025-03-10',
    clientName: 'Pierre Dupont'
  },
  {
    id: 9,
    title: 'Newsletter Email',
    status: 'finished',
    description: 'Design et code template email responsive',
    deadline: '2025-02-25',
    clientName: 'Claire Simon'
  },
  {
    id: 10,
    title: 'Production Vidéo',
    status: 'working',
    description: 'Création vidéo promotionnelle nouveau service',
    deadline: '2025-03-30',
    clientName: 'Nicolas Laurent'
  },
  {
    id: 11,
    title: 'Bibliothèque Composants UI',
    status: 'finished',
    description: 'Construction bibliothèque composants réutilisables',
    deadline: '2025-02-18',
    clientName: 'Sarah Mercier'
  },
  {
    id: 12,
    title: 'Design Rapport Annuel',
    status: 'considered',
    description: 'Conception rapport annuel pour actionnaires',
    deadline: '2025-04-01',
    clientName: 'Philippe Rousseau'
  }
];

// Mock data for quotes
const mockQuotes: Quote[] = [
  {
    id: 1,
    clientName: "Marie Dubois",
    description: "Rénovation complète de la salle de bain, incluant le remplacement de la baignoire et l'installation d'une douche à l'italienne. Carrelage mural à remplacer.",
    status: "pending",
    createdAt: "2025-01-20T10:30:00",
    startDate: "2025-02-01",
    endDate: "2025-02-15",
    price: 4500,
    specialization: "plombier",
    image: "/images/plomberie.jpg"
  },
  {
    id: 2,
    clientName: "Jean Martin",
    description: "Installation électrique complète pour une nouvelle cuisine. Besoin de prises supplémentaires et d'un nouvel éclairage LED encastré.",
    status: "accepted",
    createdAt: "2025-01-18T14:20:00",
    startDate: "2025-01-25",
    endDate: "2025-01-28",
    price: 2800,
    specialization: "électricien",
    image: "/images/electricite.jpg"
  },
  {
    id: 3,
    clientName: "Sophie Bernard",
    description: "Peinture complète d'un appartement de 75m². Murs et plafonds, teintes claires. Préparation des surfaces nécessaire.",
    status: "rejected",
    createdAt: "2025-01-15T09:15:00",
    startDate: "2025-02-05",
    endDate: "2025-02-12",
    price: 3200,
    specialization: "peintre",
    image: "/images/peinture.jpg"
  }
];

const pendingQuotes: Quote[] = [
  {
    id: 4,
    clientName: "Pierre Durand",
    description: "Installation d'un système de chauffage au sol dans un salon de 30m². Remplacement du plancher existant.",
    status: "pending",
    createdAt: "2025-01-23T16:45:00",
    startDate: "2025-02-10",
    endDate: "2025-02-17",
    price: 5500,
    specialization: "plombier",
    image: "/images/carrelage.jpg"
  },
  {
    id: 5,
    clientName: "Lucie Moreau",
    description: "Réparation d'une fuite dans la salle de bain et remplacement des joints de carrelage. Urgent.",
    status: "pending",
    createdAt: "2025-01-22T11:30:00",
    startDate: "2025-01-26",
    endDate: "2025-01-27",
    price: 850,
    specialization: "plombier",
    image: "/images/maconnerie.jpg"
  },
  {
    id: 6,
    clientName: "Thomas Petit",
    description: "Installation d'un nouveau tableau électrique et mise aux normes de l'installation existante. Maison de 120m².",
    status: "pending",
    createdAt: "2025-01-21T13:20:00",
    startDate: "2025-02-03",
    endDate: "2025-02-05",
    price: 2200,
    specialization: "électricien",
    image: "/images/menuiserie.jpg"
  }
];

const statusColors = {
  considered: {
    bg: '#FEF3C7',
    text: '#92400E',
    border: '#F59E0B'
  },
  working: {
    bg: '#DBEAFE',
    text: '#1E40AF',
    border: '#3B82F6'
  },
  finished: {
    bg: '#D1FAE5',
    text: '#065F46',
    border: '#10B981'
  },
  in_review: {
    bg: '#F3E8FF',
    text: '#6B21A8',
    border: '#8B5CF6'
  }
};

const statusLabels = {
  considered: 'À l\'étude',
  working: 'En cours',
  finished: 'Terminé',
  in_review: 'En révision'
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatusChip = styled(Chip)<{ status: keyof typeof statusColors }>(({ status, theme }) => ({
  backgroundColor: statusColors[status].bg,
  color: statusColors[status].text,
  border: `1px solid ${statusColors[status].border}`,
  fontWeight: 600,
  '&:hover': {
    backgroundColor: statusColors[status].bg,
    opacity: 0.9,
  },
}));

const FilterButton = styled(Button)<{ status: keyof typeof statusColors }>(({ status, theme }) => ({
  backgroundColor: statusColors[status].bg,
  color: statusColors[status].text,
  border: `1px solid ${statusColors[status].border}`,
  '&:hover': {
    backgroundColor: statusColors[status].bg,
    opacity: 0.9,
  },
}));

const QuoteCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  transition: 'all 0.3s ease-in-out',
  border: '1px solid #E5E7EB',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '4px',
    height: '100%',
    backgroundColor: '#3B82F6',
    transition: 'transform 0.3s ease-in-out',
    transform: 'scaleY(0)',
    transformOrigin: 'bottom'
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    '&::before': {
      transform: 'scaleY(1)'
    }
  }
}));


const ArtisanDashboard: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState(0);
  const [directQuotes, setDirectQuotes] = useState<Quote[]>(mockQuotes);
  const [specializationQuotes, setSpecializationQuotes] = useState<Quote[]>(pendingQuotes);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  // Group projects by status
  const projectsByStatus = React.useMemo(() => {
    return mockProjects.reduce((acc, project) => {
      if (!acc[project.status]) {
        acc[project.status] = [];
      }
      acc[project.status].push(project);
      return acc;
    }, {} as Record<string, Project[]>);
  }, []);

  const filteredProjects = selectedStatus 
    ? projectsByStatus[selectedStatus] 
    : mockProjects;

  // Fetch quotes
  useEffect(() => {
    const fetchQuotes = async () => {
      if (!user || !token) return;
      
      setLoading(true);
      try {
        // Fetch quotes directed to this artisan
        const directRes = await axios.get(
          `${BASE_URL}/api/projects/?artisanId=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Using mock data for now
        // setDirectQuotes(directRes.data.projects);
        setDirectQuotes(mockQuotes);

        // Fetch quotes by specialization
        const specRes = await axios.get(
          `${BASE_URL}/api/projects/?specialization=${user?.specialization}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Using mock data for now
        // setSpecializationQuotes(specRes.data.projects);
        setSpecializationQuotes(pendingQuotes);
      } catch (error) {
        console.error('Error fetching quotes:', error);
        // Fallback to mock data on error
        setDirectQuotes(mockQuotes);
        setSpecializationQuotes(pendingQuotes);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, [user, token]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleAcceptDevis = async (devisId: number) => {
    try {
      await axios.post(`${BASE_URL}/api/devis/${devisId}/accept`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refresh quotes after accepting
      fetchQuotes();
    } catch (error) {
      console.error('Error accepting devis:', error);
    }
  };

  const handleRejectDevis = async (devisId: number) => {
    try {
      await axios.post(`${BASE_URL}/api/devis/${devisId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Refresh quotes after rejecting
      fetchQuotes();
    } catch (error) {
      console.error('Error rejecting devis:', error);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#F9FAFB',
      py: 4
    }}>
      <Container maxWidth="lg">
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{ mb: 4 }}
          variant="fullWidth"
        >
          <Tab label="Mes Projets" />
          <Tab label="Devis Directs" />
          <Tab label="Devis par Spécialité" />
        </Tabs>

        {activeTab === 0 && (
          <>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                mb: 4,
                fontWeight: 'bold',
                color: '#111827'
              }}
            >
              Mes Projets
            </Typography>

            {/* Status filters */}
            <Stack 
              direction={{ xs: 'column', sm: 'row' }} 
              spacing={2} 
              sx={{ mb: 4 }}
            >
              <Button
                onClick={() => setSelectedStatus(null)}
                variant="contained"
                size="large"
                sx={{ 
                  borderRadius: 2,
                  bgcolor: '#111827',
                  color: '#ffffff',
                  '&:hover': {
                    bgcolor: '#374151'
                  }
                }}
              >
                Tous les Projets
              </Button>
              {Object.entries(statusLabels).map(([key, label]) => (
                <FilterButton
                  key={key}
                  onClick={() => setSelectedStatus(key)}
                  status={key as keyof typeof statusColors}
                  variant="contained"
                  size="large"
                  sx={{ 
                    borderRadius: 2,
                    bgcolor: selectedStatus === key ? `${statusColors[key as keyof typeof statusColors].border} !important` : undefined,
                    color: selectedStatus === key ? '#ffffff !important' : undefined
                  }}
                >
                  {label} ({projectsByStatus[key]?.length || 0})
                </FilterButton>
              ))}
            </Stack>

            {/* Project sections */}
            {selectedStatus ? (
              // Show filtered projects
              <Grid container spacing={3}>
                {filteredProjects.map((project) => (
                  <Grid item xs={12} sm={6} md={4} key={project.id}>
                    <StyledPaper elevation={1}>
                      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography 
                          variant="h6" 
                          component="h3"
                          sx={{ 
                            fontWeight: 600,
                            color: '#111827',
                            mb: 1
                          }}
                        >
                          {project.title}
                        </Typography>
                        <StatusChip
                          label={statusLabels[project.status]}
                          status={project.status}
                          size="small"
                        />
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#4B5563',
                          mb: 2,
                          flexGrow: 1
                        }}
                      >
                        {project.description}
                      </Typography>
                      <Box sx={{ mt: 'auto' }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#6B7280',
                            mb: 1
                          }}
                        >
                          <Box component="span" sx={{ fontWeight: 600 }}>
                            Client:
                          </Box>{' '}
                          {project.clientName}
                        </Typography>
                        {project.deadline && (
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: '#6B7280'
                            }}
                          >
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              Date limite:
                            </Box>{' '}
                            {new Date(project.deadline).toLocaleDateString('fr-FR')}
                          </Typography>
                        )}
                      </Box>
                    </StyledPaper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              // Show all projects grouped by status
              <Stack spacing={4}>
                {Object.entries(statusLabels).map(([status, label]) => (
                  projectsByStatus[status] && projectsByStatus[status].length > 0 && (
                    <Box key={status}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          mb: 3, 
                          color: statusColors[status as keyof typeof statusColors].text,
                          fontWeight: 600
                        }}
                      >
                        {label} ({projectsByStatus[status].length})
                      </Typography>
                      <Grid container spacing={3}>
                        {projectsByStatus[status].map((project) => (
                          <Grid item xs={12} sm={6} md={4} key={project.id}>
                            <StyledPaper elevation={1}>
                              <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Typography 
                                  variant="h6" 
                                  component="h3"
                                  sx={{ 
                                    fontWeight: 600,
                                    color: '#111827',
                                    mb: 1
                                  }}
                                >
                                  {project.title}
                                </Typography>
                                <StatusChip
                                  label={statusLabels[project.status]}
                                  status={project.status}
                                  size="small"
                                />
                              </Box>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  color: '#4B5563',
                                  mb: 2,
                                  flexGrow: 1
                                }}
                              >
                                {project.description}
                              </Typography>
                              <Box sx={{ mt: 'auto' }}>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    color: '#6B7280',
                                    mb: 1
                                  }}
                                >
                                  <Box component="span" sx={{ fontWeight: 600 }}>
                                    Client:
                                  </Box>{' '}
                                  {project.clientName}
                                </Typography>
                                {project.deadline && (
                                  <Typography 
                                    variant="body2" 
                                    sx={{ 
                                      color: '#6B7280'
                                    }}
                                  >
                                    <Box component="span" sx={{ fontWeight: 600 }}>
                                      Date limite:
                                    </Box>{' '}
                                    {new Date(project.deadline).toLocaleDateString('fr-FR')}
                                  </Typography>
                                )}
                              </Box>
                            </StyledPaper>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )
                ))}
              </Stack>
            )}
          </>
        )}

        {activeTab === 1 && (
          <>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                mb: 4,
                fontWeight: 'bold',
                color: '#111827'
              }}
            >
              Devis Directs
            </Typography>
            
            {loading ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : directQuotes.length > 0 ? (
              <Grid container spacing={3}>
                {directQuotes
                  .filter(quote => quote.specialization === user?.specialization)
                  .map((quote) => (
                  <Grid item xs={12} key={quote.id}>
                    <QuoteCard>
                      <Box sx={{ 
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        borderBottom: '1px solid #E5E7EB',
                        pb: 2
                      }}>
                        <Box>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600,
                            color: '#111827',
                            mb: 1
                          }}>
                            Client: {quote.clientName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Reçu le: {new Date(quote.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                          <Chip
                            label={quote.status === 'pending' ? 'En attente' : quote.status === 'accepted' ? 'Accepté' : 'Refusé'}
                            color={quote.status === 'pending' ? 'warning' : quote.status === 'accepted' ? 'success' : 'error'}
                            sx={{
                              fontWeight: 600,
                              px: 2,
                              '& .MuiChip-label': {
                                px: 1
                              }
                            }}
                          />
                          <Typography variant="h6" sx={{ 
                            color: '#059669',
                            fontWeight: 600
                          }}>
                            {quote.price.toLocaleString('fr-FR')} €
                          </Typography>
                        </Box>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={8}>
                          <Typography sx={{ 
                            mb: 3,
                            color: '#4B5563',
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                          }}>
                            {quote.description}
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'flex',
                            gap: 4,
                            mb: 3,
                            color: '#6B7280'
                          }}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Date de début
                              </Typography>
                              <Typography>
                                {new Date(quote.startDate).toLocaleDateString('fr-FR')}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Date de fin
                              </Typography>
                              <Typography>
                                {new Date(quote.endDate).toLocaleDateString('fr-FR')}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Spécialisation
                              </Typography>
                              <Typography sx={{ textTransform: 'capitalize' }}>
                                {quote.specialization}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            mt: 3
                          }}>
                            {quote.status === 'pending' && (
                              <>
                                <Button
                                  variant="contained"
                                  size="large"
                                  onClick={() => handleAcceptDevis(quote.id)}
                                  sx={{
                                    backgroundColor: '#2563EB',
                                    color: 'white',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: '0.5rem',
                                    textTransform: 'none',
                                    '&:hover': {
                                      backgroundColor: '#1D4ED8',
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                  }}
                                  startIcon={
                                    <CheckCircleIcon sx={{ fontSize: 24 }} />
                                  }
                                >
                                  Accepter le devis
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="large"
                                  onClick={() => handleRejectDevis(quote.id)}
                                  sx={{
                                    color: '#DC2626',
                                    borderColor: '#DC2626',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: '0.5rem',
                                    textTransform: 'none',
                                    '&:hover': {
                                      backgroundColor: 'rgba(220, 38, 38, 0.04)',
                                      borderColor: '#DC2626',
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                  }}
                                  startIcon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  }
                                >
                                  Refuser le devis
                                </Button>
                              </>
                            )}
                          </Box>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                          <Box
                            component="img"
                            src={quote.image}
                            alt="Project visualization"
                            sx={{
                              width: '100%',
                              height: '250px',
                              objectFit: 'cover',
                              borderRadius: '0.75rem',
                              border: '1px solid #E5E7EB',
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                              mb: 2
                            }}
                          />
                        </Grid>
                      </Grid>
                    </QuoteCard>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography 
                variant="h6" 
                textAlign="center" 
                color="text.secondary"
                sx={{ py: 8 }}
              >
                Aucun devis direct pour le moment
              </Typography>
            )}
          </>
        )}

        {activeTab === 2 && (
          <>
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                mb: 4,
                fontWeight: 'bold',
                color: '#111827'
              }}
            >
              Devis par Spécialité
            </Typography>
            
            {loading ? (
              <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
              </Box>
            ) : specializationQuotes.length > 0 ? (
              <Grid container spacing={3}>
                {specializationQuotes.map((quote) => (
                  <Grid item xs={12} key={quote.id}>
                    <QuoteCard>
                      <Box sx={{ 
                        mb: 3,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        borderBottom: '1px solid #E5E7EB',
                        pb: 2
                      }}>
                        <Box>
                          <Typography variant="h6" sx={{ 
                            fontWeight: 600,
                            color: '#111827',
                            mb: 1
                          }}>
                            Client: {quote.clientName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Reçu le: {new Date(quote.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                          <Chip
                            label={quote.status === 'pending' ? 'En attente' : quote.status === 'accepted' ? 'Accepté' : 'Refusé'}
                            color={quote.status === 'pending' ? 'warning' : quote.status === 'accepted' ? 'success' : 'error'}
                            sx={{
                              fontWeight: 600,
                              px: 2,
                              '& .MuiChip-label': {
                                px: 1
                              }
                            }}
                          />
                          <Typography variant="h6" sx={{ 
                            color: '#059669',
                            fontWeight: 600
                          }}>
                            {quote.price.toLocaleString('fr-FR')} €
                          </Typography>
                        </Box>
                      </Box>

                      <Grid container spacing={3}>
                        <Grid item xs={12} md={quote.image ? 8 : 12}>
                          <Typography sx={{ 
                            mb: 3,
                            color: '#4B5563',
                            fontSize: '1.1rem',
                            lineHeight: 1.6
                          }}>
                            {quote.description}
                          </Typography>
                          
                          <Box sx={{ 
                            display: 'flex',
                            gap: 4,
                            mb: 3,
                            color: '#6B7280'
                          }}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Date de début
                              </Typography>
                              <Typography>
                                {new Date(quote.startDate).toLocaleDateString('fr-FR')}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Date de fin
                              </Typography>
                              <Typography>
                                {new Date(quote.endDate).toLocaleDateString('fr-FR')}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Spécialisation
                              </Typography>
                              <Typography sx={{ textTransform: 'capitalize' }}>
                                {quote.specialization}
                              </Typography>
                            </Box>
                          </Box>
                          <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: 2,
                            mt: 3
                          }}>
                            {quote.status === 'pending' && (
                              <>
                                <Button
                                  variant="contained"
                                  size="large"
                                  onClick={() => handleAcceptDevis(quote.id)}
                                  sx={{
                                    backgroundColor: '#2563EB',
                                    color: 'white',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: '0.5rem',
                                    textTransform: 'none',
                                    '&:hover': {
                                      backgroundColor: '#1D4ED8',
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                    },
                                    transition: 'all 0.2s ease-in-out',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                  }}
                                  startIcon={
                                    <CheckCircleIcon sx={{ fontSize: 24 }} />
                                  }
                                >
                                  Accepter le devis
                                </Button>
                                <Button
                                  variant="outlined"
                                  size="large"
                                  onClick={() => handleRejectDevis(quote.id)}
                                  sx={{
                                    color: '#DC2626',
                                    borderColor: '#DC2626',
                                    px: 4,
                                    py: 1.5,
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    borderRadius: '0.5rem',
                                    textTransform: 'none',
                                    '&:hover': {
                                      backgroundColor: 'rgba(220, 38, 38, 0.04)',
                                      borderColor: '#DC2626',
                                      transform: 'translateY(-2px)',
                                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                                    },
                                    transition: 'all 0.2s ease-in-out'
                                  }}
                                  startIcon={
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  }
                                >
                                  Refuser le devis
                                </Button>
                              </>
                            )}
                          </Box>
                        </Grid>
                        
                        {quote.image && (
                          <Grid item xs={12} md={4}>
                            <Box
                              component="img"
                              src={quote.image}
                              alt="Project attachment"
                              sx={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: 2,
                                border: '1px solid #E5E7EB'
                              }}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </QuoteCard>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Typography 
                variant="h6" 
                textAlign="center" 
                color="text.secondary"
                sx={{ py: 8 }}
              >
                Aucun devis par spécialité pour le moment
              </Typography>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ArtisanDashboard;
