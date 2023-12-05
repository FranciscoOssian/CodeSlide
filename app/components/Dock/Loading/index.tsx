'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './styles.scss';

const Loading = () => {
  return (
    <div className="loading-icon-dock">
      <FontAwesomeIcon icon={faSpinner} />
    </div>
  );
};

export default Loading;
