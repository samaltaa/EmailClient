import Contact from '@/app/components/contact';
import Inbox from './components/inbox';

export default function Home() {
  return (
    <main>
      <h1>Email Client</h1>
      <Contact/>
      <Inbox/>
    </main>
  );
}
