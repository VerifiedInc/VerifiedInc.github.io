import { prettyField } from '../utils';

export function mapSchemaDto([key, schemaDto]) {
  const { json } = schemaDto;
  const { $id, ...restJson } = json;
  const data = {
    ...restJson,
    id: key,
    name: prettyField($id),
    raw: schemaDto,
  };

  return [key, data];
}
