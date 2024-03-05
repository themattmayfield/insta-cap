import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import type { THashtags, TLengths, TTones } from '@/constants';
import { HASHTAGS, LENGTHS, TONES } from '@/constants';
import { cn, createUrl } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import pluralize from 'pluralize';

import { Button } from './ui/button';
import { CogIcon, GithubIcon, InstagramIcon } from './ui/icons';

type TSettings = { tone: TTones; length: TLengths; hashtag: THashtags };

const MoreSettings = ({ tone, length, hashtag }: TSettings) => {
  return (
    <div className="flex space-x-2 mb-6">
      <Drawer>
        <DrawerTrigger>
          <CogIcon className="animate-[spin_2s_linear_infinite]	w-6 h-6" />
          <span className="sr-only">Cog icon</span>
        </DrawerTrigger>
        <DrawerContent className="container max-w-2xl">
          <DrawerHeader className="sm:text-center mb-6">
            <DrawerTitle>dial in your caption</DrawerTitle>
            <DrawerDescription>side note...buy me a coffee</DrawerDescription>
          </DrawerHeader>
          <ToneSelect length={length} tone={tone} hashtag={hashtag} />
          <LengthSelect length={length} tone={tone} hashtag={hashtag} />
          <HashtagCountSlider length={length} tone={tone} hashtag={hashtag} />

          <DrawerFooter>
            <div className="flex items-center justify-center space-x-4 animate-bounce">
              <Link href={'https://github.com/themattmayfield/insta-cap'}>
                <GithubIcon className="w-6 h-6" />
              </Link>
              <Link href={'https://www.instagram.com/themattmayfield/'}>
                <InstagramIcon className="w-6 h-6" />
              </Link>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <Badge variant="outline">{tone}</Badge>
      <Badge variant="outline">{length}</Badge>
      <Badge variant="outline">
        {hashtag === '0'
          ? 'no hashtags'
          : pluralize('hashtags', Number(hashtag), true)}
      </Badge>
    </div>
  );
};

export default MoreSettings;

const ToneSelect = ({ tone, length, hashtag }: TSettings) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-3 items-center mb-4">
      <Label className="mb-1" htmlFor="tone">
        select a tone
      </Label>
      <Select
        name="tone"
        onValueChange={(e) => {
          const newParams = new URLSearchParams({ tone, length, hashtag });
          newParams.set('tone', e);
          push(createUrl('/', newParams));
        }}
        defaultValue={tone || 'funny'}
      >
        <SelectTrigger className="col-span-2">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {TONES.map((tone, index) => (
            <SelectItem key={index} value={tone}>
              {tone}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
const LengthSelect = ({ length, tone, hashtag }: TSettings) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-3 items-center mb-4">
      <Label className="mb-1" htmlFor="tone">
        select a length
      </Label>
      <span className="isolate inline-flex rounded-md shadow-sm col-span-2">
        {LENGTHS.map((currentLength, index) => {
          const buttonClass =
            index === 0
              ? 'rounded-l-md rounded-r-none'
              : index === 1
              ? 'rounded-none'
              : 'rounded-l-none rounded-r-md';

          return (
            <LengthButton
              key={index}
              onClick={() => {
                const newParams = new URLSearchParams({
                  tone,
                  length,
                  hashtag,
                });
                newParams.set('length', currentLength);
                push(createUrl('/', newParams));
              }}
              name={currentLength}
              active={currentLength === length}
              className={buttonClass}
            />
          );
        })}
      </span>
    </div>
  );
};

const HashtagCountSlider = ({ tone, length, hashtag }: TSettings) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-3 items-center mb-4">
      <Label className="mb-1" htmlFor="tone">
        number of hastags
      </Label>
      <Slider
        onValueChange={([val]) => {
          const newParams = new URLSearchParams({ tone, length, hashtag });
          newParams.set('hashtag', val.toString());
          push(createUrl('/', newParams));
        }}
        className="col-span-2"
        defaultValue={[0]}
        max={HASHTAGS.length}
        step={1}
      />
    </div>
  );
};

const LengthButton = ({
  className,
  active,
  name,
  onClick,
}: {
  className: string;
  active: boolean;
  name: string;
  onClick: () => void;
}) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'w-1/3',
        className,
        active && 'bg-black text-white hover:bg-black hover:text-white',
      )}
      variant="outline"
    >
      {name}
    </Button>
  );
};
