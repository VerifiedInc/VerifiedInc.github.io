import { useEffect, useRef, useState } from 'react';

function FormFrameBody() {
  const domain =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:7020'
      : 'https://1-click-preview.demo.dev-verifiedinc.com';
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
              'https://1-click-preview.demo.dev-verifiedinc.com',
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

        // Accept only demo client messages
        if (data.source !== 'VerifiedInc.Demo-Client') return;

        if (data.type === 'resize') {
          setIframeHeight(Number(data.height));
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    window.addEventListener('message', handleMessage, false);

    return () => {
      window.removeEventListener('message', handleMessage, false);
    };
  }, []);

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
          sandbox='allow-scripts allow-forms allow-same-origin allow-popups'
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

export function DemoEmailFormFrame() {
  const [mount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  if (!mount) return null;

  return <FormFrameBody />;
}
