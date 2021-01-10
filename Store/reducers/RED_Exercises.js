import * as exerciseActions from "../actions/ACTION_Exercises";

const initialState = {
  allExercises: [],
  updatedSet: [],
};

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case exerciseActions.ADD_EXERCISE:
      return {
        ...state,
        allExercises: state.allExercises.concat(action.exercise),
      };
    case exerciseActions.DELETE_EXERCISE:
      const exercises = [...state.allExercises];
      const indexOfDelExercise = exercises.findIndex(
        (oldEx) => oldEx.id === action.exerciseId
      );
      exercises.splice(indexOfDelExercise, 1);
      return { ...state, allExercises: exercises };

    case exerciseActions.EDIT_EXERCISE:
      const allExercises = [...state.allExercises];
      const indexOfEditProduct = allExercises.findIndex(
        (exercise) => exercise.id === action.exercise.id
      );
      allExercises.splice(indexOfEditProduct, 1, action.exercise);

      return { ...state, allExercises: allExercises };
    case exerciseActions.FIRE_UPDATED_SET:
      return {
        ...state,
        updatedSet: action.set,
      };

    default:
      return state;
  }
};
export default exerciseReducer;
