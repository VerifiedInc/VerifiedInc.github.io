export default function NavbarStatus() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', height: 42 }}>
      <iframe
        src="https://verified.instatus.com/embed-status/b8711ff3/light-sm"
        width="210"
        height="42"
        style={{ 
          border: 'none', 
          marginTop: 0, 
          overflow: 'hidden' }}
      />
    </div>
  );
}
