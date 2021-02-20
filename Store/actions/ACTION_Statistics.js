import {
  insertWorkoutInHistory,
  fetchHistoryWorkouts,
} from "../../Helpers/HELP_Statistics";

export const ADD_STAR = "ADD_STAR";
export const ADD_WORKOUT_TO_HISTORY = "ADD_WORKOUT_TO_HISTORY";
export const LOAD_HISTORY_WORKOUTS = "LOAD_HISTORY_WORKOUTS";

export const addStarToStatics = (count, timestamp, type) => {
  return { type: ADD_STAR, star: { count, timestamp, type } };
};

// export const = (workout) => {
//   return { type: ADD_WORKOUT_TO_HISTORY, workout: workout };
// };

export { insertWorkoutInHistory } from "../../Helpers/HELP_Statistics";

export const addWorkoutToHistory = (workout) => {
  return async (dispatch) => {
    const stringWorkout = JSON.stringify(workout.workout);
    try {
      const dbResult = await insertWorkoutInHistory(
        parseInt(workout.catId),
        workout.date.toString(),
        workout.title,
        stringWorkout
      );
      dispatch({
        type: ADD_WORKOUT_TO_HISTORY,
        workoutData: {
          id: dbResult.insertId,
          workout: workout,
        },
      });
    } catch (err) {
      console.log("ERROR");
      console.log(err);
      throw err;
    }
  };
};

export const loadHistoryWorkouts = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchHistoryWorkouts();
      dispatch({ type: LOAD_HISTORY_WORKOUTS, workouts: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
