import { ICommand } from './ICommand';
import { ICommandHandler } from './ICommandHandler';

/**
 * Command Bus interface
 * Represents a bus that dispatches commands to their handlers
 */
export interface ICommandBus {
  /**
   * Register a handler for a specific command type
   * @param commandType The command type
   * @param handler The handler for the command
   */
  registerHandler<T extends ICommand>(
    commandType: new (...args: any[]) => T,
    handler: ICommandHandler<T>
  ): void;
  
  /**
   * Dispatch a command to its handler
   * @param command The command to dispatch
   */
  dispatch<T extends ICommand>(command: T): Promise<void>;
}
