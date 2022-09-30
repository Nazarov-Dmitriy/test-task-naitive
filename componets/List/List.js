import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { createStyles, minWidth } from 'react-native-media-queries';
import ListItems from './ListItems';
import Loader from '../Loader';
import Header from '../Header';



export default function List() {
    const [data, setData] = useState([]);
    const [successUsers, setSuccessUsers] = useState(false);
    const [successPosts, setSuccessPosts] = useState(false);
    const [successPhoto, setSuccessPhoto] = useState(false);

    const getUsers = async () => {
        let users = []
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users')
            const json = await response.json();
            json.map(user => {
                users.push({ id: user.id, name: user.name, company: user.company.name });
            })
            setData(users)
            setSuccessUsers(true)

        } catch (error) {
            console.error(error);
        }
    }

    const getPostUsers = async () => {
        try {
            data.map(async (item) => {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users/${item.id}/posts`)
                const json = await response.json();
                setData(prevData => prevData.map(o => {
                    if (o.id === json[0].userId) {
                        return ({ ...o, title: json[0].title, body: json[0].body })
                    }
                    return o;
                }));
            })
            setSuccessPosts(true)
        } catch (error) {
            console.error(error);
        }
    }

    const getPhotoUsers = async () => {
        try {
            data.map(async (item) => {
                const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${item.id}/photos`)
                const json = await response.json();
                setData(prevData => prevData.map(o => {
                    if (o.id === json[0].albumId) {
                        return ({ ...o, photo: json[0].thumbnailUrl })
                    }
                    return o;
                }));
            })
            setSuccessPhoto(true)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (successUsers) {
            getPostUsers();
            getPhotoUsers();
        }
    }, [successUsers]);

    return (
        <>
            {!successUsers && !successPosts && !successPhoto ? <Loader /> :
                <>
                    <Header />
                    <View onLayout={styles.onLayout()} style={styles.container}>
                        <ScrollView>
                            {successUsers && successPosts && successPhoto && data.map(item => {
                                return <ListItems key={item.id} item={item} />
                            })}
                        </ScrollView>
                    </View>
                </>}

        </>
    )
}

const mobil = {
    container: {
        display: 'flex',
        alignItems: 'center',
    }
};

const widthTablet = {
    container: {
        flexWrap: "wrap",
        flexDirection: 'row',
        justifyContent: 'center',
        width: 744,
        alignItems: 'stretch',
        marginRight: 'auto',
        marginLeft: 'auto',

    }
};



const styles = createStyles(
    mobil,
    minWidth(744, widthTablet),
);

