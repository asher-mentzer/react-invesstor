const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'backend-invesstor',
    timestamp: new Date().toISOString()
  });
});

// Sample data endpoint
app.get('/api/data', (req, res) => {
  const sampleData = {
    message: 'Data from backend microservice',
    investments: [
      { id: 1, name: 'Tech Stock A', value: 15000, change: '+5.2%' },
      { id: 2, name: 'Bond Fund B', value: 8000, change: '+1.1%' },
      { id: 3, name: 'Real Estate C', value: 25000, change: '+3.7%' },
      { id: 4, name: 'Crypto D', value: 5000, change: '-2.4%' }
    ],
    totalValue: 53000,
    fetchedAt: new Date().toISOString()
  };

  res.json(sampleData);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    service: 'Backend Invesstor API',
    version: '1.0.0',
    endpoints: [
      'GET /api/health',
      'GET /api/data'
    ]
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
