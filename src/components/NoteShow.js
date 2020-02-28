import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    Alert, 
    TouchableOpacity, 
    AsyncStorage,
    ScrollView,
    Modal 
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler';

import NoteEdit from '../components/NoteEdit';
import Stories from '../components/Stories';
import StorieEdit from '../components/StorieEdit';


export default class NoteShow extends Component {

    constructor(){
        super();
        this.state = {
            storiesList: [],
            isVisible: false,
        }
    }

    componentDidMount(){

        const uri = "https://damp-wildwood-63703.herokuapp.com/api/notes/"+this.props.teste.id+"/stories";

        AsyncStorage.getItem('token')    
          .then(token => {
            return {
              method: 'GET',
              headers: new Headers({
               'Authorization': 'Bearer ' + token
              })
            }
          })
          .then(requestInfo => fetch(uri, requestInfo))
          .then(resposta => resposta.json())
          .then(json => this.setState({ storiesList: json }))
          .catch(e => console.warn(e.message))
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
    
    _noModal(){
        this.setState({isVisible: false});
    }

    render(){

        let stories = this.state.storiesList.map((val, key) => {
            return <Stories key={key} keyval={key} val={val}
                    deleteMethod={()=> this.deleteNote(Key) } />
        });

        return(

            <View style={styles.container}>
                 <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.isVisible}
                    onRequestClose={() => {
                      this.setState({isVisible: false})
                    }}
            >
                <NoteEdit teste={this.state.noteSelected} sair={this._noModal.bind(this)} />
            </Modal>

                <Text style={styles.title}>Nota: #{this.props.teste.id}</Text>
                <View style={[styles.background, styles.shadown]}>                   
                    <Text style={styles.titleData}>
                        DESCRIÇÃO: <Text style={styles.textData} numberOfLines={2}>
                                {this.props.teste.title}
                            </Text>
                    </Text>  
                    <View style={{flexDirection: 'row'}}>
                        <Text style={
                            [
                                styles.titleData, 
                                {
                                    backgroundColor: 'red', 
                                    color: '#fff', 
                                    width: 70, 
                                    textAlign: 'center', 
                                    marginRight: 5,
                                    borderTopRightRadius: 20
                                }
                            ]
                        }> 
                            STATUS: 
                        </Text>
                        <Text>{this.props.teste.id_state}</Text>                     
                    </View>
                    <Text style={styles.titleData}>
                        CRIADOR: <Text style={styles.textData}>
                                {this.props.teste.id_user}
                            </Text>
                    </Text>                    
                    <Text style={styles.titleData}>
                        DATA: <Text style={styles.textData}>
                                {this.props.teste.creation_date}
                            </Text>
                    </Text>                    
                    <Text style={[styles.titleData, {marginTop:5, marginBottom:2}]}>
                        HISTÓRICO:
                    </Text>
                    <ScrollView style={styles.scrollContainer}>
                        {stories}
                    </ScrollView>            
                </View>                    
                <View style={styles.buttonContainer}>
                    <View style={{flexDirection: 'row', alignItems: "center"}}>
                        <Text style={styles.button} onPress={() => {
                          this.setState({isVisible: true})
                        }}>
                            <Feather name="edit" size={20} /> EDITAR
                        </Text>
                        <Text style={[styles.button, {margin: 2}]} onPress={this._delete}>
                            <Feather name="trash" size={20} /> EXCLUIR
                        </Text>
                        <Text style={styles.button} onPress={this.props.sair}>
                            <Feather name="arrow-left" size={20} /> SAIR
                        </Text>
                    </View>
                </View> 
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>              
            </View>            
        );
    }
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        padding: 10,
        marginRight: 5,
        marginLeft: 5,
        marginBottom: 0,      
    },
    shadown: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,    
        elevation: 2,
    },
    title: {
        color: '#fff',
        backgroundColor: '#008080',
        padding: 10,
        fontSize: 20,
        marginTop: 2,
        marginLeft: 5,
        marginRight: 5,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        marginBottom: 1,
    },
    titleData: {
        color: '#000',
        fontSize: 14,
        fontWeight: 'bold'
    },
    textData: {
        color: '#2F4F4F',
        fontSize: 15,
        fontWeight: 'normal'
    },
    histories: {
        fontSize: 15,
        color: '#34495e',
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 2
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 58,
        backgroundColor: '#32CD32',
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 24,

    },
    buttonContainer: {
        padding: 5,
        justifyContent: 'flex-end',
    },
    button: {
        flex: 1,
        height: 35,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#008080', 
        borderTopLeftRadius: 10,        
        borderTopRightRadius: 10, 
        padding: 5,     
    },
    scrollContainer: {
        flex: 1,
        marginBottom: 10,
        marginLeft: -3,
        marginRight: -3
    },
});