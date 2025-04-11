'use client'

import React, { useEffect, useRef, useState } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';

// TypeScript declarations for window object with directLine
declare global {
  interface Window {
    directLine: any;
  }
}

const Chatbot: React.FC = () => {
  const [directLine, setDirectLine] = useState<any>(null);
  const webchatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize Bot Framework Web Chat
  useEffect(() => {
    const initializeWebChat = async () => {
      try {
        // Specifies the token endpoint URL
        const tokenEndpointURL = new URL("https://default03c540bfe8d54055af03389dfd865a.5b.environment.api.powerplatform.com/powervirtualagents/botsbyschema/cr438_agent/directline/token?api-version=2022-03-01-preview");
        
        const locale = document.documentElement.lang || 'en';
        const apiVersion = tokenEndpointURL.searchParams.get('api-version');

        // Fetch direct line URL and token in parallel
        const [directLineURL, token] = await Promise.all([
          fetch(new URL(`/powervirtualagents/regionalchannelsettings?api-version=${apiVersion}`, tokenEndpointURL))
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to retrieve regional channel settings.');
              }
              return response.json();
            })
            .then(({ channelUrlsById: { directline } }) => directline),
          
          fetch(tokenEndpointURL)
            .then(response => {
              if (!response.ok) {
                throw new Error('Failed to retrieve Direct Line token.');
              }
              return response.json();
            })
            .then(({ token }) => token)
        ]);

        // Create the Direct Line object
        const directLineObj = createDirectLine({ 
          domain: new URL('v3/directline', directLineURL), 
          token 
        });

        // Make directLine available to window for quick action buttons
        window.directLine = directLineObj;

        // Start the conversation
        const subscription = directLineObj.connectionStatus$.subscribe({
          next(value: number) {
            if (value === 2) { // 2 means connected
              directLineObj
                .postActivity({
                  localTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  locale,
                  name: 'startConversation',
                  type: 'event'
                })
                .subscribe();

              // Unsubscribe after the event is sent
              subscription.unsubscribe();
            }
          }
        });

        setDirectLine(directLineObj);
      } catch (error) {
        console.error('Failed to initialize Web Chat:', error);
      }
    };

    initializeWebChat();
  }, []);

  // Web Chat style options
  const styleOptions = {
    hideUploadButton: true,
    bubbleBackground: '#EBF5FF', // Light blue for bot messages
    bubbleBorderRadius: 12,
    bubbleFromUserBackground: '#E5E7EB', // Gray background for user messages
    bubbleFromUserBorderRadius: 12,
    bubbleFromUserTextColor: '#333333',
    sendBoxBackground: '#ffffff',
    sendBoxButtonColor: '#333333',
    avatarSize: 0, // Hide avatars
    botAvatarInitials: '',
    userAvatarInitials: '',
    suggestedActionBackground: '#EEF1F5',
    suggestedActionTextColor: '#333333',
    rootHeight: '100%',
    rootWidth: '100%',
    timestampFormat: 'relative',
    sendBoxTextWrap: true,
    bubbleMaxWidth: 480, // Sets the max width for message bubbles
    emojiSet: true,
    hideScrollToEndButton: false
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-gray-100 px-6 py-3 flex items-center shadow-md">
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
          <span className="text-sm">C</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Support</h1>
          <p className="text-xs text-gray-300">Welcome to castler support chat bot</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden">
        <div 
          ref={webchatContainerRef}
          className="h-full relative shadow-md"
        >
          {directLine && (
            <ReactWebChat 
              directLine={directLine} 
              styleOptions={styleOptions}
              locale={document.documentElement.lang || 'en'}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;