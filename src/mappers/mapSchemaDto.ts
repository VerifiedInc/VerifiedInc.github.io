import { prettyField } from '../utils';

export function mapSchemaDto([key, schemaDto]) {
  const { $id, ...rest } = schemaDto;
  const data = {
    ...rest,
    id: key,
    name: prettyField($id),
    raw: schemaDto,
  };

  return [key, data];
}
