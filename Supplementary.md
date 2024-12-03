# Supplementary Document

#### Solid and Design Patterns (Akshata’s PR)
The class FileRepository used to have two methods, one for S3 upload handling and the other for file upload handling. To better align with SOLID design patterns, we changed FileRepository into an abstract class, with Data Access Objects titled LocalFileRepo and S3FileRepo to implement the two upload functions. This fulfills the Open-Closed Principle, which states that the behaviour of a class should be extended without modifying the class. Initially, we changed the original class FileRepository to incorporate S3 upload, but now instead of writing new functions if we want to implement a new upload feature, we can make new Data Access Objects instead of modifying the original class.

#### Some Notes
In the backend, our interactors use a factory, which returns a concrete implementation of our abstract classes. Ideally, these factories would be passed into the interactors to allow for modular code and to better adhere to dependency injection (as the factory implementation can be changed without affecting the interactor’s code). However, we decided not to move forward with this design decision because parameters required to call some factories are created after the instantiation of our interactors. Regardless of the way the factories are implemented however, the code depends on the abstract implementation (so only abstract methods are called) 

#### Accessibility 
In the dashboard popup, we know there is an issue with the screen reader reading the metric description before the graph title or graph.  

#### Clean Architecture (Michelle’s PR)

Followed the [Django Clean Architecture](https://sdediego.hashnode.dev/django-clean-architecture) guide to refactor the Django backend to align with clean architecture. This refactoring does not have abstract classes which mimic interfaces in Java yet since they are added as a separate PR.

#### Code Quality

Code quality was ensured through thorough the following points:

- Frontend and backend tests
- CI/CD pipeline which runs the tests and builds the application whenever a PR is made and when a PR is merged with main
- Used the Prettier formatter
- Ensured each PR had coherent code through requiring 2 reviewers before being merged to main (during sprint, we changed this to 1 reviewer required)

#### Code Organization

Code organization was ensured through thorough the following points:

- Our code is structured according to the layers of Clean Architecture
- Package naming conventions are always properly followed: Python files and folders are always lowercase with underscores, eg. bias_metrics_factories.py, Frontend files follow correct and consistent capitalization, eg. LetterGrade.tsx

#### Extenuating Circumstances

Chloe became sick and had to go to the ER for the last week of November.
