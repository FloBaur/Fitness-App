import * as exerciseActions from "../actions/ACTION_Statistics";

import MODEL_Star from "../../components/models/MODEL_Star";
import MODEL_HistoryWorkout from "../../components/models/MODEL_HistoryWorkout";

const initialState = {
  workoutHistory: [],
  allStars: [],
};

const statisticReducer = (state = initialState, action) => {
  switch (action.type) {
    case exerciseActions.ADD_STAR:
      let myStars = [];
      for (let i = 0; i < action.star.count; i++) {
        myStars.push(new MODEL_Star(action.star.type, action.star.timestamp));
      }
      return {
        ...state,
        allStars: state.allStars.concat(myStars),
      };
    case exerciseActions.ADD_WORKOUT_TO_HISTORY:
      console.log("Reducer Workout");
      console.log(action.workoutData.workout);

      return {
        ...state,
        workoutHistory: state.workoutHistory.concat(action.workoutData.workout),
      };

    case exerciseActions.LOAD_HISTORY_WORKOUTS:
      return {
        ...state,
        workoutHistory: action.workouts.map(
          (work) =>
            new MODEL_HistoryWorkout(
              work.id,
              work.title,
              work.date,
              work.catID,
              JSON.parse(work.workout)
            )
        ),
      };

    default:
      return state;
  }
};

export default statisticReducer;
