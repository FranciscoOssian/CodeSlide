'use client';
import React, { useEffect, useRef, useState } from 'react';
import MdInput from '../MdInput';
import MdOutPut from '../MdOutPut';
import { Marp } from '@marp-team/marp-core';
import { marked } from 'marked';

import _ from 'lodash';

import './styles.scss';

const marp = new Marp({
  html: true,
});

const Editor = ({ showCode, initText = '' }: { showCode: boolean; initText?: string }) => {
  const [inputText, setInputText] = useState(initText);
  const [html, setHtml] = useState<string>('');
  const [css, setCss] = useState<string>('');

  const debouncedUpdate = useRef(
    _.debounce((text: string) => {
      const { html, css } = marp.render(text);
      setHtml(html); // = html; //await marked.parse(inputText);
      setCss(css); //styleBox.current.innerHTML = css;
    }, 300) // Ajuste o tempo de debounce conforme necessário
  ).current;

  useEffect(() => {
    debouncedUpdate(inputText);
  }, [inputText, debouncedUpdate, initText]);

  return (
    <div className="Editor">
      <pre>
        <code id="raw-md">{inputText}</code>
      </pre>
      {showCode && <MdInput initText={initText} onChange={(s) => setInputText(s)} />}
      <div id="box-out">
        <MdOutPut html={html} css={css} />
      </div>
    </div>
  );
};

export default Editor;
