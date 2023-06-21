require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const PORT = process.env.PORT || 7000;

// Routes
const api_route = require('./src/routes/route');

const DB = require('./src/config/db')((error) => {
  if (error) return console.log(error);
  console.log('....Connected to DB....');
  app.listen(PORT, () => console.log(`....Server started....`));
});

app.use(
  cors({
    origin: 'https://ayo-wzv4.onrender.com', // Replace with your allowed origin
  }),
);

// Define the CORS middleware function
const corsMiddleware = (req, res, next) => {
  const allowedOrigin = 'https://ayo-wzv4.onrender.com'; // Replace with your allowed origin

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
};

// Use the CORS middleware function in your Express application
app.use(corsMiddleware);

// Define your routes and handlers below
// ...

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.get('/', (req, res) => {
  res.send({ message: 'This is working' });
});

app.use('/auth', api_route.Auth);
app.use('/patient', api_route.PatientRoutes);
app.use('/doctor', api_route.DoctorRoutes);

app.get('/test', (req, res) => {
  res.send('Hi');
});
