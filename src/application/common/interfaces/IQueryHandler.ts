import { IQuery } from './IQuery';

/**
 * Query Handler interface
 * Represents a handler for a specific query type
 */
export interface IQueryHandler<TQuery extends IQuery<TResult>, TResult> {
  /**
   * Handle the query
   * @param query The query to handle
   */
  handle(query: TQuery): Promise<TResult>;
}
