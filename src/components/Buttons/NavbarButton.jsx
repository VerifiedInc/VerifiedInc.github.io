import { Dashboard, DashboardOutlined } from '@mui/icons-material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Button from '@mui/material/Button';
import React from 'react';

export default function NavbarButton({ to, label, }) {

  return (
    <Button
      href={to}
      target="_blank"
      color="primary"
      variant='contained'
      startIcon={<Dashboard sx={{ color: 'white' }} />}
      sx={{
        fontSize: '16px',
        fontWeight: '900 !important',
        borderRadius: '8px',
        textTransform: 'none',
      }}
    >{label}</Button>
  );
};

