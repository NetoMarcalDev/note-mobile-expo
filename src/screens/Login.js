import React, { Component } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';

import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  AsyncStorage,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import 'react-native-gesture-handler'

const width = Dimensions.get('screen').width;

export default class Login extends Component {


    constructor(){
        super();
        this.state = {
            description: '',
            password: '',
            message: '',
            loding: true
        }
    }


    logOn(){
        if(!this.testUser() && !this.testPassword()){
            this.login();
        }
    }

    login(){

        const uri = 'https://damp-wildwood-63703.herokuapp.com/api/login';

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({
                    description: this.state.description,
                    password: this.state.password
            }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

       fetch(uri, requestInfo)
        .then(response => {
            return response.text();
            
            throw new Error('Usuário ou senha inválidos.');
        })
        .then(token => {
            AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('usuario', this.state.description);
            
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Home' })],
            });
            
            this.props.navigation.dispatch(resetAction);            
        })
        .catch(e => this.setState({message: e.message}))
    }

    testUser(){
        if(this.state.description){
            this.setState({message: ''});
            return false;
        }
        alert('Favor informar o usuário.');
        return true;
    }

    testPassword(){
        if(this.state.password){
            this.setState({message: ''});
            return false;
        }
        alert('Favor informar a senha.');
        return true;
    }

    render(){
        return(
            <View style={styles.conatiner}>
              <Image 
                  style={styles.logo}
                  source={require('../resources/img/Logo.jpg')} 
              />
              <Text style={styles.title}>SetyNotas</Text>
    
              <KeyboardAvoidingView behavior="padding">
                <View style={styles.form}>                    
                  <TextInput style={styles.input}
                    placeholder="Usuário..." 
                    onChangeText={text => this.setState({description: text})}/>
    
                  <TextInput style={styles.input}
                    placeholder="Senha..." 
                    onChangeText={text => this.setState({password: text})}
                    secureTextEntry={true} />
    
                  <Button 
                    style={styles.button} 
                    title='Entrar'
                    color='#FF8C00'                  
                    onPress={this.logOn.bind(this)} />
                </View>
              </KeyboardAvoidingView> 
                
              <Text style={styles.message} >
                  {this.state.message}
              </Text>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    conatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#104E8B'
    },
    logo: {
        width: 150,
        height: 150,
        borderRadius: 100
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff',
        marginBottom: 5
    },
    form: {
        width: width * 0.8
    },
    input: {        
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 4
    },
    message: {
        marginTop: 15,
        color: '#ffcc33'
    },
    button: {
        borderRadius: 4,
    }    
});