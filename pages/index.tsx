import { FC } from 'react';
import { initialConsole } from './api/initial-console';

const Home: FC = () => {

  return (
    <>
      <h1>Homepage</h1>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        
      </div>
    </>
  )
}

export const getStaticProps = () => {
  initialConsole('Home')

  return {
    props: {},
 };
}


export default Home;