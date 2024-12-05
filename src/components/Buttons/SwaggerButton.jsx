import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const SwaggerButton = ({ url }) => {

  return (
    <Button
      href={url }
      target="_blank"
      variant='outlined'
      size="small" 
      startIcon={<OpenInNewIcon />}
      sx={{
        color: '#6EAD3A',
        borderColor: '#6EAD3A',
        '&:hover': {
          backgroundColor: '#6EAD3A',
          color: '#FFFFFF',
          borderColor: '#6EAD3A',
        }
      }}
    >Run in Swagger</Button>
  );
};
SwaggerButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default SwaggerButton;
