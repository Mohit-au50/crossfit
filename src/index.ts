import express, { Request, Response, json } from "express";
import { v1WorkoutRouter } from "./v1/routes/workoutRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

// testing route
app.get("/", (req: Request, res: Response) => {
  res.json({
    name: "test",
    message: "express api is working",
  });
});

// middelware to parse the json request body similar to body-parser
app.use(json());

// use v1Router
app.use("/api/v1/workouts", v1WorkoutRouter);

// listen to the app on the specified port
app.listen(PORT, () => {
  console.log(`Api is live on port http://localhost:${PORT}`);
});
