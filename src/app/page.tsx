import CaptionForm from '@/components/caption-form';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import pluralize from 'pluralize';

export default async function Home() {
  const [tokenResponse, { rows }] = await Promise.all([
    fetch(`${process.env.WEB_URL}/api/token`),
    sql`SELECT COUNT(*) FROM Prompts;`,
  ]);
  const count = rows[0].count;
  const numberOfCaptions = pluralize('captions', count, true);

  const { token } = await tokenResponse.json();
  async function revalidate() {
    'use server';
    revalidatePath('/');
  }

  return (
    <div className="py-[15vh] sm:py-[20vh] flex flex-col items-center justify-center">
      <h1 className="font-medium text-4xl text-black text-center max-w-[700px] mb-3 animate-in fade-in slide-in-from-bottom-3 duration-1000 ease-in-out">
        Insta captions
      </h1>
      <p className="text-gray-500 text-center mb-12 text-base animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
        {numberOfCaptions} generated and counting!
      </p>

      <div className="max-w-md space-y-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-1200 ease-in-out">
        <div>
          <CaptionForm revalidate={revalidate} token={token} />
        </div>
      </div>
    </div>
  );
}
