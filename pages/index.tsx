import { FC } from 'react';
import { initialConsole } from './api/initial-console';

export const getStaticProps = () => {
  initialConsole('Home')

  return {
    props: {},
 };
}

function Home() {

  return (
    <>
      <h1>Homepage</h1>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        
      </div>
    </>
  )
}

export default Home;