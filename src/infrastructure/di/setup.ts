import { CreateDiaryEntryCommand } from '../../application/diary/commands/CreateDiaryEntryCommand';
import { CreateDiaryEntryCommandHandler } from '../../application/diary/commands/CreateDiaryEntryCommandHandler';
import { GetDiaryEntriesQuery } from '../../application/diary/queries/GetDiaryEntriesQuery';
import { GetDiaryEntriesQueryHandler } from '../../application/diary/queries/GetDiaryEntriesQueryHandler';
import { DiaryEntryCreated } from '../../domain/diary/events/DiaryEntryCreated';
import { IDiaryRepository } from '../../domain/diary/repositories/IDiaryRepository';
import { ISkillsRepository } from '../../domain/skills/repositories/ISkillsRepository';
import { CommandBus } from '../common/CommandBus';
import { EventBus } from '../common/EventBus';
import { QueryBus } from '../common/QueryBus';
import { AsyncStorageDiaryRepository } from '../persistence/AsyncStorageDiaryRepository';
import { Container } from './Container';

/**
 * Setup the dependency injection container
 */
export function setupDependencies(): void {
  const container = Container.getInstance();
  
  // Register infrastructure services
  container.register('CommandBus', new CommandBus());
  container.register('QueryBus', new QueryBus());
  container.register('EventBus', new EventBus());
  
  // Register repositories
  container.register<IDiaryRepository>('DiaryRepository', new AsyncStorageDiaryRepository());
  
  // Register command handlers
  const commandBus = container.resolve<CommandBus>('CommandBus');
  const diaryRepository = container.resolve<IDiaryRepository>('DiaryRepository');
  const eventBus = container.resolve<EventBus>('EventBus');
  
  commandBus.registerHandler(
    CreateDiaryEntryCommand,
    new CreateDiaryEntryCommandHandler(diaryRepository, eventBus)
  );
  
  // Register query handlers
  const queryBus = container.resolve<QueryBus>('QueryBus');
  
  queryBus.registerHandler(
    GetDiaryEntriesQuery,
    new GetDiaryEntriesQueryHandler(diaryRepository)
  );
  
  // Register event handlers
  eventBus.subscribe(DiaryEntryCreated, async (event: DiaryEntryCreated) => {
    console.log('Diary entry created:', event.diaryEntry.id.toString());
    // Here we could trigger other actions when a diary entry is created
    // For example, update streak days, check for achievements, etc.
  });
}
