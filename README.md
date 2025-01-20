# Tic-Tac-Toe Backend

This is the backend for a Tic-Tac-Toe game, which handles the game logic, user management, and game history tracking. The system allows users to play Tic-Tac-Toe with each other while maintaining a record of the game's progress.

## Approach

1. **User Management**:
   - Users can register and authenticate using basic authentication (username and password).
   - Sessions are managed to ensure that each game is linked to a specific user.
   
2. **Game Logic**:
   - The game is implemented using a two-player system where players take turns.
   - The backend tracks each player's moves and determines the winner based on the game rules (three consecutive marks in a row, column, or diagonal).
   
3. **Game History**:
   - The backend stores each completed game, including player details, moves, and the result (win/lose/draw).
   - This allows users to view their past games.

4. **API Design**:
   - RESTful API endpoints are used for game creation, making moves, fetching game status, and retrieving game history.
   - Example endpoints:
     - `POST /createGame`: Create a new game.
     - `POST /makeMove`: Make a move during the game.
     - `GET /gameStatus`: Get the current status of a game.
     - `GET /gameHistory`: View past games for a user.

## Design

- The backend is designed using a **Node.js** server and **Express** framework to handle HTTP requests.
- **MongoDB** is used for data storage, including user information and game history.
- The game logic is kept simple and runs in-memory, with basic error handling in place.
  
## Assumptions

- Players will only play one game at a time, and game sessions will be tracked with simple authentication.
- A valid move will be one within the bounds of the game grid (i.e., no out-of-bounds or already occupied spaces).
- The backend is designed to handle only two players per game.

## Installation

To run the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tic-tac-toe-backend
