import path from 'path';
import fs from 'fs';
import {
  QueryInterface,
  Transaction,
  QueryOptions,
  TableName,
  WhereOptions,
  QueryOptionsWithWhere,
} from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

type QueryOptionsOnDuplicate = QueryOptions & {
  updateOnDuplicate: Array<string>;
};

type MapSeederParams = {
  id?: string;
  [x: string]: string | number | boolean | null | undefined;
};

type SetBulkInsertAttrsOptions = {
  queryInterface: QueryInterface;
  transaction: Transaction;
  attributes: Array<string>;
};

type SetBulkInsertOptions = {
  queryInterface: QueryInterface;
  transaction: Transaction;
};

type GetOneTableRowOptions = {
  queryInterface: QueryInterface;
  transaction: Transaction;
  where?: WhereOptions<any>;
};

type GetAllTableOptions = {
  queryInterface: QueryInterface;
  transaction: Transaction;
  attributes?: Array<string>;
};

type BulkDeleteOptions = {
  queryInterface: QueryInterface;
  transaction: Transaction;
};

type GetAllOptionsWhere = QueryOptionsWithWhere & {
  attributes?: Array<string>;
};

export type DataOutput = Record<string, string | number | null>;

export const mapSeeders = (data: MapSeederParams) => {
  const newSeed = {
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  if (!data.id) newSeed.id = uuidv4();
  return newSeed;
};

const mapSeedersV2 = (data: MapSeederParams) => {
  const newSeed = {
    ...data,
    created_at: new Date(),
    updated_at: new Date(),
  };
  if (!data.id) newSeed.id = uuidv4();
  return newSeed;
};

export const getAttrsWithoutId = (data: Array<MapSeederParams>) => {
  let obj = JSON.parse(JSON.stringify(data));
  if (Array.isArray(data) && data.length > 0) {
    const [firstElement] = data;
    obj = firstElement;
  }
  if (typeof obj !== 'object') return [];
  const attrs = Object.keys(obj || {}).filter((attr) => attr !== 'id');
  attrs.push('updatedAt');
  return attrs;
};

const getAttrsWithoutIdV2 = (data: SetBulkInsertData) => {
  let obj = JSON.parse(JSON.stringify(data));
  if (Array.isArray(data) && data.length > 0) {
    const [firstElement] = data;
    obj = firstElement;
  }
  if (typeof obj !== 'object') return [];
  const attrs = Object.keys(obj || {}).filter((attr) => attr !== 'id');
  attrs.push('updated_at');
  return attrs;
};

export const catchQueryInterface = (err: any) => {
  // eslint-disable-next-line no-console
  console.log('🔴 migration fail', err.message);
  throw new Error(err);
};

type SetBulkInsertData = Array<MapSeederParams>;

export const setBulkInsert = (
  table: TableName,
  data: SetBulkInsertData,
  options: SetBulkInsertOptions,
) => {
  const { queryInterface, transaction } = options;
  return queryInterface.bulkInsert(table, data.map(mapSeeders), {
    updateOnDuplicate: getAttrsWithoutId(data),
    upsertKeys: ['id'],
    transaction,
  } as QueryOptionsOnDuplicate);
};

export const setBulkInsertV2 = (
  table: TableName,
  data: SetBulkInsertData,
  options: SetBulkInsertOptions,
) => {
  const { queryInterface, transaction } = options;
  return queryInterface.bulkInsert(table, data.map(mapSeedersV2), {
    updateOnDuplicate: getAttrsWithoutIdV2(data),
    upsertKeys: ['id'],
    transaction,
  } as QueryOptionsOnDuplicate);
};

export const setBulkInsertByAttrs = (
  table: TableName,
  data: SetBulkInsertData,
  options: SetBulkInsertAttrsOptions,
) => {
  const { queryInterface, transaction, attributes } = options;
  if (!Array.isArray(data)) return null;
  if (data.length === 0) return null;

  return queryInterface.bulkInsert(table, data.map(mapSeedersV2), {
    updateOnDuplicate: attributes,
    upsertKeys: ['id'],
    transaction,
  } as QueryOptionsOnDuplicate);
};

export const getTableName = <T extends string>(tableName: T) => ({
  schema: process.env.DATABASE_SCHEMA,
  tableName,
});

export const getOneTableRowId = (tableName: TableName, options: GetOneTableRowOptions) => {
  const { queryInterface, transaction, where } = options;
  return queryInterface.rawSelect(tableName, { transaction, where }, ['id']);
};

export const getAllTableRow = (tableName: TableName, options: GetAllTableOptions) => {
  const { queryInterface, transaction, attributes } = options;

  const query: GetAllOptionsWhere = {
    transaction,
    plain: false,
    raw: true,
  };

  if (Array.isArray(attributes)) query.attributes = attributes;
  return queryInterface.rawSelect(tableName, query, ['id']);
};

export const logger = {
  // eslint-disable-next-line no-console
  error: (msg: string) => console.info(`🔴 ${msg}`),
};

export const bulkDeleteById = async (
  tableName: TableName,
  data: Array<{ id: string }>,
  options: BulkDeleteOptions,
) => {
  const { transaction, queryInterface } = options;
  await queryInterface.bulkDelete(
    tableName,
    { id: data.map((currentData) => currentData.id) },
    { transaction },
  );
};

const applyRound = (value: number) => Math.round(Number(value));

const applyRoundByAttributes = <T extends DataOutput, K extends keyof T>(
  data: T,
  attributes: Array<K>,
) =>
  Object.keys(data).reduce((prev, attr) => {
    const foundAttr = attributes.find((attribute) => attribute === attr);
    if (!foundAttr) return prev;
    const currentData = prev[foundAttr];
    if (!currentData) return prev;
    if (typeof currentData !== 'number') return prev;
    return {
      ...prev,
      [attr]: applyRound(currentData),
    };
  }, data);

export const applyRoundArrayData = <T extends DataOutput, K extends keyof T>(
  data: Array<T>,
  attributes: Array<K>,
) => data.map((item) => applyRoundByAttributes(item, attributes));

export const updateColumnNulleableId = async (
  tableName: TableName,
  columnName: string,
  options: SetBulkInsertOptions,
) => {
  const { queryInterface, transaction } = options;
  const columnId = await queryInterface.rawSelect(tableName, { transaction }, ['id']);
  if (!columnId) return null;

  return queryInterface.bulkUpdate(
    tableName,
    { [columnName]: columnId },
    { [columnName]: null },
    { transaction },
  );
};

export const getFileStringbyPath = (...pathSegment: Array<string>) =>
  fs.readFileSync(path.resolve(...pathSegment)).toString('utf-8');
