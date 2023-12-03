import React from 'react';
import styles from './page.module.css';
import Editor from './components/Editor';
import Dock from './components/Dock';

const Home = () => {
  const initText = process.env.DEFAULT_MD || '';

  return (
    <main className={styles.main}>
      Editor
      <Dock />
      <Editor showCode initText={initText} />
    </main>
  );
};

export default Home;
