require('./connexion');

const express = require('express');
const app = express();
const routes = require('./routes/routes');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.get('/', (req, res) => res.json({ message: 'Lancement réussi' }));
app.use('/', routes);
app.use(errorHandler);

module.exports = app;

if (require.main === module) {
  const port = process.env.PORT || 8080;
  app.listen(port, () => console.log(`app listening on http://localhost:${port}`));
}
