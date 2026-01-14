# RefineryIQ Chatbot Setup

## Gemini API Integration

The RefineryIQ chatbot is now powered by Google's Gemini AI for intelligent, context-aware responses about refinery operations.

### Setup Instructions

1. **Environment Configuration**
   - The Gemini API key is stored in the `.env` file
   - The `.env` file is git-ignored for security
   - Use `.env.example` as a template for other developers

2. **API Key**
   - Your Gemini API key is configured and ready to use
   - The key is automatically loaded via `import.meta.env.VITE_GEMINI_API_KEY`

3. **Running the Application**
   ```bash
   cd client
   npm install  # or bun install
   npm run dev  # or bun dev
   ```

4. **Chatbot Features**
   - Real-time AI responses powered by Gemini 1.5 Flash
   - Context-aware answers about:
     - Energy consumption and SEC metrics
     - Active alerts and alarms
     - Optimization recommendations
     - Performance predictions
     - Unit status and efficiency
   - Text-to-speech support (toggle audio on/off)
   - Fallback to local responses if API is unavailable

### How It Works

The chatbot sends your question along with current refinery data to the Gemini API, which provides intelligent, contextual responses. The system includes:

- **Smart Context**: Automatically includes relevant refinery KPIs, alerts, and unit status
- **Error Handling**: Graceful fallback if the API is unavailable
- **Data Integration**: Links AI responses with actual refinery data
- **Security**: API key stored securely in environment variables

### Testing the Chatbot

Click the chat icon in the bottom-right corner and try questions like:
- "What's the current SEC?"
- "Show me active alerts"
- "What optimization recommendations do you have?"
- "How is the FCC unit performing?"
- "Predict tomorrow's energy consumption"

### Security Notes

- Never commit the `.env` file to version control
- The `.env.example` file shows the required format without exposing keys
- Regenerate API keys if they are accidentally exposed
