const express = require('express')
const cors = require('cors')


const app = express()

// middleware

app.use(express.json())


// Import user routes
const userRoutes = require('./routes/user');
app.use('/', userRoutes);

// Route for handling all incorrect routes
app.use((req, res, next) => {
    res.status(404).send({ error: 'Route does not exist' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
