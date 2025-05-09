/**
 * Command interface
 * Represents a command in the CQRS pattern
 */
export interface ICommand {
  readonly type: string;
}
