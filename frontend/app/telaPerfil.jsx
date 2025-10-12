import React, { useMemo } from "react";
import { Text, View, ScrollView, TouchableOpacity, useWindowDimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const { width, height } = useWindowDimensions();

  // Função para escala responsiva com limite
  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const rf = useMemo(() => (size) => Math.round(clamp(size * (width / 390), 12, 28)), [width]);

  const paddingHorizontal = Math.max(16, width * 0.05);
  const paddingTop = Math.max(40, height * 0.06);

  const genres = ["Rock", "Metal industrial", "Forró", "Glam Rock"];
  const artists = [
    { icon: "🎵", name: "Jackson do Pandeiro" },
    { icon: "🎸", name: "Nirvana" },
    { icon: "🎤", name: "Marilyn Manson" },
    { icon: "🎷", name: "Miles Davis" },
    { icon: "🎹", name: "Chick Corea" },
  ];

  const artistCols = width > 500 ? 3 : width > 350 ? 2 : 1;
  const artistWidth = (width - paddingHorizontal * 2 - (artistCols - 1) * rf(10)) / artistCols;

  // Styles fixos
  const styles = StyleSheet.create({
    scrollContent: { paddingBottom: rf(40) },
    headerButton: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: rf(20),
      backgroundColor: "rgba(255,255,255,0.2)",
    },
    profileIcon: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: rf(60),
      backgroundColor: "#4A5568",
      marginBottom: rf(20),
    },
    bioBox: {
      backgroundColor: "rgba(139, 69, 19, 0.6)",
      borderRadius: rf(20),
      padding: rf(20),
      marginBottom: rf(20),
    },
    genreButton: {
      backgroundColor: "rgba(255, 182, 193, 0.8)",
      borderRadius: rf(20),
      marginBottom: rf(10),
    },
    artistBox: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 182, 193, 0.6)",
      borderRadius: rf(15),
      padding: rf(12),
      marginBottom: rf(10),
    },
    artistIcon: {
      width: rf(40),
      height: rf(40),
      borderRadius: rf(20),
      backgroundColor: "#4A5568",
      marginRight: rf(10),
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <LinearGradient colors={["#8B5CF6", "#EAB308"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={{ paddingTop, paddingHorizontal, paddingBottom: rf(20) }}>
          <TouchableOpacity style={[styles.headerButton, { width: rf(40), height: rf(40) }]}>
            <Text style={{ color: "white", fontSize: rf(18) }}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Perfil */}
        <View style={{ alignItems: "center", paddingHorizontal }}>
          <View style={[styles.profileIcon, { width: rf(120), height: rf(120) }]}>
            <Text style={{ color: "white", fontSize: rf(20) }}>👤</Text>
          </View>

          <Text style={{ color: "white", fontSize: rf(24), fontWeight: "bold", marginBottom: rf(8), textAlign: "center" }}>
            Fulano D'Town
          </Text>

          <Text style={{ color: "white", fontSize: rf(16), marginBottom: rf(20), textAlign: "center" }}>
            23 seguidores • 4 seguindo
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "rgba(139, 69, 19, 0.8)",
              paddingHorizontal: width < 360 ? rf(30) : rf(40),
              paddingVertical: rf(12),
              borderRadius: rf(25),
              marginBottom: rf(20),
            }}
          >
            <Text style={{ color: "white", fontSize: rf(16), fontWeight: "bold" }}>Seguir +</Text>
          </TouchableOpacity>

          <Text style={{ color: "white", fontSize: rf(14), marginBottom: rf(20), textAlign: "center" }}>
            yrCapsaicin 🎵 naousoiphone
          </Text>
        </View>

        {/* Bio */}
        <View style={[styles.bioBox, { marginHorizontal: paddingHorizontal }]}>
          <Text style={{ color: "white", fontSize: rf(16), lineHeight: rf(24), textAlign: "justify" }}>
            eeeer amo ouçar musga{"\n"}amo tumati tamem
          </Text>
        </View>

        {/* Tags */}
        <View style={{ paddingHorizontal, marginBottom: rf(30) }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {genres.map((genre, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.genreButton, { paddingHorizontal: rf(20), paddingVertical: rf(10), width: width < 350 ? "100%" : "48%" }]}
              >
                <Text style={{ color: "white", fontSize: rf(14), textAlign: "center", fontWeight: "500" }}>{genre}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Artistas responsivo em grid */}
        <View style={{ paddingHorizontal, paddingBottom: rf(40) }}>
          <Text style={{ color: "white", fontSize: rf(20), fontWeight: "bold", marginBottom: rf(20) }}>Artistas mais ouvidos</Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: rf(10) }}>
            {artists.map((artist, i) => (
              <TouchableOpacity key={i} style={[styles.artistBox, { width: artistWidth }]}>
                <View style={styles.artistIcon}>
                  <Text style={{ color: "white", fontSize: rf(12) }}>{artist.icon}</Text>
                </View>
                <Text style={{ color: "white", fontSize: rf(16), fontWeight: "500" }}>{artist.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
