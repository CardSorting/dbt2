import { useViewModel } from '../../common/hooks/useViewModel';
import { DiaryViewModel } from '../viewModels/DiaryViewModel';

/**
 * Hook to use the diary view model
 */
export function useDiaryViewModel(): DiaryViewModel {
  return useViewModel(() => new DiaryViewModel());
}
