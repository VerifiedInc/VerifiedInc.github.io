import Button from '@mui/material/Button';
import React from 'react';

export default function NavbarButton({ to, label, }) {

  return (
    <Button
      href={to}
      target="_blank"
      color="primary"
      variant='contained'
      sx={{
        fontSize: '16px',
        fontWeight: '900 !important',
        borderRadius: '8px',
        textTransform: 'none',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        }
      }}
    >{label}</Button>
  );
};

