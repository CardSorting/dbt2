import { UniqueId } from '../../common/valueObjects/UniqueId';
import { Skill } from '../entities/Skill';
import { SkillModule } from '../entities/SkillModule';

/**
 * Skills Repository Interface
 * Defines the contract for accessing and persisting skills and modules
 */
export interface ISkillsRepository {
  /**
   * Find a skill module by its ID
   */
  findModuleById(id: UniqueId): Promise<SkillModule | null>;
  
  /**
   * Find all skill modules
   */
  findAllModules(): Promise<SkillModule[]>;
  
  /**
   * Find a skill by its ID
   */
  findSkillById(id: UniqueId): Promise<Skill | null>;
  
  /**
   * Find skills by module ID
   */
  findSkillsByModuleId(moduleId: UniqueId): Promise<Skill[]>;
  
  /**
   * Save a skill module
   */
  saveModule(module: SkillModule): Promise<void>;
  
  /**
   * Save a skill
   */
  saveSkill(skill: Skill, moduleId: UniqueId): Promise<void>;
  
  /**
   * Delete a skill module
   */
  deleteModule(id: UniqueId): Promise<void>;
  
  /**
   * Delete a skill
   */
  deleteSkill(id: UniqueId): Promise<void>;
}
