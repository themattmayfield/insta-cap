'use client';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

import AiResponse from '../aiResponse';

import { createCaption } from './action';
import { SubmitButton } from './SubmitButton';
type TCaptionFormProps = {
  initialPrompt?: string;
  token: string | undefined;
};
const CaptionForm = ({ token }: TCaptionFormProps) => {
  const [formState, formAction] = useFormState(createCaption, undefined);
  const submitRef = useRef<React.ElementRef<'button'>>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState?.status === 'success') {
      formRef.current?.reset();
    }
  }, [formState]);
  useEffect(() => {
    if (formState?.status === 'error') toast.error(formState.errorMessage);
  }, [formState]);

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
      <div className="flex space-x-2 mb-6">
        <CogIcon className="animate-[spin_2s_linear_infinite]	" />
        <Badge variant="outline">Badgex</Badge>
        <Badge variant="outline">Badge</Badge>
      </div>
      {formState?.status === 'success' && (
        <AiResponse
          choices={formState.choices[0].message.content?.split('\n')}
        />
      )}
    </>
  );
};

export default CaptionForm;

const CogIcon = (props: { className: string }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      width="24"
      height="24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
};
