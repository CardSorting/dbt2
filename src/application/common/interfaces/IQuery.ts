/**
 * Query interface
 * Represents a query in the CQRS pattern
 */
export interface IQuery<TResult> {
  readonly type: string;
}
