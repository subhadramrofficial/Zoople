import express from "express";
import { loggerMiddleware } from "./middlewares/logger.middleware.js";
import { router } from "./routes/auth.routes.js";
const app = express();

app.use(loggerMiddleware);
app.use(express.json());
app.use("/api/auth", router);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
