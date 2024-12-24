import { Button } from '@mui/material';
import React from 'react';
import { LinkedIn } from '@mui/icons-material';

export const LinkedInButton = ({
    url,
    sx,
}) => {
    return (
        <Button
            variant="contained"
            color="inherit"
            sx={{
                backgroundColor: '#0A66C2',
                color: '#FFFFFF',
                '&:hover': {
                    backgroundColor: '#004182',
                },
                textTransform: 'none',

                ...sx
            }}
            startIcon={<LinkedIn />}
            onClick={() => {
                window.open(url, '_blank');
            }}
        >
            Share on LinkedIn
        </Button>
    );
};

export default LinkedInButton; 