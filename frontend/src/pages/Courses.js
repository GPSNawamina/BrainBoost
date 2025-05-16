import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Search as SearchIcon,
  AccessTime as TimeIcon,
  School as LevelIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { courseService } from '../services/api';

const CourseCard = ({ course, onEnroll }) => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        height="140"
        image={course.image || 'https://source.unsplash.com/random/800x600/?education'}
        alt={course.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {course.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {course.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
          <Chip
            icon={<TimeIcon />}
            label={`$${course.price}`}
            size="small"
            sx={{ backgroundColor: `${theme.palette.primary.main}15` }}
          />
          <Chip
            icon={<LevelIcon />}
            label={course.instructor}
            size="small"
            sx={{ backgroundColor: `${theme.palette.secondary.main}15` }}
          />
          {course.isActive && (
            <Chip
              label="Active"
              size="small"
              color="success"
              sx={{ backgroundColor: `${theme.palette.success.main}15` }}
            />
          )}
        </Box>
        <Button
          variant="contained"
          fullWidth
          onClick={() => onEnroll(course.id)}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          {course.enrolledUserIds?.includes(localStorage.getItem('userId')) ? 'Continue Learning' : 'Start Learning'}
        </Button>
      </CardContent>
    </Card>
  );
};

const AddCourseDialog = ({ open, onClose, onAdd }) => {
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    instructor: '',
    price: '',
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Convert price to number
    const courseDataToSubmit = {
      ...courseData,
      price: parseFloat(courseData.price) || 0
    };
    onAdd(courseDataToSubmit);
    setCourseData({
      title: '',
      description: '',
      instructor: '',
      price: '',
      isActive: true
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Course</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            name="title"
            label="Course Title"
            value={courseData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="description"
            label="Description"
            value={courseData.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
            required
          />
          <TextField
            name="instructor"
            label="Instructor Name"
            value={courseData.instructor}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={courseData.price}
            onChange={handleChange}
            fullWidth
            required
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          Add Course
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const Courses = () => {
  const theme = useTheme();
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await courseService.getAllCourses();
      setCourses(response.data);
    } catch (error) {
      showSnackbar('Error fetching courses', 'error');
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await courseService.enrollInCourse(courseId);
      showSnackbar('Successfully enrolled in course!', 'success');
      fetchCourses(); // Refresh course list
    } catch (error) {
      showSnackbar('Error enrolling in course', 'error');
    }
  };

  const handleAddCourse = async (courseData) => {
    try {
      await courseService.createCourse(courseData);
      showSnackbar('Course added successfully!', 'success');
      setOpenDialog(false);
      fetchCourses(); // Refresh course list
    } catch (error) {
      showSnackbar('Error adding course', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">
          Available Courses
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Course
        </Button>
      </Box>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <CourseCard course={course} onEnroll={handleEnroll} />
          </Grid>
        ))}
      </Grid>

      <AddCourseDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onAdd={handleAddCourse}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Courses; 