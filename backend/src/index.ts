import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 5555;

// Connect to Database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
