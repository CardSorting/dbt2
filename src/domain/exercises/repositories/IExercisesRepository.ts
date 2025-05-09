import { UniqueId } from '../../common/valueObjects/UniqueId';
import { Exercise } from '../entities/Exercise';

/**
 * Exercises Repository Interface
 * Defines the contract for accessing and persisting exercises
 */
export interface IExercisesRepository {
  /**
   * Find an exercise by its ID
   */
  findById(id: UniqueId): Promise<Exercise | null>;
  
  /**
   * Find all exercises
   */
  findAll(): Promise<Exercise[]>;
  
  /**
   * Find exercises by category
   */
  findByCategory(category: string): Promise<Exercise[]>;
  
  /**
   * Find exercises by difficulty
   */
  findByDifficulty(difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): Promise<Exercise[]>;
  
  /**
   * Save an exercise
   */
  save(exercise: Exercise): Promise<void>;
  
  /**
   * Delete an exercise
   */
  delete(id: UniqueId): Promise<void>;
  
  /**
   * Get all available exercise categories
   */
  getCategories(): Promise<string[]>;
}
