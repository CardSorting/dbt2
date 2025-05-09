/**
 * UniqueId value object
 * A value object representing a unique identifier in the domain
 */
export class UniqueId {
  private readonly value: string;
  
  constructor(id?: string) {
    this.value = id || this.generateUuid();
  }
  
  equals(id?: UniqueId): boolean {
    if (id === null || id === undefined) return false;
    return this.value === id.value;
  }
  
  toString(): string {
    return this.value;
  }
  
  private generateUuid(): string {
    // Simple UUID generation for demo purposes
    // In a real app, use a proper UUID library
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
