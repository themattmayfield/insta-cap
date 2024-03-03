import React from 'react';

import type OpenAI from 'openai';

const AiResponse = ({
  choices,
}: {
  choices: OpenAI.Chat.Completions.ChatCompletion['choices'];
}) => {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      {choices.map(({ message, index }) => {
        const content = message.content;

        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default AiResponse;
