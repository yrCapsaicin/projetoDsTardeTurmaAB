import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

const ProfileScreen = () => {
  const { width } = useWindowDimensions();

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const rf = (size) => Math.round(clamp(size * (width / 375), size * 0.85, size * 1.5));

  const paddingHorizontal = Math.max(12, width * 0.05);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <LinearGradient
        colors={['#FEC4C7', '#D9A6C4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.header,
          { padding: paddingHorizontal, borderBottomLeftRadius: rf(20), borderBottomRightRadius: rf(20) },
        ]}
      >
        <View style={[styles.profileInfo, { gap: rf(2) }]}>
          <Text style={[styles.username, { fontSize: rf(24) }]}>Usuário</Text>
          <Text style={[styles.email, { fontSize: rf(14) }]}>blabla@gmail.com</Text>
          <Text style={[styles.memberSince, { fontSize: rf(12) }]}>Membro desde xx/xx/xxxx</Text>
          <Text style={[styles.location, { fontSize: rf(14) }]}>São Paulo, SP</Text>
        </View>
      </LinearGradient>

      {/* Estatísticas */}
      <View style={[styles.stats, { marginTop: rf(25), gap: rf(20), flexWrap: 'wrap' }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { fontSize: rf(24) }]}>0</Text>
          <Text style={[styles.statLabel, { fontSize: rf(12) }]}>Músicas Curtidas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { fontSize: rf(24) }]}>0</Text>
          <Text style={[styles.statLabel, { fontSize: rf(12) }]}>Artistas Descobertos</Text>
        </View>
      </View>

      {/* Botão logout */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.logoutButton,
          { paddingVertical: rf(12), marginTop: rf(40), borderRadius: rf(10), width: '70%' },
        ]}
      >
        <Text style={[styles.logoutText, { fontSize: rf(16) }]}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd3e8',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
    alignItems: 'center',
  },
  username: {
    fontWeight: 'bold',
    color: '#441b34',
  },
  email: {
    color: '#380d26',
  },
  memberSince: {
    color: '#2c2c2c',
  },
  location: {
    color: '#6b4b63',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#F1A7D5',
  },
  statLabel: {
    color: '#D9A6C4',
  },
  logoutButton: {
    backgroundColor: '#F1A7D5',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
