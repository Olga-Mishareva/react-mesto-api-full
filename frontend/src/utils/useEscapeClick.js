import { useEffect } from "react";

function useEscapeClick(isOpen, onClose) {
  useEffect(() => {
    function handleEscClick(e) {
      if(e.key === 'Escape') {
        onClose();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', handleEscClick);
      return () => {
        document.removeEventListener('keydown', handleEscClick);
      }
    }
  }, [isOpen]);
}

export default useEscapeClick;