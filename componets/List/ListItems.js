import React from 'react';
import { View, Image, Text } from 'react-native';
import { createStyles, minWidth } from 'react-native-media-queries';


export default function ListItems({ item }) {
    return (
        <View style={styles.container}>
            <Image style={styles.photo} source={{ uri: item.photo }} />
            <Text style={styles.text}>Autor: {item.name}</Text>
            <Text style={styles.text}>Company: {item.company}</Text>
            <Text style={styles.text}>Title: {item.title}</Text>
            <Text style={[styles.text, styles.text_body]}>{item.body}</Text>
        </View>

    );
}

const mobil = {
    container: {
        borderRadius: 6,
        borderColor: '#27569C',
        borderWidth: 4,
        borderStyle: 'solid',
        marginTop: 10,
        paddingLeft: 5,
        marginLeft: 13,
        marginRight: 13,
        paddingTop: 10,
        paddingRight: 17,
        paddingLeft: 17,
        width: 292,
        minHeight: 200,
    },
    text: {
        fontFamily: 'inter-bold',
        fontSize: 16,
        lineHeight: 19,
        marginBottom: 17
    },
    text_body: {
        display: 'none',
    },
    photo: {
        width: 150,
        height: 150,
        display: 'none',
    }
};

const widthTablet = {
    text_body: {
        display: 'block',
    },
    photo: {
        width: 150,
        height: 150,
        display: 'block',
        marginBottom: 22
    }
};



const styles = createStyles(
    mobil,
    minWidth(744, widthTablet),
);
