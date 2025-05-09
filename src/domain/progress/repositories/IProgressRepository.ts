import { UniqueId } from '../../common/valueObjects/UniqueId';
import { Achievement } from '../entities/Achievement';
import { EmotionTrend, ProgressStats, SkillUsage } from '../entities/ProgressStats';

/**
 * Progress Repository Interface
 * Defines the contract for accessing and persisting progress data
 */
export interface IProgressRepository {
  /**
   * Find an achievement by its ID
   */
  findAchievementById(id: UniqueId): Promise<Achievement | null>;
  
  /**
   * Find all achievements
   */
  findAllAchievements(): Promise<Achievement[]>;
  
  /**
   * Find completed achievements
   */
  findCompletedAchievements(): Promise<Achievement[]>;
  
  /**
   * Find pending achievements
   */
  findPendingAchievements(): Promise<Achievement[]>;
  
  /**
   * Save an achievement
   */
  saveAchievement(achievement: Achievement): Promise<void>;
  
  /**
   * Delete an achievement
   */
  deleteAchievement(id: UniqueId): Promise<void>;
  
  /**
   * Get progress stats for a date range
   */
  getProgressStats(startDate: Date, endDate: Date): Promise<ProgressStats>;
  
  /**
   * Get emotion trends for a date range
   */
  getEmotionTrends(startDate: Date, endDate: Date): Promise<EmotionTrend[]>;
  
  /**
   * Get skill usage for a date range
   */
  getSkillUsage(startDate: Date, endDate: Date): Promise<SkillUsage[]>;
  
  /**
   * Get current streak days
   */
  getStreakDays(): Promise<number>;
  
  /**
   * Update streak days
   */
  updateStreakDays(days: number): Promise<void>;
  
  /**
   * Check if user has completed an achievement
   */
  hasCompletedAchievement(achievementId: UniqueId): Promise<boolean>;
  
  /**
   * Mark an achievement as completed
   */
  completeAchievement(achievementId: UniqueId): Promise<void>;
}
