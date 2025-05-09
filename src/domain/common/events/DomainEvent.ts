/**
 * Base class for all domain events
 * Domain events represent something significant that happened in the domain
 */
export abstract class DomainEvent {
  public readonly occurredOn: Date;
  
  constructor() {
    this.occurredOn = new Date();
  }
}
