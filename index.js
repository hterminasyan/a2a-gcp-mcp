const express = require('express');
const app = express();
const port = 3000; // or any port you prefer

app.get('/', (req, res) => {
  res.send('Hello from a2a-gcp-mcp!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});