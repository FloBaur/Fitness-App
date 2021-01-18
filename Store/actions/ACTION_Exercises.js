import * as FileSystem from "expo-file-system";
import { insertExercise, fetchExercises } from "../../Helpers/HELP_Db";

export const ADD_EXERCISE = "ADD_EXERCISE";
export const SET_EXERCISES = "SET_EXERCISES";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const EDIT_EXERCISE = "EDIT_EXERCISE";
export const ADD_EXERCISE_TO_BASKET = "ADD_EXERCISE_TO_BASKET";
export const REMOVE_EXERCISE_FROM_BASKET = "REMOVE_EXERCISE_FROM_BASKET";
export const ADD_WORKOUT = "ADD_WORKOUT";
export const CLEAR_BASKET = "CLEAR_BASKET";
export const DELETE_WORKOUT = "DELETE_WORKOUT";

export { insertExercise } from "../../Helpers/HELP_Db";

export const addExerciseToBasket = (id) => {
  return { type: ADD_EXERCISE_TO_BASKET, exerciseId: id };
};

export const removeExerciseFromBasket = (id) => {
  return { type: REMOVE_EXERCISE_FROM_BASKET, exerciseId: id };
};

export const clearBasket = () => {
  return { type: CLEAR_BASKET };
};

export const addExercise = (exercise) => {
  return async (dispatch) => {
    let newPath = "default";

    if (exercise.image) {
      const fileName = exercise.image.split("/").pop();
      newPath = FileSystem.documentDirectory + fileName;
    }

    try {
      if (exercise.image) {
        await FileSystem.moveAsync({
          from: exercise.image,
          to: newPath,
        });
      }
      const dbrResult = await insertExercise(
        exercise.title,
        newPath,
        exercise.sets,
        exercise.exercises.join()
      );
      dispatch({
        type: ADD_EXERCISE,
        exerciseData: {
          id: dbrResult.insertId,
          exercise: exercise,
        },
      });
    } catch (err) {
      console.log("ERROR");
      console.log(err);
      throw err;
    }
  };

  // return { type: ADD_EXERCISE, exercise: exerciseId };
};

export const loadExercises = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchExercises();

      dispatch({ type: SET_EXERCISES, exercises: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteExercise = (exerciseId) => {
  return { type: DELETE_EXERCISE, exerciseId: exerciseId };
};

export const editExercise = (exercise) => {
  return { type: EDIT_EXERCISE, exercise: exercise };
};

export const addWorkout = (workout) => {
  return { type: ADD_WORKOUT, workout: workout };
};

export const deleteWorkout = (workoutId) => {
  return { type: DELETE_WORKOUT, workoutId: workoutId };
};
