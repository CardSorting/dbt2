/**
 * Emotion value object
 * Represents an emotion with a name and intensity level
 */
export class Emotion {
  readonly name: string;
  readonly intensity: number;
  
  constructor(name: string, intensity: number) {
    this.validateName(name);
    this.validateIntensity(intensity);
    
    this.name = name;
    this.intensity = intensity;
  }
  
  private validateName(name: string): void {
    if (!name || name.trim().length === 0) {
      throw new Error('Emotion name cannot be empty');
    }
  }
  
  private validateIntensity(intensity: number): void {
    if (intensity < 0 || intensity > 10) {
      throw new Error('Emotion intensity must be between 0 and 10');
    }
    
    if (!Number.isInteger(intensity)) {
      throw new Error('Emotion intensity must be an integer');
    }
  }
  
  equals(emotion?: Emotion): boolean {
    if (!emotion) return false;
    return this.name === emotion.name && this.intensity === emotion.intensity;
  }
}
