import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { TabBar } from '@/components/ui/TabBar';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => 
            focused ? 'home' : 'home-outline',
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'Diary',
          tabBarIcon: ({ focused, color }) => 
            focused ? 'book' : 'book-outline',
        }}
      />
      <Tabs.Screen
        name="skills"
        options={{
          title: 'Skills',
          tabBarIcon: ({ focused, color }) => 
            focused ? 'bulb' : 'bulb-outline',
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: 'Practice',
          tabBarIcon: ({ focused, color }) => 
            focused ? 'fitness' : 'fitness-outline',
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ focused, color }) => 
            focused ? 'trending-up' : 'trending-up-outline',
        }}
      />
    </Tabs>
  );
}
