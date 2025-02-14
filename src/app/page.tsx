import Contact from '@/app/pages/contact/page';
import Inbox from './pages/inbox/page';
import HomePage from './uicomponents/HomePage'
import SideBar from './uicomponents/SideBar'
import EmailContent from './uicomponents/EmailContent'


export default function Home() {
  return (
    <main>
      <EmailContent/>
      <HomePage/>
    </main>
  );
}
