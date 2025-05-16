import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Timeline as ProgressIcon,
  School as CourseIcon,
} from '@mui/icons-material';

const AchievementCard = ({ achievement }) => {
  const theme = useTheme();

  const getIcon = (type) => {
    switch (type) {
      case 'course':
        return <CourseIcon />;
      case 'streak':
        return <ProgressIcon />;
      case 'points':
        return <StarIcon />;
      default:
        return <TrophyIcon />;
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              backgroundColor: `${achievement.color}15`,
              borderRadius: '50%',
              p: 1,
              mr: 2,
            }}
          >
            {React.cloneElement(getIcon(achievement.type), {
              sx: { color: achievement.color },
            })}
          </Box>
          <Box>
            <Typography variant="h6" component="div">
              {achievement.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {achievement.description}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {achievement.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={achievement.progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: `${achievement.color}15`,
              '& .MuiLinearProgress-bar': {
                backgroundColor: achievement.color,
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

const Achievements = () => {
  const theme = useTheme();

  // Sample achievement data
  const achievements = [
    {
      id: 1,
      title: 'Course Master',
      description: 'Complete 5 courses',
      type: 'course',
      progress: 60,
      color: theme.palette.primary.main,
    },
    {
      id: 2,
      title: 'Learning Streak',
      description: 'Maintain a 7-day learning streak',
      type: 'streak',
      progress: 85,
      color: theme.palette.secondary.main,
    },
    {
      id: 3,
      title: 'Point Collector',
      description: 'Earn 1000 points',
      type: 'points',
      progress: 75,
      color: '#FFC107',
    },
    {
      id: 4,
      title: 'Early Bird',
      description: 'Complete a course before the deadline',
      type: 'course',
      progress: 100,
      color: '#4CAF50',
    },
    {
      id: 5,
      title: 'Perfect Score',
      description: 'Get 100% on a course assessment',
      type: 'course',
      progress: 90,
      color: '#9C27B0',
    },
    {
      id: 6,
      title: 'Social Learner',
      description: 'Participate in 10 discussions',
      type: 'streak',
      progress: 40,
      color: '#FF5722',
    },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Your Achievements
      </Typography>

      <Grid container spacing={3}>
        {achievements.map((achievement) => (
          <Grid item xs={12} sm={6} md={4} key={achievement.id}>
            <AchievementCard achievement={achievement} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Achievements; 