import Markdown from 'react-markdown';

export const ErrorDisplay = ({ code, message, description, children }) => {
    const markdownCode = `#### \`${code}\``;
    const markdownDescription = description ? `> ${description}` : null;
    const markdownMessage = `\`"${message}"\``;

    return (
        <>
            <Markdown>{markdownCode}</Markdown>
            {markdownDescription && <Markdown>{markdownDescription}</Markdown>}
            <table className="error-table">
                <tbody>
                    <tr>
                        <th><Markdown>`messsage`</Markdown></th>
                        <td><Markdown>{markdownMessage}</Markdown></td>
                    </tr>
                </tbody>
            </table>
            {children}
        </>
    );
};
