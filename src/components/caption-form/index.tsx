'use client';
import { useRef } from 'react';
import { useFormState } from 'react-dom';

import { createCaption } from './action';
import { SubmitButton } from './SubmitButton';

type TCaptionFormProps = {
  initialPromt?: string;
  token: string | null;
};
const CaptionForm = ({ token }: TCaptionFormProps) => {
  const [formState, formAction] = useFormState(createCaption);
  const submitRef = useRef<React.ElementRef<'button'>>(null);
  return (
    <form
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
  );
};

export default CaptionForm;
