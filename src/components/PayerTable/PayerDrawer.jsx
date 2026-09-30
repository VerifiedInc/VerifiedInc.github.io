import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';

const FOCUSABLE = 'a[href], button, input, [tabindex]:not([tabindex="-1"])';

const TRANSITION = { duration: 0.25, ease: [0.32, 0.72, 0, 1] };

// Right-side panel for one payer. It only owns the shell (backdrop, Esc, focus, scroll lock); the
// table passes the content, so the cell helpers stay in PayerTable. Render it inside
// AnimatePresence so the close plays before it unmounts.
export default function PayerDrawer({ title, onClose, children }) {
  const panelRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const offscreen = {
    x: reduceMotion ? 0 : '100%',
    opacity: reduceMotion ? 0 : 1,
  };

  useEffect(() => {
    const opener = document.activeElement;
    const { overflow, paddingRight } = document.body.style;
    // Fill the space the scrollbar leaves when hidden, so the page doesn't shift. Zero with
    // overlay scrollbars (macOS default), so nothing changes there.
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
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
      document.body.style.paddingRight = paddingRight;
      opener?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div className='payerDrawerRoot'>
      <motion.div
        className='payerDrawerBackdrop --ifm-modal-overlay'
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={TRANSITION}
      />
      <motion.aside
        ref={panelRef}
        initial={offscreen}
        animate={{ x: 0, opacity: 1 }}
        exit={offscreen}
        transition={TRANSITION}
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
      </motion.aside>
    </div>,
    document.body
  );
}
