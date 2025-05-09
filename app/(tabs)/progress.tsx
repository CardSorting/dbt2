import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Mock data for progress tracking
interface EmotionData {
  date: string;
  emotions: {
    [key: string]: number;
  };
}

interface SkillUsageData {
  date: string;
  skills: {
    [key: string]: number;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: string;
}

// Mock emotion tracking data (last 7 days)
const emotionData: EmotionData[] = [
  {
    date: '2025-05-02',
    emotions: { 'Joy': 4, 'Sadness': 6, 'Anger': 5, 'Fear': 7, 'Shame': 4 }
  },
  {
    date: '2025-05-03',
    emotions: { 'Joy': 5, 'Sadness': 5, 'Anger': 4, 'Fear': 6, 'Shame': 3 }
  },
  {
    date: '2025-05-04',
    emotions: { 'Joy': 6, 'Sadness': 4, 'Anger': 3, 'Fear': 5, 'Shame': 3 }
  },
  {
    date: '2025-05-05',
    emotions: { 'Joy': 7, 'Sadness': 3, 'Anger': 2, 'Fear': 4, 'Shame': 2 }
  },
  {
    date: '2025-05-06',
    emotions: { 'Joy': 6, 'Sadness': 4, 'Anger': 3, 'Fear': 3, 'Shame': 2 }
  },
  {
    date: '2025-05-07',
    emotions: { 'Joy': 7, 'Sadness': 3, 'Anger': 2, 'Fear': 3, 'Shame': 1 }
  },
  {
    date: '2025-05-08',
    emotions: { 'Joy': 8, 'Sadness': 2, 'Anger': 1, 'Fear': 2, 'Shame': 1 }
  }
];

// Mock skill usage data
const skillUsageData: SkillUsageData[] = [
  {
    date: '2025-05-02',
    skills: { 'Mindfulness': 2, 'Distress Tolerance': 3, 'Emotion Regulation': 1, 'Interpersonal Effectiveness': 0 }
  },
  {
    date: '2025-05-03',
    skills: { 'Mindfulness': 3, 'Distress Tolerance': 2, 'Emotion Regulation': 1, 'Interpersonal Effectiveness': 1 }
  },
  {
    date: '2025-05-04',
    skills: { 'Mindfulness': 3, 'Distress Tolerance': 1, 'Emotion Regulation': 2, 'Interpersonal Effectiveness': 1 }
  },
  {
    date: '2025-05-05',
    skills: { 'Mindfulness': 4, 'Distress Tolerance': 1, 'Emotion Regulation': 2, 'Interpersonal Effectiveness': 2 }
  },
  {
    date: '2025-05-06',
    skills: { 'Mindfulness': 3, 'Distress Tolerance': 0, 'Emotion Regulation': 3, 'Interpersonal Effectiveness': 1 }
  },
  {
    date: '2025-05-07',
    skills: { 'Mindfulness': 4, 'Distress Tolerance': 1, 'Emotion Regulation': 2, 'Interpersonal Effectiveness': 2 }
  },
  {
    date: '2025-05-08',
    skills: { 'Mindfulness': 5, 'Distress Tolerance': 0, 'Emotion Regulation': 3, 'Interpersonal Effectiveness': 2 }
  }
];

// Mock achievements
const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Completed your first diary entry',
    date: '2025-05-02',
    icon: 'footsteps'
  },
  {
    id: '2',
    title: 'Mindfulness Master',
    description: 'Used mindfulness skills 10 times',
    date: '2025-05-05',
    icon: 'leaf'
  },
  {
    id: '3',
    title: 'Emotion Navigator',
    description: 'Tracked your emotions for 7 consecutive days',
    date: '2025-05-08',
    icon: 'heart'
  },
  {
    id: '4',
    title: 'Skill Explorer',
    description: 'Tried at least one skill from each DBT module',
    date: '2025-05-06',
    icon: 'compass'
  }
];

export default function ProgressScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [activeTab, setActiveTab] = useState('emotions');

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Your Progress' }} />
      <ThemedView style={styles.container}>
        <ThemedView style={styles.tabContainer}>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'emotions' && { 
                backgroundColor: colors.tint,
                borderColor: colors.tint
              }
            ]} 
            onPress={() => setActiveTab('emotions')}
          >
            <ThemedText 
              style={[
                styles.tabText, 
                activeTab === 'emotions' && { color: '#fff' }
              ]}
            >
              Emotions
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'skills' && { 
                backgroundColor: colors.tint,
                borderColor: colors.tint
              }
            ]} 
            onPress={() => setActiveTab('skills')}
          >
            <ThemedText 
              style={[
                styles.tabText, 
                activeTab === 'skills' && { color: '#fff' }
              ]}
            >
              Skills
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.tab, 
              activeTab === 'achievements' && { 
                backgroundColor: colors.tint,
                borderColor: colors.tint
              }
            ]} 
            onPress={() => setActiveTab('achievements')}
          >
            <ThemedText 
              style={[
                styles.tabText, 
                activeTab === 'achievements' && { color: '#fff' }
              ]}
            >
              Achievements
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ScrollView style={styles.scrollContainer}>
          {activeTab === 'emotions' && <EmotionsTracker data={emotionData} colors={colors} />}
          {activeTab === 'skills' && <SkillsTracker data={skillUsageData} colors={colors} />}
          {activeTab === 'achievements' && <AchievementsTracker data={achievements} colors={colors} />}
        </ScrollView>
      </ThemedView>
    </>
  );
}

interface EmotionsTrackerProps {
  data: EmotionData[];
  colors: any;
}

function EmotionsTracker({ data, colors }: EmotionsTrackerProps) {
  // Get all unique emotion names
  const allEmotions = new Set<string>();
  data.forEach(day => {
    Object.keys(day.emotions).forEach(emotion => {
      allEmotions.add(emotion);
    });
  });
  const emotionNames = Array.from(allEmotions);

  // Format dates for display
  const formattedDates = data.map(day => {
    const date = new Date(day.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  return (
    <ThemedView style={styles.chartContainer}>
      <ThemedText type="subtitle">Emotion Intensity Over Time</ThemedText>
      <ThemedText style={styles.chartDescription}>
        This chart shows how the intensity of your emotions has changed over the past week.
        Lower numbers for difficult emotions and higher numbers for positive emotions indicate progress.
      </ThemedText>

      <ThemedView style={styles.chartContent}>
        <ThemedView style={styles.yAxis}>
          {[10, 8, 6, 4, 2, 0].map(value => (
            <ThemedText key={value} style={styles.axisLabel}>{value}</ThemedText>
          ))}
        </ThemedView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll}>
          <ThemedView style={styles.chart}>
            {emotionNames.map(emotion => (
              <ThemedView key={emotion} style={styles.emotionLine}>
                <ThemedView style={styles.legendItem}>
                  <ThemedView 
                    style={[
                      styles.legendColor, 
                      { 
                        backgroundColor: 
                          emotion === 'Joy' ? colors.emotions.joy :
                          emotion === 'Sadness' ? colors.emotions.sadness :
                          emotion === 'Anger' ? colors.emotions.anger :
                          emotion === 'Fear' ? colors.emotions.fear :
                          emotion === 'Shame' ? colors.emotions.shame :
                          colors.emotions.love
                      }
                    ]} 
                  />
                  <ThemedText style={styles.legendText}>{emotion}</ThemedText>
                </ThemedView>

                <ThemedView style={styles.lineChart}>
                  {data.map((day, index) => {
                    const value = day.emotions[emotion] || 0;
                    // Convert percentage to actual height value
                    const heightValue = (value * 10);
                    return (
                      <ThemedView key={index} style={styles.barContainer}>
                        <ThemedView 
                          style={[
                            styles.bar, 
                            { 
                              height: heightValue, 
                              backgroundColor: 
                                emotion === 'Joy' ? colors.emotions.joy :
                                emotion === 'Sadness' ? colors.emotions.sadness :
                                emotion === 'Anger' ? colors.emotions.anger :
                                emotion === 'Fear' ? colors.emotions.fear :
                                emotion === 'Shame' ? colors.emotions.shame :
                                colors.emotions.love
                            }
                          ]} 
                        />
                      </ThemedView>
                    );
                  })}
                </ThemedView>
              </ThemedView>
            ))}

            <ThemedView style={styles.xAxis}>
              {formattedDates.map((date, index) => (
                <ThemedText key={index} style={styles.dateLabel}>{date}</ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.insightsContainer}>
        <ThemedText type="defaultSemiBold">Insights:</ThemedText>
        <ThemedView style={styles.insightItem}>
          <Ionicons name="trending-down" size={20} color={colors.success} />
          <ThemedText style={styles.insightText}>
            Your difficult emotions (sadness, anger, fear, shame) have decreased over time.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.insightItem}>
          <Ionicons name="trending-up" size={20} color={colors.success} />
          <ThemedText style={styles.insightText}>
            Your joy has increased from 4/10 to 8/10 over the past week.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

interface SkillsTrackerProps {
  data: SkillUsageData[];
  colors: any;
}

function SkillsTracker({ data, colors }: SkillsTrackerProps) {
  // Get all unique skill names
  const allSkills = new Set<string>();
  data.forEach(day => {
    Object.keys(day.skills).forEach(skill => {
      allSkills.add(skill);
    });
  });
  const skillNames = Array.from(allSkills);

  // Format dates for display
  const formattedDates = data.map(day => {
    const date = new Date(day.date);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  // Calculate total skills used
  const totalSkillsUsed = data.reduce((total, day) => {
    return total + Object.values(day.skills).reduce((sum, count) => sum + count, 0);
  }, 0);

  // Calculate most used skill
  const skillUsageCounts: {[key: string]: number} = {};
  skillNames.forEach(skill => {
    skillUsageCounts[skill] = data.reduce((total, day) => {
      return total + (day.skills[skill] || 0);
    }, 0);
  });
  
  const mostUsedSkill = Object.entries(skillUsageCounts).sort((a, b) => b[1] - a[1])[0];

  return (
    <ThemedView style={styles.chartContainer}>
      <ThemedText type="subtitle">Skills Usage Over Time</ThemedText>
      <ThemedText style={styles.chartDescription}>
        This chart shows how often you've used different DBT skills over the past week.
      </ThemedText>

      <ThemedView style={styles.statsContainer}>
        <ThemedView style={[styles.statCard, { backgroundColor: colors.card }]}>
          <ThemedText style={styles.statValue}>{totalSkillsUsed}</ThemedText>
          <ThemedText style={styles.statLabel}>Total Skills Used</ThemedText>
        </ThemedView>
        <ThemedView style={[styles.statCard, { backgroundColor: colors.card }]}>
          <ThemedText style={styles.statValue}>{mostUsedSkill[0]}</ThemedText>
          <ThemedText style={styles.statLabel}>Most Used Skill</ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.chartContent}>
        <ThemedView style={styles.yAxis}>
          {[5, 4, 3, 2, 1, 0].map(value => (
            <ThemedText key={value} style={styles.axisLabel}>{value}</ThemedText>
          ))}
        </ThemedView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScroll}>
          <ThemedView style={styles.chart}>
            {skillNames.map(skill => {
              const shortName = skill === 'Interpersonal Effectiveness' ? 'Interpersonal' : skill;
              return (
                <ThemedView key={skill} style={styles.skillLine}>
                  <ThemedView style={styles.legendItem}>
                    <ThemedView 
                      style={[
                        styles.legendColor, 
                        { 
                          backgroundColor: 
                            skill === 'Mindfulness' ? colors.emotions.joy :
                            skill === 'Distress Tolerance' ? colors.emotions.sadness :
                            skill === 'Emotion Regulation' ? colors.emotions.anger :
                            colors.emotions.love
                        }
                      ]} 
                    />
                    <ThemedText style={styles.legendText}>{shortName}</ThemedText>
                  </ThemedView>

                  <ThemedView style={styles.lineChart}>
                    {data.map((day, index) => {
                      const value = day.skills[skill] || 0;
                      // Convert percentage to actual height value
                      const heightValue = (value * 20);
                      return (
                        <ThemedView key={index} style={styles.barContainer}>
                          <ThemedView 
                            style={[
                              styles.bar, 
                              { 
                                height: heightValue, 
                                backgroundColor: 
                                  skill === 'Mindfulness' ? colors.emotions.joy :
                                  skill === 'Distress Tolerance' ? colors.emotions.sadness :
                                  skill === 'Emotion Regulation' ? colors.emotions.anger :
                                  colors.emotions.love
                              }
                            ]} 
                          />
                        </ThemedView>
                      );
                    })}
                  </ThemedView>
                </ThemedView>
              );
            })}

            <ThemedView style={styles.xAxis}>
              {formattedDates.map((date, index) => (
                <ThemedText key={index} style={styles.dateLabel}>{date}</ThemedText>
              ))}
            </ThemedView>
          </ThemedView>
        </ScrollView>
      </ThemedView>

      <ThemedView style={styles.insightsContainer}>
        <ThemedText type="defaultSemiBold">Insights:</ThemedText>
        <ThemedView style={styles.insightItem}>
          <Ionicons name="trending-up" size={20} color={colors.success} />
          <ThemedText style={styles.insightText}>
            Your mindfulness practice has increased consistently over the week.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.insightItem}>
          <Ionicons name="trending-down" size={20} color={colors.info} />
          <ThemedText style={styles.insightText}>
            You've needed fewer distress tolerance skills as your emotion regulation improved.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

interface AchievementsTrackerProps {
  data: Achievement[];
  colors: any;
}

function AchievementsTracker({ data, colors }: AchievementsTrackerProps) {
  return (
    <ThemedView style={styles.achievementsContainer}>
      <ThemedText type="subtitle">Your Achievements</ThemedText>
      <ThemedText style={styles.chartDescription}>
        Celebrate your progress and milestones in your DBT journey.
      </ThemedText>

      {data.map(achievement => (
        <ThemedView 
          key={achievement.id} 
          style={[styles.achievementCard, { backgroundColor: colors.card }]}
        >
          <ThemedView style={styles.achievementIcon}>
            <Ionicons name={achievement.icon as any} size={32} color={colors.tint} />
          </ThemedView>
          <ThemedView style={styles.achievementContent}>
            <ThemedText type="defaultSemiBold">{achievement.title}</ThemedText>
            <ThemedText style={styles.achievementDescription}>{achievement.description}</ThemedText>
            <ThemedText style={styles.achievementDate}>
              {new Date(achievement.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      ))}

      <ThemedView style={styles.upcomingContainer}>
        <ThemedText type="defaultSemiBold">Upcoming Achievements:</ThemedText>
        <ThemedView style={[styles.upcomingAchievement, { borderColor: colors.border }]}>
          <ThemedView style={[styles.upcomingIcon, { borderColor: colors.border }]}>
            <Ionicons name="star-outline" size={24} color={colors.icon} />
          </ThemedView>
          <ThemedView style={styles.upcomingContent}>
            <ThemedText>Skill Streak</ThemedText>
            <ThemedText style={styles.upcomingDescription}>
              Use at least one skill every day for 14 days
            </ThemedText>
            <ThemedView style={styles.progressBar}>
              <ThemedView 
                style={[
                  styles.progressFill, 
                  { 
                    backgroundColor: colors.tint,
                    width: '50%' 
                  }
                ]} 
              />
            </ThemedView>
            <ThemedText style={styles.progressText}>7/14 days</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
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
  chartContainer: {
    marginBottom: 24,
  },
  chartDescription: {
    marginTop: 4,
    marginBottom: 16,
    opacity: 0.7,
  },
  chartContent: {
    flexDirection: 'row',
    height: 220,
    marginBottom: 16,
  },
  yAxis: {
    width: 30,
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingRight: 8,
  },
  axisLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  chartScroll: {
    flex: 1,
  },
  chart: {
    height: 220,
    paddingBottom: 20,
  },
  emotionLine: {
    marginBottom: 16,
  },
  skillLine: {
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
  },
  lineChart: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'flex-end',
  },
  barContainer: {
    width: 30,
    height: 100,
    justifyContent: 'flex-end',
    marginHorizontal: 4,
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  xAxis: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    marginTop: 4,
  },
  dateLabel: {
    width: 38,
    fontSize: 10,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  insightsContainer: {
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E1E5EA',
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  insightText: {
    marginLeft: 8,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.7,
  },
  achievementsContainer: {
    marginBottom: 24,
  },
  achievementCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(91, 154, 160, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementDescription: {
    marginTop: 4,
    marginBottom: 8,
  },
  achievementDate: {
    fontSize: 12,
    opacity: 0.6,
  },
  upcomingContainer: {
    marginTop: 16,
  },
  upcomingAchievement: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  upcomingIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  upcomingContent: {
    flex: 1,
  },
  upcomingDescription: {
    marginTop: 4,
    marginBottom: 12,
    opacity: 0.7,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E1E5EA',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
