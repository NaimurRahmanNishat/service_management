// src/server.ts
import app from "./app";
import config from "./config";
import dbConnect from "./config/db";

import "./models";

app.listen(config.port, () => {
  dbConnect();
  console.log(`🚀Server is running on port http://localhost:${config.port}`);
});
