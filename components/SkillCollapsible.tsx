import { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

interface SkillCollapsibleProps {
  collapsed: boolean;
  children: React.ReactNode;
}

export function SkillCollapsible({ children, collapsed }: SkillCollapsibleProps) {
  if (collapsed) {
    return null;
  }
  
  return (
    <ThemedView style={styles.content}>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
  },
});
