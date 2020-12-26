import React from 'react';
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
import {HeaderButton, Item} from "react-navigation-header-buttons";

const SCREEN_Home = props => {
    return (
        <View style={styles.screen}>
            <Text>This is the Home Screen</Text>
        </View>
    );
};

export const screenOptions = navData => {
    return{
        headerTitle: 'All Workouts',
        headerRight: () => (
                <C_HeaderButtons HeaderButtonComponent={HeaderButton}>
                    <Item
                        title='Add Workout'
                        iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                        onPress={() =>{
                            navData.navigation.toggleDrawer()
                        }}
                    />
                </C_HeaderButtons>)
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