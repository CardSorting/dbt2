import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SkillCollapsible } from '@/components/SkillCollapsible';

// Define types for our data
interface ExerciseStep {
  instruction: string;
  details?: string;
}

interface Exercise {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  steps: ExerciseStep[];
}

// Mock data for exercises
const exercises: Exercise[] = [
  {
    id: 'mindful-breathing',
    title: 'Mindful Breathing',
    description: 'A simple mindfulness exercise to help you focus on your breath and bring awareness to the present moment.',
    category: 'Mindfulness',
    duration: '5 minutes',
    difficulty: 'Beginner',
    steps: [
      {
        instruction: 'Find a comfortable position',
        details: 'Sit in a chair with your feet flat on the floor, or sit cross-legged on a cushion on the floor. Keep your back straight but not rigid.'
      },
      {
        instruction: 'Bring awareness to your breath',
        details: 'Close your eyes or lower your gaze. Notice the sensation of your breath as it enters and leaves your body. Don\'t try to control your breathing, just observe it.'
      },
      {
        instruction: 'Focus on the sensations',
        details: 'Pay attention to the rise and fall of your chest or the sensation of air passing through your nostrils. When your mind wanders, gently bring your attention back to your breath.'
      },
      {
        instruction: 'Continue for 5 minutes',
        details: 'Practice this focused attention on your breath. Remember, it\'s normal for your mind to wander. The practice is noticing when it wanders and bringing it back.'
      },
      {
        instruction: 'Gently return to awareness',
        details: 'When you\'re ready to end, slowly open your eyes and notice how you feel.'
      }
    ]
  },
  {
    id: 'wise-mind-meditation',
    title: 'Wise Mind Meditation',
    description: 'An exercise to help you access your "Wise Mind" - the balance between emotional mind and reasonable mind.',
    category: 'Mindfulness',
    duration: '10 minutes',
    difficulty: 'Intermediate',
    steps: [
      {
        instruction: 'Sit in a comfortable position',
        details: 'Find a quiet place where you won\'t be disturbed. Sit comfortably with your back straight.'
      },
      {
        instruction: 'Focus on your breath',
        details: 'Take a few deep breaths, then let your breathing return to its natural rhythm.'
      },
      {
        instruction: 'Bring attention to your center',
        details: 'Bring your attention to the center of your body, just below your navel. This is your "center of wisdom."'
      },
      {
        instruction: 'Notice your thoughts and feelings',
        details: 'Observe any thoughts or feelings that arise without judging them. Notice if you\'re in "emotional mind" or "reasonable mind."'
      },
      {
        instruction: 'Ask for wisdom',
        details: 'Silently ask your wise mind a question you\'ve been struggling with. Then listen for the answer that comes from your center, not from your head or your emotions.'
      },
      {
        instruction: 'Return to awareness',
        details: 'When you\'re ready, slowly return your attention to your surroundings.'
      }
    ]
  },
  {
    id: 'tipp-skills-practice',
    title: 'TIPP Skills for Crisis',
    description: 'Practice the TIPP skills to quickly change your body chemistry during emotional distress.',
    category: 'Distress Tolerance',
    duration: 'Varies',
    difficulty: 'Beginner',
    steps: [
      {
        instruction: 'Temperature change',
        details: 'Hold your breath and put your face in cold water, or place an ice pack on your eyes and cheeks. This triggers the diving reflex, which reduces emotional arousal.'
      },
      {
        instruction: 'Intense exercise',
        details: 'Engage in brief, intense exercise like running in place, jumping jacks, or push-ups for 30-60 seconds to burn off excess emotional energy.'
      },
      {
        instruction: 'Paced breathing',
        details: 'Breathe deeply, inhaling for 4 counts, holding for 2, and exhaling for 6. Focus on making your exhale longer than your inhale to activate your parasympathetic nervous system.'
      },
      {
        instruction: 'Progressive muscle relaxation',
        details: 'Tense and then relax each muscle group in your body, starting from your toes and working up to your head. Hold the tension for 5 seconds, then release and notice the difference.'
      }
    ]
  },
  {
    id: 'opposite-action',
    title: 'Opposite Action for Emotions',
    description: 'Practice acting opposite to the action urge of your emotion when the emotion doesn\'t fit the facts.',
    category: 'Emotion Regulation',
    duration: '15 minutes',
    difficulty: 'Advanced',
    steps: [
      {
        instruction: 'Identify your emotion',
        details: 'Name the emotion you\'re feeling. What triggered it? What are the physical sensations, thoughts, and action urges associated with it?'
      },
      {
        instruction: 'Check the facts',
        details: 'Is your emotion justified by the facts of the situation? Is its intensity appropriate? If not, opposite action may be helpful.'
      },
      {
        instruction: 'Identify the action urge',
        details: 'What does your emotion make you want to do? For example, fear makes you want to avoid, anger makes you want to attack, sadness makes you want to withdraw.'
      },
      {
        instruction: 'Do the opposite action',
        details: 'If your emotion doesn\'t fit the facts, do the opposite of your action urge. For fear, approach what you fear. For anger, be gentle and create space. For sadness, get active and engage.'
      },
      {
        instruction: 'Fully commit',
        details: 'Do the opposite action all the way, with your face, posture, tone of voice, and thoughts. Continue until your emotion changes.'
      }
    ]
  },
  {
    id: 'dear-man-practice',
    title: 'DEAR MAN Role Play',
    description: 'Practice the DEAR MAN interpersonal effectiveness skills through role play.',
    category: 'Interpersonal Effectiveness',
    duration: '20 minutes',
    difficulty: 'Intermediate',
    steps: [
      {
        instruction: 'Choose a situation',
        details: 'Think of a situation where you need to make a request or say no to someone. It could be a real situation or a hypothetical one.'
      },
      {
        instruction: 'Plan your DEAR MAN',
        details: 'Write down what you\'ll say for each component: Describe the situation, Express your feelings, Assert your request, Reinforce why it would be good for them to agree.'
      },
      {
        instruction: 'Practice mindfulness, appearing confident, and negotiation',
        details: 'Plan how you\'ll stay focused (Mindful), appear confident (body language, tone), and be willing to Negotiate if needed.'
      },
      {
        instruction: 'Role play',
        details: 'Practice your DEAR MAN script out loud. If possible, ask someone to play the other person, or imagine their responses and practice replying effectively.'
      },
      {
        instruction: 'Reflect',
        details: 'After the role play, reflect on what went well and what you could improve. How did it feel to use these skills?'
      }
    ]
  }
];

export default function ExercisesScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

  const categories = [...new Set(exercises.map(ex => ex.category))];

  const filteredExercises = selectedCategory 
    ? exercises.filter(ex => ex.category === selectedCategory)
    : exercises;

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Practice Exercises' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.categoryButtons}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              !selectedCategory && { 
                backgroundColor: colors.tint,
                borderColor: colors.tint
              }
            ]}
            onPress={() => setSelectedCategory(null)}
          >
            <ThemedText 
              style={[
                styles.categoryButtonText,
                !selectedCategory && { color: '#fff' }
              ]}
            >
              All
            </ThemedText>
          </TouchableOpacity>
          
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && { 
                  backgroundColor: colors.tint,
                  borderColor: colors.tint
                }
              ]}
              onPress={() => setSelectedCategory(selectedCategory === category ? null : category)}
            >
              <ThemedText 
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category && { color: '#fff' }
                ]}
              >
                {category}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>

        <ScrollView style={styles.scrollContainer}>
          {filteredExercises.map((exercise) => (
            <ExerciseCard 
              key={exercise.id}
              exercise={exercise}
              colors={colors}
              isExpanded={expandedExercise === exercise.id}
              onToggleExpand={() => {
                setExpandedExercise(expandedExercise === exercise.id ? null : exercise.id);
              }}
            />
          ))}
        </ScrollView>
      </ThemedView>
    </>
  );
}

interface ExerciseCardProps {
  exercise: Exercise;
  colors: any;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

function ExerciseCard({ exercise, colors, isExpanded, onToggleExpand }: ExerciseCardProps) {
  const difficultyColor = 
    exercise.difficulty === 'Beginner' ? colors.success :
    exercise.difficulty === 'Intermediate' ? colors.warning :
    colors.error;

  return (
    <ThemedView style={[styles.exerciseCard, { backgroundColor: colors.card }]}>
      <TouchableOpacity 
        style={styles.exerciseHeader}
        onPress={onToggleExpand}
      >
        <ThemedView style={{ flex: 1 }}>
          <ThemedText type="subtitle">{exercise.title}</ThemedText>
          <ThemedView style={styles.exerciseMeta}>
            <ThemedText style={styles.categoryLabel}>{exercise.category}</ThemedText>
            <ThemedText style={styles.durationLabel}>{exercise.duration}</ThemedText>
            <ThemedText style={[styles.difficultyLabel, { color: difficultyColor }]}>
              {exercise.difficulty}
            </ThemedText>
          </ThemedView>
        </ThemedView>
        <Ionicons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={colors.icon} 
        />
      </TouchableOpacity>

      <SkillCollapsible collapsed={!isExpanded}>
        <ThemedView style={styles.exerciseContent}>
          <ThemedText style={styles.exerciseDescription}>{exercise.description}</ThemedText>
          
          <ThemedText style={styles.stepsHeading}>Steps:</ThemedText>
          {exercise.steps.map((step, index) => (
            <ThemedView key={index} style={styles.stepContainer}>
              <ThemedView style={styles.stepNumberContainer}>
                <ThemedText style={styles.stepNumber}>{index + 1}</ThemedText>
              </ThemedView>
              <ThemedView style={styles.stepContent}>
                <ThemedText style={styles.stepInstruction}>{step.instruction}</ThemedText>
                {step.details && (
                  <ThemedText style={styles.stepDetails}>{step.details}</ThemedText>
                )}
              </ThemedView>
            </ThemedView>
          ))}

          <TouchableOpacity 
            style={[styles.startButton, { backgroundColor: colors.tint }]}
            onPress={() => {
              // In a real app, this would start a guided exercise
              alert('Starting exercise: ' + exercise.title);
            }}
          >
            <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>Start Exercise</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </SkillCollapsible>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  categoryButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  exerciseCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  exerciseMeta: {
    flexDirection: 'row',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  categoryLabel: {
    fontSize: 12,
    marginRight: 12,
    opacity: 0.7,
  },
  durationLabel: {
    fontSize: 12,
    marginRight: 12,
    opacity: 0.7,
  },
  difficultyLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  exerciseContent: {
    padding: 16,
    paddingTop: 0,
  },
  exerciseDescription: {
    marginBottom: 16,
  },
  stepsHeading: {
    fontWeight: '600',
    marginBottom: 12,
    fontSize: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  stepNumberContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#E1E5EA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  stepNumber: {
    fontWeight: '600',
    fontSize: 14,
  },
  stepContent: {
    flex: 1,
  },
  stepInstruction: {
    fontWeight: '600',
    marginBottom: 4,
  },
  stepDetails: {
    fontSize: 14,
    opacity: 0.8,
  },
  startButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
});
