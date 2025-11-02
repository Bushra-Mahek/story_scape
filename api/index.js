// api/index.js
import serverless from "serverless-http";
import expressApp from "../index.js"; // import your express app
export const handler = serverless(expressApp);
