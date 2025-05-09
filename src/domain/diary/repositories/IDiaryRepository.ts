import { UniqueId } from '../../common/valueObjects/UniqueId';
import { DiaryEntry } from '../entities/DiaryEntry';

/**
 * Diary Repository Interface
 * Defines the contract for accessing and persisting diary entries
 */
export interface IDiaryRepository {
  /**
   * Find a diary entry by its ID
   */
  findById(id: UniqueId): Promise<DiaryEntry | null>;
  
  /**
   * Find diary entries by date range
   */
  findByDateRange(startDate?: Date, endDate?: Date, limit?: number): Promise<DiaryEntry[]>;
  
  /**
   * Find diary entries for a specific date
   */
  findByDate(date: Date): Promise<DiaryEntry[]>;
  
  /**
   * Save a diary entry
   */
  save(diaryEntry: DiaryEntry): Promise<void>;
  
  /**
   * Delete a diary entry
   */
  delete(id: UniqueId): Promise<void>;
  
  /**
   * Get emotion statistics for a date range
   */
  getEmotionStats(startDate: Date, endDate: Date): Promise<{
    emotionName: string;
    averageIntensity: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  }[]>;
  
  /**
   * Get skill usage statistics for a date range
   */
  getSkillUsageStats(startDate: Date, endDate: Date): Promise<{
    skillId: string;
    count: number;
  }[]>;
}
