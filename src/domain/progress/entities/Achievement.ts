import { UniqueId } from '../../common/valueObjects/UniqueId';

/**
 * Achievement entity
 * Represents a user achievement in the DBT app
 */
export class Achievement {
  private _id: UniqueId;
  private _title: string;
  private _description: string;
  private _date: Date;
  private _icon: string;
  private _completed: boolean;
  
  constructor(
    id: UniqueId | string,
    title: string,
    description: string,
    date: Date,
    icon: string,
    completed: boolean = false
  ) {
    this._id = typeof id === 'string' ? new UniqueId(id) : id;
    this._title = title;
    this._description = description;
    this._date = date;
    this._icon = icon;
    this._completed = completed;
    
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
  
  get date(): Date {
    return new Date(this._date);
  }
  
  get icon(): string {
    return this._icon;
  }
  
  get completed(): boolean {
    return this._completed;
  }
  
  // Domain methods
  complete(): void {
    this._completed = true;
    this._date = new Date();
  }
  
  updateDescription(description: string): void {
    if (!description || description.trim().length === 0) {
      throw new Error('Achievement description cannot be empty');
    }
    this._description = description;
  }
  
  updateIcon(icon: string): void {
    if (!icon || icon.trim().length === 0) {
      throw new Error('Achievement icon cannot be empty');
    }
    this._icon = icon;
  }
  
  // Factory method
  static create(props: {
    id?: string;
    title: string;
    description: string;
    date?: Date;
    icon: string;
    completed?: boolean;
  }): Achievement {
    return new Achievement(
      props.id ? new UniqueId(props.id) : new UniqueId(),
      props.title,
      props.description,
      props.date || new Date(),
      props.icon,
      props.completed || false
    );
  }
  
  // Validation
  private validate(): void {
    if (!this._title || this._title.trim().length === 0) {
      throw new Error('Achievement title cannot be empty');
    }
    
    if (!this._description || this._description.trim().length === 0) {
      throw new Error('Achievement description cannot be empty');
    }
    
    if (!(this._date instanceof Date) || isNaN(this._date.getTime())) {
      throw new Error('Invalid date');
    }
    
    if (!this._icon || this._icon.trim().length === 0) {
      throw new Error('Achievement icon cannot be empty');
    }
  }
}
