import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Button, TextInput, Text, StyledPicker } from "../ui";
import CheckBox from "expo-checkbox";
import {
  faEnvelope,
  faLock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GradientBackground from "../theming/GradientBackground";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const styles = StyleSheet.create({
    errorMessage: { color: "red", marginBottom: 5, top: -15 },
    label: { fontSize: 14 },
  });

  const [emailError, setEmailErrors] = useState("");

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
    agree: "",
  });

  const handleSubmit = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]{1,20}$/;
    const birthdateRegex =
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(19|20)\d\d$/;
    // Password regex requires at least 8 characters, 1 uppercase letter, 1 lowercase letter,
    // 1 number, and 1 special character
    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (firstName) {
      if (!nameRegex.test(firstName)) {
        newErrors.firstName =
          "Voornaam mag alleen letters bevatten en moet minder dan 20 tekens lang zijn.";
      }
    } else {
      newErrors.firstName = "Voornaam is verplicht!";
    }

    if (lastName) {
      if (!nameRegex.test(lastName)) {
        newErrors.lastName =
          "Achternaam mag alleen letters bevatten en moet minder dan 20 tekens lang zijn.";
      }
    } else {
      newErrors.lastName = "Achternaam is verplicht!";
    }

    if (birthdate) {
      if (!birthdateRegex.test(birthdate)) {
        newErrors.birthdate = "Geboortedatum moet in dd-mm-jjjj formaat zijn.";
      }
    } else {
      newErrors.birthdate = "Geboortedatum is verplicht!";
    }

    if (password) {
      if (!passwordRegex.test(password)) {
        newErrors.password =
          "Het wachtwoord moet minstens 8 tekens bevatten, inclusief 1 hoofdletter, 1 kleine letter, 1 cijfer en 1 speciaal teken.";
      }
    } else {
      newErrors.password = "Wachtwoord is verplicht!";
    }

    if (confirmPassword) {
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Wachtwoorden komen niet overeen.";
      }
    } else {
      newErrors.confirmPassword = "Wachtwoord herhalen is verplicht!";
    }

    if (!agree) {
      newErrors.agree = "Akkoord met algemene voorwaarden is verplicht!";
    }

    if (Object.keys(newErrors).length === 0 && emailError === "") {
      console.log("fist name", JSON.stringify(firstName));

      const allFormData = {
        stepOneInfo: {
          relationship: "vader",
          numberOfKids: "1",
          firstName: JSON.stringify(firstName),
          lastName: JSON.stringify(lastName),
          birthdate: JSON.stringify(birthdate),
          email: email,
          password: password,
        },
        stepTwoInfo: [
          {
            kidNumber: 1,
            kidName: "ffff",
            kidBirthdate: "01-01-2000",
            kidGender: "Jongen",
          },
        ],
      };

      const body = JSON.stringify(allFormData);
      const headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      console.log(body);

      axios
        .post(process.env.REGISTERAPI!, allFormData, { headers })
        .then(() => {
          const { email, password } = allFormData.stepOneInfo;
          signInWithEmailAndPassword(getAuth(), email, password);
        })
        .finally(() => setIsLoading(false));
    } else {
      setErrors(newErrors);
    }
  };

  const handleBirthdateChange = (text) => {
    const formattedDate = text
      .replace(/\D/g, "") // Remove non-digits
      .replace(/^(\d{2})(\d{2})(\d{4})$/, "$1-$2-$3"); // Format as mm-dd-yyyy

    setBirthdate(formattedDate);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleEmailCheck = (value) => {
    const emailValue = value;
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (emailValue) {
      if (!emailRegex.test(emailValue)) {
        const regxError = "Voer een geldig e-mailadres in.";
        setEmailErrors(regxError);
      } else {
        setEmailErrors("");
        const validatedEmail = { email: emailValue };
        const body = validatedEmail;
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
        };

        axios
          .post(process.env.CHECKIFUSEREXISTS!, body, { headers })
          .then(function (response) {
            if (response.data === true) {
              const emailExist = "E-mailadres bestaat al!";
              setEmailErrors(emailExist);
            } else {
              setEmailErrors("");
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      const reqError = "E-mailadres is verplicht!";
      setEmailErrors(reqError);
    }

    setEmail(emailValue);
  };

  return (
    <GradientBackground>
      <View style={{ flex: 1, justifyContent: "center", padding: 20}}>
        <Text style={styles.label}>Voornaam</Text>
        <TextInput
          placeholder="Jouw voornaam"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        {!!errors.firstName && (
          <Text style={styles.errorMessage}>{errors.firstName}</Text>
        )}

        <Text style={styles.label}>Achternaam</Text>
        <TextInput
          placeholder="Jouw achternaam"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        {!!errors.lastName && (
          <Text style={styles.errorMessage}>{errors.lastName}</Text>
        )}

        <Text style={styles.label}>Geboortedatum</Text>
        <TextInput
          placeholder="Jouw geboortedatum"
          value={birthdate}
          onChangeText={handleBirthdateChange}
          keyboardType="numeric"
          icon={faCalendar}
        />
        {!!errors.birthdate && (
          <Text style={styles.errorMessage}>{errors.birthdate}</Text>
        )}

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="Jouw e-mailadres"
          value={email}
          onChangeText={handleEmailCheck}
          keyboardType="email-address"
          icon={faEnvelope}
        />
        {!!emailError && <Text style={styles.errorMessage}>{emailError}</Text>}

        <Text style={styles.label}>Wachtwoord kiesen</Text>
        <TextInput
          placeholder="Jouw wachtwoord"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword}
          icon={faLock}
        />
        {/* Show or hide the password */}
        {/* <TouchableOpacity onPress={toggleShowPassword}>
        <Text>{showPassword ? "Hide" : "Show"}</Text>
      </TouchableOpacity> */}
        {!!errors.password && (
          <Text style={styles.errorMessage}>{errors.password}</Text>
        )}

        <Text style={styles.label}>Wachtwoord herhalen</Text>
        <TextInput
          placeholder="Jouw wachtwoord"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!showConfirmPassword}
          icon={faLock}
        />
        {/* Show or hide the password */}
        {/* <TouchableOpacity onPress={toggleShowConfirmPassword}>
        <Text>{showConfirmPassword ? "Hide" : "Show"}</Text>
      </TouchableOpacity> */}
        {!!errors.confirmPassword && (
          <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
        )}

        <View
          style={{ flex: 1, alignItems: "stretch", justifyContent: "center" }}
        >
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            <CheckBox
              value={agree}
              onValueChange={(value) => setAgree(value)}
              style={{ alignSelf: "center" }}
            />
            <Text style={{ margin: 8 }}>
              Ik ga akkoord met de algemene voorwaarden
            </Text>
          </View>
          {!!errors.agree && (
            <Text style={styles.errorMessage}>{errors.agree}</Text>
          )}
        </View>

        <Button label="Registreren" onPress={handleSubmit} />
      </View>
    </GradientBackground>
  );
};

export default RegisterScreen;
