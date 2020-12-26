 import * as actions from '../actions/ACTION_WorkOuts'

 import MODEL_Workout from "../../components/models/MODEL_Workout";

 const initialState = {
     workouts: []
 };

 export default (state = initialState, action) => {
     switch (action.type) {

         case actions.CREATE_WORKOUT:
             const newWorkout = new MODEL_Workout(
                 action.productData.id,
                 action.productData.ownerId,
                 action.productData.title,
                 action.productData.imageUrl,
                 action.productData.description,
                 action.productData.exerciseIds
            );
             return {
                 ...state,
                 workouts: state.workouts.concat(newWorkout),
             };
     }
     return state;
 };