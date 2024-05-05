import * as Workout from "../../database/Workout";
import * as Record from "../../database/Record";
import { v4 as uuid } from "uuid";

export function getAllWorkouts({ mode }: any) {
  try {
    const allWorkouts = Workout.getAllWorkouts(mode);
    return allWorkouts;
  } catch (error: any) {
    throw error;
  }
}

export function getOneWorkout(workoutId: string) {
  try {
    const workout = Workout.getOneWorkout(workoutId);
    return workout;
  } catch (error: any) {
    throw error;
  }
}

export function createNewWorkout(newWorkout: any) {
  const workoutToAdd = {
    ...newWorkout,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };

  try {
    const createdWorkout = Workout.createNewWorkout(workoutToAdd);
    return createdWorkout;
  } catch (error: any) {
    throw error;
  }
}

export function updateOneWorkout(workoutId: string, changes: any) {
  try {
    const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
    return updatedWorkout;
  } catch (error: any) {
    throw error;
  }
}

export function deleteOneWorkout(workoutId: string) {
  try {
    Workout.deleteOneWorkout(workoutId);
  } catch (error: any) {
    throw error;
  }
}

// Records
export function getRecordsForWorkout(workoutId: string) {
  try {
    const record = Record.getRecordsForWorkout(workoutId);
    return record;
  } catch (error: any) {
    throw error;
  }
}
