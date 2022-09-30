import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './providers/useAuth'
import List from './componets/List/List'
import Main from './componets/Main/AuthForm'


async function loadAppAplication() {
  await Font.loadAsync({
    'inter-bold': require('./assets/fonts/Inter-ExtraBold.ttf'),
  });
}


const Stack = createNativeStackNavigator();

function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAppAplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  return (<>
    {/* <List></List> */}
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{
          headerShown: false,
        }}>
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="List" component={List} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>


  </>
  );
}

export default App;