import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { progressService, courseService } from '../services/api';

const Progress = () => {
  const theme = useTheme();
  const [weeklyProgress, setWeeklyProgress] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [recentProgress, setRecentProgress] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProgress, setEditingProgress] = useState(null);
  const [progressForm, setProgressForm] = useState({
    courseId: '',
    date: new Date().toISOString().split('T')[0],
    hours: '',
    description: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [weeklyData, courseData, recentData, coursesData] = await Promise.all([
        progressService.getWeeklyProgress(),
        progressService.getLearningProgress(),
        progressService.getRecentProgress(),
        courseService.getEnrolledCourses(),
      ]);
      setWeeklyProgress(weeklyData.data);
      setCourseProgress(courseData.data);
      setRecentProgress(recentData.data);
      setEnrolledCourses(coursesData.data);
    } catch (error) {
      showSnackbar('Error fetching progress data', 'error');
    }
  };

  const handleAddProgress = () => {
    setEditingProgress(null);
    setProgressForm({
      courseId: '',
      date: new Date().toISOString().split('T')[0],
      hours: '',
      description: '',
    });
    setOpenDialog(true);
  };

  const handleEditProgress = (progress) => {
    setEditingProgress(progress);
    setProgressForm({
      courseId: progress.courseId,
      date: progress.date.split('T')[0],
      hours: progress.hours,
      description: progress.description,
    });
    setOpenDialog(true);
  };

  const handleDeleteProgress = async (id) => {
    try {
      await progressService.deleteProgress(id);
      showSnackbar('Progress entry deleted successfully', 'success');
      fetchData();
    } catch (error) {
      showSnackbar('Error deleting progress entry', 'error');
    }
  };

  const handleSubmit = async () => {
    try {
      if (editingProgress) {
        await progressService.updateProgress(editingProgress.id, progressForm);
        showSnackbar('Progress updated successfully', 'success');
      } else {
        await progressService.addProgress(progressForm);
        showSnackbar('Progress added successfully', 'success');
      }
      setOpenDialog(false);
      fetchData();
    } catch (error) {
      showSnackbar('Error saving progress', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const StatCard = ({ title, value, subtitle }) => (
    <Card>
      <CardContent>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Learning Progress
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Learning Hours"
            value="20.7"
            subtitle="This week"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Courses Completed"
            value="3"
            subtitle="Out of 8 enrolled"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Current Streak"
            value="7 days"
            subtitle="Keep it up!"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Average Score"
            value="85%"
            subtitle="Across all courses"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Weekly Learning Hours
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="hours"
                      stroke={theme.palette.primary.main}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Course Completion
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={courseProgress}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="completed"
                      fill={theme.palette.secondary.main}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Progress Section */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">
              Recent Progress
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAddProgress}
            >
              Add Progress
            </Button>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Hours</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentProgress.map((progress) => (
                  <TableRow key={progress.id}>
                    <TableCell>{new Date(progress.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      {enrolledCourses.find(c => c.id === progress.courseId)?.title || 'Unknown Course'}
                    </TableCell>
                    <TableCell>{progress.hours}</TableCell>
                    <TableCell>{progress.description}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEditProgress(progress)}
                        sx={{ mr: 1 }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteProgress(progress.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Progress Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProgress ? 'Edit Progress' : 'Add Progress'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Course</InputLabel>
              <Select
                value={progressForm.courseId}
                onChange={(e) => setProgressForm({ ...progressForm, courseId: e.target.value })}
                label="Course"
              >
                {enrolledCourses.map((course) => (
                  <MenuItem key={course.id} value={course.id}>
                    {course.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="date"
              label="Date"
              value={progressForm.date}
              onChange={(e) => setProgressForm({ ...progressForm, date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              type="number"
              label="Hours"
              value={progressForm.hours}
              onChange={(e) => setProgressForm({ ...progressForm, hours: e.target.value })}
              fullWidth
            />
            <TextField
              label="Description"
              value={progressForm.description}
              onChange={(e) => setProgressForm({ ...progressForm, description: e.target.value })}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingProgress ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Progress; 