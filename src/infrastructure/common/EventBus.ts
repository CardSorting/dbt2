import { EventHandler, IEventBus } from '../../application/common/interfaces/IEventBus';
import { DomainEvent } from '../../domain/common/events/DomainEvent';

/**
 * EventBus implementation
 * Publishes domain events to their subscribers
 */
export class EventBus implements IEventBus {
  private handlers: Map<string, EventHandler<any>[]> = new Map();
  
  /**
   * Subscribe to a specific event type
   */
  subscribe<T extends DomainEvent>(
    eventType: new (...args: any[]) => T,
    handler: EventHandler<T>
  ): void {
    const eventName = eventType.name;
    
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    
    this.handlers.get(eventName)!.push(handler);
  }
  
  /**
   * Publish an event to its subscribers
   */
  async publish<T extends DomainEvent>(event: T): Promise<void> {
    const eventName = event.constructor.name;
    const handlers = this.handlers.get(eventName) || [];
    
    await Promise.all(handlers.map(handler => handler(event)));
  }
}
