'use client';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

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
  // useEffect(() => {
  //   if (!formState) return;
  //   // toast.error(formState.message)
  // }, [formState]);

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
            }
          }}
          placeholder="cat"
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
      {formState?.status === 'success' && (
        <div>{JSON.stringify(formState.choices)}</div>
      )}
    </>
  );
};

export default CaptionForm;
