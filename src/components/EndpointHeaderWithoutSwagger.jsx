import PropTypes from 'prop-types';

import PostmanButton from './Buttons/PostmanButton.jsx';

const EndpointHeaderWithoutSwagger = ({ children, postmanUrl }) => (
    <div className='endpoint-header' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'top' }}>
        {children}
        <div>
            <PostmanButton url={postmanUrl} />
        </div>
    </div>
);


EndpointHeaderWithoutSwagger.propTypes = {
    children: PropTypes.node.isRequired,
    postmanUrl: PropTypes.string.isRequired,
};

export default EndpointHeaderWithoutSwagger;