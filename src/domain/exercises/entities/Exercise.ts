import { UniqueId } from '../../common/valueObjects/UniqueId';

/**
 * ExerciseStep value object
 * Represents a step in a DBT exercise
 */
export class ExerciseStep {
  readonly instruction: string;
  readonly details?: string;
  
  constructor(instruction: string, details?: string) {
    if (!instruction || instruction.trim().length === 0) {
      throw new Error('Exercise step instruction cannot be empty');
    }
    
    this.instruction = instruction;
    this.details = details;
  }
}

/**
 * Exercise entity
 * Represents a DBT practice exercise
 */
export class Exercise {
  private _id: UniqueId;
  private _title: string;
  private _description: string;
  private _category: string;
  private _duration: string;
  private _difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  private _steps: ExerciseStep[];
  
  constructor(
    id: UniqueId | string,
    title: string,
    description: string,
    category: string,
    duration: string,
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced',
    steps: ExerciseStep[]
  ) {
    this._id = typeof id === 'string' ? new UniqueId(id) : id;
    this._title = title;
    this._description = description;
    this._category = category;
    this._duration = duration;
    this._difficulty = difficulty;
    this._steps = steps;
    
    this.validate();
  }
  
  // Getters
  get id(): UniqueId {
    return this._id;
  }
  
  get title(): string {
    return this._title;
  }
  
  get description(): string {
    return this._description;
  }
  
  get category(): string {
    return this._category;
  }
  
  get duration(): string {
    return this._duration;
  }
  
  get difficulty(): 'Beginner' | 'Intermediate' | 'Advanced' {
    return this._difficulty;
  }
  
  get steps(): ExerciseStep[] {
    return [...this._steps];
  }
  
  // Domain methods
  updateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Exercise description cannot be empty');
    }
    this._description = description;
  }
  
  updateDifficulty(difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): void {
    this._difficulty = difficulty;
  }
  
  addStep(step: ExerciseStep): void {
    this._steps.push(step);
  }
  
  removeStep(index: number): void {
    if (index < 0 || index >= this._steps.length) {
      throw new Error('Invalid step index');
    }
    
    this._steps.splice(index, 1);
  }
  
  updateStep(index: number, step: ExerciseStep): void {
    if (index < 0 || index >= this._steps.length) {
      throw new Error('Invalid step index');
    }
    
    this._steps[index] = step;
  }
  
  // Factory method
  static create(props: {
    id?: string;
    title: string;
    description: string;
    category: string;
    duration: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    steps: { instruction: string; details?: string }[];
  }): Exercise {
    return new Exercise(
      props.id ? new UniqueId(props.id) : new UniqueId(),
      props.title,
      props.description,
      props.category,
      props.duration,
      props.difficulty,
      props.steps.map(s => new ExerciseStep(s.instruction, s.details))
    );
  }
  
  // Validation
  private validate(): void {
    if (!this._title || this._title.trim().length === 0) {
      throw new Error('Exercise title cannot be empty');
    }
    
    if (!this._description || this._description.trim().length === 0) {
      throw new Error('Exercise description cannot be empty');
    }
    
    if (!this._category || this._category.trim().length === 0) {
      throw new Error('Exercise category cannot be empty');
    }
    
    if (!this._duration || this._duration.trim().length === 0) {
      throw new Error('Exercise duration cannot be empty');
    }
    
    if (!this._steps || this._steps.length === 0) {
      throw new Error('Exercise must have at least one step');
    }
  }
}
