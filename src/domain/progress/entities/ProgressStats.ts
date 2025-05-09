import { UniqueId } from '../../common/valueObjects/UniqueId';

/**
 * EmotionTrend value object
 * Represents the trend of an emotion over time
 */
export class EmotionTrend {
  readonly emotionName: string;
  readonly averageIntensity: number;
  readonly trend: 'increasing' | 'decreasing' | 'stable';
  
  constructor(
    emotionName: string,
    averageIntensity: number,
    trend: 'increasing' | 'decreasing' | 'stable'
  ) {
    this.emotionName = emotionName;
    this.averageIntensity = averageIntensity;
    this.trend = trend;
  }
}

/**
 * SkillUsage value object
 * Represents the usage statistics of a skill
 */
export class SkillUsage {
  readonly skillId: string;
  readonly skillName: string;
  readonly count: number;
  
  constructor(skillId: string, skillName: string, count: number) {
    this.skillId = skillId;
    this.skillName = skillName;
    this.count = count;
  }
}

/**
 * ProgressStats entity
 * Represents statistics about user progress
 */
export class ProgressStats {
  private _id: UniqueId;
  private _userId: string;
  private _startDate: Date;
  private _endDate: Date;
  private _emotionTrends: EmotionTrend[];
  private _skillUsage: SkillUsage[];
  private _totalDiaryEntries: number;
  private _totalExercisesCompleted: number;
  private _streakDays: number;
  
  constructor(
    id: UniqueId | string,
    userId: string,
    startDate: Date,
    endDate: Date,
    emotionTrends: EmotionTrend[] = [],
    skillUsage: SkillUsage[] = [],
    totalDiaryEntries: number = 0,
    totalExercisesCompleted: number = 0,
    streakDays: number = 0
  ) {
    this._id = typeof id === 'string' ? new UniqueId(id) : id;
    this._userId = userId;
    this._startDate = startDate;
    this._endDate = endDate;
    this._emotionTrends = emotionTrends;
    this._skillUsage = skillUsage;
    this._totalDiaryEntries = totalDiaryEntries;
    this._totalExercisesCompleted = totalExercisesCompleted;
    this._streakDays = streakDays;
    
    this.validate();
  }
  
  // Getters
  get id(): UniqueId {
    return this._id;
  }
  
  get userId(): string {
    return this._userId;
  }
  
  get startDate(): Date {
    return new Date(this._startDate);
  }
  
  get endDate(): Date {
    return new Date(this._endDate);
  }
  
  get emotionTrends(): EmotionTrend[] {
    return [...this._emotionTrends];
  }
  
  get skillUsage(): SkillUsage[] {
    return [...this._skillUsage];
  }
  
  get totalDiaryEntries(): number {
    return this._totalDiaryEntries;
  }
  
  get totalExercisesCompleted(): number {
    return this._totalExercisesCompleted;
  }
  
  get streakDays(): number {
    return this._streakDays;
  }
  
  // Domain methods
  updateEmotionTrends(emotionTrends: EmotionTrend[]): void {
    this._emotionTrends = emotionTrends;
  }
  
  updateSkillUsage(skillUsage: SkillUsage[]): void {
    this._skillUsage = skillUsage;
  }
  
  incrementDiaryEntries(): void {
    this._totalDiaryEntries += 1;
  }
  
  incrementExercisesCompleted(): void {
    this._totalExercisesCompleted += 1;
  }
  
  updateStreakDays(streakDays: number): void {
    if (streakDays < 0) {
      throw new Error('Streak days cannot be negative');
    }
    this._streakDays = streakDays;
  }
  
  // Factory method
  static create(props: {
    id?: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    emotionTrends?: EmotionTrend[];
    skillUsage?: SkillUsage[];
    totalDiaryEntries?: number;
    totalExercisesCompleted?: number;
    streakDays?: number;
  }): ProgressStats {
    return new ProgressStats(
      props.id ? new UniqueId(props.id) : new UniqueId(),
      props.userId,
      props.startDate,
      props.endDate,
      props.emotionTrends || [],
      props.skillUsage || [],
      props.totalDiaryEntries || 0,
      props.totalExercisesCompleted || 0,
      props.streakDays || 0
    );
  }
  
  // Validation
  private validate(): void {
    if (!this._userId || this._userId.trim().length === 0) {
      throw new Error('User ID cannot be empty');
    }
    
    if (!(this._startDate instanceof Date) || isNaN(this._startDate.getTime())) {
      throw new Error('Invalid start date');
    }
    
    if (!(this._endDate instanceof Date) || isNaN(this._endDate.getTime())) {
      throw new Error('Invalid end date');
    }
    
    if (this._startDate > this._endDate) {
      throw new Error('Start date cannot be after end date');
    }
    
    if (this._totalDiaryEntries < 0) {
      throw new Error('Total diary entries cannot be negative');
    }
    
    if (this._totalExercisesCompleted < 0) {
      throw new Error('Total exercises completed cannot be negative');
    }
    
    if (this._streakDays < 0) {
      throw new Error('Streak days cannot be negative');
    }
  }
}
