import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Paper,
  Alert,
} from '@mui/material';
import axios from 'axios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const MongoDBStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkConnection = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/health/mongodb');
      setStatus(response.data);
    } catch (err) {
      setError(err.message);
      setStatus({ status: 'DOWN', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4, p: 2 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            MongoDB Connection Status
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
            {loading ? (
              <CircularProgress />
            ) : status ? (
              <Alert
                severity={status.status === 'UP' ? 'success' : 'error'}
                icon={status.status === 'UP' ? <CheckCircleIcon /> : <ErrorIcon />}
                sx={{ width: '100%' }}
              >
                <Typography variant="h6">
                  MongoDB Connection: {status.status}
                </Typography>
                <Typography variant="body2">{status.message}</Typography>
              </Alert>
            ) : null}
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {status && (
            <Paper
              elevation={2}
              sx={{
                p: 2,
                mt: 2,
                backgroundColor: '#f5f5f5',
                fontFamily: 'monospace',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Connection Details:
              </Typography>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(status, null, 2)}
              </pre>
            </Paper>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Button
              variant="contained"
              onClick={checkConnection}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Checking...' : 'Check Connection'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MongoDBStatus; 