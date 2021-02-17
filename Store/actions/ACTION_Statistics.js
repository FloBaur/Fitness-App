// import {
// } from "../../Helpers/HELP_Db";

export const ADD_STAR = "ADD_STAR";
export const ADD_WORKOUT_TO_HISTORY = "ADD_WORKOUT_TO_HISTORY";

export const addStarToStatics = (count, timestamp, type) => {
  return { type: ADD_STAR, star: { count, timestamp, type } };
};

export const addWorkoutToHistory = (workout) => {
  return { type: ADD_WORKOUT_TO_HISTORY, workout: workout };
};
