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
    AsyncStorage,
    Modal
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import StateEdit from '../components/StateEdit';

export default class States extends Component {
    
    constructor(){
        super();
        this.state = {
            statesList: [],
            isVisible: false,
            stateSelected: {},
            stateText: '',
            usuario: '',
            isVisible: false,
        }
    }

    componentDidMount(){
        this._show();
    }
   
    _getUser(){
        AsyncStorage.getItem('usuario')
        .then(this.setState())
    }

    _show(){
        
        const uri = 'https://damp-wildwood-63703.herokuapp.com/api/states';
    
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
          .then(json => this.setState({ statesList: json }))
          .catch(e => console.warn(e.message))
      }
  
    _noModal(){
      this.setState({isVisible: false});
    }

    _addState() {
        
        const uri = 'https://damp-wildwood-63703.herokuapp.com/api/states';
        const description = this.state.stateText;

        if(description){

            AsyncStorage.getItem('token')    
            .then(token => {
              return {
                method: 'POST',
                mode: 'no-cors',  
                body: JSON.stringify({
                    description: description,
                }),              
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }),
              }
            })
            .then(requestInfo => fetch(uri, requestInfo))
            .then(this._show())
            .catch(e => console.warn(e.message))
        }
        this._clearText();
     }

     _update(id, param) {

        const uri = 'https://damp-wildwood-63703.herokuapp.com/api/states/'+ id;

        if(param){

            AsyncStorage.getItem('token')    
            .then(token => {
              return {
                method: 'PUT',
                mode: 'no-cors',  
                body: JSON.stringify({
                    description: param,
                }),              
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }),
              }
            })
            .then(requestInfo => fetch(uri, requestInfo))
            .then(this.show())
            .catch(e => console.warn(e.message))
        }
        //this._clearText();

     }

     _delete(param){
  
        Alert.alert(
            'Atenção!',
            'Deseja excluir o Status: ' + param.description +'?',
            [          
              { 
                text: 'SIM', onPress: () => {
                    AsyncStorage.getItem('token')    
                    .then(token => {
                        return {
                          method: 'DELETE',
                          headers: new Headers({
                           'Authorization': 'Bearer ' + token
                        })}
                        })
                        .then(requestInfo => fetch('https://damp-wildwood-63703.herokuapp.com/api/states/'+ param.id, requestInfo))
                        .then(this._show())
                        .catch(e => console.warn(e.message))                            
                }
              },
              {text: 'NÃO'}
            ],
            {cancelable: false},);
      }

    _clearText(){
        this.setState({ stateText: '' });
    }
    
    render(){
   
        return(
            <View style={styles.container}> 
            <Modal                
                animationType={'none'}
                transparent={true}
                visible={this.state.isVisible}
                onRequestClose={() => {
                this.setState({isVisible: false})
            }}
            >
                <StateEdit  show={this._show.bind(this)} state={this.state.stateSelected} sair={this._noModal.bind(this)} update={this._update} />
            </Modal>

                 <ScrollView>
                 {this.state.statesList.map(item => (
                     <View key={item.id}  style={{flexDirection: 'row', alignItems: 'center'}}>
                         <Text style={styles.stateData}>{item.description}</Text>
                         <TouchableOpacity
                            style={styles.stateEdit}
                            onPress={() => {
                                this.setState({stateSelected: {...item}})
                                this.setState({isVisible: true})
                            }}
                         >
                            <Text style={styles.text}>
                                <Feather name="edit" size={24} />
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.stateDelete}
                            onPress={() => this._delete(item)}
                        >
                            <Text style={styles.text}>
                                <Feather name="trash" size={24} />
                            </Text>
                        </TouchableOpacity> 
                     </View>
                 ))}
                 </ScrollView>
                 
                <View style={styles.footer}>
                    <TextInput
                        style={styles.textImput}
                        onChangeText={(stateText) => this.setState({stateText})}
                        value={this.state.stateText}
                        placeholder='>Status...'
                        placeholderTextColor='white'
                        underlineColorAndroid='transparent'
                    >

                    </TextInput>
                </View>
                <TouchableOpacity onPress={ this._addState.bind(this)} style={styles.addButton}>
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
    stateData: {
        flex: 1,
        fontSize: 20,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#A9A9A9',
        marginLeft: 10,
    },
    stateEdit: {
        marginRight: 5
      },
      stateDelete: {
       marginRight: 10
      },
      text: {
        color: 'black',
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
        width: 60,
        height: 60,
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