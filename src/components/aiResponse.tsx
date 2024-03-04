import React from 'react';

import type { Message } from 'ai/react';

const AiResponse = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      {messages.map(({ content, role }) => {
        if (role !== 'assistant') return;
        const textWithoutNumbers = content
          .replace('1. ', '')
          .replace('2. ', '')
          .replace('3. ', '');

        return textWithoutNumbers.split('\n\n').map((text, index) => {
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border w-full"
            >
              {text}
            </div>
          );
        });
      })}
    </div>
  );
};

export default AiResponse;
