/**
 * SkillReference value object
 * Represents a reference to a skill used in a diary entry
 */
export class SkillReference {
  readonly skillId: string;
  
  constructor(skillId: string) {
    this.validateSkillId(skillId);
    this.skillId = skillId;
  }
  
  private validateSkillId(skillId: string): void {
    if (!skillId || skillId.trim().length === 0) {
      throw new Error('Skill ID cannot be empty');
    }
  }
  
  equals(skillRef?: SkillReference): boolean {
    if (!skillRef) return false;
    return this.skillId === skillRef.skillId;
  }
}
