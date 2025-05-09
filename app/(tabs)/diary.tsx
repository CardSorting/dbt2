import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, ColorValue } from 'react-native';
import { Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Define types for our data
interface Emotion {
  name: string;
  intensity: number;
}

interface Urge {
  name: string;
  intensity: number;
  acted: boolean;
}

interface DiaryEntry {
  date: string;
  emotions: Emotion[];
  urges: Urge[];
  skillsUsed: string[];
  notes: string;
}

// Mock data for demonstration
const mockEntries: DiaryEntry[] = [
  { 
    date: '2025-05-08', 
    emotions: [
      { name: 'Anxiety', intensity: 7 },
      { name: 'Sadness', intensity: 4 }
    ],
    urges: [
      { name: 'Self-harm', intensity: 3, acted: false }
    ],
    skillsUsed: ['Mindfulness', 'Distress Tolerance'],
    notes: 'Difficult day at work, but used skills to cope.'
  },
  { 
    date: '2025-05-07', 
    emotions: [
      { name: 'Joy', intensity: 6 },
      { name: 'Contentment', intensity: 5 }
    ],
    urges: [],
    skillsUsed: ['Mindfulness'],
    notes: 'Good day overall. Practiced mindfulness during my morning walk.'
  }
];

export default function DiaryScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState('today');

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'DBT Diary' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'today' && { 
                backgroundColor: colors.tint,
                borderColor: colors.tint
              }
            ]} 
            onPress={() => setActiveTab('today')}
          >
            <ThemedText 
              style={[
                styles.tabText, 
                activeTab === 'today' && { color: '#fff' }
              ]}
            >
              Today
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'history' && { 
                backgroundColor: colors.tint,
                borderColor: colors.tint
              }
            ]} 
            onPress={() => setActiveTab('history')}
          >
            <ThemedText 
              style={[
                styles.tabText, 
                activeTab === 'history' && { color: '#fff' }
              ]}
            >
              History
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {activeTab === 'today' ? (
          <ScrollView style={styles.scrollContainer}>
            <DiaryEntryForm colors={colors} />
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollContainer}>
            <DiaryHistory entries={mockEntries} colors={colors} />
          </ScrollView>
        )}
      </ThemedView>
    </>
  );
}

interface FormProps {
  colors: {
    tint: string;
    card: string;
    border: string;
    text: string;
    icon: string;
  };
}

function DiaryEntryForm({ colors }: FormProps) {
  const emotionOptions = ['Joy', 'Sadness', 'Anger', 'Fear', 'Shame', 'Love', 'Anxiety', 'Contentment'];
  const urgeOptions = ['Self-harm', 'Substance use', 'Binge eating', 'Isolation'];
  const skillOptions = ['Mindfulness', 'Distress Tolerance', 'Emotion Regulation', 'Interpersonal Effectiveness'];
  
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [selectedUrges, setSelectedUrges] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const toggleUrge = (urge: string) => {
    if (selectedUrges.includes(urge)) {
      setSelectedUrges(selectedUrges.filter(u => u !== urge));
    } else {
      setSelectedUrges([...selectedUrges, urge]);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <ThemedView style={styles.formContainer}>
      <ThemedText type="subtitle">How are you feeling today?</ThemedText>
      
      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="defaultSemiBold">Emotions</ThemedText>
        <ThemedView style={styles.chipsContainer}>
          {emotionOptions.map((emotion) => (
            <TouchableOpacity
              key={emotion}
              style={[
                styles.chip,
                selectedEmotions.includes(emotion) && { 
                  backgroundColor: colors.tint,
                  borderColor: colors.tint
                }
              ]}
              onPress={() => toggleEmotion(emotion)}
            >
              <ThemedText 
                style={[
                  styles.chipText,
                  selectedEmotions.includes(emotion) && { color: '#fff' }
                ]}
              >
                {emotion}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="defaultSemiBold">Urges</ThemedText>
        <ThemedView style={styles.chipsContainer}>
          {urgeOptions.map((urge) => (
            <TouchableOpacity
              key={urge}
              style={[
                styles.chip,
                selectedUrges.includes(urge) && { 
                  backgroundColor: colors.tint,
                  borderColor: colors.tint
                }
              ]}
              onPress={() => toggleUrge(urge)}
            >
              <ThemedText 
                style={[
                  styles.chipText,
                  selectedUrges.includes(urge) && { color: '#fff' }
                ]}
              >
                {urge}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="defaultSemiBold">Skills Used</ThemedText>
        <ThemedView style={styles.chipsContainer}>
          {skillOptions.map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.chip,
                selectedSkills.includes(skill) && { 
                  backgroundColor: colors.tint,
                  borderColor: colors.tint
                }
              ]}
              onPress={() => toggleSkill(skill)}
            >
              <ThemedText 
                style={[
                  styles.chipText,
                  selectedSkills.includes(skill) && { color: '#fff' }
                ]}
              >
                {skill}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.sectionContainer}>
        <ThemedText type="defaultSemiBold">Notes</ThemedText>
        <TextInput
          style={[
            styles.notesInput,
            { 
              backgroundColor: colors.card,
              borderColor: colors.border,
              color: colors.text
            }
          ]}
          value={notes}
          onChangeText={setNotes}
          placeholder="Add any additional notes here..."
          placeholderTextColor={colors.icon}
          multiline
        />
      </ThemedView>

      <TouchableOpacity 
        style={[styles.saveButton, { backgroundColor: colors.tint }]}
        onPress={() => {
          // In a real app, this would save the entry
          alert('Entry saved!');
        }}
      >
        <ThemedText style={{ color: '#fff', fontWeight: 'bold' }}>Save Entry</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

interface HistoryProps {
  entries: DiaryEntry[];
  colors: {
    card: string;
    border: string;
  };
}

function DiaryHistory({ entries, colors }: HistoryProps) {
  return (
    <ThemedView style={styles.historyContainer}>
      <ThemedText type="subtitle">Your Diary Entries</ThemedText>
      
      {entries.map((entry, index) => (
        <ThemedView 
          key={index} 
          style={[
            styles.entryCard, 
            { 
              backgroundColor: colors.card,
              borderColor: colors.border
            }
          ]}
        >
          <ThemedView style={styles.entryHeader}>
            <ThemedText type="defaultSemiBold">{formatDate(entry.date)}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.entrySection}>
            <ThemedText style={styles.sectionLabel}>Emotions:</ThemedText>
            <ThemedView style={styles.emotionsList}>
              {entry.emotions.map((emotion: Emotion, i: number) => (
                <ThemedText key={i}>
                  {emotion.name} ({emotion.intensity}/10)
                </ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
          
          {entry.urges.length > 0 && (
            <ThemedView style={styles.entrySection}>
              <ThemedText style={styles.sectionLabel}>Urges:</ThemedText>
              <ThemedView style={styles.emotionsList}>
                {entry.urges.map((urge: Urge, i: number) => (
                  <ThemedText key={i}>
                    {urge.name} ({urge.intensity}/10) {urge.acted ? '✓' : '✗'}
                  </ThemedText>
                ))}
              </ThemedView>
            </ThemedView>
          )}
          
          <ThemedView style={styles.entrySection}>
            <ThemedText style={styles.sectionLabel}>Skills Used:</ThemedText>
            <ThemedText>{entry.skillsUsed.join(', ')}</ThemedText>
          </ThemedView>
          
          <ThemedView style={styles.entrySection}>
            <ThemedText style={styles.sectionLabel}>Notes:</ThemedText>
            <ThemedText>{entry.notes}</ThemedText>
          </ThemedView>
        </ThemedView>
      ))}
    </ThemedView>
  );
}

// Helper function to format dates
function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabText: {
    fontWeight: '500',
  },
  scrollContainer: {
    flex: 1,
  },
  formContainer: {
    gap: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  chip: {
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  chipText: {
    fontSize: 14,
  },
  notesInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
    marginTop: 8,
  },
  saveButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  historyContainer: {
    gap: 16,
  },
  entryCard: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  entryHeader: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5EA',
    paddingBottom: 8,
  },
  entrySection: {
    marginBottom: 8,
  },
  sectionLabel: {
    fontWeight: '600',
    marginBottom: 4,
  },
  emotionsList: {
    marginLeft: 8,
  },
});
