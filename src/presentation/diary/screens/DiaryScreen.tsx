import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, TextInput, View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';

import { Text } from '@/components/ui/Text';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Container, Column, Row } from '@/components/ui/Container';
import { Header } from '@/components/ui/Header';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { borders, shadows, spacing } from '@/constants/DesignTokens';
import { useDiaryViewModel } from '../hooks/useDiaryViewModel';
import { DiaryEntryDto } from '@/src/application/diary/dto/DiaryEntryDto';

/**
 * DiaryScreen component
 * Screen for viewing and creating diary entries
 */
const DiaryScreen = observer(() => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState('today');
  const viewModel = useDiaryViewModel();
  
  useEffect(() => {
    viewModel.loadEntries();
  }, []);
  
  return (
    <Container>
      <Stack.Screen options={{ headerShown: false }} />
      <Header 
        title="DBT Diary" 
        rightAction={{
          icon: 'calendar',
          onPress: () => {},
          accessibilityLabel: 'View Calendar'
        }}
      />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'today' && { 
              backgroundColor: colors.emotions.sadness + '20',
              borderColor: colors.emotions.sadness
            }
          ]} 
          onPress={() => setActiveTab('today')}
        >
          <Text 
            variant={activeTab === 'today' ? 'bodyBold' : 'body'}
            color={activeTab === 'today' ? colors.emotions.sadness : colors.text}
          >
            Today's Entry
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.tab, 
            activeTab === 'history' && { 
              backgroundColor: colors.emotions.sadness + '20',
              borderColor: colors.emotions.sadness
            }
          ]} 
          onPress={() => setActiveTab('history')}
        >
          <Text 
            variant={activeTab === 'history' ? 'bodyBold' : 'body'}
            color={activeTab === 'history' ? colors.emotions.sadness : colors.text}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      {viewModel.isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      )}

      {viewModel.error && (
        <View style={styles.errorContainer}>
          <Text color={colors.error}>{viewModel.error}</Text>
        </View>
      )}

      {!viewModel.isLoading && !viewModel.error && (
        activeTab === 'today' ? (
          <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
            <DiaryEntryForm 
              colors={colors} 
              onSave={(emotions, urges, skills, notes) => 
                viewModel.saveDiaryEntry(emotions, urges, skills, notes)
              }
              isLoading={viewModel.isLoading}
            />
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
            <DiaryHistory 
              entries={viewModel.diaryEntries} 
              colors={colors} 
            />
          </ScrollView>
        )
      )}
    </Container>
  );
});

interface FormProps {
  colors: any;
  onSave: (
    emotions: { name: string, intensity: number }[],
    urges: { name: string, intensity: number, acted: boolean }[],
    skillsUsed: string[],
    notes: string
  ) => void;
  isLoading: boolean;
}

function DiaryEntryForm({ colors, onSave, isLoading }: FormProps) {
  const emotionOptions = ['Joy', 'Sadness', 'Anger', 'Fear', 'Shame', 'Love', 'Anxiety', 'Contentment'];
  const urgeOptions = ['Self-harm', 'Substance use', 'Binge eating', 'Isolation'];
  const skillOptions = ['Mindfulness', 'Distress Tolerance', 'Emotion Regulation', 'Interpersonal Effectiveness'];
  
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [emotionIntensities, setEmotionIntensities] = useState<Record<string, number>>({});
  const [selectedUrges, setSelectedUrges] = useState<string[]>([]);
  const [urgeIntensities, setUrgeIntensities] = useState<Record<string, number>>({});
  const [urgeActed, setUrgeActed] = useState<Record<string, boolean>>({});
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const toggleEmotion = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
      if (!emotionIntensities[emotion]) {
        setEmotionIntensities({...emotionIntensities, [emotion]: 5});
      }
    }
  };

  const toggleUrge = (urge: string) => {
    if (selectedUrges.includes(urge)) {
      setSelectedUrges(selectedUrges.filter(u => u !== urge));
    } else {
      setSelectedUrges([...selectedUrges, urge]);
      if (!urgeIntensities[urge]) {
        setUrgeIntensities({...urgeIntensities, [urge]: 5});
        setUrgeActed({...urgeActed, [urge]: false});
      }
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch(emotion.toLowerCase()) {
      case 'joy': return colors.emotions.joy;
      case 'sadness': return colors.emotions.sadness;
      case 'anger': return colors.emotions.anger;
      case 'fear': return colors.emotions.fear;
      case 'shame': return colors.emotions.shame;
      case 'love': return colors.emotions.love;
      default: return colors.tint;
    }
  };

  const handleSave = () => {
    const emotions = selectedEmotions.map(name => ({
      name,
      intensity: emotionIntensities[name] || 5
    }));
    
    const urges = selectedUrges.map(name => ({
      name,
      intensity: urgeIntensities[name] || 5,
      acted: urgeActed[name] || false
    }));
    
    onSave(emotions, urges, selectedSkills, notes);
  };

  return (
    <Column style={styles.formContainer}>
      <Card style={styles.formCard}>
        <Text variant="h3" style={styles.formTitle}>How are you feeling today?</Text>
        
        <Column style={styles.sectionContainer}>
          <Text variant="bodyBold">Emotions</Text>
          <View style={styles.chipsContainer}>
            {emotionOptions.map((emotion) => {
              const isSelected = selectedEmotions.includes(emotion);
              const emotionColor = getEmotionColor(emotion);
              return (
                <TouchableOpacity
                  key={emotion}
                  style={[
                    styles.chip,
                    { borderColor: emotionColor },
                    isSelected && { backgroundColor: emotionColor + '30' }
                  ]}
                  onPress={() => toggleEmotion(emotion)}
                >
                  <Text 
                    variant="bodySmall"
                    color={emotionColor}
                    style={isSelected && styles.selectedChipText}
                  >
                    {emotion}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Column>

        <Column style={styles.sectionContainer}>
          <Text variant="bodyBold">Urges</Text>
          <View style={styles.chipsContainer}>
            {urgeOptions.map((urge) => {
              const isSelected = selectedUrges.includes(urge);
              return (
                <TouchableOpacity
                  key={urge}
                  style={[
                    styles.chip,
                    { borderColor: colors.error },
                    isSelected && { backgroundColor: colors.error + '30' }
                  ]}
                  onPress={() => toggleUrge(urge)}
                >
                  <Text 
                    variant="bodySmall"
                    color={colors.error}
                    style={isSelected && styles.selectedChipText}
                  >
                    {urge}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Column>

        <Column style={styles.sectionContainer}>
          <Text variant="bodyBold">Skills Used</Text>
          <View style={styles.chipsContainer}>
            {skillOptions.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <TouchableOpacity
                  key={skill}
                  style={[
                    styles.chip,
                    { borderColor: colors.tint },
                    isSelected && { backgroundColor: colors.tint + '30' }
                  ]}
                  onPress={() => toggleSkill(skill)}
                >
                  <Text 
                    variant="bodySmall"
                    color={colors.tint}
                    style={isSelected && styles.selectedChipText}
                  >
                    {skill}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Column>

        <Column style={styles.sectionContainer}>
          <Text variant="bodyBold">Notes</Text>
          <TextInput
            style={[
              styles.notesInput,
              { 
                backgroundColor: colors.surface.secondary,
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
        </Column>

        <Button 
          title="Save Entry"
          onPress={handleSave}
          iconRight="save-outline"
          style={styles.saveButton}
          loading={isLoading}
        />
      </Card>
    </Column>
  );
}

interface HistoryProps {
  entries: DiaryEntryDto[];
  colors: any;
}

function DiaryHistory({ entries, colors }: HistoryProps) {
  return (
    <Column style={styles.historyContainer}>
      <Text variant="h3" style={styles.historyTitle}>Your Diary Entries</Text>
      
      {entries.length === 0 ? (
        <Card style={styles.emptyStateCard}>
          <Text style={styles.emptyStateText}>No diary entries yet. Start tracking your emotions and skills by creating a new entry.</Text>
        </Card>
      ) : (
        entries.map((entry, index) => (
          <Card 
            key={index} 
            style={styles.entryCard}
            variant="elevated"
          >
            <Column style={styles.entryHeader}>
              <Text variant="h4">{formatDate(entry.date)}</Text>
            </Column>
            
            <Column style={styles.entrySection}>
              <Text variant="bodyBold" style={styles.sectionLabel}>Emotions:</Text>
              <Column style={styles.emotionsList}>
                {entry.emotions.map((emotion, i) => (
                  <Row key={i} style={styles.emotionItem}>
                    <View 
                      style={[
                        styles.emotionDot, 
                        { backgroundColor: getEmotionColor(emotion.name, colors) }
                      ]} 
                    />
                    <Text>
                      {emotion.name} ({emotion.intensity}/10)
                    </Text>
                  </Row>
                ))}
              </Column>
            </Column>
            
            {entry.urges.length > 0 && (
              <Column style={styles.entrySection}>
                <Text variant="bodyBold" style={styles.sectionLabel}>Urges:</Text>
                <Column style={styles.emotionsList}>
                  {entry.urges.map((urge, i) => (
                    <Row key={i} style={styles.emotionItem}>
                      <View style={[styles.emotionDot, { backgroundColor: colors.error }]} />
                      <Text>
                        {urge.name} ({urge.intensity}/10) {urge.acted ? '✓' : '✗'}
                      </Text>
                    </Row>
                  ))}
                </Column>
              </Column>
            )}
            
            <Column style={styles.entrySection}>
              <Text variant="bodyBold" style={styles.sectionLabel}>Skills Used:</Text>
              <Text>{entry.skillsUsed.join(', ')}</Text>
            </Column>
            
            <Column style={styles.entrySection}>
              <Text variant="bodyBold" style={styles.sectionLabel}>Notes:</Text>
              <Text>{entry.notes}</Text>
            </Column>
          </Card>
        ))
      )}
    </Column>
  );
}

// Helper function to get emotion color
function getEmotionColor(emotion: string, colors: any): string {
  switch(emotion.toLowerCase()) {
    case 'joy': return colors.emotions.joy;
    case 'sadness': return colors.emotions.sadness;
    case 'anger': return colors.emotions.anger;
    case 'fear': return colors.emotions.fear;
    case 'shame': return colors.emotions.shame;
    case 'love': return colors.emotions.love;
    case 'anxiety': return colors.emotions.fear;
    case 'contentment': return colors.emotions.joy;
    default: return colors.tint;
  }
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
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    borderRadius: borders.radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  formContainer: {
    padding: spacing.md,
  },
  formCard: {
    padding: spacing.md,
  },
  formTitle: {
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: spacing.md,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  chip: {
    borderWidth: 1,
    borderRadius: borders.radius.circle,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    margin: 4,
  },
  selectedChipText: {
    fontWeight: '600',
  },
  notesInput: {
    borderWidth: 1,
    borderRadius: borders.radius.md,
    padding: spacing.sm,
    height: 100,
    textAlignVertical: 'top',
    marginTop: spacing.xs,
  },
  saveButton: {
    marginTop: spacing.md,
  },
  historyContainer: {
    padding: spacing.md,
    gap: spacing.md,
  },
  historyTitle: {
    marginBottom: spacing.sm,
  },
  entryCard: {
    marginBottom: spacing.md,
  },
  entryHeader: {
    marginBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
    paddingBottom: spacing.xs,
  },
  entrySection: {
    marginBottom: spacing.sm,
  },
  sectionLabel: {
    marginBottom: spacing.xs,
  },
  emotionsList: {
    marginLeft: spacing.xs,
  },
  emotionItem: {
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  emotionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    padding: spacing.md,
    alignItems: 'center',
  },
  emptyStateCard: {
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default DiaryScreen;
