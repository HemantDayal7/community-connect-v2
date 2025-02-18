import app from './app';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5555;

// Load Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));

// Serve Swagger UI at /api/docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📜 Swagger API Docs available at http://localhost:${PORT}/api/docs`);
});
