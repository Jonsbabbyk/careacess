import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, ChevronDown } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { ChatMessage } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Simulated responses for the chatbot
const getBotResponse = (message: string): string => {
  message = message.toLowerCase();
  
  if (message.includes('hello') || message.includes('hi')) {
    return "Hello! I'm AccessBuddy. How can I help you with accessibility in the Bronx today?";
  }
  
  if (message.includes('wheelchair') || message.includes('accessible') || message.includes('ramp')) {
    return "Many locations in the Bronx are wheelchair accessible. You can check our map for accessible locations near you, or ask about a specific place.";
  }
  
  if (message.includes('subway') || message.includes('train') || message.includes('transportation')) {
    return "In the Bronx, 13 subway stations are fully accessible with elevators. The MTA also offers Access-A-Ride for eligible passengers with disabilities. Would you like more information about accessible transportation?";
  }
  
  if (message.includes('restaurant') || message.includes('eat') || message.includes('food')) {
    return "There are several accessible restaurants in the Bronx. Some popular accessible options include Havana Cafe, Emilia's Restaurant, and Patricia's. Would you like information about a specific area of the Bronx?";
  }
  
  if (message.includes('park') || message.includes('recreation')) {
    return "The Bronx has several accessible parks, including parts of Van Cortlandt Park, Pelham Bay Park, and St. Mary's Park. These parks have accessible paths, restrooms, and parking.";
  }
  
  if (message.includes('thank')) {
    return "You're welcome! I'm happy to help. Is there anything else you'd like to know about accessibility in the Bronx?";
  }
  
  return "I'm not sure about that specifically. Could you rephrase your question about accessibility in the Bronx? You can ask about wheelchair access, public transportation, restaurants, parks, or specific locations.";
};

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      text: "Hi there! I'm AccessBuddy, your AI assistant for accessibility information in the Bronx. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setSpeechSupported(true);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when messages change
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      text: input,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot response with a small delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: uuidv4(),
        text: getBotResponse(input),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const toggleSpeechRecognition = () => {
    if (!speechSupported) return;
    
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // This is a simulation since we don't have access to the actual Web Speech API in this environment
      // In a real implementation, this would use the SpeechRecognition API
      setTimeout(() => {
        setInput('Where can I find accessible restaurants in the Bronx?');
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Ask AccessBuddy" 
        description="Have questions about accessibility in the Bronx? I'm here to help! Type your question or use voice commands."
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden flex flex-col h-[calc(100vh-20rem)] min-h-[500px]">
        {/* Chat messages area */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl rounded-lg px-4 py-2 ${
                    message.isUser 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none'
                  }`}
                >
                  <p className="text-sm sm:text-base">{message.text}</p>
                  <span className="block text-right mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messageEndRef}></div>
          </div>
        </div>
        
        {/* Input area */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question about accessibility..."
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              aria-label="Type your question"
            />
            
            {speechSupported && (
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-2 rounded-md ${
                  isRecording 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}
                aria-label={isRecording ? "Stop recording" : "Start voice recording"}
                title={isRecording ? "Stop recording" : "Start voice recording"}
              >
                {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
              </button>
            )}
            
            <button
              type="submit"
              className="p-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
          
          <div className="mt-2 text-center">
            <button
              type="button"
              className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light"
              aria-expanded="false"
            >
              <span>Suggested questions</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                onClick={() => setInput("What subway stations in the Bronx are accessible?")}
                className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                What subway stations in the Bronx are accessible?
              </button>
              <button
                onClick={() => setInput("Where can I find accessible restaurants?")}
                className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Where can I find accessible restaurants?
              </button>
              <button
                onClick={() => setInput("Are there accessible parks in the Bronx?")}
                className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Are there accessible parks in the Bronx?
              </button>
              <button
                onClick={() => setInput("What accessibility resources are available?")}
                className="text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-left text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                What accessibility resources are available?
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>Note:</strong> This is a demonstration chatbot with simulated responses about accessibility in the Bronx. 
          In a production version, this would connect to a more sophisticated AI model with comprehensive accessibility data.
        </p>
      </div>
    </PageContainer>
  );
};

export default ChatbotPage;