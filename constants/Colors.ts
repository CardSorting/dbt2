/**
 * Colors for the DBT Diary and Skills App
 * Using a calming color palette that promotes emotional well-being
 */

// Primary palette
const primary = {
  50: '#E6F3F5',
  100: '#CCE7EB',
  200: '#B3DBE1',
  300: '#99CFD7',
  400: '#80C3CD',
  500: '#5B9AA0', // Primary color - Calming teal
  600: '#4A7B80',
  700: '#385C60',
  800: '#273E40',
  900: '#151F20',
};

// Secondary palette
const secondary = {
  50: '#EFF5F0',
  100: '#DFEBE1',
  200: '#CFE1D2',
  300: '#BFD7C3',
  400: '#AFCDB4',
  500: '#7A9E7E', // Secondary color - Gentle green
  600: '#627E65',
  700: '#495F4C',
  800: '#313F32',
  900: '#182019',
};

// Neutral palette
const neutral = {
  50: '#F8F9FA', // Light background
  100: '#F1F3F5',
  200: '#E9ECEF',
  300: '#DEE2E6',
  400: '#CED4DA',
  500: '#ADB5BD',
  600: '#6C757D',
  700: '#495057',
  800: '#343A40',
  900: '#212529',
  950: '#1E2A38', // Dark background
};

// Semantic colors
const semantic = {
  // Success colors
  success: {
    light: '#66A182', // Soft green
    dark: '#8ECAA6',  // Muted green
  },
  // Error colors
  error: {
    light: '#D76666', // Soft red
    dark: '#E88E8E',  // Muted red
  },
  // Warning colors
  warning: {
    light: '#E6C86E', // Soft yellow
    dark: '#F0D898',  // Muted yellow
  },
  // Info colors
  info: {
    light: '#6E97B8', // Soft blue
    dark: '#8FB6D9',  // Muted blue
  },
};

// Emotion colors
const emotions = {
  light: {
    joy: '#FFCB77',    // Warm yellow
    sadness: '#7192BE', // Soft blue
    anger: '#E07A5F',   // Soft red
    fear: '#9381FF',    // Soft purple
    shame: '#B67162',   // Terracotta
    love: '#F4ACB7',    // Soft pink
  },
  dark: {
    joy: '#FFD88F',     // Warm yellow (lighter)
    sadness: '#8EAAD7', // Soft blue (lighter)
    anger: '#EE9B85',   // Soft red (lighter)
    fear: '#AFA3FF',    // Soft purple (lighter)
    shame: '#D08E7F',   // Terracotta (lighter)
    love: '#F7C2CB',    // Soft pink (lighter)
  },
};

// Surface colors (for components)
const surface = {
  light: {
    primary: '#FFFFFF',      // Card background
    secondary: '#F8F9FA',    // Secondary surface
    tertiary: '#F1F3F5',     // Tertiary surface
  },
  dark: {
    primary: '#2C3A4A',      // Card background
    secondary: '#343A40',    // Secondary surface
    tertiary: '#495057',     // Tertiary surface
  },
};

// Export the complete color system
export const Colors = {
  // Theme-specific colors
  light: {
    // Base colors
    text: neutral[800],
    background: neutral[50],
    tint: primary[500],
    icon: neutral[600],
    tabIconDefault: neutral[600],
    tabIconSelected: primary[500],
    
    // Component colors
    card: surface.light.primary,
    border: neutral[300],
    
    // Semantic colors
    error: semantic.error.light,
    success: semantic.success.light,
    warning: semantic.warning.light,
    info: semantic.info.light,
    
    // Emotion colors
    emotions: emotions.light,
    
    // Surface colors
    surface: surface.light,
    
    // Raw palettes for custom usage
    primary,
    secondary,
    neutral,
  },
  dark: {
    // Base colors
    text: neutral[200],
    background: neutral[950],
    tint: primary[400],
    icon: neutral[400],
    tabIconDefault: neutral[400],
    tabIconSelected: primary[400],
    
    // Component colors
    card: surface.dark.primary,
    border: neutral[700],
    
    // Semantic colors
    error: semantic.error.dark,
    success: semantic.success.dark,
    warning: semantic.warning.dark,
    info: semantic.info.dark,
    
    // Emotion colors
    emotions: emotions.dark,
    
    // Surface colors
    surface: surface.dark,
    
    // Raw palettes for custom usage
    primary,
    secondary,
    neutral,
  },
  
  // Theme-agnostic color palettes
  palettes: {
    primary,
    secondary,
    neutral,
    semantic,
    emotions,
  },
};
