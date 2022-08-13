import { VStack, Heading, Icon, useTheme } from "native-base";
import Logo from "../assets/logo_primary.svg";
import { Envelope, Key } from "phosphor-react-native";
import { Input } from "../components/Input";
import auth from "@react-native-firebase/auth";
import { Button } from "../components/Button";
import { useState } from "react";
import { Alert } from "react-native";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const { colors } = useTheme();

  function handleSignIn() {
    if (!inputEmail || !inputPassword) {
      return Alert.alert("Entrar", "Informe e-mail e senha");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(inputEmail, inputPassword)
      .catch((error) => {
        // console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Entrar", "E-mail inválidos.");
        }

        if (error.code === "auth/wrong-password") {
          return Alert.alert("Entrar", "E-mail ou senha inválidos.");
        }

        if (error.code === "auth/user-not-found") {
          return Alert.alert("Entrar", "E-mail ou senha inválidos.");
        }

        return Alert.alert("Entrar", "Não foi possivel acessar.");
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        onChangeText={setInputEmail}
        placeholder="E-mail"
        mb={4}
        InputRightElement={
          <Icon mr={4} as={<Envelope color={colors.gray[300]} />} />
        }
      />
      <Input
        onChangeText={setInputPassword}
        placeholder="Senha"
        secureTextEntry
        InputRightElement={
          <Icon mr={4} as={<Key color={colors.gray[300]} />} />
        }
        mb={8}
      />
      <Button
        isLoading={isLoading}
        onPress={handleSignIn}
        title="Entrar"
        w="full"
      />
    </VStack>
  );
}
