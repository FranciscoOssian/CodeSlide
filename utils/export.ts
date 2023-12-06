import downloadFile from './downloadFile';

const exportFile = async () => {
  try {
    const text = document.getElementById('raw-md')?.textContent ?? '';

    const formData = new FormData();
    formData.append('file', new File([new Blob([text])], 'filename.md'));

    console.log('exporting');

    const response = await fetch('/api/exportWrapper', {
      method: 'POST',
      body: formData,
    });

    console.log('response export recv');

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }

    const blob = await response.blob();

    downloadFile(blob);

    return true;
  } catch (error) {
    console.error('Erro:', error);
    return false;
  }
};

export { exportFile };
