import Head from 'next/head';
import React from 'react';
import Three from '../components/Three';

export default function Home(): JSX.Element {
  return (
    <div>
      <Head>
        <title>Funky 🚽</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Three />
    </div>
  );
}
