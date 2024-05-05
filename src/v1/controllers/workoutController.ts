import { Request, Response } from "express";
import {
  serviceGetAllWorkouts,
  serviceGetOneWorkout,
  serviceCreateNewWorkout,
  serviceUpdateOneWorkout,
  serviceDeleteOneWorkout,
} from "../services/workoutService";

export const getAllWorkouts = (req: Request, res: Response) => {
  const { mode } = req.query;

  try {
    const allWorkouts = serviceGetAllWorkouts({ mode });
    res.json({ status: "OK", data: allWorkouts });
  } catch (error: any) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

export const getOneWorkout = (req: Request, res: Response) => {
  const { workoutId } = req.params;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    const workout = serviceGetOneWorkout(workoutId);
    res.json({ status: "OK", data: workout });
  } catch (error: any) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};

export const createNewWorkout = (req: Request, res: Response) => {
  const { name, mode, equipment, exercises, trainerTips } = req.body;

  if (!name || !mode || !equipment || !exercises || !trainerTips) {
    res.status(400).json({
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
    const createdWorkout = serviceCreateNewWorkout(newWorkout);
    res.status(201).json({ status: "OK", data: createdWorkout });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const updateOneWorkout = (req: Request, res: Response) => {
  const { workoutId } = req.params;
  const changes = req.body;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    const updatedWorkout = serviceUpdateOneWorkout(workoutId, changes);
    res.json({ status: "OK", data: updatedWorkout });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};

export const deleteOneWorkout = (req: Request, res: Response) => {
  const { workoutId } = req.params;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    serviceDeleteOneWorkout(workoutId);
    res.status(204).json({
      status: "OK",
      data: {
        message: `workout with is deleted from database`,
      },
    });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ status: "FAILED", data: { error: error?.message || error } });
  }
};
