const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Servește frontend-ul din folderul build
app.use(express.static(path.join(__dirname, 'Frontend', 'build')));

// Redirecționează toate rutele frontend către `index.html`
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'Frontend', 'build', 'index.html'));
});

// Portul pe care rulează serverul
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
