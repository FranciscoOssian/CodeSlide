import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import './pin.scss';

interface MdInputProps {
  initText: string;
  onChange: (s: string) => void;
}

const MdInput = ({ onChange, initText }: MdInputProps) => {
  const [text, setText] = React.useState(initText || '');
  const onChangeInner = React.useCallback(
    (val: any) => {
      setText(val);
      onChange(val);
    },
    [onChange]
  );
  return (
    <div className="MdInput">
      <CodeMirror
        width="100%"
        height="100%"
        value={text}
        extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
        onChange={onChangeInner}
      />
    </div>
  );
};

export default MdInput;
