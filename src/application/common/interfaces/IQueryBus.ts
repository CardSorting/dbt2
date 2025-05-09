import { IQuery } from './IQuery';
import { IQueryHandler } from './IQueryHandler';

/**
 * Query Bus interface
 * Represents a bus that executes queries through their handlers
 */
export interface IQueryBus {
  /**
   * Register a handler for a specific query type
   * @param queryType The query type
   * @param handler The handler for the query
   */
  registerHandler<TQuery extends IQuery<TResult>, TResult>(
    queryType: new (...args: any[]) => TQuery,
    handler: IQueryHandler<TQuery, TResult>
  ): void;
  
  /**
   * Execute a query through its handler
   * @param query The query to execute
   */
  execute<TQuery extends IQuery<TResult>, TResult>(query: TQuery): Promise<TResult>;
}
