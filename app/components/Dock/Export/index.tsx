'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const ExportButton = () => {
  const handleClick = async () => {
    try {
      const text = document.getElementById('raw-md')?.textContent || '';

      const formData = new FormData();
      formData.append('file', new File([new Blob([text])], 'filename.md'));

      const response = await fetch('/api/export', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
      }

      const blob = await response.blob();

      // Cria um link temporário para download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'exported.html';
      document.body.appendChild(a);
      a.click();

      // Remove o link temporário
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div onClick={handleClick}>
      <FontAwesomeIcon icon={faFileExport} />
    </div>
  );
};

export default ExportButton;
