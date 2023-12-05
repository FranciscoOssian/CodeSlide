import { exportFile } from './export';

export const registerKeyboardShortcuts = () => {
  document.addEventListener('keydown', function (event) {
    if (event.key === 's' && event.ctrlKey) {
      const isOnCorrectRoute = window.location.pathname === '/';
      console.log('Is on correct route:', isOnCorrectRoute);

      if (isOnCorrectRoute) {
        event.preventDefault();
        console.log('Calling exportFile');
        exportFile();
      }
    }
  });
};
