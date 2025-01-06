import Markdown from 'react-markdown';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const ErrorDisplay = ({ message, description, children: code, sx }) => {
    const markdownDescription = description ? `> ${description}` : null;
    const markdownMessage = `\`"${message}"\``;

    return (
        <Box sx={{ pt: 2, ...sx }}>  

            {/* Had to send the header through the children due to docussaurus limitation in having react generated headers */}
            {code}
            {markdownDescription && <Markdown>{markdownDescription}</Markdown>}
            <table className="error-table">
                <tbody>
                    <tr>
                        <th><Markdown>`messsage`</Markdown></th>
                        <td><Markdown>{markdownMessage}</Markdown></td>
                    </tr>
                </tbody>
            </table>

        </Box>
    )
};

ErrorDisplay.propTypes = {
    message: PropTypes.string.isRequired,
    description: PropTypes.string,
    children: PropTypes.node,
    sx: PropTypes.object
};

export default ErrorDisplay;