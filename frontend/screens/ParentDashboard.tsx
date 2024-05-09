import { NavigationProp, ParamListBase } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, View, StyleSheet } from "react-native";
import { Text } from "../ui";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { IGetChildAccounts } from "../domain/api-interfaces";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons/faRightToBracket";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { UserDispatchContext } from "../userState/UserContext";
import { ChildUser } from "../domain/users";
import useTheme from "../theming/UseTheme";
import { MessagesDispatchContext } from "../messagesState/messagesContext";

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

export const ParentDashboard: React.FC<Props> = ({ navigation }) => {
  const [childUsers, setChildUsers] =
    React.useState<IGetChildAccounts["data"]>();
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const userDispatch = useContext(UserDispatchContext)!;
  const messagesDispatch = useContext(MessagesDispatchContext)!;

  const styles = StyleSheet.create({
    userContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      padding: 8,
      paddingHorizontal: 12,
      backgroundColor: colors.card,
      borderRadius: 8,
    },
  });

  useEffect(() => {
    async function getChildren() {
      setIsLoading(true);
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${await getAuth().currentUser?.getIdToken()}`,
      };

      axios.get(process.env.CHILDACCOUNTS!, { headers }).then((res) => {
        setChildUsers(res.data);
        setIsLoading(false);
      });
    }

    getChildren();
  }, []);

  const setChildAsUser = (chosenChild: ChildUser) => {
    userDispatch({ type: "set", value: chosenChild });
    messagesDispatch({ type: "set", value: [] });
    navigation.navigate("Chat");
  };

  return (
    <View style={{ margin: 20 }}>
      <Text type="h3">Kinderen</Text>
      {isLoading && <ActivityIndicator color={colors.primary} size="large" />}
      {childUsers?.map((child) => (
        <View key={child.uid} style={styles.userContainer}>
          <Text style={{ flexGrow: 1, marginBottom: 0 }}>
            {child.firstName}
          </Text>
          <Pressable
            onPress={() => setChildAsUser(child)}
            style={{ padding: 8 }}
          >
            <FontAwesomeIcon color={colors.text} icon={faRightToBracket} />
          </Pressable>
        </View>
      ))}
    </View>
  );
};
