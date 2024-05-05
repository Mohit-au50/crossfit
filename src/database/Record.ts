import DB from "./db.json";

export function getRecordsForWorkout(workoutId: string) {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);

    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }

    return record;
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
}