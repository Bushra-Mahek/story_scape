// api/index.js
import serverless from "serverless-http";
import app from "../index.js"; // your Express app (default export)

export default serverless(app); // ✅ default export (not named)
