import * as FileSystem from "expo-file-system";
import {
  deleteExercises,
  fetchExercises,
  fetchSets,
  fetchWorkouts,
  insertExercise,
  insertSets,
  insertWorkout,
  deleteWorkouts,
} from "../../Helpers/HELP_Db";

import {
  fetchWrkRelExMN,
  initWrkRelExMN,
  insertWrkRelExMN,
} from "../../Helpers/HELP_DbRel";

export const ADD_EXERCISE = "ADD_EXERCISE";
export const LOAD_EXERCISES = "LOAD_EXERCISES";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const EDIT_EXERCISE = "EDIT_EXERCISE";
export const ADD_EXERCISE_TO_BASKET = "ADD_EXERCISE_TO_BASKET";
export const REMOVE_EXERCISE_FROM_BASKET = "REMOVE_EXERCISE_FROM_BASKET";
export const ADD_WORKOUT = "ADD_WORKOUT";
export const LOAD_WORKOUTS = "LOAD_WORKOUTS";
export const CLEAR_BASKET = "CLEAR_BASKET";
export const DELETE_WORKOUT = "DELETE_WORKOUT";

export {
  insertExercise,
  insertSets,
  insertWorkout,
} from "../../Helpers/HELP_Db";

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
    let newPath = "defaultPicture";

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
        exercise.sets
      );
      exercise.exercises.map((ex) => insertSets(dbrResult.insertId, ex));

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
};

export const loadExercises = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchExercises();
      const setResult = await fetchSets();

      const mergedArray = dbResult.rows._array.map((exercise) => ({
        ...exercise,
        exercises: setResult.rows._array.filter(
          (set) => exercise.id === set.id
        ),
      }));

      dispatch({ type: LOAD_EXERCISES, exercises: mergedArray });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteExercise = (exerciseId) => {
  return async (dispatch) => {
    try {
      await deleteExercises(exerciseId);
      dispatch({ type: DELETE_EXERCISE, exerciseId: exerciseId });
    } catch (err) {
      throw err;
    }
  };
};

export const editExercise = (exercise) => {
  return { type: EDIT_EXERCISE, exercise: exercise };
};

export const addWorkout = (workout) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertWorkout(
        workout.title,
        workout.description,
        workout.categoryNumber
      );

      initWrkRelExMN()
        .then(() => {
          console.log("Initialized initWrkRelExMN");
        })
        .catch((err) => {
          console.log("Initializing failed " + err);
          throw err;
        });
      workout.exercises.map((ex) => insertWrkRelExMN(dbResult.insertId, ex.id));

      dispatch({
        type: ADD_WORKOUT,
        workoutData: {
          id: dbResult.insertId,
          workout: workout,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteWorkout = (workoutId) => {
  return async (dispatch) => {
    try {
      await deleteWorkouts(workoutId);
      dispatch({ type: DELETE_WORKOUT, workId: workoutId });
    } catch (err) {
      throw err;
    }
  };
};

export const loadWorkouts = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchWorkouts();

      const getExfromDB = async (id) => {
        const result = await fetchWrkRelExMN(id);
        return result.rows._array;
      };

      const mergedArray = await Promise.all(
        dbResult.rows._array.map(async (workout) => ({
          ...workout,
          exercises: await getExfromDB(workout.workoutId),
        }))
      );

      dispatch({ type: LOAD_WORKOUTS, workouts: mergedArray });
    } catch (err) {
      throw err;
    }
  };
};
