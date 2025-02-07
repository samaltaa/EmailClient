import Contact from '@/app/uicomponents/contact';
import Inbox from './uicomponents/inbox';
import HomePage from './uicomponents/HomePage'


export default function Home() {
  return (
    <main>
      <HomePage/>
      <h1>Email Client</h1>
      <Inbox/>

    </main>
  );
}
