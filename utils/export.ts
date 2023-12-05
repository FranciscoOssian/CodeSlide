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

    return true;
  } catch (error) {
    console.error('Erro:', error);
    return false;
  }
};

export { exportFile };
