import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

const Cadastro = () => {
  const { width } = useWindowDimensions();

  const clamp = useCallback((val, min, max) => Math.max(min, Math.min(max, val)), []);
  const rf = useCallback((size) => Math.round(clamp(size * (width / 390), 12, 28)), [width, clamp]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleCadastro = () => {
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);
  };

  const dynamicStyles = useMemo(() => ({
    logoContainer: { marginTop: rf(-50), marginBottom: rf(30) },
    logo: { width: rf(130), height: rf(130) },
    formPadding: { paddingHorizontal: rf(20) },
    input: { width: width * 0.9, height: rf(50), fontSize: rf(18), paddingHorizontal: rf(15) },
    botao: { width: width * 0.9, paddingVertical: rf(12), borderRadius: rf(50), marginTop: rf(25) },
    textoBotao: { fontSize: rf(20) },
  }), [width, rf]);

  const [isPressing, setIsPressing] = useState(false);

  return (
    <LinearGradient colors={['#8000d5', '#f910a3', '#fddf00']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />

        <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
          {/* Logo */}
          <View style={[styles.logoContainer, dynamicStyles.logoContainer]}>
            <Image
              style={[styles.Logo, dynamicStyles.logo]}
              source={require('../assets/images/Logofundo.png')}
              accessibilityLabel="Logo do aplicativo"
            />
          </View>

          {/* Form Container */}
          <View style={[styles.formContainer, dynamicStyles.formPadding]}>
            <Text style={[styles.titulo, { fontSize: rf(28), marginBottom: rf(20) }]}>Cadastro</Text>

            <TextInput
              style={[styles.input, dynamicStyles.input]}
              placeholder="Nome de usuário"
              placeholderTextColor="#FFF"
              value={nome}
              onChangeText={setNome}
              accessibilityLabel="Campo para nome de usuário"
              autoCapitalize="words"
              returnKeyType="next"
            />

            <TextInput
              style={[styles.input, dynamicStyles.input]}
              placeholder="Email"
              placeholderTextColor="#FFF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              accessibilityLabel="Campo para email"
              autoCapitalize="none"
              returnKeyType="next"
            />

            <TextInput
              style={[styles.input, dynamicStyles.input]}
              placeholder="Senha"
              placeholderTextColor="#FFF"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              accessibilityLabel="Campo para senha"
              autoCapitalize="none"
              returnKeyType="done"
            />

            <TouchableOpacity
              activeOpacity={0.85}
              style={[
                styles.botao,
                dynamicStyles.botao,
                isPressing && { transform: [{ scale: 0.97 }], backgroundColor: '#26144d' },
              ]}
              onPressIn={() => setIsPressing(true)}
              onPressOut={() => setIsPressing(false)}
              onPress={handleCadastro}
              accessibilityLabel="Botão de cadastro"
            >
              <Text style={[styles.textoBotao, dynamicStyles.textoBotao]}>Cadastrar</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignSelf: 'center' },
  Logo: { resizeMode: 'contain' },
  formContainer: { width: '100%', maxWidth: 450 },
  titulo: { fontFamily: 'negrito', color: '#fff', textAlign: 'center' },
  input: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'normal',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  botao: {
    backgroundColor: '#1d1436',
    borderWidth: 1,
    borderColor: '#8000D5',
    alignItems: 'center',
  },
  textoBotao: { color: '#FFF', fontFamily: 'negrito' },
});

export default Cadastro;
