import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SkillCollapsible } from '@/components/SkillCollapsible';

// Define types for our data
interface Skill {
  id: string;
  name: string;
  description: string;
  examples: string[];
  steps?: string[];
}

interface SkillModule {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

// Mock data for DBT skills
const dbtModules: SkillModule[] = [
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    description: 'The foundation of all DBT skills. Mindfulness helps you observe, describe, and participate in the present moment without judgment.',
    skills: [
      {
        id: 'what-skills',
        name: 'What Skills',
        description: 'These skills help you observe, describe, and participate in your experiences.',
        examples: [
          'Observe: Just notice without reacting',
          'Describe: Put words on experience',
          'Participate: Enter wholly into the activity'
        ]
      },
      {
        id: 'how-skills',
        name: 'How Skills',
        description: 'These skills help you practice mindfulness in a particular way.',
        examples: [
          'Non-judgmentally: See but don\'t evaluate',
          'One-mindfully: Do one thing at a time',
          'Effectively: Focus on what works'
        ]
      },
      {
        id: 'wise-mind',
        name: 'Wise Mind',
        description: 'The integration of emotional mind and reasonable mind.',
        examples: [
          'Balance between emotion and logic',
          'Intuitive knowing',
          'Seeing the bigger picture'
        ],
        steps: [
          'Notice when you\'re in emotion mind or reasonable mind',
          'Take a step back from the situation',
          'Listen to your inner wisdom',
          'Ask "What would Wise Mind do?"'
        ]
      }
    ]
  },
  {
    id: 'distress-tolerance',
    name: 'Distress Tolerance',
    description: 'Skills to help you cope with painful events, urges, and emotions when you cannot make things better right away.',
    skills: [
      {
        id: 'tipp',
        name: 'TIPP Skills',
        description: 'Quick skills to change your body chemistry when emotions are high.',
        examples: [
          'Temperature: Cold water on face',
          'Intense exercise: Brief burst of energy',
          'Paced breathing: Slow your breath',
          'Progressive muscle relaxation: Tense and relax'
        ],
        steps: [
          'Temperature: Hold your breath and put your face in cold water, or place ice pack on eyes and cheeks',
          'Intense exercise: Run up and down stairs, do jumping jacks, or push-ups',
          'Paced breathing: Breathe in for 4 counts, hold for 2, out for 6',
          'Progressive relaxation: Tense each muscle group for 5-10 seconds, then relax'
        ]
      },
      {
        id: 'accepts',
        name: 'ACCEPTS',
        description: 'Skills to distract yourself from emotional pain.',
        examples: [
          'Activities: Engage in hobbies',
          'Contributing: Help others',
          'Comparisons: Compare to worse times',
          'Emotions: Generate different emotions',
          'Pushing away: Temporarily leave the situation mentally',
          'Thoughts: Redirect your thinking',
          'Sensations: Intense sensory experiences'
        ]
      },
      {
        id: 'self-soothe',
        name: 'Self-Soothe',
        description: 'Using your five senses to comfort yourself.',
        examples: [
          'Vision: Look at beautiful art or nature',
          'Hearing: Listen to soothing music',
          'Smell: Use pleasant scents or candles',
          'Taste: Enjoy a small treat mindfully',
          'Touch: Take a warm bath or wrap in a soft blanket'
        ]
      },
      {
        id: 'improve',
        name: 'IMPROVE the Moment',
        description: 'Skills to help you cope with difficult situations that you cannot change right now.',
        examples: [
          'Imagery: Visualize a peaceful place',
          'Meaning: Find purpose in pain',
          'Prayer: Connect with higher power',
          'Relaxation: Deep breathing, progressive muscle relaxation',
          'One thing in the moment: Focus on just this moment',
          'Vacation: Brief mental break',
          'Encouragement: Cheerlead yourself'
        ]
      }
    ]
  },
  {
    id: 'emotion-regulation',
    name: 'Emotion Regulation',
    description: 'Skills to help you understand, name, and change your emotions.',
    skills: [
      {
        id: 'check-facts',
        name: 'Check the Facts',
        description: 'Examine if your emotional response fits the facts of the situation.',
        examples: [
          'Identify the emotion you\'re feeling',
          'Describe the event prompting the emotion',
          'Consider interpretations and assumptions',
          'Consider the threat level',
          'Consider your ability to cope with the threat'
        ],
        steps: [
          'Ask: What emotion am I feeling?',
          'Ask: What event triggered this emotion?',
          'Ask: What are my interpretations of this event?',
          'Ask: Am I assuming a threat that isn\'t there?',
          'Ask: What\'s the probability of the worst happening?',
          'Ask: Could I cope if the worst did happen?',
          'Ask: Does my emotion and its intensity fit the actual facts?'
        ]
      },
      {
        id: 'opposite-action',
        name: 'Opposite Action',
        description: 'Acting opposite to the action urge of your current emotion when the emotion doesn\'t fit the facts.',
        examples: [
          'Fear → Approach what you fear',
          'Anger → Be gentle and avoid the person',
          'Sadness → Get active and engage',
          'Shame → Share your experience with others'
        ]
      },
      {
        id: 'please',
        name: 'PLEASE Skills',
        description: 'Taking care of your physical health to reduce emotional vulnerability.',
        examples: [
          'PL - Treat Physical iLlness',
          'E - Balanced Eating',
          'A - Avoid mood-altering drugs',
          'S - Balanced Sleep',
          'E - Exercise'
        ]
      }
    ]
  },
  {
    id: 'interpersonal-effectiveness',
    name: 'Interpersonal Effectiveness',
    description: 'Skills to help you ask for what you need, set boundaries, and cope with interpersonal conflict.',
    skills: [
      {
        id: 'dear-man',
        name: 'DEAR MAN',
        description: 'Skills for achieving objectives with others.',
        examples: [
          'Describe the situation',
          'Express feelings and opinions',
          'Assert wishes',
          'Reinforce (explain positive effects)',
          'Mindful (stay focused)',
          'Appear confident',
          'Negotiate alternatives'
        ],
        steps: [
          'Describe: Just the facts, no judgments',
          'Express: Use "I feel" statements',
          'Assert: Clearly ask for what you want',
          'Reinforce: Explain benefits of your request',
          'Mindful: Stay on topic, ignore distractions',
          'Appear confident: Make eye contact, firm voice',
          'Negotiate: Be open to alternatives'
        ]
      },
      {
        id: 'give',
        name: 'GIVE',
        description: 'Skills for maintaining relationships.',
        examples: [
          'Gentle: Be courteous and respectful',
          'Interested: Listen and show interest',
          'Validate: Acknowledge the other person\'s feelings',
          'Easy manner: Use humor and be lighthearted'
        ]
      },
      {
        id: 'fast',
        name: 'FAST',
        description: 'Skills for maintaining self-respect.',
        examples: [
          'Fair: Be fair to yourself and others',
          'Apologies (few): Don\'t apologize more than needed',
          'Stick to values: Don\'t compromise your values',
          'Truthful: Avoid lies, exaggerations, and excuses'
        ]
      }
    ]
  }
];

export default function SkillsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'DBT Skills Library' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.moduleButtons}>
          {dbtModules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={[
                styles.moduleButton,
                selectedModule === module.id && { 
                  backgroundColor: colors.tint,
                  borderColor: colors.tint
                },
                !selectedModule && { 
                  backgroundColor: module.id === 'mindfulness' ? colors.emotions.joy :
                                   module.id === 'distress-tolerance' ? colors.emotions.sadness :
                                   module.id === 'emotion-regulation' ? colors.emotions.anger :
                                   colors.emotions.love,
                  borderColor: 'transparent',
                  opacity: 0.8
                }
              ]}
              onPress={() => setSelectedModule(selectedModule === module.id ? null : module.id)}
            >
              <ThemedText 
                style={[
                  styles.moduleButtonText,
                  (selectedModule === module.id || !selectedModule) && { color: '#fff' }
                ]}
              >
                {module.name}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>

        <ScrollView style={styles.scrollContainer}>
          {!selectedModule ? (
            // Show all modules
            dbtModules.map((module) => (
              <ModuleSection 
                key={module.id} 
                module={module} 
                colors={colors} 
              />
            ))
          ) : (
            // Show selected module
            <ModuleSection 
              module={dbtModules.find(m => m.id === selectedModule)!} 
              colors={colors} 
              expanded
            />
          )}
        </ScrollView>
      </ThemedView>
    </>
  );
}

interface ModuleSectionProps {
  module: SkillModule;
  colors: any;
  expanded?: boolean;
}

function ModuleSection({ module, colors, expanded = false }: ModuleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const moduleColor = 
    module.id === 'mindfulness' ? colors.emotions.joy :
    module.id === 'distress-tolerance' ? colors.emotions.sadness :
    module.id === 'emotion-regulation' ? colors.emotions.anger :
    colors.emotions.love;

  return (
    <ThemedView style={styles.moduleSection}>
      <TouchableOpacity 
        style={[styles.moduleTitleContainer, { borderLeftColor: moduleColor, borderLeftWidth: 4 }]}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <ThemedView style={{ flex: 1 }}>
          <ThemedText type="subtitle">{module.name}</ThemedText>
          <ThemedText style={styles.moduleDescription}>{module.description}</ThemedText>
        </ThemedView>
        <Ionicons 
          name={isExpanded ? 'chevron-up' : 'chevron-down'} 
          size={24} 
          color={colors.icon} 
        />
      </TouchableOpacity>

      {isExpanded && (
        <ThemedView style={styles.skillsList}>
          {module.skills.map((skill) => (
            <SkillItem key={skill.id} skill={skill} colors={colors} moduleColor={moduleColor} />
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

interface SkillItemProps {
  skill: Skill;
  colors: any;
  moduleColor: string;
}

function SkillItem({ skill, colors, moduleColor }: SkillItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ThemedView style={[styles.skillItem, { backgroundColor: colors.card }]}>
      <TouchableOpacity 
        style={styles.skillHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <ThemedText type="defaultSemiBold">{skill.name}</ThemedText>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={colors.icon} 
        />
      </TouchableOpacity>

      <SkillCollapsible collapsed={!expanded}>
        <ThemedView style={styles.skillContent}>
          <ThemedText style={styles.skillDescription}>{skill.description}</ThemedText>
          
          {skill.examples.length > 0 && (
            <ThemedView style={styles.examplesContainer}>
              <ThemedText style={styles.sectionLabel}>Examples:</ThemedText>
              {skill.examples.map((example, index) => (
                <ThemedView key={index} style={styles.exampleItem}>
                  <ThemedView style={[styles.bullet, { backgroundColor: moduleColor }]} />
                  <ThemedText style={styles.exampleText}>{example}</ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          )}

          {skill.steps && skill.steps.length > 0 && (
            <ThemedView style={styles.stepsContainer}>
              <ThemedText style={styles.sectionLabel}>How to Practice:</ThemedText>
              {skill.steps.map((step, index) => (
                <ThemedView key={index} style={styles.stepItem}>
                  <ThemedText style={styles.stepNumber}>{index + 1}.</ThemedText>
                  <ThemedText style={styles.stepText}>{step}</ThemedText>
                </ThemedView>
              ))}
            </ThemedView>
          )}
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
  moduleButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  moduleButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  moduleButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  moduleSection: {
    marginBottom: 24,
    borderRadius: 8,
    overflow: 'hidden',
  },
  moduleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  moduleDescription: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.8,
  },
  skillsList: {
    marginTop: 12,
    gap: 12,
  },
  skillItem: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  skillContent: {
    padding: 16,
    paddingTop: 0,
  },
  skillDescription: {
    marginBottom: 12,
  },
  examplesContainer: {
    marginBottom: 16,
  },
  stepsContainer: {
    marginTop: 8,
  },
  sectionLabel: {
    fontWeight: '600',
    marginBottom: 8,
  },
  exampleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    marginRight: 8,
  },
  exampleText: {
    flex: 1,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  stepNumber: {
    fontWeight: '600',
    marginRight: 8,
    width: 20,
  },
  stepText: {
    flex: 1,
  },
});
