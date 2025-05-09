/**
 * Dependency Injection Container
 * Manages dependencies and ensures loose coupling
 */
export class Container {
  private static instance: Container;
  private services: Map<string, any> = new Map();
  
  /**
   * Get the singleton instance of the container
   */
  static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }
  
  /**
   * Register a service with the container
   * @param token The token to register the service under
   * @param instance The service instance
   */
  register<T>(token: string, instance: T): void {
    this.services.set(token, instance);
  }
  
  /**
   * Resolve a service from the container
   * @param token The token to resolve
   */
  resolve<T>(token: string): T {
    if (!this.services.has(token)) {
      throw new Error(`Service not registered: ${token}`);
    }
    return this.services.get(token);
  }
}
