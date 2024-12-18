import Markdown from 'react-markdown';
import PropTypes from 'prop-types';

const TestUserDisplay = ({ data, description, children }) => (
    <>
        {children}
        <Markdown>{`> ${description}`}</Markdown>
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

TestUserDisplay.propTypes = {
    data: PropTypes.object.isRequired,
    description: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default TestUserDisplay;