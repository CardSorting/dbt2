import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle, StyleProp, Animated } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Text } from './Text';
import { borders, shadows, spacing } from '@/constants/DesignTokens';

/**
 * A modern, customized tab bar for bottom tab navigation
 */
export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const insets = useSafeAreaInsets();
  
  // Apply safe area bottom padding
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    { 
      backgroundColor: colors.surface.primary,
      paddingBottom: Math.max(insets.bottom, spacing.sm),
      ...shadows[colorScheme ?? 'light'].md,
    },
  ];
  
  return (
    <View style={containerStyle}>
      <View style={styles.tabsContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          // Use shortened labels for specific routes
          let label = options.title || route.name;
          
          // Map longer titles to shorter ones
          switch (route.name) {
            case 'diary':
              label = 'Log';
              break;
            case 'exercises':
              label = 'Train';
              break;
            case 'progress':
              label = 'Stats';
              break;
          }
          
          // Get icon from options
          const iconName = getIconName(options, state.index === index);
          
          const isFocused = state.index === index;
          
          // Determine background color for active tab
          let tabBackgroundColor = 'transparent';
          if (isFocused) {
            switch (label.toLowerCase()) {
              case 'home':
                tabBackgroundColor = colors.primary[100];
                break;
              case 'diary':
              case 'log':
                tabBackgroundColor = colors.emotions.sadness + '20';
                break;
              case 'skills':
                tabBackgroundColor = colors.emotions.joy + '20';
                break;
              case 'practice':
              case 'train':
                tabBackgroundColor = colors.emotions.love + '20';
                break;
              case 'progress':
              case 'stats':
                tabBackgroundColor = colors.emotions.fear + '20';
                break;
              default:
                tabBackgroundColor = colors.primary[100];
            }
          }
          
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          
          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={`tab-${route.name}`}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.tab,
                isFocused && styles.activeTab,
                isFocused && { backgroundColor: tabBackgroundColor }
              ]}
              activeOpacity={0.7}
            >
              <View style={styles.tabContent}>
                {iconName && (
                  <View style={styles.iconContainer}>
                    <Ionicons
                      name={iconName as keyof typeof Ionicons.glyphMap}
                      size={24}
                      color={isFocused ? colors.tint : colors.tabIconDefault}
                    />
                  </View>
                )}
                
                <Text
                  variant="caption"
                  color={isFocused ? colors.tint : colors.tabIconDefault}
                  style={isFocused ? styles.activeLabel : styles.inactiveLabel}
                >
                  {label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

/**
 * Helper to extract icon name from tab options
 */
function getIconName(options: any, isFocused: boolean): string | undefined {
  // Try to get icon from tabBarIcon function
  if (options.tabBarIcon) {
    return options.tabBarIcon({ focused: isFocused, color: '', size: 0 });
  }
  
  // Default icons based on common tab names
  const routeName = options.title?.toLowerCase() || '';
  
  switch (routeName) {
    case 'home':
      return isFocused ? 'home' : 'home-outline';
    case 'diary':
    case 'log':
      return isFocused ? 'book' : 'book-outline';
    case 'skills':
      return isFocused ? 'bulb' : 'bulb-outline';
    case 'practice':
    case 'exercises':
    case 'train':
      return isFocused ? 'fitness' : 'fitness-outline';
    case 'progress':
    case 'stats':
      return isFocused ? 'trending-up' : 'trending-up-outline';
    case 'settings':
      return isFocused ? 'settings' : 'settings-outline';
    default:
      return undefined;
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: borders.radius.lg,
    borderTopRightRadius: borders.radius.lg,
    paddingTop: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    marginHorizontal: 4,
    borderRadius: borders.radius.md,
  },
  activeTab: {
    ...shadows.light.sm,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  activeLabel: {
    fontWeight: '600',
    maxWidth: 60,
    textAlign: 'center',
  },
  inactiveLabel: {
    opacity: 0.7,
    maxWidth: 60,
    textAlign: 'center',
  },
});
