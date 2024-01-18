import {
  getLimitAndOffset,
  formatPageResult,
  getLimitAndOffsetNoDefault,
  formatPageResultNoDefault,
} from './pagination';

describe('pagination helper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return limit and offset', async () => {
    const result = getLimitAndOffset('2', '20');
    expect(result).toEqual({ limit: 20, offset: 20 });
  });

  it('should return default limit and offset', () => {
    expect(getLimitAndOffset()).toEqual({ limit: 10, offset: 0 });
  });

  it('should return pagination format default result ', () => {
    const input = {
      data: {
        count: 1,
        rows: [{ id: 1 }, { id: 2 }, { id: 2 }],
      },
    };

    const result = formatPageResult(input);
    expect(result).toEqual({
      pagination: {
        page: 1,
        page_size: 10,
        total_rows: 1,
        total_pages: 1,
      },
      data: input.data.rows,
    });
  });

  it('should return 2 total pages', () => {
    const input = {
      page: '1',
      page_size: '2',
      data: {
        count: 3,
        rows: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    };

    const result = formatPageResult(input);
    expect(result).toEqual({
      pagination: {
        page: 1,
        page_size: 2,
        total_rows: 3,
        total_pages: 2,
      },
      data: input.data.rows,
    });
  });

  it('[getLimitAndOffsetNoDefault] should return limit and offset', async () => {
    const result = getLimitAndOffsetNoDefault('2', '20');
    expect(result).toEqual({ limit: 20, offset: 20 });
  });

  it('[getLimitAndOffsetNoDefault] should return limit and offset no default', async () => {
    const result = getLimitAndOffsetNoDefault(undefined, undefined);
    expect(result).toEqual({ limit: undefined, offset: 0 });
  });

  it('[getLimitAndOffsetNoDefault] should return 2 total pages', () => {
    const input = {
      page: '1',
      page_size: '2',
      data: {
        count: 3,
        rows: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    };

    const result = formatPageResultNoDefault(input);
    expect(result).toEqual({
      pagination: {
        page: 1,
        page_size: 2,
        total_rows: 3,
        total_pages: 2,
      },
      data: input.data.rows,
    });
  });

  it('[getLimitAndOffsetNoDefault] should return no default pages', () => {
    const input = {
      data: {
        count: 3,
        rows: [{ id: 1 }, { id: 2 }, { id: 3 }],
      },
    };

    const result = formatPageResultNoDefault(input);
    expect(result).toEqual({
      pagination: {
        page: 1,
        page_size: 3,
        total_rows: 3,
        total_pages: 1,
      },
      data: input.data.rows,
    });
  });
});
