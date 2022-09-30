import React, { useState, useEffect } from 'react';
import { View, Image, SafeAreaView, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { useAuth } from '../providers/useAuth'
import { useNavigation } from '@react-navigation/native';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function Header() {
    const navigation = useNavigation();
    const [dimensions, setDimensions] = useState({ window, screen });
    const { user, logout } = useAuth()


    const onPress = () => {
        logout();
    }

    useEffect(() => {
        if (!user) {
            navigation.navigate('Main')
        }
    }, [user])

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            "change",
            ({ window, screen }) => {
                setDimensions({ window, screen });
            }
        );
        return () => subscription?.remove();
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                {dimensions.screen.width > 744 ?
                    <Image style={styles.icon_logo2} source={require('../assets/logo2.png')} /> :
                    <Image style={styles.icon_logo1} source={require('../assets/logo1.png')} />}
                {user && <>
                    <TouchableHighlight onPress={onPress}>
                        <Image style={styles.icon_exit} source={require('../assets/exit.png')} />
                    </TouchableHighlight>
                </>}

            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 118,
        backgroundColor: '#E4B062'
    },
    view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 15,
        paddingLeft: 15
    },
    icon_logo2: {
        width: 276,
        height: 63,
    },
    icon_logo1: {
        width: 70,
        height: 63,
    },
    icon_exit: {
        width: 66,
        height: 56,
    },

});