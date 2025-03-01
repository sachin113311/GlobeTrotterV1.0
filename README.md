Project Overview
Globetrotter Frontend is an Angular-based web application that provides a trivia game where users can answer questions about different cities around the world. Users can register, answer questions, and challenge their friends to beat their scores.

Tech Choices
- Angular: The primary framework used for building the frontend of the application.
- TypeScript: The programming language used for development, providing static typing.
- Express: Used for server-side rendering and handling API requests.
- Axios: For making HTTP requests to the backend API.
- Canvas-Confetti: For displaying confetti animations on correct answers.
- RxJS: For reactive programming with observables.
- Zone.js: For managing asynchronous operations in Angular.


Setup Instructions
1.Clone the Repository:
      git clone https://github.com/your-username/globetrotter-frontend.git
      cd globetrotter-frontend

2.Install Dependencies: npm install

3.Run the Application: ng serve

4.Run Tests: npm test

5.Build the Application: npm run build

6.Serve the Application with SSR: npm run serve:ssr:globetrotter-frontend

Key Files
- src/app/app.component.ts: Main component handling the game logic.
- src/app/city-trivia.service.ts: Service for interacting with the backend API.
- src/app/app.component.html: Template for the main component.
- src/app/app.component.css: Styles for the main component.

Development Tools
- Visual Studio Code: Recommended IDE for development.
- Angular CLI: For scaffolding and managing the Angular project.
- Karma: For running unit tests.
- Jasmine: Testing framework used with Karma.

Contributing
- Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

License
- This project is licensed under the MIT License. See the LICENSE file for details.
