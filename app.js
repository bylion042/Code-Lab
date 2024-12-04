const express = require('express');
const path = require('path');
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Define the root route
app.get('/', (req, res) => {
    res.render('index', { title: 'Welcome to My EJS Server' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
