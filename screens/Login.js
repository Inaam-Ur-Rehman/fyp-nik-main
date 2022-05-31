import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View, Image, TextInput, StyleSheet, Pressable } from 'react-native'
import md5 from 'md5'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Login = ({ navigation }) => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');


    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.replace('Dashboard')
            }
        }).catch(err => alert(err));

        return () => { }
    }, [])

    const loginHandler = () => {
        fetch('http://192.168.255.97:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password: md5(password)
            })
        }).then(res => res.json()).then(async (data) => {
            if (data.USER_ID) {
                await AsyncStorage.setItem('user', JSON.stringify(data));
                navigation.replace('Dashboard');
            }
        }).catch(err => {
            alert('Invalid username/password')
        });
    }

    return (

        <View>
            <StatusBar style='light' />
            <Image
                source={ require('../assets/logo.png') }
                style={ { width: 190, height: 150, alignSelf: 'center', marginTop: 40 } }
            />

            <View style={ styles.inputContainer }>
                <TextInput
                    placeholder='Username'
                    style={ styles.input }
                    keyboardType="email-address"
                    onChangeText={ (text) => setUsername(text) }
                />
                <TextInput
                    placeholder='Password'
                    style={ styles.input }
                    secureTextEntry
                    onChangeText={ (text) => setPassword(text) }
                />

                <Pressable onTouchStart={ loginHandler } android_ripple={ {
                    color: '#fff'
                } } style={ styles.buttonLogin }>
                    <Text style={ styles.buttonText }>Login</Text>
                </Pressable>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',

    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#f4a261',
        padding: 4,
        marginVertical: 20,
        fontSize: 16,
    },
    buttonLogin: {
        backgroundColor: '#f4a261',
        padding: 10,
        width: 200,
        borderRadius: 5,
        marginHorizontal: 'auto',
        alignSelf: 'center',
        marginTop: 20
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
    }
})

export default Login