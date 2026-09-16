// Re-indents every line after the first so a standalone JSON snippet can be
// spliced as a nested value inside a larger JSON example.
export const indentJson = (json, spaces) =>
    json
        .split('\n')
        .map((line, index) => (index === 0 ? line : ' '.repeat(spaces) + line))
        .join('\n');
