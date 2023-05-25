import Home from '../components/home/Home.container';

export const getStaticProps = () => {
  return {
    props: {},
 };
}

function HomePage() {
  return <Home />
}

export default HomePage;