import { Image } from 'expo-image';
import { StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Container, Column, Row } from '@/components/ui/Container';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { borders, shadows, spacing } from '@/constants/DesignTokens';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const navigateTo = (screen: '/(tabs)/diary' | '/(tabs)/skills' | '/(tabs)/exercises' | '/(tabs)/progress') => {
    router.push(screen);
  };

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <Column style={styles.header}>
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.headerImage}
            contentFit="cover"
          />
          <Column style={styles.headerContent}>
            <Text variant="h1" align="center" color="#fff">
              DBT Companion
            </Text>
            <Text variant="subtitle" align="center" color="#fff">
              Your personal guide to mindfulness and emotional well-being
            </Text>
          </Column>
        </Column>

        {/* Introduction */}
        <Card style={styles.introCard}>
          <Text variant="bodyBold" align="center">
            Welcome to your DBT journey
          </Text>
          <Text align="center" style={styles.introText}>
            This app provides tools and resources to help you practice Dialectical Behavior Therapy skills in your daily life.
          </Text>
        </Card>

        {/* Feature Cards */}
        <Column style={styles.featureCardsContainer}>
          <FeatureCard
            title="Diary Cards"
            description="Track your emotions, urges, and behaviors daily"
            icon="book"
            color={colors.emotions.sadness}
            onPress={() => navigateTo('/(tabs)/diary')}
          />

          <FeatureCard
            title="Skills Library"
            description="Learn and reference DBT skills from all modules"
            icon="bulb"
            color={colors.emotions.joy}
            onPress={() => navigateTo('/(tabs)/skills')}
          />

          <FeatureCard
            title="Practice Exercises"
            description="Guided exercises to help you practice DBT skills"
            icon="fitness"
            color={colors.emotions.love}
            onPress={() => navigateTo('/(tabs)/exercises')}
          />

          <FeatureCard
            title="Progress Tracking"
            description="Visualize your journey and track your improvement"
            icon="trending-up"
            color={colors.emotions.fear}
            onPress={() => navigateTo('/(tabs)/progress')}
          />
        </Column>

        {/* Quote */}
        <Card variant="outlined" style={styles.quoteCard}>
          <Text style={styles.quote} align="center">
            "You can be in control of your emotions, rather than having your emotions control you."
          </Text>
          <Text style={styles.quoteAuthor} align="center">
            — Dr. Marsha Linehan, Creator of DBT
          </Text>
        </Card>

        {/* Get Started Button */}
        <Button
          title="Start Your Practice Today"
          onPress={() => navigateTo('/(tabs)/diary')}
          iconRight="arrow-forward"
          style={styles.getStartedButton}
        />
      </ScrollView>
    </Container>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

function FeatureCard({ title, description, icon, color, onPress }: FeatureCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Card onPress={onPress} style={styles.featureCard} variant="elevated">
      <Row>
        <Column style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Ionicons name={icon} size={24} color={color} />
        </Column>
        <Column style={styles.featureContent}>
          <Text variant="h4">{title}</Text>
          <Text variant="bodySmall">{description}</Text>
        </Column>
      </Row>
    </Card>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  header: {
    height: 220,
    width: '100%',
    backgroundColor: Colors.light.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  headerImage: {
    height: 220,
    width: '100%',
    position: 'absolute',
    opacity: 0.2,
  },
  headerContent: {
    padding: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  introCard: {
    marginTop: -spacing.lg,
    marginHorizontal: spacing.md,
    padding: spacing.md,
    ...shadows.light.md,
  },
  introText: {
    marginTop: spacing.sm,
  },
  featureCardsContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  featureCard: {
    padding: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borders.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  quoteCard: {
    marginHorizontal: spacing.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  quote: {
    fontStyle: 'italic',
    marginBottom: spacing.sm,
  },
  quoteAuthor: {
    opacity: 0.7,
  },
  getStartedButton: {
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
});
