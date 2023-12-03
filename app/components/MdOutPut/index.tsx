import React, { ReactNode } from 'react';
import './pin.scss';

const MdInput = ({ html, css }: { html: string; css: string }) => {
  return (
    <div className="MdOutPut">
      <div
        dangerouslySetInnerHTML={{
          __html: html,
        }}></div>
      <style>{css}</style>
      <style
        dangerouslySetInnerHTML={{
          __html: '[data-marpit-svg] {border: 1px solid black;}',
        }}></style>
    </div>
  );
};

export default MdInput;
