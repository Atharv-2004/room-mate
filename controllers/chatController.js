const { v4: uuidv4 } = require('uuid');
const { getChatResponse } = require('../utils/openai');
const { getRoomOptions, bookRoom } = require('../utils/roomApi');
const Conversation = require('../models/conversation');

async function handleChat(req, res) {
  try {
    const { message, userId } = req.body;
    const newUserId = userId || uuidv4();

    // Save user message to conversation history
    await Conversation.create({
      userId: newUserId,
      message: message,
      isUser: true
    });

    // Fetch conversation history
    const history = await Conversation.findAll({
      where: { userId: newUserId },
      order: [['createdAt', 'ASC']]
    });

    const messages = history.map(entry => ({
      role: entry.isUser ? 'user' : 'assistant',
      content: entry.message
    }));

    // Get response from OpenAI
    const response = await getChatResponse(messages);

    if (response.function_call) {
      let functionResult;
      if (response.function_call.name === 'get_room_options') {
        functionResult = await getRoomOptions();
      } else if (response.function_call.name === 'book_room') {
        const args = JSON.parse(response.function_call.arguments);
        functionResult = await bookRoom(args.roomId, args.fullName, args.email, args.nights);
      }

      const secondResponse = await getChatResponse([
        ...messages,
        response,
        {
          role: 'function',
          name: response.function_call.name,
          content: JSON.stringify(functionResult)
        }
      ]);

      // Save bot response to conversation history
      await Conversation.create({
        userId: newUserId,
        message: secondResponse.content,
        isUser: false
      });

      res.json({ message: secondResponse.content, userId: newUserId });
    } else {
      // Save bot response to conversation history
      await Conversation.create({
        userId: newUserId,
        message: response.content,
        isUser: false
      });

      res.json({ message: response.content, userId: newUserId });
    }
  } catch (error) {
    console.error('Error handling chat:', error);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
}

async function getChatHistory(req, res) {
    try {
      const history = await Conversation.findAll({
        order: [['createdAt', 'ASC']]
      });
  
      const formattedHistory = history.map(entry => ({
        id: entry.id,
        userId: entry.userId,
        message: entry.message,
        isUser: entry.isUser,
        timestamp: entry.createdAt
      }));
  
      res.json(formattedHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      res.status(500).json({ error: 'An error occurred while fetching chat history.' });
    }
  }
module.exports = { handleChat, getChatHistory };
