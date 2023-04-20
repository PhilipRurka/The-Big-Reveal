import { initialConsole } from '../lib/initial-console';
import Home from '../src/components/home/Home.container';

export const getStaticProps = () => {
  initialConsole('Home')

  return {
    props: {},
 };
}

function HomePage() {
  return <Home />
}

export default HomePage;