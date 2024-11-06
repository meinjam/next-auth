import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  console.log(session);

  return (
    <section>
      <div className='container'>
        <h1 className='text-3xl'>Hello</h1>
      </div>
    </section>
  );
}
