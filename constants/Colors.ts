/**
 * Colors for the DBT Diary and Skills App
 * Using a calming color palette that promotes emotional well-being
 */

// Primary colors
const primaryLight = '#5B9AA0'; // Calming teal
const primaryDark = '#81C3D7';  // Soft blue

// Secondary colors
const secondaryLight = '#7A9E7E'; // Gentle green
const secondaryDark = '#A3C9A8';  // Mint green

export const Colors = {
  light: {
    text: '#2D3E4E',           // Dark blue-gray
    background: '#F8F9FA',     // Off-white
    tint: primaryLight,
    icon: '#6E8894',           // Muted blue-gray
    tabIconDefault: '#6E8894', 
    tabIconSelected: primaryLight,
    
    // Additional colors for the app
    card: '#FFFFFF',
    border: '#E1E5EA',
    error: '#D76666',          // Soft red
    success: '#66A182',        // Soft green
    warning: '#E6C86E',        // Soft yellow
    info: '#6E97B8',           // Soft blue
    
    // Emotion colors
    emotions: {
      joy: '#FFCB77',          // Warm yellow
      sadness: '#7192BE',      // Soft blue
      anger: '#E07A5F',        // Soft red
      fear: '#9381FF',         // Soft purple
      shame: '#B67162',        // Terracotta
      love: '#F4ACB7',         // Soft pink
    }
  },
  dark: {
    text: '#E9ECEF',           // Off-white
    background: '#1E2A38',     // Dark blue-gray
    tint: primaryDark,
    icon: '#A2B5C1',           // Light blue-gray
    tabIconDefault: '#A2B5C1',
    tabIconSelected: primaryDark,
    
    // Additional colors for the app
    card: '#2C3A4A',           // Slightly lighter than background
    border: '#3E4C5C',         // Dark border
    error: '#E88E8E',          // Muted red
    success: '#8ECAA6',        // Muted green
    warning: '#F0D898',        // Muted yellow
    info: '#8FB6D9',           // Muted blue
    
    // Emotion colors
    emotions: {
      joy: '#FFD88F',          // Warm yellow (lighter)
      sadness: '#8EAAD7',      // Soft blue (lighter)
      anger: '#EE9B85',        // Soft red (lighter)
      fear: '#AFA3FF',         // Soft purple (lighter)
      shame: '#D08E7F',        // Terracotta (lighter)
      love: '#F7C2CB',         // Soft pink (lighter)
    }
  },
};
