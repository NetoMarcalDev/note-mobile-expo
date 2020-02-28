import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, Modal} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Card from '../components/Card';
import NoteShow from '../components/NoteShow';

export default class Notes extends Component {
 
  constructor(props, {navigation}){
    super(props);
    this.state = {
      notes: [],
      isVisible: false,
      noteSelected: {}
    }
  }
  
  componentDidMount(){
    const uri = 'https://damp-wildwood-63703.herokuapp.com/api/notes';

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
      .then(json => this.setState({ notes: json }))
      .catch(e => console.warn(e.message))
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
       <NoteShow teste={this.state.noteSelected} sair={this._noModal.bind(this)} />
      </Modal>
      <ScrollView>
        {this.state.notes.map(item => (
          <View key={item.id}>
            <TouchableOpacity onPress={() => {
              this.setState({noteSelected: {...item}})
              this.setState({isVisible: true})
            }}>
              <Card {...item} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
 }    
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 100
  },
  textModal: {
    color: '#000',
    marginTop: 10,
  },
 });
