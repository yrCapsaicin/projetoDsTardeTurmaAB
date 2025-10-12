import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { Animated, Image, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';

const Cadastro = () => {
  const { width } = useWindowDimensions();

  const clamp = useCallback((val, min, max) => Math.max(min, Math.min(max, val)), []);
  const rf = useCallback((size) => Math.round(clamp(size * (width / 390), 12, 30)), [width, clamp]);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isPressing, setIsPressing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const debounceRef = useRef(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (!nome.trim()) newErrors.nome = 'Informe um nome válido.';
    if (!email.includes('@')) newErrors.email = 'Email inválido.';
    if (senha.length < 6) newErrors.senha = 'A senha deve ter pelo menos 6 caracteres.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCadastro = useCallback(() => {
    if (loading) return; // previne duplo toque

    if (!validateFields()) return;

    setLoading(true);

    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Senha:', senha);
      Alert.alert('Cadastro', 'Usuário cadastrado com sucesso!');
      setLoading(false);
    }, 800);
  }, [nome, email, senha, loading]);

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

  return (
    <LinearGradient colors={['#8000d5', '#f910a3', '#fddf00']} style={styles.gradient}>
      <SafeAreaView style={styles.safe}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }} keyboardShouldPersistTaps="handled">
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
                  style={[
                    styles.input,
                    dynamicStyles.input,
                    errors.nome && { borderColor: '#ff8080' },
                  ]}
                  placeholder="Nome de usuário"
                  placeholderTextColor="#FFF"
                  value={nome}
                  onChangeText={(t) => {
                    setNome(t);
                    if (errors.nome) setErrors((e) => ({ ...e, nome: null }));
                  }}
                />
                {errors.nome && <Text style={styles.error}>{errors.nome}</Text>}

                <TextInput
                  style={[
                    styles.input,
                    dynamicStyles.input,
                    errors.email && { borderColor: '#ff8080' },
                  ]}
                  placeholder="Email"
                  placeholderTextColor="#FFF"
                  value={email}
                  onChangeText={(t) => {
                    setEmail(t);
                    if (errors.email) setErrors((e) => ({ ...e, email: null }));
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <TextInput
                  style={[
                    styles.input,
                    dynamicStyles.input,
                    errors.senha && { borderColor: '#ff8080' },
                  ]}
                  placeholder="Senha"
                  placeholderTextColor="#FFF"
                  value={senha}
                  onChangeText={(t) => {
                    setSenha(t);
                    if (errors.senha) setErrors((e) => ({ ...e, senha: null }));
                  }}
                  secureTextEntry
                />
                {errors.senha && <Text style={styles.error}>{errors.senha}</Text>}

                <TouchableOpacity
                  activeOpacity={0.85}
                  style={[
                    styles.botao,
                    dynamicStyles.botao,
                    isPressing && { transform: [{ scale: 0.97 }], backgroundColor: '#26144d' },
                    loading && { opacity: 0.7 },
                  ]}
                  disabled={loading}
                  onPressIn={() => setIsPressing(true)}
                  onPressOut={() => setIsPressing(false)}
                  onPress={handleCadastro}
                >
                  <Text style={[styles.textoBotao, dynamicStyles.textoBotao]}>
                    {loading ? 'Enviando...' : 'Cadastrar'}
                  </Text>
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
  error: {
    color: '#ff8080',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'normal',
  },
});

export default Cadastro;
