import { Request, Response } from "express";
import * as services from "../services/workoutService";

export function getRecordsForWorkout(req: Request, res: Response) {
  const { workoutId } = req.params;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    const allRecords = services.getRecordsForWorkout(workoutId);
    res.json({ status: "Ok", data: allRecords });
  } catch (error: any) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
}
