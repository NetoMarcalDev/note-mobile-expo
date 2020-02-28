import React, {  Component} from 'react';
import { 
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert
} from 'react-native';

import { Feather } from '@expo/vector-icons';

export default class Stories extends Component {

    _edit(){
       Alert.alert('Atenção!', 'Editar foi clicado.');
     }    
    _delete(){
        Alert.alert(
         'Atenção!',
         'Deseja excluir histórico?',
         [          
           { text: 'SIM', onPress: () => console.log('SIM, foi preesionado')},
           {text: 'NÃO'}
         ],
         {cancelable: false},);
     }    

    render(){
        return(
           <View key={this.props.keyval} style={styles.note}>
                <Text style={styles.noteText}>{this.props.val.date}</Text>
                <Text style={styles.noteText}>{this.props.val.description}</Text>
                <TouchableOpacity
                    onPress={this._edit}
                    style={styles.noteEdit}
                >
                    <Text style={styles.noteDeleteText}>
                        <Feather name="edit" size={24} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={this._delete}
                    style={styles.noteDelete}
                >
                    <Text style={styles.noteDeleteText}>
                        <Feather name="trash" size={24} />
                    </Text>
                </TouchableOpacity>
           </View>
        );
    }
}

const styles = new StyleSheet.create({
    note: {
        position: 'relative',
        padding: 20,
        paddingRight: 50,
        borderBottomWidth: 1,
        borderBottomColor: '#4682B4',
    },
    noteText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#4682B4',
        marginLeft: -20
    },
    noteEdit: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        top: 10,
        bottom: 10,
        right: 16,
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        top: 10,
        bottom: 10,
        right: -8,
    },
    noteDeleteText: {
        color: 'black',
    }
});