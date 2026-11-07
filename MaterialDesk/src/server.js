import app from "./app.js";

import { connectDB } from "./config/database.js";

import { PORT } from "./config/env.js";

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error.message);

    process.exit(1);
  }
}

startServer();