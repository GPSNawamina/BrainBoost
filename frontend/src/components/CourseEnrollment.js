import React, { useState } from 'react';
import { courseService } from '../services/api';
import { Button, Snackbar, Alert } from '@mui/material';

const CourseEnrollment = ({ courseId, isEnrolled, onEnrollmentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEnroll = async () => {
    try {
      setLoading(true);
      setError(null);
      await courseService.enrollInCourse(courseId);
      onEnrollmentSuccess?.();
    } catch (err) {
      setError(err.message || 'Failed to enroll in course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleEnroll}
        disabled={loading || isEnrolled}
        fullWidth
      >
        {loading ? 'Enrolling...' : isEnrolled ? 'Enrolled' : 'Enroll Now'}
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CourseEnrollment; 