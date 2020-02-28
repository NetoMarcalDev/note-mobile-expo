import React, { Component } from 'react';
import { StyleSheet, View, Text, AsyncStorage, Modal, Alert} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { Feather } from '@expo/vector-icons';

export default class StatesOld extends Component {
 
  constructor(props, {navigation}){
    super(props);
    this.state = {
      statesList: [],
      isVisible: false,
      stateSelected: {},
      stateText: ''
    }
  }
  
  componentDidMount(){
    this._statesUpdate();
  }

  _statesUpdate(){
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

  addNote() {

    if(this.state.stateText){

     this.state.statesList.push({         
        'description': this.state.stateText, 
     });
     this.setState({ statesList: this.state.statesList })
     this.setState({ stateText: '' });
    }
 }

  _delete(stateP){
  
    Alert.alert(
        'Atenção!',
        'Deseja excluir o Status: '+ stateP.description +'?',
        [          
          { text: 'SIM', onPress: (stateP) => {

            AsyncStorage.getItem('token')    
            .then(token => {
                return {
                  method: 'DELETE',
                  headers: new Headers({
                   'Authorization': 'Bearer ' + token
                })}
            })
            .then(requestInfo => fetch('https://damp-wildwood-63703.herokuapp.com/api/states/'+ stateP.id, requestInfo))
            .then(
                this.state.statesList.splice(stateP.id, 1),
                this.setState({ statesList: this.state.statesList }))
            .catch(e => console.warn(e.message))
          }},
          {text: 'NÃO'}
        ],
        {cancelable: false},);
  }



  _noModal(){
    this.setState({isVisible: false});
  }

 render(){
  return (
    <View style={styles.container}>
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={this.state.isVisible}
        onRequestClose={() => {
          this.setState({isVisible: false})
        }}
      >
        
      </Modal>
      <ScrollView>
        {this.state.statesList.map(item => (
          <View key={item.id} style={{flexDirection: 'row', alignItems: 'center'}}>
           <Text style={styles.stateData} >{item.description}</Text>
           <TouchableOpacity
                style={styles.stateEdit}
           >
                <Text style={styles.stateText}>
                    <Feather name="edit" size={24} />
                </Text>
           </TouchableOpacity>
           <TouchableOpacity
                style={styles.stateDelete}
                onPress={() => this._delete(item)}
           >
                <Text style={styles.stateText}>
                    <Feather name="trash" size={24} />
                </Text>
           </TouchableOpacity>            
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={ this.addNote.bind(this) } style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
 }    
}

const styles = StyleSheet.create({
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
  stateText: {
    color: 'black',
  },
  addButton: {
    //position: 'absolute',
    //zIndex: 11,
    right: -270,
    bottom: 10,
    backgroundColor: '#3CB371',
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
addButtonText: {
    color: '#fff',
    fontSize: 24,
  },
 });
