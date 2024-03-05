import type { Message } from 'ai/react';
import { toast } from 'sonner';

const AiResponse = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      {messages.map(({ content, role }) => {
        if (role !== 'assistant') return;

        return content
          .substring(content.indexOf('1') + 3)
          .split(/2\.|3\./)
          .map((text, index) => {
            if (text.replace('\n', '').trim() === '') return;
            return (
              <div
                onClick={() => {
                  navigator.clipboard.writeText(text);
                  toast('Bio copied to clipboard', {
                    icon: '✂️',
                    position: 'top-center',
                  });
                }}
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
