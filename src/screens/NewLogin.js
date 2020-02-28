import React, { Component } from 'react';
import { 
    View, 
    Text,
    TextInput, 
    KeyboardAvoidingView, 
    Image,
    TouchableOpacity ,
    StyleSheet
} from 'react-native';

export default class NewLogin extends Component {
    render(){
        return(
            <KeyboardAvoidingView style={styles.background} behavior="padding">
                <View style={styles.containerLogo}>
                    <Image 
                         style={{width: 150, height: 150, borderRadius: 100}} 
                        source={require('../resources/img/Logo.jpg')}
                    />
                </View>

                <View style={styles.container}>
                    <TextInput 
                        style={styles.input}
                        placeholder='Usuário'
                        //autoCorrect={false}
                        onChangeText={() =>{}}
                    />
                     <TextInput 
                        style={styles.input}
                        placeholder='Senha'
                        //autoCorrect={false}
                        secureTextEntry={true} 
                        onChangeText={() =>{}}
                    />

                    <TouchableOpacity style={styles.btnSubmit}>
                        <Text style={styles.submitText}>Acessar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnRegister}>
                        <Text style={styles.registerText}>Criar conta gratuita</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = new StyleSheet.create({    
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#104E8B'
    },
    containerLogo: {
        flex: 1,
        justifyContent: 'flex-end',               
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 10
    },
    input: {
        backgroundColor: '#fff',
        height: 45,
        width: '90%',
        marginBottom: 10,
        color: '#222',
        fontSize: 17,
        borderRadius: 7
    },
    btnSubmit: {
        backgroundColor: '#34AAFF',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    submitText: {
        color: '#FFF',
        fontSize: 18
    },
    btnRegister: {
        marginTop: 10,

    },
    registerText: {
        color: "#FFF"
    }

});