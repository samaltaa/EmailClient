import Contact from '@/app/pages/contact/page';
import Inbox from './pages/inbox/page';
import HomePage from './uicomponents/HomePage'
import SideBar from './uicomponents/SideBar'


export default function Home() {
  return (
    <main>
      <SideBar/>
      <HomePage/>
    </main>
  );
}
