## Room-mate Chatbot

### Description

Room-mate is a chatbot application that interacts with users to provide information about available room options and allows users to book rooms. The chatbot utilizes OpenAI for generating responses and interacts with a backend API to fetch room options and book rooms.


### Features

- **Chat Interface**: Users can interact with the chatbot by sending messages.
- **Conversation History**: The chatbot maintains a conversation history for each user.
- **OpenAI Integration**: Responses are generated using the OpenAI API.
- **Room Booking**: Users can book rooms through the chatbot.
  
### Technologies Used

- **Node.js**: Backend server environment.
- **Express.js**: Web framework for handling API routes.
- **Sequelize**: ORM for interacting with the SQLite database.
- **OpenAI API**: Used for generating chatbot responses.
- **Axios**: HTTP client for making API requests.
- **dotenv**: Environment variable management.
- **uuid**: Library for generating unique user IDs.

  
### Setup Instructions

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up the environment variables in a `.env` file, including `OPENAI_API_KEY`.
4. Start the server using `node server.js`.
5. Access the chatbot interface in a web browser.

   
### API Endpoints

- **POST /api/chat**: Endpoint for handling user messages and generating chatbot responses.
- **GET /api/history**: Endpoint to fetch the conversation history.

  
### Folder Structure

- **controllers**: Contains the logic for handling chat interactions.
- **models**: Defines the Sequelize model for storing conversation history.
- **routes**: Defines API routes for chat interactions.
- **utils**: Contains utility functions for interacting with OpenAI and external APIs.
- **public**: Contains frontend assets for the chat interface.

  
### Additional Notes

- Ensure the SQLite database file (`database.sqlite`) is created and accessible.
- Customize the chatbot behavior by modifying the OpenAI model and functions in `utils/openai.js`.

  
### Author
Atharv Sanjay Jain
