import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useWindowDimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = () => {
  const { width } = useWindowDimensions();

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const rf = (size) => Math.round(clamp(size * (width / 375), size * 0.9, size * 1.5));

  const paddingHorizontal = Math.max(12, width * 0.05);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FEC4C7', '#D9A6C4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.header,
          {
            padding: paddingHorizontal,
            borderBottomLeftRadius: rf(25),
            borderBottomRightRadius: rf(25),
            paddingBottom: rf(30),
          },
        ]}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={[styles.profileImage, { width: rf(90), height: rf(90), borderRadius: rf(45) }]}
        />

        <View style={[styles.profileInfo, { gap: rf(3) }]}>
          <Text style={[styles.username, { fontSize: rf(22) }]}>Usuário</Text>
          <Text style={[styles.email, { fontSize: rf(13) }]}>blabla@gmail.com</Text>
          <Text style={[styles.memberSince, { fontSize: rf(11) }]}>Membro desde xx/xx/xxxx</Text>
          <Text style={[styles.location, { fontSize: rf(13) }]}>São Paulo, SP</Text>
        </View>
      </LinearGradient>

      <View style={[styles.stats, { marginTop: rf(35), gap: rf(30) }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { fontSize: rf(26) }]}>0</Text>
          <Text style={[styles.statLabel, { fontSize: rf(13) }]}>Músicas Curtidas</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { fontSize: rf(26) }]}>0</Text>
          <Text style={[styles.statLabel, { fontSize: rf(13) }]}>Artistas Descobertos</Text>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.85}
        style={[
          styles.logoutButton,
          {
            paddingVertical: rf(12),
            marginTop: rf(50),
            borderRadius: rf(12),
            width: '75%',
            elevation: 2,
          },
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
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    marginBottom: 10,
  },
  profileInfo: {
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
    flexWrap: 'wrap',
  },
  statItem: {
    alignItems: 'center',
    minWidth: 120,
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
