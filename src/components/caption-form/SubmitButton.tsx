import type { ElementRef } from 'react';
import { forwardRef } from 'react';

import { CornerDownLeft } from 'lucide-react';

import { Loader } from '../Loader';

export const SubmitButton = forwardRef<
  ElementRef<'button'>,
  { isLoading: boolean }
>(({ isLoading }, ref) => {
  return (
    <button
      ref={ref}
      type="submit"
      disabled={isLoading}
      aria-disabled={isLoading}
      className="text-white rounded-lg hover:bg-white/25 focus:bg-white/25 w-8 h-8 aspect-square flex items-center justify-center ring-0 outline-0"
    >
      {isLoading ? <Loader /> : <CornerDownLeft size={16} className="-ml-px" />}
    </button>
  );
});
SubmitButton.displayName = 'SubmitButton';
