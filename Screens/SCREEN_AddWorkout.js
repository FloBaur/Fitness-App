import React, {useEffect, useCallback, useReducer} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Alert
} from 'react-native';
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import C_HeaderButtons from "../components/C_HeaderButtons";
import C_Input from "../components/C_Input";
import { useSelector, useDispatch } from 'react-redux';

// --------------------REDUCER
const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};

// --------------------REDUCER

const SCREEN_AddWorkout = props => {

    const editedWorkout = {}

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedWorkout ? editedWorkout.title : '',
            imageUrl: editedWorkout ? editedWorkout.imageUrl : '',
            description: editedWorkout ? editedWorkout.description : '',
            price: ''
        },
        inputValidities: {
            title: editedWorkout ? true : false,
            imageUrl: editedWorkout ? true : false,
            description: editedWorkout ? true : false,
            price: editedWorkout ? true : false
        },
        formIsValid: editedWorkout ? true : false
    });

    const inputChangeHandler = useCallback(  // baut ein Objekt, welches immer wieder geprüft wird
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

const submitWorkout = () => {
    alert('Hi')
}

    // -------------Navigation

    useEffect(()=>{
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
                    <Item
                        title="Save"
                        iconName=
                            'ios-checkmark'

                        onPress={submitWorkout}
                    />
                </HeaderButtons>)
        });
    }, [submitWorkout])

// -------------Navigation

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>

                    <C_Input
                        id="Category"
                        label="Category"
                        errorText="Please choose"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedWorkout ? editedWorkout.description : ''}
                        initiallyValid={!!editedWorkout}
                        minLength={5}
                    />
                    <C_Input
                        id="WorkoutName"
                        label="Workout name"
                        errorText="Please enter a name for your workout!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        initialValue={editedWorkout ? editedWorkout.title : ''}
                        initiallyValid={!!editedWorkout}
                        required
                    />
                    <C_Input
                        id="description"
                        label="Description"
                        errorText="Please enter a valid description!"
                        keyboardType="default"
                        autoCapitalize="sentences"
                        autoCorrect
                        multiline
                        numberOfLines={3}
                        onInputChange={inputChangeHandler}
                        initialValue={editedWorkout ? editedWorkout.description : ''}
                        initiallyValid={!!editedWorkout}
                        minLength={5}
                    />


                    {/*Bild selbst aufnehmen*/}
                    {/*<C_Input*/}
                    {/*    id="imageUrl"*/}
                    {/*    label="Image Url"*/}
                    {/*    errorText="Please enter a valid image url!"*/}
                    {/*    keyboardType="default"*/}
                    {/*    returnKeyType="next"*/}
                    {/*    onInputChange={inputChangeHandler}*/}
                    {/*    initialValue={editedProduct ? editedProduct.imageUrl : ''}*/}
                    {/*    initiallyValid={!!editedProduct}*/}
                    {/*    required*/}
                    {/*/>*/}
                    {/*{editedProduct ? null : (*/}
                    <C_Input
                        id="price"
                        label="Price"
                        errorText="Please enter a valid price!"
                        keyboardType="decimal-pad"
                        returnKeyType="next"
                        onInputChange={inputChangeHandler}
                        required
                        min={0.1}
                    />
                    {/*)}*/}

                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    )
};

export const screenOptions = navData => {
    return{
        headerTitle: 'Add a Workout',
    }
}

const styles = StyleSheet.create({
    form: {
        margin: 20
    }
});

export default SCREEN_AddWorkout;