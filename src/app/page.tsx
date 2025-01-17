import Contact from '@/app/uicomponents/contact';
import Inbox from './uicomponents/inbox';

export default function Home() {
  return (
    <main>
      <h1>Email Client</h1>
      <Contact/>
      <Inbox/>
    </main>
  );
}
