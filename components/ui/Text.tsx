import React from 'react';
import { Text as RNText, StyleSheet, TextStyle, StyleProp } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { typography } from '@/constants/DesignTokens';

type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'subtitle' 
  | 'body' 
  | 'bodyBold'
  | 'bodySmall'
  | 'caption'
  | 'button';

interface TextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  onPress?: () => void;
  testID?: string;
}

/**
 * A modern text component with consistent typography
 */
export function Text({
  children,
  variant = 'body',
  color,
  align,
  style,
  numberOfLines,
  ellipsizeMode,
  onPress,
  testID,
}: TextProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get variant-specific styles
  const variantStyle = getVariantStyle(variant);
  
  // Determine text color
  const textColor = color || colors.text;
  
  // Combine all styles
  const textStyle: StyleProp<TextStyle> = [
    styles.base,
    variantStyle,
    { color: textColor },
    align && { textAlign: align },
    style,
  ];
  
  return (
    <RNText
      style={textStyle}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      onPress={onPress}
      testID={testID}
    >
      {children}
    </RNText>
  );
}

/**
 * Get styles specific to the text variant
 */
function getVariantStyle(variant: TextVariant): TextStyle {
  switch (variant) {
    case 'h1':
      return {
        fontSize: typography.fontSize.xxxl,
        fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
        lineHeight: typography.fontSize.xxxl * typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
      };
      
    case 'h2':
      return {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold as TextStyle['fontWeight'],
        lineHeight: typography.fontSize.xxl * typography.lineHeight.tight,
        letterSpacing: typography.letterSpacing.tight,
      };
      
    case 'h3':
      return {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.semiBold as TextStyle['fontWeight'],
        lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
      };
      
    case 'h4':
      return {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semiBold as TextStyle['fontWeight'],
        lineHeight: typography.fontSize.lg * typography.lineHeight.tight,
      };
      
    case 'subtitle':
      return {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
        lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
      };
      
    case 'bodyBold':
      return {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.semiBold as TextStyle['fontWeight'],
        lineHeight: typography.fontSize.md * typography.lineHeight.normal,
      };
      
    case 'bodySmall':
      return {
        fontSize: typography.fontSize.sm,
        lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
      };
      
    case 'caption':
      return {
        fontSize: typography.fontSize.xs,
        lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
      };
      
    case 'button':
      return {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
        lineHeight: typography.fontSize.md * typography.lineHeight.tight,
      };
      
    case 'body':
    default:
      return {
        fontSize: typography.fontSize.md,
        lineHeight: typography.fontSize.md * typography.lineHeight.normal,
      };
  }
}

const styles = StyleSheet.create({
  base: {
    fontFamily: typography.fontFamily.primary,
  },
});
