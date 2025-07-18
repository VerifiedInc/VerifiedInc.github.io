import { useEffect, useRef, useState } from 'react';

export function DemoEmailFormFrame() {
  const domain =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7020'
      : window.location.origin;
  const url = new URL('/email-form?isEmbedded=true', domain);
  const iframeRef = useRef(null);
  const [iframeHeight, setIframeHeight] = useState(0);

  // Effect to handle messages from the iframe
  useEffect(() => {
    if (!iframeRef.current) return;

    const handleMessage = (event) => {
      // Only handle messages from approved origins
      const approvedOrigins =
        process.env.NODE_ENV === 'development'
          ? ['http://localhost:7020'] // Allow localhost in dev
          : [
              'https://1-click-preview.demo.verified.inc',
              'https://1-click.demo.verified.inc',
            ]; // Only trusted domains in production

      if (!approvedOrigins.some((origin) => event.origin === origin)) {
        console.warn(
          `Rejected message from unauthorized origin: ${event.origin}`
        );
        return;
      }

      try {
        const data = JSON.parse(event.data);
        if (
          data.source === 'VerifiedInc.Demo-Client' &&
          data.type === 'resize'
        ) {
          setIframeHeight(Number(data.height));
        }
      } catch (error) {
        // Do nothing
      }
    };

    window.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, [iframeRef]);

  return (
    <div style={{ overflow: 'hidden', marginBottom: 20 }}>
      <div
        style={{
          width: '100%',
          minHeight: '206px',
          height: `${iframeHeight}px`,
        }}
      >
        <iframe
          src={url.toString()}
          ref={iframeRef}
          title='Embedded Page'
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
      </div>
    </div>
  );
}
