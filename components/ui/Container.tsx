import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { spacing } from '@/constants/DesignTokens';

interface ContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: keyof typeof spacing | number;
  backgroundColor?: string;
  center?: boolean;
  testID?: string;
}

/**
 * A container component for consistent layout and spacing
 */
export function Container({
  children,
  style,
  padding = 'md',
  backgroundColor,
  center = false,
  testID,
}: ContainerProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Determine padding value
  const paddingValue = typeof padding === 'string' ? spacing[padding] : padding;
  
  // Determine background color
  const bgColor = backgroundColor || colors.background;
  
  // Combine all styles
  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    { padding: paddingValue, backgroundColor: bgColor },
    center && styles.center,
    style,
  ];
  
  return (
    <View style={containerStyle} testID={testID}>
      {children}
    </View>
  );
}

/**
 * A screen container with safe area insets and scrolling
 */
export function ScreenContainer({
  children,
  style,
  padding = 'md',
  backgroundColor,
  testID,
}: ContainerProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Determine padding value
  const paddingValue = typeof padding === 'string' ? spacing[padding] : padding;
  
  // Determine background color
  const bgColor = backgroundColor || colors.background;
  
  // Combine all styles
  const containerStyle: StyleProp<ViewStyle> = [
    styles.screenContainer,
    { padding: paddingValue, backgroundColor: bgColor },
    style,
  ];
  
  return (
    <View style={containerStyle} testID={testID}>
      {children}
    </View>
  );
}

/**
 * A row container with items aligned horizontally
 */
export function Row({
  children,
  style,
  padding,
  backgroundColor,
  center = false,
  testID,
}: ContainerProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Determine padding value
  const paddingValue = typeof padding === 'string' ? spacing[padding] : padding;
  
  // Determine background color
  const bgColor = backgroundColor || 'transparent';
  
  // Combine all styles
  const rowStyle: StyleProp<ViewStyle> = [
    styles.row,
    paddingValue !== undefined && { padding: paddingValue },
    { backgroundColor: bgColor },
    center && styles.center,
    style,
  ];
  
  return (
    <View style={rowStyle} testID={testID}>
      {children}
    </View>
  );
}

/**
 * A column container with items aligned vertically
 */
export function Column({
  children,
  style,
  padding,
  backgroundColor,
  center = false,
  testID,
}: ContainerProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  
  // Determine padding value
  const paddingValue = typeof padding === 'string' ? spacing[padding] : padding;
  
  // Determine background color
  const bgColor = backgroundColor || 'transparent';
  
  // Combine all styles
  const columnStyle: StyleProp<ViewStyle> = [
    styles.column,
    paddingValue !== undefined && { padding: paddingValue },
    { backgroundColor: bgColor },
    center && styles.center,
    style,
  ];
  
  return (
    <View style={columnStyle} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
