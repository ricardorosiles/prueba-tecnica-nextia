type ValidationProp = { type: string; min?: number };
type ObjectProps = Record<string | '$$strict', ValidationProp | Array<ValidationProp> | boolean>;

export const typeNumber = () => ({ type: 'number' } as const);
export const typeNumberMin = (min: number) => ({ type: 'number', min });
export const typeNumberOptional = () => ({ type: 'number', optional: true } as const);
export const typeNumberIntegerMin = (min: number) => ({ ...typeNumberMin(min), integer: true });
export const typeNumberInteger = () => ({ type: 'number', integer: true });
export const typeNumberOptionalInteger = () => ({ type: 'number', optional: true, integer: true });
export const typeNumberIntegerPositive = () => ({ ...typeNumberInteger(), positive: true });
export const typeNumberIntegerPositiveConvert = () => ({
  ...typeNumberIntegerPositive(),
  convert: true,
});
export const typeNumberIntegerConvert = () => ({
  type: 'number',
  integer: true,
  convert: true,
});
export const typeNumberIntegerConvertMin = (min: number) =>
  ({
    ...typeNumberIntegerConvert(),
    min,
  } as const);
export const typeNumberOptionalIntegerConvertMin = (min: number) =>
  ({
    type: 'number',
    optional: true,
    min,
    convert: true,
    integer: true,
  } as const);

export const typeUUID = () => ({ type: 'uuid' } as const);
export const typeUUIDOptional = () => ({ ...typeUUID(), optional: true } as const);
export const typeUUIDOptionalNull = () => ({ type: 'uuid', optional: true, nullable: true });

export const typeString = () => ({ type: 'string' } as const);
export const typeStringOptional = () => ({ ...typeString(), optional: true } as const);
export const typeStringOptionalMax = (max: number) => ({ ...typeStringOptional(), max });
export const typeStringMax = (max: number) => ({ type: 'string', max });
export const typeStringMin = (min: number) => ({ type: 'string', min });
export const typeStringOptionalMinMax = (min: number, max: number) => ({
  type: 'string',
  optional: true,
  min,
  max,
});
export const typeStringEnum = <T extends Array<string>>(data: T) => ({
  ...typeString(),
  enum: data,
});
export const typeStringOptionalEnum = <T extends Array<string>>(data: T) => ({
  ...typeStringOptional(),
  enum: data,
});
export const typeStringContains = (contains: string) => ({ ...typeString(), contains });

export const typeEmail = () => ({ type: 'email' } as const);
export const typeEmailMax = (max: number) => ({ ...typeEmail(), max });
export const typeEmailOptional = () => ({ ...typeEmail(), optional: true });
export const typeEmailOptionalMax = (max: number) => ({ ...typeEmailMax(max), optional: true });

export const typeDateConvert = () => ({ type: 'date', convert: true } as const);
export const typeDateOptionalConvert = () => ({ type: 'date', optional: true, convert: true });

export const typeBoolean = () => ({ type: 'boolean' } as const);
export const typeBooleanOptional = () => ({ type: 'boolean', optional: true });
export const typeBooleanOptionalConvert = () => ({
  type: 'boolean',
  convert: true,
  optional: true,
});

export const typeMainObject = <T extends ObjectProps>(obj: T) => ({
  ...obj,
});
export const typeMainObjectStrict = <T extends ObjectProps>(obj: T) => ({
  $$strict: true,
  ...obj,
});
export const typeMainObjectStrictPaged = <T extends ObjectProps>(obj: T) => ({
  $$strict: true,
  page: typeNumberOptionalIntegerConvertMin(1),
  page_size: typeNumberOptionalIntegerConvertMin(1),
  ...obj,
});
export const typeMainObjectPaged = <T extends ObjectProps>(obj: T) => ({
  page: typeNumberOptionalIntegerConvertMin(1),
  page_size: typeNumberOptionalIntegerConvertMin(1),
  ...obj,
});

export const typeObjectRootMinProps = (minProps: number) => ({
  $$root: true,
  type: 'object',
  minProps,
});
export const typeObject = <T extends ObjectProps>(props: T) => ({
  type: 'object',
  props,
});
export const typeObjectOptional = <T extends ObjectProps>(props: T) => ({
  type: 'object',
  optional: true,
  props,
});
export const typeObjectStrict = <T extends ObjectProps>(props: T) => ({
  type: 'object',
  strict: true,
  props,
});
export const typeObjectOptionalStrict = <T extends ObjectProps>(props: T) => ({
  type: 'object',
  strict: true,
  optional: true,
  props,
});

export const typeArrayObject = <T extends ObjectProps>(props: T) => ({
  type: 'array',
  items: {
    type: 'object',
    props,
  },
});
export const typeArrayObjectStrict = <T extends ObjectProps>(props: T) =>
  ({
    type: 'array',
    items: {
      strict: true,
      type: 'object',
      props,
    },
  } as const);

export const typeArrayObjectStrictRootMin = <T extends ObjectProps>(props: T, min: number) => ({
  $$strict: true,
  $$root: true,
  type: 'array',
  min,
  items: {
    type: 'object',
    props,
  },
});
export const typeArrayObjectOptionalStrict = <T extends ObjectProps>(props: T) => ({
  type: 'array',
  optional: true,
  items: {
    strict: true,
    type: 'object',
    props,
  },
});

export const typeArrayStringOptionalEnum = <T extends Array<string>>(data: T) => ({
  type: 'array',
  enum: data,
  optional: true,
});

export const typeArrayUUIDOptional = () => ({
  type: 'array',
  items: { type: 'uuid' },
  optional: true,
});
export const typeArrayUUIDMin = (min: number) => ({
  type: 'array',
  min,
  items: {
    type: 'uuid',
  },
});
export const typeArrayUUIDOptionalMin = (min: number) => ({
  ...typeArrayUUIDMin(min),
  optional: true,
});

export const typeArrayUUIDOptionalMax = (max: number) =>
  ({
    type: 'array',
    max,
    items: {
      type: 'uuid',
    },
    optional: true,
  } as const);

export const typeClassInstanceBuffer = () => ({ type: 'class', instanceOf: Buffer });
export const typeUnion = (props: Array<ValidationProp>) => props;
