// import {
// } from "../../Helpers/HELP_Db";

import * as FileSystem from "expo-file-system";
import { insertExercise, insertSets } from "../../Helpers/HELP_Db";
import { ADD_EXERCISE } from "./ACTION_Exercises";

export const ADD_STAR = "ADD_STAR";
export const ADD_WORKOUT_TO_HISTORY = "ADD_WORKOUT_TO_HISTORY";

export const addStarToStatics = (count, timestamp, type) => {
  return { type: ADD_STAR, star: { count, timestamp, type } };
};

export const addWorkoutToHistory = (workout) => {
  return { type: ADD_WORKOUT_TO_HISTORY, workout: workout };
};

// export const addExercise = (exercise) => {
//   return async (dispatch) => {
//     let newPath = "defaultPicture";
//
//     if (exercise.image) {
//       const fileName = exercise.image.split("/").pop();
//       newPath = FileSystem.documentDirectory + fileName;
//     }
//     try {
//       if (exercise.image) {
//         await FileSystem.moveAsync({
//           from: exercise.image,
//           to: newPath,
//         });
//       }
//       const dbrResult = await insertExercise(
//           exercise.title,
//           newPath,
//           exercise.sets
//       );
//       exercise.exercises.map((ex) => insertSets(dbrResult.insertId, ex));
//
//       dispatch({
//         type: ADD_EXERCISE,
//         exerciseData: {
//           id: dbrResult.insertId,
//           exercise: exercise,
//         },
//       });
//     } catch (err) {
//       console.log("ERROR");
//       console.log(err);
//       throw err;
//     }
//   };
// };
