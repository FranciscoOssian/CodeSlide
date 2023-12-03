import React from 'react';
import styles from './page.module.css';
import Editor from './components/Editor';
import Dock from './components/Dock';

const initText = `
# oi
kkkk

---

# oi
`;

const Home = () => {
  return (
    <main className={styles.main}>
      Editor
      <Dock />
      <Editor showCode initText={initText} />
    </main>
  );
};

export default Home;
