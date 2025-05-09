# DBT App Architecture

This document outlines the architecture of the DBT (Dialectical Behavior Therapy) app, which follows SOLID principles, Domain-Driven Design (DDD), Clean Architecture, and the Command Query Responsibility Segregation (CQRS) pattern.

## Architecture Overview

The application is structured into four main layers:

```
src/
├── domain/         # Domain layer - Core business logic
├── application/    # Application layer - Use cases
├── infrastructure/ # Infrastructure layer - Technical implementations
└── presentation/   # Presentation layer - UI components
```

### Domain Layer

The domain layer contains the core business logic and entities of the application. It is independent of any external frameworks or libraries.

- **Entities**: Core business objects (e.g., DiaryEntry, Skill, Exercise)
- **Value Objects**: Immutable objects that represent concepts in the domain (e.g., Emotion, Urge)
- **Domain Events**: Events that represent something significant that happened in the domain
- **Repository Interfaces**: Contracts for data access

### Application Layer

The application layer contains the use cases of the application. It orchestrates the flow of data to and from the domain layer.

- **Commands**: Represent intentions to change the state of the system
- **Command Handlers**: Execute commands and apply business logic
- **Queries**: Represent requests for data
- **Query Handlers**: Execute queries and return data
- **DTOs**: Data Transfer Objects for transferring data between layers

### Infrastructure Layer

The infrastructure layer contains implementations of the interfaces defined in the domain and application layers.

- **Repositories**: Implementations of repository interfaces
- **Command Bus**: Routes commands to their handlers
- **Query Bus**: Routes queries to their handlers
- **Event Bus**: Publishes domain events to subscribers
- **Dependency Injection**: Container for managing dependencies

### Presentation Layer

The presentation layer contains the UI components and view models.

- **View Models**: Manage UI state and business logic
- **Screens**: React Native components for rendering UI
- **Hooks**: Custom hooks for accessing view models

## SOLID Principles

The architecture follows the SOLID principles:

- **Single Responsibility**: Each class has one reason to change
- **Open/Closed**: Classes are open for extension but closed for modification
- **Liskov Substitution**: Subtypes can be substituted for their base types
- **Interface Segregation**: Clients should not depend on interfaces they don't use
- **Dependency Inversion**: High-level modules depend on abstractions, not concrete implementations

## Domain-Driven Design (DDD)

The architecture follows DDD principles:

- **Ubiquitous Language**: A common language shared by developers and domain experts
- **Bounded Contexts**: Clear boundaries between different parts of the domain
- **Entities and Value Objects**: Distinction between objects with identity and objects defined by their attributes
- **Aggregates**: Clusters of domain objects treated as a single unit
- **Domain Events**: Events that represent something significant that happened in the domain

## Clean Architecture

The architecture follows Clean Architecture principles:

- **Independence of Frameworks**: The domain and application layers are independent of frameworks
- **Testability**: The architecture makes the system easy to test
- **Independence of UI**: The UI can change without affecting the business rules
- **Independence of Database**: The database can change without affecting the business rules
- **Independence of External Agencies**: The business rules don't know about the outside world

## Command Query Responsibility Segregation (CQRS)

The architecture follows the CQRS pattern:

- **Command-Query Separation**: Separate models for reading and writing data
- **Command Side**: Handles commands that change the state of the system
- **Query Side**: Handles queries that return data without changing the state

## Example Flow

Here's an example flow for creating a diary entry:

1. The user fills out a form in the UI
2. The UI calls the view model's `saveDiaryEntry` method
3. The view model creates a `CreateDiaryEntryCommand` and dispatches it via the command bus
4. The command bus routes the command to the `CreateDiaryEntryCommandHandler`
5. The handler creates a `DiaryEntry` domain entity and saves it via the repository
6. The handler publishes a `DiaryEntryCreated` domain event
7. Event subscribers react to the event (e.g., updating streak days, checking for achievements)
8. The view model refreshes the UI by loading the updated diary entries

## Benefits of This Architecture

- **Maintainability**: The code is organized in a way that makes it easy to understand and modify
- **Testability**: Each layer can be tested in isolation
- **Flexibility**: The architecture allows for easy changes to the UI, database, or external services
- **Scalability**: The architecture supports scaling the application as it grows
- **Separation of Concerns**: Each layer has a clear responsibility
