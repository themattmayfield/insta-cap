'use client';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { TONES } from '@/constants';
import { createUrl } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import AiResponse from '../aiResponse';
import MoreSettings from '../MoreSettings';

import { createCaption } from './action';
import { SubmitButton } from './SubmitButton';
type TCaptionFormProps = {
  initialPrompt?: string;
  token: string | undefined;
};

const CaptionForm = ({ token }: TCaptionFormProps) => {
  const searchParams = useSearchParams();
  const tone = searchParams.get('tone');

  const formActionWithTone = createCaption.bind(null, tone);

  const [formState, formAction] = useFormState(formActionWithTone, undefined);
  const submitRef = useRef<React.ElementRef<'button'>>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { push } = useRouter();

  useEffect(() => {
    if (formState?.status === 'success') {
      formRef.current?.reset();
    }
  }, [formState]);
  useEffect(() => {
    if (formState?.status === 'error') toast.error(formState.errorMessage);
  }, [formState]);
  useEffect(() => {
    if (!tone || !TONES.includes(tone)) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('tone', 'humerous');
      push(createUrl('/', newParams));
    }
  }, [push, searchParams, tone]);

  return (
    <>
      <form
        ref={formRef}
        action={formAction}
        className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-full mb-2"
      >
        <input
          type="text"
          name="prompt"
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
        <input
          aria-hidden
          type="text"
          name="token"
          value={token}
          className="hidden"
          readOnly
        />

        <SubmitButton ref={submitRef} />
      </form>
      <MoreSettings searchParams={searchParams} />
      {formState?.status === 'success' && (
        <AiResponse
          choices={formState.choices[0].message.content?.split('\n\n')}
        />
      )}
    </>
  );
};

export default CaptionForm;
