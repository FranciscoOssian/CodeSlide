'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareFromSquare } from '@fortawesome/free-solid-svg-icons';
import './styles.scss';

function setSessionCookie(name: string, value: string) {
  document.cookie = name + '=' + value + '; path=/';
}

function getCookie(name: string) {
  // Separa todos os cookies em um array
  const cookies = document.cookie.split('; ');
  // Procura o cookie específico pelo nome
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === name) {
      // Retorna o valor do cookie
      return decodeURIComponent(cookie[1]);
    }
  }
  // Retorna null se o cookie não for encontrado
  return undefined;
}

const ShareButton = () => {
  const [myId, setMyId] = useState<string>('');
  useEffect(() => {
    if (!window) return;
    import('peerjs')
      .then(({ Peer }) => {
        // O código que depende do Peer pode ser colocado aqui
        const last = getCookie('peerInstance');
        const peer = last ? new Peer(last) : new Peer();
        peer.on('open', (id) => {
          setMyId(id);
          console.log(id);
          setSessionCookie('peerInstance', id);
          peer.on('connection', (conn) => {
            conn.on('open', () => {
              conn.send('hello!');
              conn.on('data', (data: any) => {
                // Will print 'hi!'
                console.log(data);
                if (data?.header === 'request:markdown')
                  conn.send({
                    header: 'response:markdown',
                    data: document.getElementById('raw-md')?.textContent,
                  });
              });
            });
          });
        });
      })
      .catch((error) => {
        console.error('Erro ao importar o módulo peer.js:', error);
      });
  }, []);
  return (
    myId && (
      <Link className="ShareButton-anchor" target="_blank" href={`/preview/${myId}`}>
        <FontAwesomeIcon icon={faShareFromSquare} />
      </Link>
    )
  );
};

export default ShareButton;
