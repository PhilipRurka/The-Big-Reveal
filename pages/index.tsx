import Image from 'next/image'
import styles from '../src/styles/Home.module.css'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import { Country } from '../src/types/resolvers-types';
import { FC } from 'react';
import { initialConsole } from './api/initial-console';

export type CountriesType = {
  countries: [Country]
}

type QueryType = {
  data: CountriesType
}

type GetStaticPropsType = {
  props: CountriesType
}

const Home: FC<CountriesType> = ({ countries }) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Hey yeah!
        </h1>
        {countries.map((country: Country) => (
          <div key={country.code} className={styles.card}>
            <h3><a href="#country-name" aria-hidden="true" className="aal_anchor" id="country-name"><svg aria-hidden="true" className="aal_svg" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>{country.name}</h3>
            <p>
              {country.code} - {country.emoji}
            </p>
          </div>
        ))}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export const getStaticProps = async (): Promise<GetStaticPropsType> => {
  initialConsole('Home')

  const { data }: QueryType = await client.query({
    query: gql`
      query Countries {
        countries {
          code
          name
          emoji
        }
      }
    `,
  });

  return {
    props: {
      countries: data.countries,
    },
 };
}


export default Home;