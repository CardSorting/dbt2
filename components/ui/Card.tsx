import React from 'react';
import { StyleSheet, ViewStyle, View, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { borders, shadows, spacing } from '@/constants/DesignTokens';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'flat';
  padding?: keyof typeof spacing | number;
  testID?: string;
}

/**
 * A modern card component with various style variants
 */
export function Card({
  children,
  style,
  onPress,
  variant = 'default',
  padding = 'md',
  testID,
}: CardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Determine padding value
  const paddingValue = typeof padding === 'string' ? spacing[padding] : padding;
  
  // Get variant-specific styles
  const variantStyle = getVariantStyle(variant, colorScheme ?? 'light');
  
  // Combine all styles
  const cardStyle = [
    styles.base,
    { padding: paddingValue },
    variantStyle,
    style,
  ];
  
  // If onPress is provided, wrap in TouchableOpacity, otherwise use View
  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
        testID={testID}
      >
        {children}
      </TouchableOpacity>
    );
  }
  
  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
}

/**
 * Get styles specific to the card variant
 */
function getVariantStyle(variant: CardProps['variant'], theme: 'light' | 'dark'): ViewStyle {
  const colors = Colors[theme];
  
  switch (variant) {
    case 'elevated':
      return {
        ...shadows[theme].md,
        backgroundColor: colors.surface.primary,
      };
      
    case 'outlined':
      return {
        borderWidth: borders.width.thin,
        borderColor: colors.border,
        backgroundColor: 'transparent',
      };
      
    case 'flat':
      return {
        backgroundColor: colors.surface.secondary,
      };
      
    case 'default':
    default:
      return {
        ...shadows[theme].sm,
        backgroundColor: colors.surface.primary,
      };
  }
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borders.radius.md,
    overflow: 'hidden',
  },
});
