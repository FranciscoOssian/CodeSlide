'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { exportFile } from '@/utils/export';

const ExportButton = () => {
  const handleClick = async () => {
    exportFile();
  };

  return (
    <div onClick={handleClick}>
      <FontAwesomeIcon icon={faFileExport} />
    </div>
  );
};

export default ExportButton;
