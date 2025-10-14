import React, { useMemo, memo } from "react";
import { Text, View, ScrollView, TouchableOpacity, useWindowDimensions, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Componente memoizado para tags
const GenreItem = memo(({ genre, rf, width }) => (
  <TouchableOpacity
    style={{
      backgroundColor: "rgba(255, 182, 193, 0.8)",
      paddingHorizontal: rf(20),
      paddingVertical: rf(10),
      borderRadius: rf(20),
      marginBottom: rf(10),
      width: width < 350 ? "100%" : "48%",
    }}
  >
    <Text style={{ color: "white", fontSize: rf(14), textAlign: "center", fontWeight: "500" }}>
      {genre}
    </Text>
  </TouchableOpacity>
));

// Componente memoizado para artistas
const ArtistItem = memo(({ artist, rf, artistWidth }) => (
  <TouchableOpacity
    style={{
      width: artistWidth,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "rgba(255, 182, 193, 0.6)",
      borderRadius: rf(15),
      padding: rf(12),
      marginBottom: rf(10),
    }}
  >
    <View
      style={{
        width: rf(40),
        height: rf(40),
        borderRadius: rf(20),
        backgroundColor: "#4A5568",
        marginRight: rf(10),
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: rf(12) }}>{artist.icon}</Text>
    </View>
    <Text style={{ color: "white", fontSize: rf(16), fontWeight: "500" }}>{artist.name}</Text>
  </TouchableOpacity>
));

// Botão memoizado para o header
const HeaderButton = memo(({ rf }) => {
  const style = useMemo(
    () => ({
      width: rf(40),
      height: rf(40),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: rf(20),
      backgroundColor: "rgba(255,255,255,0.2)",
    }),
    [rf]
  );
  return (
    <TouchableOpacity style={style}>
      <Text style={{ color: "white", fontSize: rf(18) }}>←</Text>
    </TouchableOpacity>
  );
});

// Botão memoizado “Seguir +”
const FollowButton = memo(({ rf, width }) => {
  const style = useMemo(
    () => ({
      backgroundColor: "rgba(139, 69, 19, 0.8)",
      paddingHorizontal: width < 360 ? rf(30) : rf(40),
      paddingVertical: rf(12),
      borderRadius: rf(25),
      marginBottom: rf(20),
    }),
    [rf, width]
  );
  return (
    <TouchableOpacity style={style}>
      <Text style={{ color: "white", fontSize: rf(16), fontWeight: "bold" }}>Seguir +</Text>
    </TouchableOpacity>
  );
});

export default function Index() {
  const { width, height } = useWindowDimensions();

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
  const rf = useMemo(() => (size) => Math.round(clamp(size * (width / 390), 12, 28)), [width]);

  const paddingHorizontal = useMemo(() => Math.max(16, width * 0.05), [width]);
  const paddingTop = useMemo(() => Math.max(40, height * 0.06), [height]);
  const artistCols = useMemo(() => (width > 500 ? 3 : width > 350 ? 2 : 1), [width]);
  const artistWidth = useMemo(() => (width - paddingHorizontal * 2 - (artistCols - 1) * rf(10)) / artistCols, [
    width,
    paddingHorizontal,
    artistCols,
    rf,
  ]);

  const genres = useMemo(() => ["Rock", "Metal industrial", "Forró", "Glam Rock"], []);
  const artists = useMemo(
    () => [
      { icon: "🎵", name: "Jackson do Pandeiro" },
      { icon: "🎸", name: "Nirvana" },
      { icon: "🎤", name: "Marilyn Manson" },
      { icon: "🎷", name: "Miles Davis" },
      { icon: "🎹", name: "Chick Corea" },
    ],
    []
  );

  const scrollContentStyle = useMemo(() => ({ paddingBottom: rf(40) }), [rf]);
  const profileIconStyle = useMemo(
    () => ({
      justifyContent: "center",
      alignItems: "center",
      borderRadius: rf(60),
      backgroundColor: "#4A5568",
      marginBottom: rf(20),
    }),
    [rf]
  );
  const bioBoxStyle = useMemo(
    () => ({
      backgroundColor: "rgba(139, 69, 19, 0.6)",
      borderRadius: rf(20),
      padding: rf(20),
      marginBottom: rf(20),
    }),
    [rf]
  );

  return (
    <LinearGradient colors={["#8B5CF6", "#EAB308"]} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={scrollContentStyle}>
        {/* Header */}
        <View style={{ paddingTop, paddingHorizontal, paddingBottom: rf(20) }}>
          <HeaderButton rf={rf} />
        </View>

        {/* Perfil */}
        <View style={{ alignItems: "center", paddingHorizontal }}>
          <View style={[profileIconStyle, { width: rf(120), height: rf(120) }]}>
            <Text style={{ color: "white", fontSize: rf(20) }}>👤</Text>
          </View>

          <Text style={{ color: "white", fontSize: rf(24), fontWeight: "bold", marginBottom: rf(8), textAlign: "center" }}>
            Fulano D'Town
          </Text>

          <Text style={{ color: "white", fontSize: rf(16), marginBottom: rf(20), textAlign: "center" }}>
            23 seguidores • 4 seguindo
          </Text>

          <FollowButton rf={rf} width={width} />

          <Text style={{ color: "white", fontSize: rf(14), marginBottom: rf(20), textAlign: "center" }}>
            yrCapsaicin 🎵 naousoiphone
          </Text>
        </View>

        {/* Bio */}
        <View style={[bioBoxStyle, { marginHorizontal: paddingHorizontal }]}>
          <Text style={{ color: "white", fontSize: rf(16), lineHeight: rf(24), textAlign: "justify" }}>
            eeeer amo ouçar musga{"\n"}amo tumati tamem
          </Text>
        </View>

        {/* Tags */}
        <View style={{ paddingHorizontal, marginBottom: rf(30) }}>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
            {genres.map((g, i) => (
              <GenreItem key={i} genre={g} rf={rf} width={width} />
            ))}
          </View>
        </View>

        {/* Artistas responsivo em grid */}
        <View style={{ paddingHorizontal, paddingBottom: rf(40) }}>
          <Text style={{ color: "white", fontSize: rf(20), fontWeight: "bold", marginBottom: rf(20) }}>
            Artistas mais ouvidos
          </Text>

          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: rf(10) }}>
            {artists.map((a, i) => (
              <ArtistItem key={i} artist={a} rf={rf} artistWidth={artistWidth} />
            ))}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
