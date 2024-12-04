# Supplementary Document

## Overall Design

### Open-Closed Principle
The class FileRepository used to have two methods, one for S3 upload handling and the other for file upload handling. To better align with SOLID design patterns, we changed FileRepository into an abstract class, with Data Access Objects titled LocalFileRepo and S3FileRepo to implement the two upload functions. This fulfills the Open-Closed Principle, which states that the behaviour of a class should be extended without modifying the class. Initially, we changed the original class FileRepository to incorporate S3 upload, but now instead of writing new functions if we want to implement a new upload feature, we can make new Data Access Objects instead of modifying the original class – **this adds to extensibility of the project** as we can easily incorporate new upload features as objects.  

### Liskov Substitution Principle
Another SOLID Principle we implement is the Liskov Substitution Principle. Under backend/core/adapters, ImplBiasMetrics and ImplFileConverter implement the BiasMetrics and FileConverter abstract classes (equivalent to interfaces in Java) respectively. The abstract classes can be found under backend/core/use cases. By having ImplBiasMetrics and ImplFileConverter inherit from their respective superclasses, the behaviour of the subclasses become predictable and less error-prone.

#### SOLID Notes:
In the backend, our interactors use a factory, which returns a concrete implementation of our abstract classes. Ideally, these factories would be passed into the interactors to allow for modular code and to better adhere to dependency injection (as the factory implementation can be changed without affecting the interactor’s code). However, we decided not to move forward with this design decision because parameters required to call some factories are created after the instantiation of our interactors. Regardless of the way the factories are implemented however, the code depends on the abstract implementation (so only abstract methods are called). 

### Design Patterns
Our group used the simple factory and dependency injection design patterns to connect together the controllers, interactors and data access classes to the Django viewset. This can be seen in the bias_metrics_factories.py file under backend/infrastructure/factories. Here, we import the interactors and create them using factories for each interactor. The factories are then all called in the BiasMetricsViewsetFactory to produce interactors which instantiate BiasMetricsController by dependency injection. The factories help to encapsulate and centralize the use case creation logic, which increases readability and maintainability.

## Accessibility

### General Report
All interactive components are focusable by the user. Heading tags were carefully chosen to ensure correct hierarchy as well.  Additionally, we ensured our graph is focusable and wrote aria labels for each bar to ensure the user understood the context. An example of this is as follows: 

“The sender_gender bar has a score of 0.3”

Our graphs are interactive and will enlarge when clicked in order to accommodate for any visually-impaired users. This modal (popup of each graph) also maintains accessibility: as the modal opens, the screen reader announces this to the user, and the graph focusing functionalities remain the same. 

In addition to this, our program generates a colour for the letter grade corresponding to the fairness score percentage. To ensure accessibility, our component calculates the luminance of the Letter grade background colour to determine whether the Letter should be black or white, ensuring high contrast for users with visual impairments. Similarly, we implement this same feature in our graphs; the text corresponding to the value of the metric changes depending on the luminance of the bar in the graph. 

In the dashboard popup, we know there is an issue with the screen reader reading the metric description before the graph title or graph.  

### Target Users and Underrepresented Users
Our target users are the machine learning engineers at CashApp, and we are aware that some of these engineers may face limitations due to physical and mental impairments. Thus, as discussed in the general report, we introduced software design features to allow our application to be more accessible to a wider audience, regardless of whether they identify as disabled or not. The screen reader accommodates engineers who might be hearing-impaired, and we have ensured that background colors and text have high enough contrast for engineers with low-vision.

Underrepresented users include those who are not CashApp stakeholders as they would not understand the use of our program with fraud detection AI models. As this is very specific to CashApp’s problem domain, it would take extra effort to help an external user understand bias is fraud detection AI models. 

## Universal Principles

### Equitable Use
We have accommodated both visually impaired users, low-vision users and low-mobility users by ensuring that our application adheres to WCAG. For instance, buttons and text inputs are assigned aria labels when necessary, background colors and text were verified for sufficient color contrast and only interactive elements like buttons and links are accessible through tabbing.

### Flexibility in Use
We have provided our users with the option to upload files in two ways, using local upload and s3 link upload. This allows the user to use our bias detector in many ways and circumstances, including when datasets are remotely stored for data privacy purposes. 

### Simple and Intuitive Use
We provide users with a ‘handy guide’, using simple, to-the-point phrasing for users to easily understand the program's instructions. Despite the programs being directed towards machine learning engineers, ByeByeBias makes it easy for every ML engineer, regardless of literacy and technical knowledge, to understand our user experience. 

### Perceptible Information
The website is fully usable for users via tabbing through the website and using a screen reader. We have also ensured background colors and text have high enough contrast for users with low-vision.

### Tolerance for Error
Error catching is implemented to minimize the unintended actions of the user. For example, during the File Upload portion of the website, the website will only allow the user to either upload locally or use an Amazon S3 link. Additionally, the website will ensure that the link format is correct for processing to proceed. 

### Low Physical Effort
The user can tab through all action items in the program to minimize physical effort. 

### Appropriate Size and Space for Approach and Use
The website is built responsively in terms of functionality using Material UI, so the application can be used on platforms of varying sizes, such as on mobile, on a laptop or on a TV.


## Clean Architecture (Michelle’s PR) 
Followed the [Django Clean Architecture](https://sdediego.hashnode.dev/django-clean-architecture) guide to refactor the Django backend to align with clean architecture. This refactoring stage does not have abstract classes yet which mimic interfaces in Java since they are added in a separate PR.

## Code Quality
Code quality was ensured through thorough the following points:
- Frontend and backend tests, with an overall coverage of >80%
- CI/CD pipeline which runs the tests and builds the application whenever a PR is made and when a PR is merged with main
- Used the Prettier formatter to ensure code quality for all frontend files
- Ensured each PR had coherent code through requiring 2 reviewers before being merged to main (during sprint, we changed this to 1 reviewer required)

## Code Organization
Code organization was ensured thoroughly through the following points:
- Our code is structured according to the layers of Clean Architecture
- Package naming conventions are always properly followed: Python files and folders are always lowercase with underscores, eg. bias_metrics_factories.py and frontend files follow correct and consistent capitalization, eg. LetterGrade.tsx

## Extenuating Circumstances
Chloe became sick and had to go to the ER for the last week of November.
