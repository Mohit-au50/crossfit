import { Request, Response } from "express";
import * as services from "../services/workoutService";

export function getAllWorkouts(req: Request, res: Response) {
  // accept queries or multiple queries
  const { mode } = req.query;

  try {
    const allWorkouts = services.getAllWorkouts({ mode });
    res.json({ status: "Ok", data: allWorkouts });
  } catch (error: any) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
}

export function getOneWorkout(req: Request, res: Response) {
  const { workoutId } = req.params;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    const workout = services.getOneWorkout(workoutId);
    res.json({ status: "OK", data: workout });
  } catch (error: any) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
}

export function createNewWorkout(req: Request, res: Response) {
  const { name, mode, equipment, exercises, trainerTips } = req.body;

  if (!name || !mode || !equipment || !exercises || !trainerTips) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
      },
    });
  }

  const newWorkout = {
    name,
    mode,
    equipment,
    exercises,
    trainerTips,
  };

  try {
    const createdWorkout = services.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

export function updateOneWorkout(req: Request, res: Response) {
  const { workoutId } = req.params;
  const changes = req.body;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    const updatedWorkout = services.updateOneWorkout(workoutId, changes);
    res.json({ status: "OK", data: updatedWorkout });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}

export function deleteOneWorkout(req: Request, res: Response) {
  const { workoutId } = req.params;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    services.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
}
