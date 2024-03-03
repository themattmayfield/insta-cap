import React from 'react';

const AiResponse = ({ choices }: { choices: string[] | undefined }) => {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      {choices?.map((content, index) => {
        return (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border w-full"
          >
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default AiResponse;
