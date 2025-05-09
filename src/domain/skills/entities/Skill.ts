import { UniqueId } from '../../common/valueObjects/UniqueId';

/**
 * Skill entity
 * Represents a DBT skill in the domain
 */
export class Skill {
  private _id: UniqueId;
  private _name: string;
  private _description: string;
  private _examples: string[];
  private _steps?: string[];
  
  constructor(
    id: UniqueId | string,
    name: string,
    description: string,
    examples: string[],
    steps?: string[]
  ) {
    this._id = typeof id === 'string' ? new UniqueId(id) : id;
    this._name = name;
    this._description = description;
    this._examples = examples;
    this._steps = steps;
    
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
  
  get examples(): string[] {
    return [...this._examples];
  }
  
  get steps(): string[] | undefined {
    return this._steps ? [...this._steps] : undefined;
  }
  
  // Domain methods
  updateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Skill description cannot be empty');
    }
    this._description = description;
  }
  
  addExample(example: string): void {
    if (!example || example.trim().length === 0) {
      throw new Error('Example cannot be empty');
    }
    this._examples.push(example);
  }
  
  removeExample(index: number): void {
    if (index < 0 || index >= this._examples.length) {
      throw new Error('Invalid example index');
    }
    this._examples.splice(index, 1);
  }
  
  addStep(step: string): void {
    if (!step || step.trim().length === 0) {
      throw new Error('Step cannot be empty');
    }
    if (!this._steps) {
      this._steps = [];
    }
    this._steps.push(step);
  }
  
  removeStep(index: number): void {
    if (!this._steps || index < 0 || index >= this._steps.length) {
      throw new Error('Invalid step index');
    }
    this._steps.splice(index, 1);
  }
  
  // Factory method
  static create(props: {
    id?: string;
    name: string;
    description: string;
    examples: string[];
    steps?: string[];
  }): Skill {
    return new Skill(
      props.id ? new UniqueId(props.id) : new UniqueId(),
      props.name,
      props.description,
      props.examples,
      props.steps
    );
  }
  
  // Validation
  private validate(): void {
    if (!this._name || this._name.trim().length === 0) {
      throw new Error('Skill name cannot be empty');
    }
    
    if (!this._description || this._description.trim().length === 0) {
      throw new Error('Skill description cannot be empty');
    }
    
    if (!this._examples || this._examples.length === 0) {
      throw new Error('Skill must have at least one example');
    }
  }
}
