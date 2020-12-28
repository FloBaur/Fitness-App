import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    Platform, KeyboardAvoidingView, ScrollView,
    TextInput,
    FlatList
} from 'react-native';
import C_Input from "../components/C_Input";
import DropDownPicker from 'react-native-dropdown-picker';
import C_SetsList from "../components/C_SetsList";
import C_imagePicker from "../components/C_ImagePicker";
import CONST_Colors from "../components/constants/CONST_Colors";

let exerciseSets = []

const SCREEN_AddExercise = props => {

    const[numberOfSets, setNumberOfSets] = useState(null)
    const[reps, setReps] = useState(null)
    const[weight, setWeight] = useState(null)
    const[title, setTitle] = useState('')
    const[inputFields, setInputFields] = useState([])
    const[isVisible, setIsVisible] = useState(false)
    const [image, setImage]= useState()
    // const[exerciseSets, setExerciseSets] = useState([])


    const buildSet = (repeat, weight) => { //Bau das in ein Modell
        return {repeat: null, weight: null}
    }

    let sets = []

    useEffect(() => {
        if(numberOfSets != null) {
            for (let i = 0; i < numberOfSets; i++) {
                sets.push({set: {

                        repetitions: null,
                        weight: null
                    }
                })
            }
            setInputFields(sets)
        }
        },[numberOfSets])


    const imageTakenHandler = (imagePath) =>{
        setImage(imagePath)
    }

    const repetitionsInputHandler = (reps) => {
        setReps(reps)
    }
    const weightHandler = (weight) => {
        setWeight(weight)
    }
    const buildSetHandler = (index) => {

        if(reps != null && weight != null) {
            const set = {
                id: index,
                set: {
                    reps: reps,
                    weight: weight
                }
            }
            exerciseSets.push(set)
            setReps(null)
            setWeight(null)
        }
    }
    const createExerciseHandler = () => {

        const exercise = {
            title: title,
            image: image,
            sets: numberOfSets,
            repetitions: exerciseSets
        }
        console.log(exercise)
    }

    const setInput =
            <View style={styles.list}>
                <FlatList keyExtractor={(item, index) => item.id}
                          data={inputFields}
                          renderItem={(item, index) => {
                              return <C_SetsList itemData={inputFields}
                                                   index={item}
                                                   onChangeRep={repetitionsInputHandler}
                                                   onChangeWeight={weightHandler}
                                                   onEndEdit={buildSetHandler}
                          />}}
                          numColumns={1}/>
            </View>

    return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior="padding"
                keyboardVerticalOffset={100}
            >
                <ScrollView>
                    <View style={styles.formContainer}>
                        <View>
                            <Text style={styles.label}>Title</Text>
                            <TextInput
                                id="Title"
                                errorText="Please enter a valid title!"
                                keyboardType="default"
                                autoCapitalize="sentences"
                                autoCorrect
                                style={styles.input}
                                numberOfLines={1}
                                onChangeText={text => setTitle(text)}
                                value={title}
                            />
                            <C_imagePicker onImageTaken={(uri) => imageTakenHandler(uri)}/>
                            <Text style={styles.label}>Sets</Text>
                            <View style={{...styles.dropdown, marginBottom: isVisible ? 160 : 10}}>
                                    <DropDownPicker items={
                                        [
                                        {label: '1', value: 1},
                                        {label: '2', value: 2},
                                        {label: '3', value: 3},
                                        {label: '4', value: 4},
                                        {label: '5', value: 5},
                                    ]}
                                    defaultValue={numberOfSets}
                                    containerStyle={{height: 40}}
                                    style={{backgroundColor: '#fafafa'}}
                                    itemStyle={{ justifyContent: 'flex-start'}}
                                    dropDownStyle={{backgroundColor: '#fafafa'}}
                                    onChangeItem={number => setNumberOfSets(number.value)}
                                    placeholder="Select the number of sets"
                                    isVisible={isVisible}
                                    onOpen={() => setIsVisible(true)}
                                    onClose={() => setIsVisible(false)}
                                    />
                            </View>
                            {numberOfSets === null ? null : setInput}
                        </View>
                        <View style={styles.button}>
                            <Button title='CREATE EXERCISE'
                                    color={CONST_Colors.primary}
                                    onPress={createExerciseHandler}
                            />
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
    );
};

export const screenOptions = navData => {
    return{
        headerTitle: 'Add an Exercise',
    }
}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        margin: 20,
        height: '100%',
    },
    form: {
    },
    dropdown:{
        marginTop: 20,
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    list:{
        flex: 1,
        height:'100%',
        paddingHorizontal: 15,
        alignItems: 'center'
    },
    button:{
        // width: '30%',
        marginVertical: 20,
        paddingHorizontal:100
    }
});

export default SCREEN_AddExercise;