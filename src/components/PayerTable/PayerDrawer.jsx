import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const FOCUSABLE = 'a[href], button, input, [tabindex]:not([tabindex="-1"])';

// Right-side panel for one payer. It only owns the shell (backdrop, Esc, focus, scroll lock); the
// table passes the content, so the cell helpers stay in PayerTable.
export default function PayerDrawer({ title, onClose, children }) {
  const panelRef = useRef(null);

  useEffect(() => {
    const opener = document.activeElement;
    const { overflow } = document.body.style;

    document.body.style.overflow = 'hidden';
    panelRef.current?.querySelector('button')?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      // Keep Tab inside the panel while it is open.
      if (event.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll(FOCUSABLE);
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = overflow;
      opener?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div className='payerDrawerRoot'>
      <div
        className='payerDrawerBackdrop --ifm-modal-overlay'
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className='payerDrawer'
        role='dialog'
        aria-modal='true'
        aria-labelledby='payerDrawerHeading'
      >
        <div className='payerDrawerTopBar'>
          <h2 id='payerDrawerHeading' className='payerDrawerHeading'>
            {title}
          </h2>
          <button
            type='button'
            className='payerDrawerClose'
            onClick={onClose}
            aria-label='Close'
          >
            <svg
              width='14'
              height='14'
              viewBox='0 0 14 14'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            >
              <line x1='3' y1='3' x2='11' y2='11' />
              <line x1='11' y1='3' x2='3' y2='11' />
            </svg>
          </button>
        </div>
        <div className='payerDrawerBody'>{children}</div>
      </aside>
    </div>,
    document.body
  );
}
