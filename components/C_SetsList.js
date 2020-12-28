import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput} from "react-native";

import CONST_Colors from "./constants/CONST_Colors";
import { Ionicons } from '@expo/vector-icons'

const C_SetsList = props => {

    // const[reps, setReps] = useState()
    // const[weight, setWeight] = useState()
    //
    // const set = []
    //
    // const buildSetHandler = (index) => {
    //     set.push(
    //         {   id: index,
    //             set:{
    //                 reps: reps,
    //                 weight: weight
    //             }
    //         }
    //     )
    //     console.log(set)
    // }

    return(
        <View style={styles.gridItem}>
            <Text style={styles.title}>{`set ${props.index.index+1}`}</Text>
                <View style={styles.setBox}>
                    <View style={{flexDirection: 'column', width: 90}}>
                        <View style={{justifyContent:'center'}}>
                            <Text style={styles.label}>Repetitions</Text>
                        </View>
                        <View style={styles.test}>
                            <TextInput
                                id="set"
                                keyboardType="number-pad"
                                numberOfLines={1}
                                style={styles.input}
                                onChangeText={rep=> props.onChangeRep(rep)}
                                // value={props.reps}
                                onEndEditing ={() => props.onEndEdit(props.index.index+1)}
                            />
                        </View>
                    </View>
                    <View style={{flexDirection: 'column', width: 90}}>
                        <View>
                        <Text style={styles.label}>Weight</Text>
                        </View>
                        <View style={styles.test}>
                            <TextInput
                                id="set"
                                keyboardType="number-pad"
                                numberOfLines={1}
                                onChangeText={weight => props.onChangeWeight(weight)}
                                // value={title}
                                minLength={5}
                                style={styles.input}
                                onEndEditing ={() => props.onEndEdit(props.index.index+1)}
                            />
                        </View>
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gridItem:{
        height: 150,
        width: 300,
        backgroundColor: 'lightgrey',
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',

    },
    title:{
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        color: CONST_Colors.primary,
        textAlign: 'center',
        marginTop: 10
    },
    setBox:{
        flexDirection: 'row',
        paddingHorizontal: '15%',
        paddingTop: '5%',
        justifyContent: 'space-between',
        height: '100%',
    },
    label:{
        fontFamily: 'open-sans',
        fontSize: 16,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    test:{
        justifyContent: 'center'
    }

    //////
})

export default C_SetsList;