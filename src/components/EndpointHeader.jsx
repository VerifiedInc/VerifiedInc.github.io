import PropTypes from 'prop-types';

import PostmanButton from './Buttons/PostmanButton.jsx';
import SwaggerButton from './Buttons/SwaggerButton.jsx';

const EndpointHeader = ({ children, postmanUrl, swaggerUrl }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
        {children}
        <div>
            <SwaggerButton url={swaggerUrl} />
            <PostmanButton url={postmanUrl} />
        </div>
    </div>
);


EndpointHeader.propTypes = {
    children: PropTypes.node.isRequired,
    postmanUrl: PropTypes.string.isRequired,
    swaggerUrl: PropTypes.string.isRequired,
};

export default EndpointHeader;