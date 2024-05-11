import React, { useState } from "react";
import { View } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Button, TextInput, Text, DeferredButton } from "../ui";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import useTheme from "../theming/UseTheme";
import GradientBackground from '../theming/GradientBackground';

interface Props {
  navigation: NavigationProp<ParamListBase>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { colors } = useTheme()

  const handleLogin = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((_userCredential) => {
        setLoggedIn(true);
        navigation.navigate("Chat");
      })
      .catch((error) => {
        console.error("error", error);
        setError("Ongeldige gebruikersnaam of wachtwoord. Probeer het opnieuw.");
      });
  };

  const handleRegister = () => {
    navigation.navigate("Registreren");
  };

  return (
    <GradientBackground>
    <View style={{ flex: 1, justifyContent: "center", padding: 20}}>
      <Text type="h1" style={{ marginBottom: 20 }}>
        Log in
      </Text>
      <TextInput
        label="E-mail"
        placeholder="Jouw e-mailadres"
        autoComplete="email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        icon={faEnvelope}
      />
      <TextInput
        label="Wachtwoord"
        placeholder="Jouw wachtwoord"
        autoComplete="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        onSubmitEditing={handleLogin}
        secureTextEntry={true}
        icon={faLock}
        smallMargin
      />
      <DeferredButton label="Wachtwoord vergeten?" alignItems="flex-end" />
      <View style={{ marginTop: error ? 0 : 36 }} >
      {error && (
        <Text style={{ color: colors.error, marginBottom: 20, textAlign: "center", fontSize: 14 }}>{error}</Text>
      )}
      <Button label="Login" onPress={handleLogin} />
      
      <Text type="h3" textAlign="center">
        Nog geen account?
      </Text>
      <Button
        label="Account registreren"
        isSecondary
        onPress={handleRegister}
      />
      </View>
    </View>
    </GradientBackground>
  );
};

export default LoginScreen;
