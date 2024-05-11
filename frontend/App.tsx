import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./registerForm/RegistrationScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ChatScreen from "./screens/ChatScreen";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import ThemeProvider from "./theming/ThemeProvider";
import defaultTheme from "./theming/defaultTheme";
import { useFonts } from "expo-font";
import { firebaseInit } from "./firebase/firebaseInit";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons/faRightFromBracket";
import { faCog } from "@fortawesome/free-solid-svg-icons/faCog";
import axios from "axios";
import { MenuProvider } from "react-native-popup-menu";
import { ParentDashboard } from "./screens/ParentDashboard";
import UserContext, { UserDispatchContext } from "./userState/UserContext";
import userReducer from "./userState/userReducer";
import useTheme from "./theming/UseTheme";
import MessagesContext, {
  MessagesDispatchContext,
} from "./messagesState/messagesContext";
import messagesReducer from "./messagesState/messagesReducer";
import { getHeader } from "./helpers/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LandingPageScreen from "./screens/LandingPageScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { GameBoard } from "./TicTacToe/GameBoard";
import WinScreen from "./TicTacToe/WinScreen";
import LoseScreen from "./TicTacToe/LoseScreen";
import CreditScreen from "./screens/CreditScreen";

const auth = firebaseInit();

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  const { colors } = useTheme();
  const [fontsLoaded] = useFonts({
    "Roboto Flex": require("./assets/fonts/RobotoFlex-VariableFont.ttf"),
    "Roboto Serif": require("./assets/fonts/RobotoSerif-VariableFont.ttf"),
  });

  const [user, userDispatch] = React.useReducer(userReducer, undefined);
  const [authUser, setAuthUser] = React.useState<User | null>(null);
  const [messages, messagesDispatch] = React.useReducer(messagesReducer, []);

  useEffect(() => {
    onAuthStateChanged(
      auth,
      (authUser) => {
        setAuthUser(authUser);
        if (!user && authUser) {
          getUser();
        } else {
          setIsLoading(false);
        }
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      },
    );
  }, []);

  const getUser = async () => {
    const storedUser = await AsyncStorage.getItem("user");

    if (storedUser) {
      userDispatch({ type: "set", value: JSON.parse(storedUser) });
      setIsLoading(false);
      return;
    }

    const headers = await getHeader();
    console.log(process.env.GETUSER, headers )
    axios.get(process.env.GETUSER!, { headers }).then((res) => {
    
      userDispatch({ type: "set", value: res.data });
      setIsLoading(false);
    });
  };

  const signOut = () => {
    auth.signOut();
    userDispatch({ type: "clear" });
  };

  if (isLoading || !fontsLoaded || (authUser && !user)) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading...</Text>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <ThemeProvider value={defaultTheme}>
      <MenuProvider>
        <NavigationContainer>
          {authUser ? (
            <UserContext.Provider value={user}>
              <UserDispatchContext.Provider value={userDispatch}>
                <MessagesContext.Provider value={messages}>
                  <MessagesDispatchContext.Provider value={messagesDispatch}>
                    <Stack.Navigator 
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: '#444444', // Change this color to the desired red color
                      },
                      headerTintColor: 'white', // Change this color to the desired text color
                      headerTitleStyle: {
                        fontWeight: 'bold', // Optional: Change this style if needed
                      },
                    }}>
                      <Stack.Screen
                        name="landing screen"
                        component={LandingPageScreen}
                        options={({ navigation }) => ({
                          headerRight: () => (
                            <View style={{ flexDirection: "row" }}>
                              {/* {user?.userType === "caretaker" && (
                                <Pressable
                                  onPress={() =>
                                    navigation.navigate("ParentDashboard")
                                  }
                                  style={{ margin: 20 }}
                                >
                                  <FontAwesomeIcon
                                    color={colors.text}
                                    icon={faCog}
                                  />
                                </Pressable>
                              )} */}
                              <Pressable
                                onPress={() => signOut()}
                                style={{ margin: 20 }}
                              >
                                <FontAwesomeIcon
                                  color={colors.text}
                                  icon={faRightFromBracket}
                                />
                              </Pressable>
                            </View>
                          ),
                        })}
                      />
                      <Stack.Screen
                        name="ParentDashboard"
                        options={{ title: "Dashboard" }}
                        component={ParentDashboard}
                      />
                      <Stack.Screen
                        name="ProfileScreen"
                        component={ProfileScreen}
                      />
                        <Stack.Screen name="TicTacToe" component={GameBoard} />
                        <Stack.Screen name="WinScreen" component={WinScreen} />
                        <Stack.Screen name="LoseScreen" component={LoseScreen} />
                        <Stack.Screen name="CreditScreen" component={CreditScreen} />
                    </Stack.Navigator>
                  </MessagesDispatchContext.Provider>
                </MessagesContext.Provider>
              </UserDispatchContext.Provider>
            </UserContext.Provider>
          ) : (
            <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: '#444444', // Change this color to the desired red color
              },
              headerTintColor: 'white', // Change this color to the desired text color
              headerTitleStyle: {
                fontWeight: 'bold', // Optional: Change this style if needed
              },
            }}>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Login"
                component={LoginScreen}
              />
              <Stack.Screen name="Registreren" component={RegisterScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </MenuProvider>
    </ThemeProvider>
  );
};

export default App;
