import { Router } from "express";
import { middleware } from "apicache";
import {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
} from "../controllers/workoutController";
import { getRecordsForWorkout } from "../controllers/recordController";

export const v1WorkoutRouter = Router();
const cache = middleware;

v1WorkoutRouter.get("/", cache("2 minutes"), getAllWorkouts);

v1WorkoutRouter.get("/:workoutId", getOneWorkout);

v1WorkoutRouter.get("/:workoutId/records", getRecordsForWorkout);

v1WorkoutRouter.post("/", createNewWorkout);

v1WorkoutRouter.patch(":/workoutId", updateOneWorkout);

v1WorkoutRouter.delete(":/workoutId", deleteOneWorkout);
