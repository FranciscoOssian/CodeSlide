'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleCheck, faDownload } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import Loading from '../Loading';
import { exportFile } from '@/utils/export';

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const ExportButton = () => {
  const [isLoading, setIsLoafing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const handleClick = async () => {
    setIsLoafing(true);
    setLoaded(false);
    await exportFile();
    setLoaded(true);
    setIsLoafing(false);
  };

  useEffect(() => {
    if (!isLoading && loaded) {
      sleep(2000).then(() => {
        setLoaded(false);
      });
    }
  }, [isLoading, loaded]);

  return (
    <div onClick={handleClick} className="export-button-dock">
      <div className={`${isLoading ? 'isLoading' : ''} ${loaded ? 'loaded' : ''}`}>
        {!isLoading && !loaded && <FontAwesomeIcon icon={faDownload} />}
        {isLoading && !loaded && <Loading />}
        {!isLoading && loaded && <FontAwesomeIcon icon={faFileCircleCheck} />}
      </div>
    </div>
  );
};

export default ExportButton;
