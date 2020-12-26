export const DELETE_WORKOUT = 'DELETE_WORKOUT';
export const CREATE_WORKOUT = 'CREATE_WORKOUT';
export const UPDATE_WORKOUT = 'UPDATE_WORKOUT';

export const createWorkout = (categoryId, title, imageUrl, description, exerciseIds) =>{

    return async (dispatch, getState) => {

        // const token = getState().auth.token
        // const userId = getState().auth.userId
        // const response = await fetch(`https://rn-shop-app-1ae63-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
        //     method: 'POST',
        //     headers:{
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         title,
        //         description,
        //         imageUrl,
        //         price,
        //         ownerId: userId
        //     })
        // });
        //
        // const resData = await response.json();

        dispatch({
            type: CREATE_WORKOUT,
            productData: {
                id: null,
                ownerId: null,
                title,
                imageUrl,
                description,
                exerciseIds
            }
        })
    };
};