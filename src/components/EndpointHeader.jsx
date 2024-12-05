import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const EndpointHeader = ({ children, postmanUrl, swaggerUrl }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
        {children}
        <div>
            <Button
                href={swaggerUrl}
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
            >
                Run in Swagger
            </Button>
            <Button
                href={postmanUrl}
                target="_blank"
                variant="outlined"
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
            >
                Run in Postman
            </Button>
        </div>
    </div>
);


EndpointHeader.propTypes = {
    children: PropTypes.node.isRequired,
    postmanUrl: PropTypes.string.isRequired,
    swaggerUrl: PropTypes.string.isRequired,
};

export default EndpointHeader;