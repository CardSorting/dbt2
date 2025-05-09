import { ICommandHandler } from '../../common/interfaces/ICommandHandler';
import { IEventBus } from '../../common/interfaces/IEventBus';
import { DiaryEntry } from '../../../domain/diary/entities/DiaryEntry';
import { DiaryEntryCreated } from '../../../domain/diary/events/DiaryEntryCreated';
import { IDiaryRepository } from '../../../domain/diary/repositories/IDiaryRepository';
import { Emotion } from '../../../domain/diary/valueObjects/Emotion';
import { SkillReference } from '../../../domain/diary/valueObjects/SkillReference';
import { Urge } from '../../../domain/diary/valueObjects/Urge';
import { CreateDiaryEntryCommand } from './CreateDiaryEntryCommand';

/**
 * CreateDiaryEntryCommandHandler
 * Handles the CreateDiaryEntryCommand
 */
export class CreateDiaryEntryCommandHandler implements ICommandHandler<CreateDiaryEntryCommand> {
  constructor(
    private diaryRepository: IDiaryRepository,
    private eventBus: IEventBus
  ) {}
  
  async handle(command: CreateDiaryEntryCommand): Promise<void> {
    // Create domain entity
    const diaryEntry = DiaryEntry.create({
      date: command.date,
      emotions: command.emotions,
      urges: command.urges,
      skillsUsed: command.skillsUsed,
      notes: command.notes
    });
    
    // Save to repository
    await this.diaryRepository.save(diaryEntry);
    
    // Publish domain event
    await this.eventBus.publish(new DiaryEntryCreated(diaryEntry));
  }
}
