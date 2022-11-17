import { FC } from 'react';
import { initialConsole } from './api/initial-console';

const Home: FC = () => {
  return (
    <main>
      <h1>Homepage</h1>
    </main>
  )
}

export const getStaticProps = () => {
  initialConsole('Home')

  return {
    props: {},
 };
}


export default Home;