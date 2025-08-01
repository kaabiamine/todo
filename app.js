const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;
const todosRoutes = require("./Routes/todosRoutes");

app.use(cors());
app.use(express.json());

// Connexion à MongoDB Atlas via .env
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;
db.once('open', () => console.log('✅ Connecté à MongoDB'));
db.on('error', (err) => console.error('❌ Erreur MongoDB:', err));

// Utilisation des routes
app.use('/api/todos', todosRoutes);

app.get('/', (req, res) => {
    res.send('Todo API is running');
});

app.post('/', (req, res) => {
    res.status(404).send('POST to / is not supported. Use /todos instead.');
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`);
});