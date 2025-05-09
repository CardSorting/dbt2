# DBT App Architecture Diagrams

## Layered Architecture

```mermaid
graph TD
    subgraph "Presentation Layer"
        UI[UI Components]
        Screens[Screens]
        ViewModels[View Models]
        Hooks[Hooks]
    end
    
    subgraph "Application Layer"
        Commands[Commands]
        Queries[Queries]
        CommandHandlers[Command Handlers]
        QueryHandlers[Query Handlers]
        DTOs[DTOs]
    end
    
    subgraph "Domain Layer"
        Entities[Entities]
        ValueObjects[Value Objects]
        DomainEvents[Domain Events]
        Repositories[Repository Interfaces]
    end
    
    subgraph "Infrastructure Layer"
        RepositoryImpl[Repository Implementations]
        CommandBus[Command Bus]
        QueryBus[Query Bus]
        EventBus[Event Bus]
        DI[Dependency Injection]
    end
    
    UI --> Screens
    Screens --> ViewModels
    ViewModels --> Hooks
    
    ViewModels --> Commands
    ViewModels --> Queries
    Commands --> CommandBus
    Queries --> QueryBus
    
    CommandBus --> CommandHandlers
    QueryBus --> QueryHandlers
    
    CommandHandlers --> Entities
    CommandHandlers --> ValueObjects
    CommandHandlers --> DomainEvents
    CommandHandlers --> Repositories
    
    QueryHandlers --> Repositories
    QueryHandlers --> DTOs
    
    Repositories --> RepositoryImpl
    DomainEvents --> EventBus
    
    style Presentation fill:#f9f,stroke:#333,stroke-width:2px
    style Application fill:#bbf,stroke:#333,stroke-width:2px
    style Domain fill:#bfb,stroke:#333,stroke-width:2px
    style Infrastructure fill:#fbb,stroke:#333,stroke-width:2px
```

## Bounded Contexts

```mermaid
graph TD
    subgraph "DBT Application"
        SkillsLibrary[Skills Library Context]
        EmotionTracking[Emotion Tracking Context]
        PracticeExercises[Practice Exercises Context]
        ProgressAnalytics[Progress Analytics Context]
    end
    
    SkillsLibrary --> EmotionTracking
    EmotionTracking --> ProgressAnalytics
    PracticeExercises --> ProgressAnalytics
```

## Command Flow Example

```mermaid
sequenceDiagram
    participant UI as UI Component
    participant VM as ViewModel
    participant CB as Command Bus
    participant CH as Command Handler
    participant E as Entity
    participant R as Repository
    participant EB as Event Bus
    participant ES as Event Subscribers
    
    UI->>VM: saveDiaryEntry(...)
    VM->>CB: dispatch(CreateDiaryEntryCommand)
    CB->>CH: handle(CreateDiaryEntryCommand)
    CH->>E: DiaryEntry.create(...)
    CH->>R: save(diaryEntry)
    CH->>EB: publish(DiaryEntryCreated)
    EB->>ES: notify subscribers
    VM->>UI: update UI
```

## Query Flow Example

```mermaid
sequenceDiagram
    participant UI as UI Component
    participant VM as ViewModel
    participant QB as Query Bus
    participant QH as Query Handler
    participant R as Repository
    participant DTO as DTO
    
    UI->>VM: loadEntries()
    VM->>QB: execute(GetDiaryEntriesQuery)
    QB->>QH: handle(GetDiaryEntriesQuery)
    QH->>R: findByDateRange(...)
    R-->>QH: diaryEntries
    QH->>DTO: map entities to DTOs
    DTO-->>QH: diaryEntryDtos
    QH-->>QB: diaryEntryDtos
    QB-->>VM: diaryEntryDtos
    VM->>UI: update UI
```

## Domain Model

```mermaid
classDiagram
    class DiaryEntry {
        +UniqueId id
        +Date date
        +Emotion[] emotions
        +Urge[] urges
        +SkillReference[] skillsUsed
        +string notes
        +addEmotion(Emotion)
        +removeEmotion(string)
        +addUrge(Urge)
        +removeUrge(string)
        +addSkillUsed(SkillReference)
        +removeSkillUsed(string)
        +updateNotes(string)
    }
    
    class Emotion {
        +string name
        +number intensity
    }
    
    class Urge {
        +string name
        +number intensity
        +boolean acted
    }
    
    class SkillReference {
        +string skillId
    }
    
    class Skill {
        +UniqueId id
        +string name
        +string description
        +string[] examples
        +string[] steps
        +updateDescription(string)
        +addExample(string)
        +removeExample(number)
        +addStep(string)
        +removeStep(number)
    }
    
    class SkillModule {
        +UniqueId id
        +string name
        +string description
        +Skill[] skills
        +updateDescription(string)
        +addSkill(Skill)
        +removeSkill(UniqueId)
        +getSkillById(UniqueId)
    }
    
    class Exercise {
        +UniqueId id
        +string title
        +string description
        +string category
        +string duration
        +string difficulty
        +ExerciseStep[] steps
        +updateDescription(string)
        +updateDifficulty(string)
        +addStep(ExerciseStep)
        +removeStep(number)
        +updateStep(number, ExerciseStep)
    }
    
    class ExerciseStep {
        +string instruction
        +string details
    }
    
    class Achievement {
        +UniqueId id
        +string title
        +string description
        +Date date
        +string icon
        +boolean completed
        +complete()
        +updateDescription(string)
        +updateIcon(string)
    }
    
    DiaryEntry "1" *-- "many" Emotion
    DiaryEntry "1" *-- "many" Urge
    DiaryEntry "1" *-- "many" SkillReference
    SkillModule "1" *-- "many" Skill
    Exercise "1" *-- "many" ExerciseStep
    SkillReference "many" --> "1" Skill
