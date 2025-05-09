import React from 'react';
import { StyleSheet, View, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Text } from './Text';
import { borders, shadows, spacing } from '@/constants/DesignTokens';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    accessibilityLabel?: string;
  };
  style?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  titleColor?: string;
}

/**
 * A modern, customized header component
 */
export function Header({
  title,
  showBackButton = false,
  rightAction,
  style,
  backgroundColor,
  titleColor,
}: HeaderProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  // Determine background color
  const bgColor = backgroundColor || colors.surface.primary;
  
  // Determine text color
  const textColor = titleColor || colors.text;
  
  // Apply safe area top padding
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    { 
      backgroundColor: bgColor,
      paddingTop: Math.max(insets.top, spacing.md),
      ...shadows[colorScheme ?? 'light'].sm,
    },
    style,
  ];
  
  return (
    <View style={containerStyle}>
      <View style={styles.content}>
        {/* Left side - Back button or empty space */}
        <View style={styles.leftContainer}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={textColor}
              />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Center - Title */}
        <View style={styles.titleContainer}>
          <Text
            variant="h3"
            color={textColor}
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        
        {/* Right side - Optional action button */}
        <View style={styles.rightContainer}>
          {rightAction && (
            <TouchableOpacity
              onPress={rightAction.onPress}
              style={styles.actionButton}
              accessibilityLabel={rightAction.accessibilityLabel || 'Action'}
              accessibilityRole="button"
            >
              <Ionicons
                name={rightAction.icon}
                size={24}
                color={textColor}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
    height: 56,
  },
  leftContainer: {
    width: 40,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightContainer: {
    width: 40,
    alignItems: 'flex-end',
  },
  title: {
    textAlign: 'center',
  },
  backButton: {
    padding: spacing.xs,
    borderRadius: borders.radius.circle,
  },
  actionButton: {
    padding: spacing.xs,
    borderRadius: borders.radius.circle,
  },
});
