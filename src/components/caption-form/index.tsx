'use client';
import { useEffect, useRef } from 'react';

import { TONES } from '@/constants';
import { createUrl } from '@/lib/utils';
import { useChat } from 'ai/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import AiResponse from '../aiResponse';
import MoreSettings from '../MoreSettings';

import { SubmitButton } from './SubmitButton';
type TCaptionFormProps = {
  token: string | undefined;
  revalidate: () => Promise<void>;
  searchParams: Record<string, string | undefined>;
};

const CaptionForm = ({
  token,
  revalidate,
  searchParams,
}: TCaptionFormProps) => {
  const tone = searchParams.tone as string;

  const submitRef = useRef<React.ElementRef<'button'>>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { push } = useRouter();
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setInput,
  } = useChat({
    api: 'http://localhost:3000/api/add-prompt',
    body: { token, tone },
    onError: () => {
      setInput(input);
    },
    onFinish: async () => await revalidate(),
  });

  useEffect(() => {
    if (error) toast.error(JSON.parse(error.message));
  }, [error]);
  useEffect(() => {
    if (!tone || !TONES.includes(tone)) {
      const newParams = new URLSearchParams();
      newParams.set('tone', 'humerous');
      push(createUrl('/', newParams));
    }
  }, [push, searchParams, tone]);

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
      <MoreSettings searchParams={searchParams} />
      <AiResponse messages={messages} />
    </>
  );
};

export default CaptionForm;
