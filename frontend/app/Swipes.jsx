import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const SQUARE_WIDTH = width * 0.8;
const SQUARE_HEIGHT = height * 0.6;

const profiles = [
  { id: 1, name: 'Perfil 1' },
  { id: 2, name: 'Perfil 2' },
  { id: 3, name: 'Perfil 3' },
  { id: 4, name: 'Perfil 4' },
];

export default function TinderSwipeSquare() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [dislikedProfiles, setDislikedProfiles] = useState([]);
  const position = useRef(new Animated.ValueXY()).current;

  // Interpolations para os labels
  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ['-15deg', '0deg', '15deg'],
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const dislikeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const animatedStyle = {
    transform: [...position.getTranslateTransform(), { rotate }],
    marginHorizontal: 20,
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (evt, gestureState) => {
        position.setValue({ x: gestureState.dx, y: gestureState.dy });
      },

      onPanResponderRelease: (evt, gesture) => {
        if (gesture.dx > 120) {
          // Swipe right - Like
          Animated.timing(position, {
            toValue: { x: width * 1.5, y: gesture.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            handleSwipe('right');
          });
        } else if (gesture.dx < -120) {
          // Swipe left - Dislike
          Animated.timing(position, {
            toValue: { x: -width * 1.5, y: gesture.dy },
            duration: 250,
            useNativeDriver: false,
          }).start(() => {
            handleSwipe('left');
          });
        } else {
          // Voltar para centro
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const handleSwipe = (direction) => {
    const profile = profiles[currentIndex];

    if (direction === 'right') {
      setLikedProfiles((prev) => [...prev, profile]);
    } else if (direction === 'left') {
      setDislikedProfiles((prev) => [...prev, profile]);
    }

    nextCard();
  };

  const nextCard = () => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {currentIndex < profiles.length ? (
          <Animated.View
            style={[styles.card, animatedStyle]}
            {...panResponder.panHandlers}
          >
            {/* Label LIKE */}
            <Animated.View style={[styles.likeLabel, { opacity: likeOpacity }]}>
              <Text style={styles.likeText}>LIKE</Text>
            </Animated.View>

            {/* Label DISLIKE */}
            <Animated.View style={[styles.dislikeLabel, { opacity: dislikeOpacity }]}>
              <Text style={styles.dislikeText}>DISLIKE</Text>
            </Animated.View>

            <Text style={styles.profileName}>
              {profiles[currentIndex].name}
            </Text>
            <Text style={styles.instruction}>
              Arraste para curtir ou rejeitar
            </Text>
          </Animated.View>
        ) : (
          <View style={styles.resultsContainer}>
            <Text style={styles.finished}>Não há mais perfis</Text>

            <Text style={styles.sectionTitle}>👍 Curtidos:</Text>
            {likedProfiles.map((profile) => (
              <Text key={profile.id} style={styles.resultText}>
                {profile.name}
              </Text>
            ))}

            <Text style={styles.sectionTitle}>👎 Rejeitados:</Text>
            {dislikedProfiles.map((profile) => (
              <Text key={profile.id} style={styles.resultText}>
                {profile.name}
              </Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  card: {
    width: SQUARE_WIDTH,
    height: SQUARE_HEIGHT,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#888',
  },
  finished: {
    fontSize: 22,
    color: '#999',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  resultsContainer: {
    alignItems: 'center',
  },
  likeLabel: {
    position: 'absolute',
    top: 30,
    left: 20,
    transform: [{ rotate: '-20deg' }],
    borderWidth: 2,
    borderColor: 'green',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(0,255,0,0.1)',
  },
  likeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  dislikeLabel: {
    position: 'absolute',
    top: 30,
    right: 20,
    transform: [{ rotate: '20deg' }],
    borderWidth: 2,
    borderColor: 'red',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255,0,0,0.1)',
  },
  dislikeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
});
