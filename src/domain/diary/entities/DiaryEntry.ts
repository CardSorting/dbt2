import { UniqueId } from '../../common/valueObjects/UniqueId';
import { Emotion } from '../valueObjects/Emotion';
import { SkillReference } from '../valueObjects/SkillReference';
import { Urge } from '../valueObjects/Urge';

/**
 * DiaryEntry entity
 * Represents a diary entry in the DBT app
 */
export class DiaryEntry {
  private _id: UniqueId;
  private _date: Date;
  private _emotions: Emotion[];
  private _urges: Urge[];
  private _skillsUsed: SkillReference[];
  private _notes: string;
  
  constructor(
    id: UniqueId | string,
    date: Date,
    emotions: Emotion[] = [],
    urges: Urge[] = [],
    skillsUsed: SkillReference[] = [],
    notes: string = ''
  ) {
    this._id = typeof id === 'string' ? new UniqueId(id) : id;
    this._date = date;
    this._emotions = emotions;
    this._urges = urges;
    this._skillsUsed = skillsUsed;
    this._notes = notes;
    
    this.validate();
  }
  
  // Getters
  get id(): UniqueId {
    return this._id;
  }
  
  get date(): Date {
    return new Date(this._date);
  }
  
  get emotions(): Emotion[] {
    return [...this._emotions];
  }
  
  get urges(): Urge[] {
    return [...this._urges];
  }
  
  get skillsUsed(): SkillReference[] {
    return [...this._skillsUsed];
  }
  
  get notes(): string {
    return this._notes;
  }
  
  // Domain methods
  addEmotion(emotion: Emotion): void {
    // Check if emotion with same name already exists
    const index = this._emotions.findIndex(e => e.name === emotion.name);
    if (index !== -1) {
      // Replace existing emotion
      this._emotions[index] = emotion;
    } else {
      this._emotions.push(emotion);
    }
  }
  
  removeEmotion(emotionName: string): void {
    const index = this._emotions.findIndex(e => e.name === emotionName);
    if (index === -1) {
      throw new Error(`Emotion with name ${emotionName} not found in this entry`);
    }
    
    this._emotions.splice(index, 1);
  }
  
  addUrge(urge: Urge): void {
    // Check if urge with same name already exists
    const index = this._urges.findIndex(u => u.name === urge.name);
    if (index !== -1) {
      // Replace existing urge
      this._urges[index] = urge;
    } else {
      this._urges.push(urge);
    }
  }
  
  removeUrge(urgeName: string): void {
    const index = this._urges.findIndex(u => u.name === urgeName);
    if (index === -1) {
      throw new Error(`Urge with name ${urgeName} not found in this entry`);
    }
    
    this._urges.splice(index, 1);
  }
  
  addSkillUsed(skillRef: SkillReference): void {
    // Check if skill already exists
    const exists = this._skillsUsed.some(s => s.skillId === skillRef.skillId);
    if (exists) {
      return; // Skill already added, no need to add again
    }
    
    this._skillsUsed.push(skillRef);
  }
  
  removeSkillUsed(skillId: string): void {
    const index = this._skillsUsed.findIndex(s => s.skillId === skillId);
    if (index === -1) {
      throw new Error(`Skill with ID ${skillId} not found in this entry`);
    }
    
    this._skillsUsed.splice(index, 1);
  }
  
  updateNotes(notes: string): void {
    this._notes = notes;
  }
  
  // Factory method
  static create(props: {
    id?: string;
    date: Date;
    emotions?: { name: string; intensity: number }[];
    urges?: { name: string; intensity: number; acted: boolean }[];
    skillsUsed?: string[];
    notes?: string;
  }): DiaryEntry {
    return new DiaryEntry(
      props.id ? new UniqueId(props.id) : new UniqueId(),
      props.date,
      props.emotions?.map(e => new Emotion(e.name, e.intensity)) || [],
      props.urges?.map(u => new Urge(u.name, u.intensity, u.acted)) || [],
      props.skillsUsed?.map(s => new SkillReference(s)) || [],
      props.notes || ''
    );
  }
  
  // Validation
  private validate(): void {
    if (!(this._date instanceof Date) || isNaN(this._date.getTime())) {
      throw new Error('Invalid date');
    }
  }
}
