const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use PORT env var, or default to 3000

app.get('/', (req, res) => {
  res.send('Hello from a2a-gcp-mcp!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
}); 