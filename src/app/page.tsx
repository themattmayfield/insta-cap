// import CaptionForm from '@/components/caption-form';
import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { sql } from '@vercel/postgres';
import pluralize from 'pluralize';

export default async function Home() {
  const [tokenResponse, { rows }] = await Promise.all([
    fetch(`${process.env.WEB_URL}/api/token`),
    sql`SELECT COUNT(*) FROM Prompts;`,
  ]);
  const count = rows[0].count;
  const numberOfCaptions = pluralize('captions', count, true);

  const { token } = await tokenResponse.json();
  return (
    <div className="py-[15vh] sm:py-[20vh] flex flex-col items-center justify-center">
      <h1 className="font-medium text-4xl text-black text-center max-w-[700px] mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
        Insta captions
      </h1>
      <p className="text-gray-500 text-center mb-12 text-base animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
        {numberOfCaptions} generated and counting!
      </p>
      {token}

      <div className="max-w-md space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
        <div>
          {/* <CaptionForm token={token} /> */}
          <div className="flex space-x-2">
            <Badge variant="outline">Badgex</Badge>
            <Badge variant="outline">Badge</Badge>
          </div>
        </div>
        <div>
          <Drawer>
            <DrawerTrigger>
              <p className="flex items-center space-x-2 text-sm animate-bounce hover:underline">
                <span>additional customization</span>
                <OptionIcon className="h-4 w-4" />
              </p>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <button>Submit</button>
                <DrawerClose>
                  <button>Cancel</button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

function OptionIcon(props: { className: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h6l6 18h6" />
      <path d="M14 3h7" />
    </svg>
  );
}
