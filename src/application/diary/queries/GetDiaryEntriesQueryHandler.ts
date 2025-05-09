import { IQueryHandler } from '../../common/interfaces/IQueryHandler';
import { IDiaryRepository } from '../../../domain/diary/repositories/IDiaryRepository';
import { DiaryEntryDto } from '../dto/DiaryEntryDto';
import { GetDiaryEntriesQuery } from './GetDiaryEntriesQuery';

/**
 * GetDiaryEntriesQueryHandler
 * Handles the GetDiaryEntriesQuery
 */
export class GetDiaryEntriesQueryHandler implements IQueryHandler<GetDiaryEntriesQuery, DiaryEntryDto[]> {
  constructor(private diaryRepository: IDiaryRepository) {}
  
  async handle(query: GetDiaryEntriesQuery): Promise<DiaryEntryDto[]> {
    const entries = await this.diaryRepository.findByDateRange(
      query.startDate,
      query.endDate,
      query.limit
    );
    
    // Map domain entities to DTOs
    return entries.map(entry => DiaryEntryDto.fromEntity(entry));
  }
}
