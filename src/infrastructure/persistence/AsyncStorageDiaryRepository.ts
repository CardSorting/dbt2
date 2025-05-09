import AsyncStorage from '@react-native-async-storage/async-storage';
import { UniqueId } from '../../domain/common/valueObjects/UniqueId';
import { DiaryEntry } from '../../domain/diary/entities/DiaryEntry';
import { IDiaryRepository } from '../../domain/diary/repositories/IDiaryRepository';
import { Emotion } from '../../domain/diary/valueObjects/Emotion';
import { SkillReference } from '../../domain/diary/valueObjects/SkillReference';
import { Urge } from '../../domain/diary/valueObjects/Urge';

/**
 * AsyncStorage implementation of the DiaryRepository
 */
export class AsyncStorageDiaryRepository implements IDiaryRepository {
  private readonly STORAGE_KEY = 'diary_entries';
  
  /**
   * Find a diary entry by its ID
   */
  async findById(id: UniqueId): Promise<DiaryEntry | null> {
    const entries = await this.getAllEntries();
    const entryData = entries.find(e => e.id === id.toString());
    return entryData ? this.mapToDomain(entryData) : null;
  }
  
  /**
   * Find diary entries by date range
   */
  async findByDateRange(startDate?: Date, endDate?: Date, limit?: number): Promise<DiaryEntry[]> {
    const entries = await this.getAllEntries();
    let filteredEntries = entries;
    
    if (startDate) {
      filteredEntries = filteredEntries.filter(e => new Date(e.date) >= startDate);
    }
    
    if (endDate) {
      filteredEntries = filteredEntries.filter(e => new Date(e.date) <= endDate);
    }
    
    // Sort by date descending (newest first)
    filteredEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (limit) {
      filteredEntries = filteredEntries.slice(0, limit);
    }
    
    return filteredEntries.map(e => this.mapToDomain(e));
  }
  
  /**
   * Find diary entries for a specific date
   */
  async findByDate(date: Date): Promise<DiaryEntry[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    return this.findByDateRange(startOfDay, endOfDay);
  }
  
  /**
   * Save a diary entry
   */
  async save(diaryEntry: DiaryEntry): Promise<void> {
    const entries = await this.getAllEntries();
    const entryData = this.mapToStorage(diaryEntry);
    
    const existingIndex = entries.findIndex(e => e.id === entryData.id);
    if (existingIndex >= 0) {
      entries[existingIndex] = entryData;
    } else {
      entries.push(entryData);
    }
    
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
  }
  
  /**
   * Delete a diary entry
   */
  async delete(id: UniqueId): Promise<void> {
    const entries = await this.getAllEntries();
    const filteredEntries = entries.filter(e => e.id !== id.toString());
    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredEntries));
  }
  
  /**
   * Get emotion statistics for a date range
   */
  async getEmotionStats(startDate: Date, endDate: Date): Promise<{
    emotionName: string;
    averageIntensity: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }[]> {
    const entries = await this.findByDateRange(startDate, endDate);
    
    // Group emotions by name
    const emotionsByName: Record<string, { intensities: number[]; dates: Date[] }> = {};
    
    entries.forEach(entry => {
      entry.emotions.forEach(emotion => {
        if (!emotionsByName[emotion.name]) {
          emotionsByName[emotion.name] = { intensities: [], dates: [] };
        }
        emotionsByName[emotion.name].intensities.push(emotion.intensity);
        emotionsByName[emotion.name].dates.push(entry.date);
      });
    });
    
    // Calculate stats for each emotion
    return Object.entries(emotionsByName).map(([name, data]) => {
      const averageIntensity = data.intensities.reduce((sum, val) => sum + val, 0) / data.intensities.length;
      
      // Determine trend by comparing first half to second half
      const midpoint = Math.floor(data.intensities.length / 2);
      const firstHalf = data.intensities.slice(0, midpoint);
      const secondHalf = data.intensities.slice(midpoint);
      
      const firstHalfAvg = firstHalf.reduce((sum, val) => sum + val, 0) / firstHalf.length;
      const secondHalfAvg = secondHalf.reduce((sum, val) => sum + val, 0) / secondHalf.length;
      
      let trend: 'increasing' | 'decreasing' | 'stable';
      const threshold = 0.5; // Threshold for determining if there's a significant change
      
      if (secondHalfAvg - firstHalfAvg > threshold) {
        trend = 'increasing';
      } else if (firstHalfAvg - secondHalfAvg > threshold) {
        trend = 'decreasing';
      } else {
        trend = 'stable';
      }
      
      return {
        emotionName: name,
        averageIntensity,
        trend
      };
    });
  }
  
  /**
   * Get skill usage statistics for a date range
   */
  async getSkillUsageStats(startDate: Date, endDate: Date): Promise<{
    skillId: string;
    count: number;
  }[]> {
    const entries = await this.findByDateRange(startDate, endDate);
    
    // Count skill usage
    const skillUsage: Record<string, number> = {};
    
    entries.forEach(entry => {
      entry.skillsUsed.forEach(skill => {
        if (!skillUsage[skill.skillId]) {
          skillUsage[skill.skillId] = 0;
        }
        skillUsage[skill.skillId]++;
      });
    });
    
    return Object.entries(skillUsage).map(([skillId, count]) => ({
      skillId,
      count
    }));
  }
  
  /**
   * Get all entries from storage
   */
  private async getAllEntries(): Promise<any[]> {
    const data = await AsyncStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }
  
  /**
   * Map a storage object to a domain entity
   */
  private mapToDomain(data: any): DiaryEntry {
    return DiaryEntry.create({
      id: data.id,
      date: new Date(data.date),
      emotions: data.emotions,
      urges: data.urges,
      skillsUsed: data.skillsUsed,
      notes: data.notes
    });
  }
  
  /**
   * Map a domain entity to a storage object
   */
  private mapToStorage(entity: DiaryEntry): any {
    return {
      id: entity.id.toString(),
      date: entity.date.toISOString(),
      emotions: entity.emotions.map(e => ({
        name: e.name,
        intensity: e.intensity
      })),
      urges: entity.urges.map(u => ({
        name: u.name,
        intensity: u.intensity,
        acted: u.acted
      })),
      skillsUsed: entity.skillsUsed.map(s => s.skillId),
      notes: entity.notes
    };
  }
}
