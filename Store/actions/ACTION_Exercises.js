export const ADD_EXERCISE = "ADD_EXERCISE";
export const DELETE_EXERCISE = "DELETE_EXERCISE";
export const EDIT_EXERCISE = "EDIT_EXERCISE";
export const FIRE_UPDATED_SET = "FIRE_UPDATED_SET";

export const addExercise = (exerciseId) => {
  return { type: ADD_EXERCISE, exercise: exerciseId };
};

export const deleteExercise = (exerciseId) => {
  return { type: DELETE_EXERCISE, exerciseId: exerciseId };
};

export const editExercise = (exercise) => {
  return { type: EDIT_EXERCISE, exercise: exercise };
};

export const fireUpdatedSet = (set) => {
  return { type: FIRE_UPDATED_SET, set: set };
};
