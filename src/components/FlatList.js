import React, {  Component} from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Key,
    Alert,
    AsyncStorage
} from 'react-native';

import Stories from './Stories';

export default class FlatList extends Component {
    
    constructor(){
        super();
        this.state = {
            noteArray: [],
            noteText: '',
            usuario: AsyncStorage.getItem('usuario')
        }
    }

    render(){

        let notes = this.state.noteArray.map((val, key) => {
            return <Stories key={key} keyval={key} val={val}
                    deleteMethod={()=> this.deleteNote(Key) } />
        });
        
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}> - My Test Stories - </Text>
                </View>
                <ScrollView style={styles.scrollContainer}>
                    {notes}
                </ScrollView>
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textImput}
                        onChangeText={(noteText) => this.setState({noteText})}
                        value={this.state.noteText}
                        placeholder='>storie...'
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'
                    >

                    </TextInput>
                </View>
                <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        );
    }

    addNote() {

       if(this.state.noteText){

        var d = new Date();
        this.state.noteArray.push({
            'date':  d.getDate() +            
            "/" + (d.getMonth() + 1) +
            "/" + d.getFullYear(),
            'note': this.state.noteText,
            'usuario': this.state.usuario, 
        });
        this.setState({ noteArray: this.state.noteArray })
        this.setState({ noteText: '' });
       }
    }

    deleteNote(key) {

        Alert.alert(
            'Atenção!',
            'Deseja excluir o histórico?',
            [          
              { text: 'SIM', onPress: () => {
                this.state.noteArray.splice(key, 1);
                this.setState({ noteArray: this.state.noteArray });
              }},
              {text: 'NÃO'}
            ],
            {cancelable: false},);
    }   

}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#2F4F4F',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 10,
        borderBottomColor: '#ddd'
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        padding: 26
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 100,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    textImput: {
        alignSelf: 'stretch',
        color: '#fff',
        padding: 20,
        backgroundColor: '#252525',
        borderTopWidth: 2,
        borderTopColor: '#ededed',
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 80,
        backgroundColor: '#3CB371',
        width: 80,
        height: 80,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,
    }
});