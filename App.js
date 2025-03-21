import StartScreen from './components/start';
import ChatScreen from './components/chat';
import { View, Text, Alert, Platform } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

const Stack = createNativeStackNavigator();

import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getAuth } from "firebase/auth";


const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBQxuMA1oT9GaVMpsusVnc7jUbwcG82fVc",
    authDomain: "chat-app-ee378.firebaseapp.com",
    projectId: "chat-app-ee378",
    storageBucket: "chat-app-ee378.firebasestorage.app",
    messagingSenderId: "838671435693",
    appId: "1:838671435693:web:f0314f2910bebd23118324"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const connectionStatus = useNetInfo();

  useEffect(() => {
    const handleConnectivityChange = async () => {
      try {
        if (connectionStatus.isConnected === false) {
          console.log("cONNECTION lOST!")
          Alert.alert("Connection Lost!");
          await disableNetwork(db);
        } else if (connectionStatus.isConnected === true) {
          console.log("cONNECTION IS BACK!")
          await enableNetwork(db);

        }
      } catch (error) {
        console.error("Network status change error:", error);
      }
    };
    //test
    

    handleConnectivityChange();
  }, [connectionStatus.isConnected]);
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
      <Stack.Screen name="Start" options={{headerShown: false}}>
          {(props) => <StartScreen {...props} auth={auth} />}
        </Stack.Screen>
        <Stack.Screen name="Chat">
          {(props) => (
            <ChatScreen {...props} db={db} isConnected={connectionStatus.isConnected} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;