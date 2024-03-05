'use client';
import { useRef } from 'react';

import type { TEmojis, THashtags, TLengths, TTones } from '@/constants';
import { EMOJIS, HASHTAGS, LENGTHS, TONES } from '@/constants';
import { useChat } from 'ai/react';
import { toast } from 'sonner';

import AiResponse from '../aiResponse';
import Settings from '../Settings';

import { SubmitButton } from './SubmitButton';
type TCaptionFormProps = {
  token: string | undefined;
  revalidate: () => Promise<void>;
  searchParams: Record<string, string | undefined>;
};

const getTone = (
  searchParams: Record<string, string | undefined>,
): { tone: TTones; length: TLengths; hashtag: THashtags; emoji: TEmojis } => {
  const { tone, length, hashtag, emoji } = searchParams;
  let newTone = tone as TTones;
  let newLength = length as TLengths;
  let newHashtag = hashtag as THashtags;
  let newEmoji = emoji as TEmojis;
  if (!tone || !TONES.includes(tone as TTones)) {
    newTone = 'humerous';
  }
  if (!length || !LENGTHS.includes(length as TLengths)) {
    newLength = 'short';
  }
  if (!hashtag || !HASHTAGS.includes(hashtag as THashtags)) {
    newHashtag = '0';
  }
  if (!emoji || !EMOJIS.includes(emoji as TEmojis)) {
    newEmoji = 'false';
  }
  return {
    tone: newTone,
    length: newLength,
    hashtag: newHashtag,
    emoji: newEmoji,
  };
};
const CaptionForm = ({
  token,
  revalidate,
  searchParams,
}: TCaptionFormProps) => {
  const { tone, length, hashtag, emoji } = getTone(searchParams);

  const submitRef = useRef<React.ElementRef<'button'>>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    api: 'api/add-prompt',
    body: { token, tone, length, hashtag, emoji },
    onError: (error) => {
      setInput(input);
      toast.error(JSON.parse(error.message));
    },
    onFinish: async () => await revalidate(),
  });

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-full mb-2"
      >
        <input
          type="text"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              submitRef.current?.click();
              e.currentTarget.blur();
            }
          }}
          placeholder="idk, enter something.."
          className="bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
        />

        <SubmitButton isLoading={isLoading} ref={submitRef} />
      </form>
      <Settings length={length} tone={tone} hashtag={hashtag} emoji={emoji} />
      <AiResponse messages={messages} />
    </>
  );
};

export default CaptionForm;
