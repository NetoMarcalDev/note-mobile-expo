import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import StateList from '../js/state';

const width = Dimensions.get('screen').width;

export default class Home extends Component {

  componentDidMount(){
   
  }

  render(){
    return (
      <View style={styles.container}>
          <View style={[styles.id, styles.shadown, styles.borders]}>
              <Text style={styles.idTex}>
                  {this.props.id}
              </Text>
          </View>
          <View style={[styles.data, styles.shadown, styles.dataText]}>
              <Text numberOfLines={1}>Descrição: {this.props.title}</Text>
              <Text>Criador: {this.props.id_state} </Text>
              <Text>Data: {this.props.creation_date}</Text>
              <Text>Status: {this.props.id_state}</Text>               
          </View>
      </View>
    );
  }   
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  id: {
    marginTop: 10,
    width: width * 0.25,
    height: 90,
    backgroundColor: '#4682B4',
    alignItems: 'center',
    justifyContent: 'center'    
  },
  idTex: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 20
  },
  data: {
    marginTop: 10,
    width: width * 0.70,
    height: 90,
    backgroundColor: '#FFF',
    borderTopEndRadius: 10,    
    borderBottomRightRadius: 10
  },
  dataText: {
      padding: 10,
      paddingTop: 6
  },
  borders: {   
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  shadown: {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,    
    elevation: 9,
  },
});
