import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './styles.scss';
import ExportButton from './Export';
import Preview from './Preview';

const Dock = () => {
  return (
    <div className="dock">
      <ul>
        <li>
          <ExportButton />
          <div className="title">Export file</div>
        </li>
        <li>
          <FontAwesomeIcon icon={faSun} />
          <div className="title">Change bright</div>
        </li>
        <li>
          <Preview />
          <div className="title">Share to your friends</div>
        </li>
      </ul>
    </div>
  );
};

export default Dock;
