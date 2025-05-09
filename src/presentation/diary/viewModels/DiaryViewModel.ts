import { makeAutoObservable, runInAction } from 'mobx';
import { ICommandBus } from '../../../application/common/interfaces/ICommandBus';
import { IQueryBus } from '../../../application/common/interfaces/IQueryBus';
import { CreateDiaryEntryCommand } from '../../../application/diary/commands/CreateDiaryEntryCommand';
import { DiaryEntryDto } from '../../../application/diary/dto/DiaryEntryDto';
import { GetDiaryEntriesQuery } from '../../../application/diary/queries/GetDiaryEntriesQuery';
import { Container } from '../../../infrastructure/di/Container';

/**
 * DiaryViewModel
 * View model for the diary screen
 */
export class DiaryViewModel {
  diaryEntries: DiaryEntryDto[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  
  private commandBus: ICommandBus;
  private queryBus: IQueryBus;
  
  constructor() {
    makeAutoObservable(this);
    
    const container = Container.getInstance();
    this.commandBus = container.resolve<ICommandBus>('CommandBus');
    this.queryBus = container.resolve<IQueryBus>('QueryBus');
  }
  
  /**
   * Load diary entries
   * @param days Number of days to load
   */
  async loadEntries(days: number = 7): Promise<void> {
    this.isLoading = true;
    this.error = null;
    
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const query = new GetDiaryEntriesQuery(startDate, endDate);
      const entries = await this.queryBus.execute<GetDiaryEntriesQuery, DiaryEntryDto[]>(query);
      
      runInAction(() => {
        this.diaryEntries = entries;
      });
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : 'An error occurred';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
  
  /**
   * Save a diary entry
   */
  async saveDiaryEntry(
    emotions: { name: string, intensity: number }[],
    urges: { name: string, intensity: number, acted: boolean }[],
    skillsUsed: string[],
    notes: string
  ): Promise<void> {
    this.isLoading = true;
    this.error = null;
    
    try {
      const command = new CreateDiaryEntryCommand(
        new Date(),
        emotions,
        urges,
        skillsUsed,
        notes
      );
      
      await this.commandBus.dispatch(command);
      await this.loadEntries(); // Refresh the list
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : 'An error occurred';
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
  
  /**
   * Dispose of the view model
   */
  dispose(): void {
    // Clean up any resources
  }
}
