import { useStore } from '../context/storeContext';

const ToastContainer = () => {
  const { toasts } = useStore();

  return (
    <div className="toast-wrap" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
