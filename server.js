const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.disable("etag");

app.use(express.json({ limit: "10kb" }));

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
        h1 { font-size: 56px; }
        p { color: #aaa3bd; }
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
        <p>Your privacy-focused browsing project.</p>
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
    version: "1.1.0"
  });
});

// Validate a URL without visiting it
app.get("/validate", (req, res) => {
  const input = req.query.url;

  if (typeof input !== "string" || !input.trim()) {
    return res.status(400).json({
      error: "Please provide a URL using ?url="
    });
  }

  let parsed;

  try {
    parsed = new URL(input);
  } catch {
    return res.status(400).json({
      error: "Invalid URL"
    });
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return res.status(400).json({
      error: "Only HTTP and HTTPS URLs are supported"
    });
  }

  if (parsed.username || parsed.password) {
    return res.status(400).json({
      error: "URLs containing embedded credentials are not allowed"
    });
  }

  res.json({
    valid: true,
    protocol: parsed.protocol,
    hostname: parsed.hostname
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
