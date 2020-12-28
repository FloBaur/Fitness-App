import React,{useEffect, useCallback} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    Platform
} from 'react-native';
import C_HeaderButtons from "../components/C_HeaderButtons";
import {HeaderButtons, Item} from "react-navigation-header-buttons";

const SCREEN_Home = props => {
// -------------Navigation
    const navToAddProdHandler = () => {
        props.navigation.navigate('AddExercise', {})
    }

    useEffect(()=>{
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
                    <Item
                        iconName={Platform.OS === 'android' ? 'md-add-circle' : 'ios-add-circle'}
                        onPress={navToAddProdHandler}
                    />
                </HeaderButtons>)
        });
    }, [navToAddProdHandler])
// -------------Navigation



    return (
        <View style={styles.screen}>
            <Text>This is the Home Screen</Text>
        </View>
    );
};

export const screenOptions = navData => {

    // const navToAddProdFN = navData.route.params ? navData.route.params.navToAddProd : null

    return{
        headerTitle: 'My Workouts',
        headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={C_HeaderButtons}>
                    <Item
                        title='Add Workout'
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() =>{
                            navData.navigation.toggleDrawer()
                        }}
                    />
                </HeaderButtons>),

    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SCREEN_Home;