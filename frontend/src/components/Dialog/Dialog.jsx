import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function ConfirmDialog({ openModal, closeModal, children, onConfirm, title = "Confirm Action" }) {
  const { currentTheme } = useSelector(state => state.theme);
  const ref = useRef();

  useEffect(() => {
    if (openModal) {
      ref.current?.showModal();
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    } else {
      ref.current?.close();
      document.body.style.overflow = ''; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ''; // Cleanup
    };
  }, [openModal]);

  const handleBackdropClick = (e) => {
    if (e.target === ref.current) {
      closeModal();
    }
  };

  return (
    <dialog
      ref={ref}
      onClick={handleBackdropClick}
      onCancel={closeModal}
      className="fixed inset-0 z-50 p-0 w-full h-full bg-black/50 backdrop-blur-sm transition-opacity duration-300"
      style={{
        color: currentTheme?.textPrimary,
        backgroundColor: currentTheme?.modalBackground || 'rgba(0,0,0,0.5)'
      }}
    >
      <div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 rounded-xl shadow-xl"
        style={{
          backgroundColor: currentTheme?.cardBackground,
          border: `1px solid ${currentTheme?.line}`
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button 
              onClick={closeModal}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="py-2">
            {children}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={closeModal}
              className="cursor-pointer px-4 py-2 rounded-lg font-medium transition-all hover:opacity-80"
              style={{
                backgroundColor: currentTheme?.background,
                border: `1px solid ${currentTheme?.line}`
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                
                onConfirm();
                closeModal();
              }}
              className="cursor-pointer px-4 py-2 rounded-lg font-medium text-white transition-all hover:opacity-80"
              style={{ backgroundColor: "red" }}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmDialog;