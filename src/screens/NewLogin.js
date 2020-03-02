import React, { useState, useEffect } from 'react';
import { 
  View, 
  KeyboardAvoidingView, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  Animated,
  Keyboard 

} from 'react-native';

export default function App() {

  const [offset]   = useState(new Animated.ValueXY({ x: 0, y: 95 }));
  const [opacity]  = useState(new Animated.Value(0));
  const [logoSize] = useState(new Animated.ValueXY({ x: 160, y: 160 }));

  useEffect(() => {

    KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    KeyboardDidHidListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
      })
    ]).start();

  }, []);


  function keyboardDidShow() {
    
    Animated.parallel([
      Animated.timing(logoSize.x, {
        toValue: 55,
        duration: 100,
      }),
      Animated.timing(logoSize.y, {
        toValue: 55,
        duration: 100,
      }),
    ]).start();

  }

  function keyboardDidHide() {
    
    Animated.parallel([
      Animated.timing(logoSize.x, {
        toValue: 160,
        duration: 100,
      }),
      Animated.timing(logoSize.y, {
        toValue: 160,
        duration: 100,
      }),
    ]).start();

  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.background}>
      <View style={styles.containerLogo}>
        <Animated.Image 
          style={[styles.logo, {width: logoSize.x, height: logoSize.y}]}
          source={require('../resources/img/Logo.jpg')}
        />

      </View>
       
      <Animated.View 
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [
              { translateY: offset.y }
            ]
          }
        ]}
      >

        <Text style={styles.title}>SetyNotas</Text>

        <TextInput 
        style={styles.input}
          placeholder='E-mail'
          autoCorrect={false}
          onChangeText={() => {}}
        />
        <TextInput 
          style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          onChangeText={() => {}}
        />

      <TouchableOpacity style={styles.btnSubmit}>
        <Text style={styles.submitText}>Acessar</Text>
      </TouchableOpacity>

      </Animated.View>

    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  logo: {
    borderRadius: 100
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 5
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#104E8B'
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 20,
    marginTop: -40
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 5,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10
  },
  btnSubmit: {
    backgroundColor: '#35AAFF',
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
  registerText: {
    color: '#FFF'
  },
});