import React from 'react';
import './styles.scss';
import ExportButton from './Export';
import Preview from './Preview';

const Dock = () => {
  return (
    <div className="dock">
      <ul>
        <ExportButton />
        <li>light</li>
        <Preview />
      </ul>
    </div>
  );
};

export default Dock;
