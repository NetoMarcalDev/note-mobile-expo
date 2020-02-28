import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

export default class NoteEdit extends Component {
   
    render(){
        return(
            <View style={styles.container}>
               <Text>EDIÇÃO HISTÓRICO</Text>
            </View>            
        );
    }
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: '#fff',
        backgroundColor: '#4682B4',
        padding: 10,
        fontSize: 20,
    },
    titleData: {
        color: '#4F4F4F',
        fontSize: 18,
        padding: 5
    },
    textData: {
        color: '#000',
        fontSize: 18,
        padding: 5,
    },
    buttonContainer: {
        flex: 1,
        padding: 5,
        justifyContent: 'flex-end',
    },
    button: {
        flex: 1,
        height: 35,
        marginRight: 4,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#4682B4', 
        borderTopLeftRadius: 10,        
        borderTopRightRadius: 10, 
        padding: 5,
        marginBottom: -1     
    }
});