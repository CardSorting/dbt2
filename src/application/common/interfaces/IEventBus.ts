import { DomainEvent } from '../../../domain/common/events/DomainEvent';

/**
 * Event Handler type
 * Represents a function that handles a domain event
 */
export type EventHandler<T extends DomainEvent> = (event: T) => Promise<void>;

/**
 * Event Bus interface
 * Represents a bus that publishes domain events to their subscribers
 */
export interface IEventBus {
  /**
   * Subscribe to a specific event type
   * @param eventType The event type
   * @param handler The handler for the event
   */
  subscribe<T extends DomainEvent>(
    eventType: new (...args: any[]) => T,
    handler: EventHandler<T>
  ): void;
  
  /**
   * Publish an event to its subscribers
   * @param event The event to publish
   */
  publish<T extends DomainEvent>(event: T): Promise<void>;
}
