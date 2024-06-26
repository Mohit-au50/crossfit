import { Request, Response } from "express";
import { serviceGetRecordsForWorkout } from "../services/workoutService";

export const getRecordsForWorkout = (req: Request, res: Response) => {
  const { workoutId } = req.params;

  if (!workoutId) {
    res.status(400).json({
      status: "FAILED",
      data: { error: "Parameter ':workoutId' can not be empty" },
    });
  }

  try {
    const allRecords = serviceGetRecordsForWorkout(workoutId);
    res.json({ status: "Ok", data: allRecords });
  } catch (error: any) {
    res.status(error?.status || 500).json({
      status: "FAILED",
      data: { error: error?.message || error },
    });
  }
};
