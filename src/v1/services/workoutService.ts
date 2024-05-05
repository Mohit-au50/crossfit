import {
  workoutGetAllWorkouts,
  workoutGetOneWorkout,
  workoutCreateNewWorkout,
  workoutUpdateOneWorkout,
  workoutDeleteOneWorkout,
} from "../../database/Workout";
import { recordGetRecordsForWorkout } from "../../database/Record";
import { v4 as uuid } from "uuid";

export const serviceGetAllWorkouts = ({ mode }: any) => {
  try {
    const allWorkouts = workoutGetAllWorkouts(mode);
    return allWorkouts;
  } catch (error: any) {
    throw error;
  }
};

export const serviceGetOneWorkout = (workoutId: string) => {
  try {
    const workout = workoutGetOneWorkout(workoutId);
    return workout;
  } catch (error: any) {
    throw error;
  }
};

export const serviceCreateNewWorkout = (newWorkout: any) => {
  const workoutToAdd = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdWorkout = workoutCreateNewWorkout(workoutToAdd);
    return createdWorkout;
  } catch (error: any) {
    throw error;
  }
};

export const serviceUpdateOneWorkout = (workoutId: string, changes: any) => {
  try {
    const updatedWorkout = workoutUpdateOneWorkout(workoutId, changes);
    return updatedWorkout;
  } catch (error: any) {
    throw error;
  }
};

export const serviceDeleteOneWorkout = (workoutId: string) => {
  try {
    workoutDeleteOneWorkout(workoutId);
  } catch (error: any) {
    throw error;
  }
};

// Records
export const serviceGetRecordsForWorkout = (workoutId: string) => {
  try {
    const record = recordGetRecordsForWorkout(workoutId);
    return record;
  } catch (error: any) {
    throw error;
  }
};
