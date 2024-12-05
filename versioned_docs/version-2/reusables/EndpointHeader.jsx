import PostmanButton from '@site/src/components/buttons/PostmanButton.jsx';
import SwaggerButton from '@site/src/components/buttons/SwaggerButton.jsx';
import PropTypes from 'prop-types';


const EndpointHeader = ({ children, postmanUrl, swaggerUrl }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
        {children}
        
        <div>
            <SwaggerButton url={swaggerUrl}/>
            <PostmanButton url={postmanUrl}/>
        </div>
    </div>
);


EndpointHeader.propTypes = {
    children: PropTypes.node.isRequired,
    postmanUrl: PropTypes.string.isRequired,
    swaggerUrl: PropTypes.string.isRequired,
};

export default EndpointHeader;