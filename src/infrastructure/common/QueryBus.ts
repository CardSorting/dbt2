import { IQuery } from '../../application/common/interfaces/IQuery';
import { IQueryBus } from '../../application/common/interfaces/IQueryBus';
import { IQueryHandler } from '../../application/common/interfaces/IQueryHandler';

/**
 * QueryBus implementation
 * Executes queries through their registered handlers
 */
export class QueryBus implements IQueryBus {
  private handlers: Map<string, IQueryHandler<any, any>> = new Map();
  
  /**
   * Register a handler for a specific query type
   */
  registerHandler<TQuery extends IQuery<TResult>, TResult>(
    queryType: new (...args: any[]) => TQuery,
    handler: IQueryHandler<TQuery, TResult>
  ): void {
    const instance = new queryType() as TQuery;
    this.handlers.set(instance.type, handler);
  }
  
  /**
   * Execute a query through its handler
   */
  async execute<TQuery extends IQuery<TResult>, TResult>(query: TQuery): Promise<TResult> {
    const handler = this.handlers.get(query.type) as IQueryHandler<TQuery, TResult>;
    
    if (!handler) {
      throw new Error(`No handler registered for query type: ${query.type}`);
    }
    
    return await handler.handle(query);
  }
}
