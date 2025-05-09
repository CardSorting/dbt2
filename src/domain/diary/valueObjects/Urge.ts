/**
 * Urge value object
 * Represents an urge with a name, intensity level, and whether it was acted upon
 */
export class Urge {
  readonly name: string;
  readonly intensity: number;
  readonly acted: boolean;
  
  constructor(name: string, intensity: number, acted: boolean) {
    this.validateName(name);
    this.validateIntensity(intensity);
    
    this.name = name;
    this.intensity = intensity;
    this.acted = acted;
  }
  
  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Urge name cannot be empty');
    }
  }
  
  private validateIntensity(intensity: number): void {
    if (intensity < 0 || intensity > 10) {
      throw new Error('Urge intensity must be between 0 and 10');
    }
    
    if (!Number.isInteger(intensity)) {
      throw new Error('Urge intensity must be an integer');
    }
  }
  
  equals(urge?: Urge): boolean {
    if (!urge) return false;
    return this.name === urge.name && 
           this.intensity === urge.intensity && 
           this.acted === urge.acted;
  }
}
