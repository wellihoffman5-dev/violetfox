const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");

// Violet Fox homepage
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Violet Fox</title>
      <style>
        body {
          margin: 0;
          min-height: 100vh;
          display: grid;
          place-items: center;
          background: #08070d;
          color: #f5f2ff;
          font-family: Arial, sans-serif;
        }
        main {
          text-align: center;
          width: 90%;
          max-width: 600px;
        }
        h1 {
          font-size: 56px;
        }
        p {
          color: #aaa3bd;
        }
        .status {
          padding: 15px;
          border: 1px solid #383044;
          border-radius: 12px;
          background: #100e17;
        }
      </style>
    </head>
    <body>
      <main>
        <h1>🦊 Violet Fox</h1>
        <p>Your browsing project starts here.</p>
        <div class="status">Backend is online</div>
      </main>
    </body>
    </html>
  `);
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    name: "Violet Fox",
    status: "online"
  });
});

// API status
app.get("/api", (req, res) => {
  res.json({
    name: "Violet Fox",
    status: "online",
    version: "1.0.0"
  });
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Violet Fox listening on port ${PORT}`);
});
