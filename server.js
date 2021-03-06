const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const products = require('./routes/api/products');
const user = require('./routes/api/user');
const contactForm = require('./routes/api/contact-form');

require('dotenv/config');

const app = express();

// Handling CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
  });

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require('./config/database');

// Connect to database using mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(error => console.log(error));

// Use Routes
app.use('/api/products', products);
app.use('/api/user', user);
app.use('/api/send', contactForm);

// Throw error if route is not matched
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

// Handle all errors
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
    
// Serve statis assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on port ${port}`));