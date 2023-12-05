'use client';

import Editor from '@/app/components/Editor';
import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

export default function Page({ params }: { params: { id: string } }) {
  const [myId, setMyId] = useState<string>('');
  const [markdown, setMarkdown] = useState<string>('');
  useEffect(() => {
    if (!window) return;
    import('peerjs')
      .then(({ Peer }) => {
        const peer = new Peer();
        peer.on('open', (id) => {
          setMyId(id);
          console.log(id);
          const conn = peer.connect(params.id);
          console.log(conn);
          conn.on('open', function () {
            conn.send({
              header: 'request:markdown',
            });
            conn.on('data', function (data: any) {
              if (data?.header === 'response:markdown') setMarkdown(data?.data);
            });
          });
        });
      })
      .catch((error) => {
        console.error('Error peer.js:', error);
      });
  }, [params.id]);
  return (
    <main className={styles.MainPreviewPage}>
      {markdown !== '' && <Editor showCode={false} initText={markdown} />}
    </main>
  );
}
