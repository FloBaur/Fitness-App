import * as exerciseActions from "../actions/ACTION_Exercises";
import MODEL_Exercise from "../../components/models/MODEL_Exercise";
import MODEL_Workout from "../../components/models/MODEL_Workout";

const initialState = {
  allExercises: [],
  workoutBasket: [],
  workouts: [],
};

const exerciseReducer = (state = initialState, action) => {
  switch (action.type) {
    case exerciseActions.ADD_EXERCISE:
      action.exerciseData.exercise.id = action.exerciseData.id;
      return {
        ...state,
        allExercises: state.allExercises.concat(action.exerciseData.exercise),
      };
    case exerciseActions.LOAD_EXERCISES:
      return {
        ...state,
        allExercises: action.exercises.map(
          (ex) =>
            new MODEL_Exercise(
              ex.id,
              ex.title,
              ex.imageUri,
              ex.sets,
              ex.exercises
            )
        ),
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

    case exerciseActions.ADD_EXERCISE_TO_BASKET:
      const chosenExercise = state.allExercises.find(
        (exercise) => exercise.id === action.exerciseId
      );
      return {
        ...state,
        workoutBasket: state.workoutBasket.concat(chosenExercise),
      };

    case exerciseActions.REMOVE_EXERCISE_FROM_BASKET:
      const toRemoveExercise = state.workoutBasket.findIndex(
        (exercise) => exercise.id === action.exerciseId
      );
      const basket = [...state.workoutBasket];
      basket.splice(toRemoveExercise, 1);

      return { ...state, workoutBasket: basket };

    case exerciseActions.ADD_WORKOUT:
      action.workoutData.workout.id = action.workoutData.id;
      return {
        ...state,
        workouts: state.workouts.concat(action.workoutData.workout),
      };

    case exerciseActions.LOAD_WORKOUTS:
      return {
        ...state,
        workouts: action.workouts.map(
          (work) =>
            new MODEL_Workout(
              work.workoutId,
              work.title,
              work.description,
              work.categoryNumber,
              work.exercises
            )
        ),
      };

    case exerciseActions.CLEAR_BASKET:
      return { ...state, workoutBasket: [] };

    case exerciseActions.DELETE_WORKOUT:
      const workouts = [...state.workouts];
      const indexOfDelWorkout = workouts.findIndex(
        (oldWorkout) => oldWorkout.id === action.workId
      );
      workouts.splice(indexOfDelWorkout, 1);
      return { ...state, workouts: workouts };
    default:
      return state;
  }
};
export default exerciseReducer;
