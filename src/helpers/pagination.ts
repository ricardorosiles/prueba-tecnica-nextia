export const getLimitAndOffset = (page?: string, page_size?: string) => {
  const limit = parseInt(page_size as string, 10) || 10;
  const offset = (parseInt(page as string, 10) - 1) * limit || 0;

  return {
    limit,
    offset,
  };
};

export const getLimitAndOffsetNoDefault = (page?: string, page_size?: string) => {
  const limit = parseInt(page_size as string, 10) || undefined;
  let offset = 0;
  if (limit) offset = (parseInt(page as string, 10) - 1) * limit || 0;

  return {
    limit,
    offset,
  };
};

export const formatPageResult = <
  T extends { data: { count: number; rows: T['data']['rows'] }; page?: string; page_size?: string },
>(
  input: T,
) => {
  const { page = '1', page_size = '10', data } = input;
  return {
    pagination: {
      page: parseInt(page, 10),
      page_size: parseInt(page_size, 10),
      total_rows: data.count,
      total_pages: Math.ceil(data.count / parseInt(`${page_size}`, 10)),
    },
    data: data.rows,
  };
};

export const formatPageResultNoDefault = <
  T extends { data: { count: number; rows: T['data']['rows'] }; page?: string; page_size?: string },
>(
  input: T,
) => {
  const { page = '1', page_size, data } = input;
  return {
    pagination: {
      page: parseInt(page, 10),
      page_size: parseInt(page_size || `${data.count}`, 10),
      total_rows: data.count,
      total_pages: Math.ceil(data.count / parseInt(`${page_size}`, 10)) || 1,
    },
    data: data.rows,
  };
};
