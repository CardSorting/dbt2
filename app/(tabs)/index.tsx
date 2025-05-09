import { Image } from 'expo-image';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const navigateTo = (screen: string) => {
    router.push(screen);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ 
        light: Colors.light.tint, 
        dark: Colors.dark.tint 
      }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to DBT Companion</ThemedText>
      </ThemedView>

      <ThemedView style={styles.introContainer}>
        <ThemedText style={styles.introText}>
          Your personal guide to Dialectical Behavior Therapy skills and practice
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.cardContainer}>
        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]} 
          onPress={() => navigateTo('/diary')}
        >
          <ThemedText type="subtitle">Diary Cards</ThemedText>
          <ThemedText>Track your emotions, urges, and behaviors daily</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]} 
          onPress={() => navigateTo('/skills')}
        >
          <ThemedText type="subtitle">Skills Library</ThemedText>
          <ThemedText>Learn and reference DBT skills from all modules</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]} 
          onPress={() => navigateTo('/exercises')}
        >
          <ThemedText type="subtitle">Practice Exercises</ThemedText>
          <ThemedText>Guided exercises to help you practice DBT skills</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.card, { backgroundColor: colors.card }]} 
          onPress={() => navigateTo('/progress')}
        >
          <ThemedText type="subtitle">Progress Tracking</ThemedText>
          <ThemedText>Visualize your journey and track your improvement</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.quoteContainer}>
        <ThemedText style={styles.quote}>
          "You can be in control of your emotions, rather than having your emotions control you."
        </ThemedText>
        <ThemedText style={styles.quoteAuthor}>— Dr. Marsha Linehan, Creator of DBT</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  introContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  introText: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 16,
  },
  cardContainer: {
    gap: 16,
    marginBottom: 24,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteContainer: {
    marginTop: 8,
    marginBottom: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  quote: {
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  quoteAuthor: {
    textAlign: 'center',
    opacity: 0.7,
  },
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0.6,
  },
});
