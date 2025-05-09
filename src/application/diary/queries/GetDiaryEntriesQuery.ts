import { IQuery } from '../../common/interfaces/IQuery';
import { DiaryEntryDto } from '../dto/DiaryEntryDto';

/**
 * GetDiaryEntriesQuery
 * Query to get diary entries within a date range
 */
export class GetDiaryEntriesQuery implements IQuery<DiaryEntryDto[]> {
  readonly type = 'GetDiaryEntriesQuery';
  
  constructor(
    public readonly startDate?: Date,
    public readonly endDate?: Date,
    public readonly limit?: number
  ) {}
}
