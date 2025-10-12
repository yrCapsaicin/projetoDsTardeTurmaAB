import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const Cadastro = () => {
  const { width, height } = useWindowDimensions();

  const clamp = useCallback((val, min, max) => Math.max(min, Math.min(max, val)), []);
  const rf = useCallback((size) => Math.round(clamp(size * (width / 390), 12, 30)), [width, clamp]);

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
    logoContainer: { marginTop: rf(-40), marginBottom: rf(20) },
    logo: { width: rf(110), height: rf(110) },
    formPadding: { paddingHorizontal: rf(25) },
    input: {
      width: '100%',
      height: rf(48),
      fontSize: rf(17),
      paddingHorizontal: rf(15),
      marginVertical: rf(8),
    },
    botao: { width: '100%', paddingVertical: rf(12), borderRadius: rf(40), marginTop: rf(20) },
    textoBotao: { fontSize: rf(19) },
    titulo: { fontSize: rf(26), marginBottom: rf(20) },
  }), [width, rf]);

  const [isPressing, setIsPressing] = useState(false);

  return (
    <LinearGradient colors={['#8000d5', '#f910a3', '#fddf00']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={{ opacity: fadeAnim, alignItems: 'center', width: '100%' }}>
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
                <Text style={[styles.titulo, dynamicStyles.titulo]}>Cadastro</Text>

                <TextInput
                  style={[styles.input, dynamicStyles.input]}
                  placeholder="Nome de usuário"
                  placeholderTextColor="#FFF"
                  value={nome}
                  onChangeText={setNome}
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
                >
                  <Text style={[styles.textoBotao, dynamicStyles.textoBotao]}>Cadastrar</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  flex: { flex: 1 },
  logoContainer: { alignSelf: 'center' },
  Logo: { resizeMode: 'contain' },
  formContainer: { width: '90%', maxWidth: 450 },
  titulo: { fontFamily: 'negrito', color: '#fff', textAlign: 'center' },
  input: {
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
    textAlign: 'center',
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
