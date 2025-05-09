import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
  StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { borders, spacing, typography } from '@/constants/DesignTokens';

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  iconLeft?: keyof typeof Ionicons.glyphMap;
  iconRight?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
}

/**
 * A modern button component with various style variants
 */
export function Button({
  onPress,
  title,
  variant = 'primary',
  size = 'medium',
  iconLeft,
  iconRight,
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  testID,
}: ButtonProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Get variant-specific styles
  const variantStyle = getVariantStyle(variant, colorScheme ?? 'light', disabled);
  const variantTextStyle = getVariantTextStyle(variant, colorScheme ?? 'light', disabled);
  
  // Get size-specific styles
  const sizeStyle = getSizeStyle(size);
  const textSizeStyle = getTextSizeStyle(size);
  const iconSize = getIconSize(size);
  
  // Combine all styles
  const buttonStyle: StyleProp<ViewStyle> = [
    styles.base,
    variantStyle,
    sizeStyle,
    fullWidth && styles.fullWidth,
    style,
  ];
  
  const buttonTextStyle: StyleProp<TextStyle> = [
    styles.text,
    variantTextStyle,
    textSizeStyle,
    textStyle,
  ];
  
  // Icon color based on variant
  const iconColor = variantTextStyle.color;
  
  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantTextStyle.color as string}
        />
      ) : (
        <View style={styles.contentContainer}>
          {iconLeft && (
            <Ionicons
              name={iconLeft}
              size={iconSize}
              color={iconColor as string}
              style={styles.leftIcon}
            />
          )}
          
          <Text style={buttonTextStyle}>{title}</Text>
          
          {iconRight && (
            <Ionicons
              name={iconRight}
              size={iconSize}
              color={iconColor as string}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

/**
 * Get styles specific to the button variant
 */
function getVariantStyle(
  variant: ButtonProps['variant'],
  theme: 'light' | 'dark',
  disabled: boolean
): ViewStyle {
  const colors = Colors[theme];
  const opacity = disabled ? 0.5 : 1;
  
  switch (variant) {
    case 'secondary':
      return {
        backgroundColor: theme === 'light' ? colors.primary[100] : colors.primary[800],
        opacity,
      };
      
    case 'tertiary':
      return {
        backgroundColor: 'transparent',
        opacity,
      };
      
    case 'outline':
      return {
        backgroundColor: 'transparent',
        borderWidth: borders.width.thin,
        borderColor: colors.tint,
        opacity,
      };
      
    case 'primary':
    default:
      return {
        backgroundColor: colors.tint,
        opacity,
      };
  }
}

/**
 * Get text styles specific to the button variant
 */
function getVariantTextStyle(
  variant: ButtonProps['variant'],
  theme: 'light' | 'dark',
  disabled: boolean
): TextStyle {
  const colors = Colors[theme];
  
  switch (variant) {
    case 'secondary':
      return {
        color: colors.tint,
      };
      
    case 'tertiary':
      return {
        color: colors.tint,
      };
      
    case 'outline':
      return {
        color: colors.tint,
      };
      
    case 'primary':
    default:
      return {
        color: '#FFFFFF',
      };
  }
}

/**
 * Get styles specific to the button size
 */
function getSizeStyle(size: ButtonProps['size']): ViewStyle {
  switch (size) {
    case 'small':
      return {
        paddingVertical: spacing.xs,
        paddingHorizontal: spacing.sm,
        borderRadius: borders.radius.sm,
      };
      
    case 'large':
      return {
        paddingVertical: spacing.md,
        paddingHorizontal: spacing.lg,
        borderRadius: borders.radius.md,
      };
      
    case 'medium':
    default:
      return {
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: borders.radius.sm,
      };
  }
}

/**
 * Get text styles specific to the button size
 */
function getTextSizeStyle(size: ButtonProps['size']): TextStyle {
  switch (size) {
    case 'small':
      return {
        fontSize: typography.fontSize.sm,
      };
      
    case 'large':
      return {
        fontSize: typography.fontSize.lg,
      };
      
    case 'medium':
    default:
      return {
        fontSize: typography.fontSize.md,
      };
  }
}

/**
 * Get icon size based on button size
 */
function getIconSize(size: ButtonProps['size']): number {
  switch (size) {
    case 'small':
      return 16;
    case 'large':
      return 24;
    case 'medium':
    default:
      return 20;
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  text: {
    fontWeight: typography.fontWeight.medium as TextStyle['fontWeight'],
    textAlign: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftIcon: {
    marginRight: spacing.xs,
  },
  rightIcon: {
    marginLeft: spacing.xs,
  },
});
