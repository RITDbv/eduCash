import React, { useState, useRef, useContext } from "react";
import { Pressable, View, StyleSheet, ScrollView } from "react-native";
import axios from "axios";
import { TextInput, Text } from "../ui";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRightLong } from "@fortawesome/free-solid-svg-icons/faRightLong";
import useTheme from "../theming/UseTheme";
import { TypingAnimation } from "../ui/TypingAnimation";
import useUser from "../userState/useUser";
import MessagesContext, {
  MessagesDispatchContext,
} from "../messagesState/messagesContext";
import { getHeader } from "../helpers/api";
import { Message } from "../domain/chat";

const ChatScreen: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [aiIsTyping, setAiIsTyping] = useState(false);
  const messages = useContext(MessagesContext);
  const messagesDispatch = useContext(MessagesDispatchContext)!;

  const { colors } = useTheme();
  const { uid, firstName, birthdate } = useUser()!;
  const scrollViewRef = useRef();

  const styles = StyleSheet.create({
    chatMsg: {
      padding: 8,
      borderRadius: 8,
      marginBottom: 12,
      flexDirection: "row",
    },
    assistantMsg: {
      backgroundColor: colors.text,
      borderTopLeftRadius: 0,
      marginRight: "10%",
      alignSelf: "flex-start",
    },
    userMsg: {
      backgroundColor: colors.primary,
      borderBottomRightRadius: 0,
      marginLeft: "10%",
      alignSelf: "flex-end",
    },
    msgText: {
      fontSize: 14,
      marginBottom: 0,
    },
  });

  const sendChat = async () => {
    setInputText("");
    setAiIsTyping(true);
    const newMessage: Message = {
      content: inputText,
        role: "user",
        timestamp: new Date().getTime(),
    }

    // dispatch is async, so we concat it here before dispatching so we are sure
    // it's sent w/o duplication 
    const dto = {
      messages: [...messages, newMessage],
      user: { uid, firstName, birthdate },
    };

    messagesDispatch({
      type: "add",
      value: newMessage,
    });

    const body = JSON.stringify(dto);
    const headers = await getHeader();

    console.log(process.env.CHATAPI, body, headers )

    axios
      .post(process.env.CHATAPI!, body, { headers })
      .then((res) => {
        messagesDispatch({
          type: "add",
          value: {
            content: res.data.content,
            role: "assistant",
            timestamp: new Date().getTime(),
          },
        });
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setAiIsTyping(false));
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            margin: 20,
            flexGrow: 1,
          }}
        >
          {messages.map((item) => (
            <View
              key={item.timestamp}
              style={[
                styles.chatMsg,
                item.role === "user" ? styles.userMsg : styles.assistantMsg,
              ]}
            >
              <Text contrastText style={styles.msgText}>
                {item.content}
              </Text>
            </View>
          ))}
          {aiIsTyping && (
            <View style={[styles.chatMsg, styles.assistantMsg]}>
              <TypingAnimation />
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ justifyContent: "flex-end", marginHorizontal: 20 }}>
        <View
          style={{ flexDirection: "row", alignItems: "stretch", columnGap: 20 }}
        >
          <View style={{ flexGrow: 1 }}>
            <TextInput
              placeholder="Type your message here..."
              value={inputText}
              onChangeText={(text) => setInputText(text)}
              multiline
            />
          </View>
          <Pressable
            disabled={!inputText.length}
            onPress={sendChat}
            style={{
              marginBottom: 20,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FontAwesomeIcon icon={faRightLong} />
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default ChatScreen;
