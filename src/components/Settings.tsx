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
import { Switch } from '@/components/ui/switch';
import type { TEmojis, THashtags, TLengths, TTones } from '@/constants';
import { HASHTAGS, LENGTHS, TONES } from '@/constants';
import { cn, createUrl } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import pluralize from 'pluralize';

import { Button } from './ui/button';
import { CogIcon, GithubIcon, InstagramIcon } from './ui/icons';

type TSettings = {
  tone: TTones;
  length: TLengths;
  hashtag: THashtags;
  emoji: TEmojis;
};

const Settings = (props: TSettings) => {
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
          <ToneSelect {...props} />
          <LengthSelect {...props} />
          <HashtagCountSlider {...props} />
          <EmojiSwitch {...props} />

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
      <Badge variant="outline">{props.tone}</Badge>
      <Badge variant="outline">{props.length}</Badge>
      <Badge variant="outline">
        {props.hashtag === '0'
          ? 'no hashtags'
          : pluralize('hashtags', Number(props.hashtag), true)}
      </Badge>
    </div>
  );
};

export default Settings;

const ToneSelect = ({ tone, length, hashtag, emoji }: TSettings) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-3 items-center mb-4">
      <Label className="mb-1" htmlFor="tone">
        select a tone
      </Label>
      <Select
        name="tone"
        onValueChange={(e) => {
          const newParams = new URLSearchParams({
            tone,
            length,
            hashtag,
            emoji,
          });
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
const LengthSelect = ({ length, tone, hashtag, emoji }: TSettings) => {
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
                  emoji,
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

const HashtagCountSlider = ({ tone, length, hashtag, emoji }: TSettings) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-3 items-center mb-4">
      <Label className="mb-1" htmlFor="tone">
        number of hashtags
      </Label>
      <Slider
        onValueChange={([val]) => {
          const newParams = new URLSearchParams({
            tone,
            length,
            hashtag,
            emoji,
          });
          newParams.set('hashtag', val.toString());
          push(createUrl('/', newParams));
        }}
        className="col-span-2"
        defaultValue={[Number(hashtag)]}
        max={HASHTAGS.length - 1}
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

const EmojiSwitch = ({ tone, length, hashtag, emoji }: TSettings) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-3 items-center mb-4">
      <Label className="mb-1" htmlFor="tone">
        with emojis
      </Label>
      <Switch
        defaultChecked={emoji === 'true'}
        onCheckedChange={(val) => {
          const newParams = new URLSearchParams({
            tone,
            length,
            hashtag,
            emoji,
          });
          newParams.set('emoji', val.toString());
          push(createUrl('/', newParams));
        }}
      />
    </div>
  );
};
