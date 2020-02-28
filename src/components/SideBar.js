import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground, Image } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';

export default SideBar = props => (
    <ScrollView>
        <ImageBackground
            source={require("../resources/img/background.jpg")}
            style={{width: undefined, padding: 10, paddingTop: 48 }}
        >
            <Image source={require("../resources/img/Logo.jpg")} style={styles.logo} />
            <Text style={styles.title}>SetyNotas</Text>
        </ImageBackground>

        <View style={styles.container}>
            <DrawerNavigatorItems {...props} />
        </View>
    </ScrollView>
)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#fff' 
    },
    title: {
       color: '#fff',
       fontSize: 20,
       fontWeight: 'bold',
       marginVertical: 8 
    }
});