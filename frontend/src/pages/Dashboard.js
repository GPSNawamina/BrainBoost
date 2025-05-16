import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  School as SchoolIcon,
  EmojiEvents as AchievementIcon,
  Timeline as ProgressIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { userService, progressService } from '../services/api';

const StatCard = ({ title, value, icon, color, loading }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${color}15`,
              borderRadius: '50%',
              p: 1,
              mr: 2,
            }}
          >
            {React.cloneElement(icon, { sx: { color: color } })}
          </Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Typography variant="h4" component="div" sx={{ mb: 1 }}>
            {value}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

const ProgressCard = ({ title, progress, color, loading }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          {title}
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
            <CircularProgress size={40} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Box sx={{ flexGrow: 1, mr: 1 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: `${color}15`,
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: color,
                  },
                }}
              />
            </Box>
            <Typography variant="body2" color="text.secondary">
              {progress}%
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResponse, progressResponse] = await Promise.all([
        userService.getStats(),
        progressService.getLearningProgress(),
      ]);
      setStats(statsResponse.data);
      setProgress(progressResponse.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Dashboard
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Courses"
            value={stats?.activeCourses || 0}
            icon={<SchoolIcon />}
            color={theme.palette.primary.main}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Achievements"
            value={stats?.achievements || 0}
            icon={<AchievementIcon />}
            color={theme.palette.secondary.main}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Learning Streak"
            value={`${stats?.streak || 0} days`}
            icon={<ProgressIcon />}
            color="#4CAF50"
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Points Earned"
            value={stats?.points || 0}
            icon={<StarIcon />}
            color="#FFC107"
            loading={loading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ProgressCard
            title="Overall Progress"
            progress={progress?.overallProgress || 0}
            color={theme.palette.primary.main}
            loading={loading}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProgressCard
            title="Current Course Progress"
            progress={progress?.currentCourseProgress || 0}
            color={theme.palette.secondary.main}
            loading={loading}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 