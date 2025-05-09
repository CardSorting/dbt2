import { useEffect, useState } from 'react';

/**
 * Base hook for view models
 * @param createViewModel Function to create the view model
 * @param deps Dependencies array for the useEffect hook
 */
export function useViewModel<T>(createViewModel: () => T, deps: any[] = []): T {
  const [viewModel] = useState<T>(createViewModel);
  
  useEffect(() => {
    // Cleanup function for the view model
    return () => {
      const vm = viewModel as any;
      if (vm && typeof vm.dispose === 'function') {
        vm.dispose();
      }
    };
  }, deps);
  
  return viewModel;
}
