import React, { useState, useEffect } from 'react'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import { createStyles, minWidth } from 'react-native-media-queries';
import { useAuth } from '../../providers/useAuth'

import Header from '../Header'

const AuthForm = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { user, login, errorLogin } = useAuth()

    const onPress = () => {
        login(email, password)
        console.log(errorLogin);
    }

    useEffect(() => {
        if (user) {
            setPassword('');
            setEmail('');
            navigation.navigate('List')
        }
    }, [errorLogin, user])


    return (
        <>
            <Header />
            <View
                style={styles.form} >
                <Text style={styles.header} >Autorization</Text>
                <View
                    style={styles.block_login}
                >
                    <Text style={styles.text}>login</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setEmail}
                        value={email}
                    />
                </View >
                <View
                    style={styles.block_password}
                >
                    <Text style={styles.text}>password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                        value={password}

                    />
                </View >
                <TouchableOpacity
                    style={styles.button}
                    onPress={onPress}
                >
                    <Text style={styles.text}>Submit</Text>
                </TouchableOpacity>
                {errorLogin && <Text style={styles.erorr}>Ошибка, не правельные имя пользователя или пароль</Text>}

            </View >
        </>
    )
}

const mobil = {
    form: {
        width: 290,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 14,
        marginRight: 'auto',
        marginLeft: 'auto',
        borderRadius: 6,
        borderColor: '#27569C',
        borderWidth: 5,
        borderStyle: 'solid',
    },
    header: {
        fontFamily: 'inter-bold',
        fontSize: 24,
        color: '#27569C',
        lineHeight: 45,
        marginTop: 3,
        textAlign: 'center'

    },
    text: {
        fontFamily: 'inter-bold',
        fontSize: 24,
        lineHeight: 39,
    },

    input: {
        height: 39,
        backgroundColor: '#D9D9D9',
        borderRadius: 10,
        borderColor: '#27569C',
        borderWidth: 4,
        borderStyle: 'solid',
        marginTop: 13,
        paddingLeft: 5,
    },
    button: {
        backgroundColor: '#E4B062',
        borderRadius: 10,
        height: 43,
        textAlign: 'center',
        marginTop: 22,
        marginBottom: 32,
    },
    block_login: {
    },
    block_password: {
    },
    erorr: {
        fontFamily: 'inter-bold',
        fontSize: 24,
        color: 'red',
        textAlign: 'center'
    }
};

const widthTablet = {
    form: {
        width: 480,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 284,
    },
    header: {
        height: 70,
        marginTop: 25,
    },

    input: {
        height: 45,
        width: 295,
        marginTop: 0,

    },
    block_login: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    block_password: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 25,
    },
    button: {
        width: 213,
        marginTop: 25,
        marginBottom: 27,
        marginRight: 'auto',
        marginLeft: 'auto',
    },

};



const styles = createStyles(
    mobil,
    minWidth(744, widthTablet),
);

export default AuthForm
