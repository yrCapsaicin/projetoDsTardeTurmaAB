import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Button, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";



export default function Index() {
  const router = useRouter();

  function cadastro() {
    roteador.push('/cadastrar');
  }
  
  function curtidas(){
    roteador.push( '/curtidas');
  }
  
  function entrar() {
    router.push("/uploadMusic");
  }

  function fnHome() {
    router.push("/home");
  }
  return (
    <View>
      <Button
      title='Home'
      onPress={fnHome}
      />
      </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    color: "#fff",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#5a4ae3",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  footer: {
    color: "#fff",
    textAlign: "center",
  },
  footerLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});
