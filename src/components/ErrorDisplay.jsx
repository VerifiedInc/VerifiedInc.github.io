import Markdown from 'react-markdown';
import PropTypes from 'prop-types';

export const ErrorDisplay = ({ message, description, children: code }) => {
    const markdownDescription = description ? `> ${description}` : null;
    const markdownMessage = `\`"${message}"\``;

    return (
        <>
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
        </>
    )
};

ErrorDisplay.propTypes = {
    message: PropTypes.string.isRequired,
    description: PropTypes.string,
    children: PropTypes.node
};
