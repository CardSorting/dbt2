import { DomainEvent } from '../../common/events/DomainEvent';
import { DiaryEntry } from '../entities/DiaryEntry';

/**
 * DiaryEntryCreated event
 * Triggered when a new diary entry is created
 */
export class DiaryEntryCreated extends DomainEvent {
  constructor(public readonly diaryEntry: DiaryEntry) {
    super();
  }
}
