import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const PostmanButton = ({ url }) => {


  return (
    <Button
      href={url}
      target="_blank"
      variant="outlined"
      color='inherit'
      size="small"
      startIcon={<OpenInNewIcon />}
      sx={{
        ml: 1,
        color: '#FF6C37',
        borderColor: '#FF6C37',
        '&:hover': {
          backgroundColor: '#FF6C37',
          color: '#FFFFFF',
          borderColor: '#FF6C37',
        }
      }}
    >Run in Postman</Button>
  );
};
PostmanButton.propTypes = {
  url: PropTypes.string.isRequired,
};

export default PostmanButton;
