import { UniqueId } from '../../common/valueObjects/UniqueId';
import { Skill } from './Skill';

/**
 * SkillModule entity
 * Represents a module of related DBT skills
 */
export class SkillModule {
  private _id: UniqueId;
  private _name: string;
  private _description: string;
  private _skills: Skill[];
  
  constructor(
    id: UniqueId | string,
    name: string,
    description: string,
    skills: Skill[] = []
  ) {
    this._id = typeof id === 'string' ? new UniqueId(id) : id;
    this._name = name;
    this._description = description;
    this._skills = skills;
    
    this.validate();
  }
  
  // Getters
  get id(): UniqueId {
    return this._id;
  }
  
  get name(): string {
    return this._name;
  }
  
  get description(): string {
    return this._description;
  }
  
  get skills(): Skill[] {
    return [...this._skills];
  }
  
  // Domain methods
  updateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Module description cannot be empty');
    }
    this._description = description;
  }
  
  addSkill(skill: Skill): void {
    // Check if skill with same ID already exists
    const exists = this._skills.some(s => s.id.equals(skill.id));
    if (exists) {
      throw new Error(`Skill with ID ${skill.id.toString()} already exists in this module`);
    }
    
    this._skills.push(skill);
  }
  
  removeSkill(skillId: UniqueId): void {
    const index = this._skills.findIndex(s => s.id.equals(skillId));
    if (index === -1) {
      throw new Error(`Skill with ID ${skillId.toString()} not found in this module`);
    }
    
    this._skills.splice(index, 1);
  }
  
  getSkillById(skillId: UniqueId): Skill | undefined {
    return this._skills.find(s => s.id.equals(skillId));
  }
  
  // Factory method
  static create(props: {
    id?: string;
    name: string;
    description: string;
    skills?: Skill[];
  }): SkillModule {
    return new SkillModule(
      props.id ? new UniqueId(props.id) : new UniqueId(),
      props.name,
      props.description,
      props.skills || []
    );
  }
  
  // Validation
  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Module name cannot be empty');
    }
    
    if (!this._description || this._description.trim().length === 0) {
      throw new Error('Module description cannot be empty');
    }
  }
}
