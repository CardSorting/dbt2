import { ICommand } from '../../common/interfaces/ICommand';

/**
 * CreateDiaryEntryCommand
 * Command to create a new diary entry
 */
export class CreateDiaryEntryCommand implements ICommand {
  readonly type = 'CreateDiaryEntryCommand';
  
  constructor(
    public readonly date: Date,
    public readonly emotions: { name: string; intensity: number }[],
    public readonly urges: { name: string; intensity: number; acted: boolean }[],
    public readonly skillsUsed: string[],
    public readonly notes: string
  ) {}
}
