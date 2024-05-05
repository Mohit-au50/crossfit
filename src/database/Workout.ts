import DB from "./db.json";
import { saveToDatabase } from "./utils";

// function to return all the workouts
export function getAllWorkouts(mode: any) {
  try {
    let workouts = DB.workouts;

    if (mode) {
      return DB.workouts.filter((workout) =>
        workout.mode.toLocaleLowerCase().includes(mode)
      );
    }

    return workouts;
  } catch (error: any) {
    throw { status: 500, message: error };
  }
}

// function to return one workout with the workoutId provided in the endpoint
export function getOneWorkout(workoutId: string) {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);

    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    return workout;
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

// function to create a new workout and save it in the db
export function createNewWorkout(newWorkout: any) {
  try {
    const isExsist =
      DB.workouts.findIndex(
        (workout: any) => workout.name === newWorkout.name
      ) > -1;

    if (isExsist) {
      throw {
        status: 400,
        message: `Workout with the name '${newWorkout.name}' already exists`,
      };
    }

    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

// function to update a workout with the workoutId and the change to update and then save it in db
export function updateOneWorkout(workoutId: string, changes: any) {
  try {
    const workoutToUpdate = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );

    if (workoutToUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    const updatedWorkout = {
      ...DB.workouts[workoutToUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.workouts[workoutToUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}

// function to delete a workout from db
export function deleteOneWorkout(workoutId: string) {
  try {
    const workoutToDelete = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );

    if (workoutToDelete === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    DB.workouts.splice(workoutToDelete, 1);
    saveToDatabase(DB);
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}
