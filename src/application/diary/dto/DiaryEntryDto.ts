import { DiaryEntry } from '../../../domain/diary/entities/DiaryEntry';

/**
 * DiaryEntryDto
 * Data Transfer Object for diary entries
 */
export class DiaryEntryDto {
  id!: string;
  date!: string;
  emotions!: { name: string; intensity: number }[];
  urges!: { name: string; intensity: number; acted: boolean }[];
  skillsUsed!: string[];
  notes!: string;
  
  /**
   * Create a DTO from a domain entity
   */
  static fromEntity(entity: DiaryEntry): DiaryEntryDto {
    return {
      id: entity.id.toString(),
      date: entity.date.toISOString(),
      emotions: entity.emotions.map(e => ({ 
        name: e.name, 
        intensity: e.intensity 
      })),
      urges: entity.urges.map(u => ({ 
        name: u.name, 
        intensity: u.intensity, 
        acted: u.acted 
      })),
      skillsUsed: entity.skillsUsed.map(s => s.skillId),
      notes: entity.notes
    };
  }
}
