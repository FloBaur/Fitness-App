import * as exerciseActions from "../actions/ACTION_Statistics";

import MODEL_Star from "../../components/models/MODEL_Star";

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
      return {
        ...state,
        workoutHistory: state.workoutHistory.concat(action.workout),
      };

    default:
      return state;
  }
};

export default statisticReducer;
