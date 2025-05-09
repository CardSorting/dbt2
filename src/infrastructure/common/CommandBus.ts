import { ICommand } from '../../application/common/interfaces/ICommand';
import { ICommandBus } from '../../application/common/interfaces/ICommandBus';
import { ICommandHandler } from '../../application/common/interfaces/ICommandHandler';

/**
 * CommandBus implementation
 * Dispatches commands to their registered handlers
 */
export class CommandBus implements ICommandBus {
  private handlers: Map<string, ICommandHandler<ICommand>> = new Map();
  
  /**
   * Register a handler for a specific command type
   */
  registerHandler<T extends ICommand>(
    commandType: new (...args: any[]) => T,
    handler: ICommandHandler<T>
  ): void {
    const instance = new commandType() as T;
    this.handlers.set(instance.type, handler as ICommandHandler<ICommand>);
  }
  
  /**
   * Dispatch a command to its handler
   */
  async dispatch<T extends ICommand>(command: T): Promise<void> {
    const handler = this.handlers.get(command.type);
    
    if (!handler) {
      throw new Error(`No handler registered for command type: ${command.type}`);
    }
    
    await handler.handle(command);
  }
}
