import Markdown from 'react-markdown';
import PropTypes from 'prop-types';

const TestUserDisplay = ({ data, description, children }) => {
    const markdownDescription = description ? `> ${description}` : null;

    return (
        <>
            {children}
            {markdownDescription && <Markdown>{markdownDescription}</Markdown>}
            <table className="error-table">
                <tbody>
                    {Object.entries(data).map(([key, value]) => (
                        <tr key={key}>
                            <th><Markdown>{key}</Markdown></th>
                            <td><Markdown>{value}</Markdown></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
};

TestUserDisplay.propTypes = {
    data: PropTypes.object.isRequired,
    description: PropTypes.string,
    children: PropTypes.node
};

export default TestUserDisplay;