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

interface Project {
  portfolio_project_id?: number;  // for mes projets
  proposal_id?: number;          // for specialization devis
  client_id?: number;
  client_username?: string;
  description: string;
  start_date?: string;
  end_date?: string;
  date?: string;
  price?: number;
  location?: string;
  specialization?: string;
  accepted_status?: string;
  artisan_id: number | null;
  created_at: string;
  attachments?: Array<{ attachment: string }>;
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
  specialization: string | null;
  status: string;
}

const BASE_URL = import.meta.env.VITE_API_URL;

const statusColors = {
  cree: {
    bg: '#FEF3C7',
    text: '#92400E',
    border: '#F59E0B'
  },
  accepted: {
    bg: '#D1FAE5',
    text: '#065F46',
    border: '#10B981'
  },
  rejected: {
    bg: '#FEE2E2',
    text: '#991B1B',
    border: '#EF4444'
  },
  finished: {
    bg: '#E0E7FF',
    text: '#3730A3',
    border: '#6366F1'
  },
  // Default status for unknown values
  default: {
    bg: '#F3F4F6',
    text: '#374151',
    border: '#9CA3AF'
  }
};

const getStatusColor = (status: string) => {
  return statusColors[status as keyof typeof statusColors] || statusColors.default;
};

const statusLabels: Record<string, string> = {
  cree: 'En attente',
  accepted: 'Accepté',
  rejected: 'Rejeté',
  finished: 'Terminé'
};

const getStatusLabel = (status: string) => {
  return statusLabels[status] || status;
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
  const [activeTab, setActiveTab] = React.useState(0);
  const [projects, setProjects] = useState<Project[]>([]);
  const [directDevis, setDirectDevis] = useState<Project[]>([]);
  const [specializationDevis, setSpecializationDevis] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  // Fetch projects for "Mes Projets" tab
  useEffect(() => {
    const fetchProjects = async () => {
      if (!user || !token) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/artisans/project/1`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log('Mes Projets Raw Data:', data);
        if (data.message === "Projects fetched successfully") {
          // Add default client name for Mes Projets
          const projects = data.projects.map((project: Project) => ({
            ...project,
            client_username: project.client_username || 'Mon Client'  // Default client name for Mes Projets
          }));
          setProjects(projects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 0) {
      fetchProjects();
    }
  }, [user, activeTab, token]);

  // Fetch devis for "Devis Directs" tab
  useEffect(() => {
    const fetchDirectDevis = async () => {
      if (!user || !token) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/artisans/project/1`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log('Direct Devis Raw Data:', data);
        if (data.message === "Projects fetched successfully") {
          const projects = data.projects.map((project: Project) => ({
            ...project,
            client_username: project.client_username || 'Client Direct'
          }));
          setDirectDevis(projects);
        }
      } catch (error) {
        console.error('Error fetching direct devis:', error);
        setDirectDevis([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 1) {
      fetchDirectDevis();
    }
  }, [user, activeTab, token]);

  // Fetch devis for "Devis par Spécialité" tab
  useEffect(() => {
    const fetchSpecializationDevis = async () => {
      if (!user || !token) return;
      
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/projects/?specialization=${user.specialization}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log('Specialization Devis Raw Data:', data);
        if (data.message === "Projects fetched successfully") {
          const projects = data.projects.map((project: Project) => ({
            ...project,
            client_username: project.client_username || 'Client Spécialité'
          }));
          setSpecializationDevis(projects);
        }
      } catch (error) {
        console.error('Error fetching specialization devis:', error);
        setSpecializationDevis([]);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === 2) {
      fetchSpecializationDevis();
    }
  }, [user, activeTab, token]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleUpdateProject = async (projectId: number, action: 'accept' | 'reject', source: 'direct' | 'specialization') => {
    console.log(`Handling ${action} for project ${projectId} from ${source}`);

    if (action === 'reject') {
      // Just remove from the current list
      if (source === 'direct') {
        setDirectDevis(prev => 
          prev.filter(devis => devis.portfolio_project_id !== projectId)
        );
      } else {
        // For specialization devis, use proposal_id instead
        setSpecializationDevis(prev => 
          prev.filter(devis => devis.proposal_id !== projectId)
        );
      }
    } else {
      // For accept: remove from current list and add to projects
      const projectToAccept = source === 'direct' 
        ? directDevis.find(devis => devis.portfolio_project_id === projectId)
        : specializationDevis.find(devis => devis.proposal_id === projectId);

      if (projectToAccept) {
        // Remove from current list
        if (source === 'direct') {
          setDirectDevis(prev => 
            prev.filter(devis => devis.portfolio_project_id !== projectId)
          );
        } else {
          setSpecializationDevis(prev => 
            prev.filter(devis => devis.proposal_id !== projectId)
          );
        }

        // Add to mes projets
        setProjects(prev => [...prev, projectToAccept]);
      }
    }
  };

  const renderProjects = (data: Project[], source?: 'direct' | 'specialization') => {
    console.log('Rendering projects with data:', { data, source });
    return (
      <Grid container spacing={3}>
        {loading ? (
          <Grid item xs={12} key="loading">
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4 }}>
              <CircularProgress />
            </Box>
          </Grid>
        ) : data && data.length > 0 ? (
          data.map((project, index) => {
            // Use the correct ID based on the source
            const projectId = source === 'specialization' 
              ? project.proposal_id 
              : project.portfolio_project_id || `project-${index}`;

            console.log('Project being rendered:', { project, projectId, source });
            
            return (
              <Grid item xs={12} sm={6} md={4} key={projectId}>
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
                      {project.client_username ? `Client: ${project.client_username}` : 'Client: N/A'}
                    </Typography>
                  </Box>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      mb: 2,
                      color: '#4B5563'
                    }}
                  >
                    {project.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      Début: {project.start_date || project.date ? 
                        new Date(project.start_date || project.date).toLocaleDateString() : 'N/A'}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                      {project.end_date && `Fin: ${new Date(project.end_date).toLocaleDateString()}`}
                    </Typography>
                  </Box>
                  {project.price && (
                    <Typography variant="body2" sx={{ color: '#6B7280', mb: 2 }}>
                      Prix: {project.price} DA
                    </Typography>
                  )}
                  {project.location && (
                    <Typography variant="body2" sx={{ color: '#6B7280', mb: 2 }}>
                      Location: {project.location}
                    </Typography>
                  )}

                  {/* Show buttons for both direct and specialization */}
                  {(source === 'direct' || source === 'specialization') && (
                    <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                      <Button
                        onClick={() => handleUpdateProject(projectId as number, 'accept', source)}
                        variant="contained"
                        color="success"
                        fullWidth
                      >
                        Accepter
                      </Button>
                      <Button
                        onClick={() => handleUpdateProject(projectId as number, 'reject', source)}
                        variant="contained"
                        color="error"
                        fullWidth
                      >
                        Rejeter
                      </Button>
                    </Stack>
                  )}
                </StyledPaper>
              </Grid>
            );
          })
        ) : (
          <Grid item xs={12} key="no-projects">
            <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                Aucun projet trouvé
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    );
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
            {renderProjects(projects)}
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
            {renderProjects(directDevis, 'direct')}
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
            {renderProjects(specializationDevis, 'specialization')}
          </>
        )}
      </Container>
    </Box>
  );
};

export default ArtisanDashboard;
