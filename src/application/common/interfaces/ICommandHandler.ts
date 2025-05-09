import { ICommand } from './ICommand';

/**
 * Command Handler interface
 * Represents a handler for a specific command type
 */
export interface ICommandHandler<T extends ICommand> {
  /**
   * Handle the command
   * @param command The command to handle
   */
  handle(command: T): Promise<void>;
}
