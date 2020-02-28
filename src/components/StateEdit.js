import React, { Component } from 'react';
import { 
    View, 
    Text, 
    TextInput,
    StyleSheet, 
    Alert,
    Button
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

export default class NoteShow extends Component {
    
    constructor(){
        
        super(); 
        this.state = {
            text: '',
        }      
    }

    componentDidMount(){

        this.refs.editText.focus();
        this.setState({text: this.props.state.description});
    }

    _delete(){
       Alert.alert(
        'Atenção!',
        'Deseja excluir Nota?',
        [          
          { text: 'SIM', onPress: () => console.log('SIM, foi preesionado')},
          {text: 'NÃO'}
        ],
        {cancelable: false},);
    }

    _edit(){
        this.props.update(this.props.state.id, this.state.text);
        this.props.sair();
        //alert(this.state.text);
    }

    render(){  
        return(
            <View style={styles.container}>
                 <Text style={styles.top}>Editar</Text>
                 <TextInput
                    style={{fontSize: 18, backgroundColor: '#FFF', marginLeft: 20, marginRight: 20, paddingLeft: 10, paddingRight: 10,}}
                    ref="editText"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                 />
                 <View  style={styles.containerButton}>
                    <Text style={[styles.button, {marginRight: 2}]}  onPress={this._edit.bind(this)}>Editar</Text>
                    <Text style={styles.button} onPress={this.props.sair}>Cancelar</Text>
                 </View>
            </View>  
        );
    }
}

const styles = new StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 50,      
      marginLeft: 20,
      marginRight: 20,
      marginBottom: '80%',
      backgroundColor: '#FFF',
      borderRadius: 10,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    },
    top:{
        //flex: 1,
        backgroundColor: '#FFA500',
        height: 20,
        color: '#FFF',
        fontSize: 18,   
        height: 50,
        fontWeight: 'bold',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        textAlign: 'center',
        padding: 12,
        marginBottom: 30
    },
    containerButton: {
        justifyContent: 'flex-end',
        flexDirection: 'row', 
        top: 70, 
        backgroundColor: '#FFF',  
        padding: 10, 
    },
    button: {
        flex: 1, 
        textAlign: 'center',
        backgroundColor: '#3CB371', 
        color: '#FFF',
        height: 40, 
        padding: 10,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginBottom: 30
    }
});