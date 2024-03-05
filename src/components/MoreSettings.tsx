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
import type { TLengths, TTones } from '@/constants';
import { LENGTHS, TONES } from '@/constants';
import { createUrl } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type TSettings = { tone: TTones; length: TLengths };

const MoreSettings = ({ tone, length }: TSettings) => {
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
          <ToneSelect length={length} tone={tone} />
          <LengthSelect length={length} tone={tone} />
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
    </div>
  );
};

export default MoreSettings;

const ToneSelect = ({ tone, length }: TSettings) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-3 items-center mb-4">
      <Label className="mb-1" htmlFor="tone">
        select a tone
      </Label>
      <Select
        name="tone"
        onValueChange={(e) => {
          const newParams = new URLSearchParams({ tone, length });
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
const LengthSelect = ({ length, tone }: TSettings) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-3 items-center mb-4">
      <Label className="mb-1" htmlFor="tone">
        select a length
      </Label>
      <Select
        name="tone"
        onValueChange={(e) => {
          const newParams = new URLSearchParams({ tone, length });
          newParams.set('length', e);
          push(createUrl('/', newParams));
        }}
        defaultValue={length || 'short'}
      >
        <SelectTrigger className="col-span-2">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {LENGTHS.map((length, index) => (
            <SelectItem key={index} value={length}>
              {length}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
const CogIcon = (props: { className: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
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

const GithubIcon = (props: { className: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const InstagramIcon = (props: { className: string }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
