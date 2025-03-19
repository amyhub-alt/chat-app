import { View, StyleSheet, Platform, KeyboardAvoidingView, Alert } from "react-native";
import { useEffect, useState } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = ({ route, navigation, db, isConnected }) => {
  const { userId, name, color } = route.params;
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    navigation.setOptions({ title: name });

    let unsubscribe;

 //Load Cached Messages when offline
 const loadCachedMessages = async () => {
  try {
    const cachedMessages = await AsyncStorage.getItem("chat_messages") || "[]";
    setMessages(JSON.parse(cachedMessages));
  } catch (error) {
    console.error("Error loading cached messages:", error);
  }
};

if (isConnected) {
  if (unsubscribe) unsubscribe();

      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, orderBy("createdAt", "desc"));

      unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt 
            ? (data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt.toMillis()))
            : new Date();

          return {
            _id: doc.id,
            text: data.text || "",
            createdAt: createdAt,
            user: data.user || { _id: "unknown" },
          };
        });

        setMessages(fetchedMessages);
        cacheMessages(fetchedMessages); //Cache messages
      },
      (error) => {
        console.error("Firestore error:", error);
        Alert.alert("Database Error", "Could not load messages");
      });
    } else {
      loadCachedMessages(); // Load from cache if offline
    }


    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [isConnected]);

 //Cache Messages in AsyncStorage
 const cacheMessages = async (messagesToCache) => {
  try {
    await AsyncStorage.setItem("chat_messages", JSON.stringify(messagesToCache));
  } catch (error) {
    console.error("Error caching messages:", error);
  }
};

const onSend = async (newMessages = []) => {
  if (!isConnected) {
    Alert.alert("You are offline! Messages can't be sent.");
    return;
  }

  const message = newMessages[0];
  try {
    await addDoc(collection(db, "messages"), {
      _id: message._id,
      text: message.text,
      createdAt: serverTimestamp(),
      user: { _id: userId, name },
    });
  } catch (error) {
    console.error("Error sending message:", error);
    Alert.alert("Error", "Failed to send message");
  }
};

//  Hide InputToolbar when offline
const renderInputToolbar = (props) => {
  if (isConnected) return <InputToolbar {...props} />;
  return null;
};


  

return (
  <View style={[styles.container, { backgroundColor: color }]}>
    <GiftedChat
      messages={messages}
      renderBubble={(props) => (
        <Bubble
          {...props}
          wrapperStyle={{
            right: { backgroundColor: "#000" },
            left: { backgroundColor: "#FFF" },
          }}
        />
      )}
      onSend={(messages) => onSend(messages)}
      user={{ _id: userId, name }}
      renderInputToolbar={renderInputToolbar} // Hide input when offline
      listViewProps={{
        style: { backgroundColor: color },
      }}
      // Add these props to avoid keyboard controller issues
      messagesContainerStyle={{ backgroundColor: color }}
      keyboardShouldPersistTaps="handled"
    />
{Platform.OS === "ios" || Platform.OS === "android" ? (
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"} 
          keyboardVerticalOffset={80}
        />
      ) : null}  </View>
);
};


const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default ChatScreen;
