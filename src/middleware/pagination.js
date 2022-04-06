export const paginationPage = async (req) => {
  const page = +req.query.page || 1;
  const perPage = +req.query.perPage || 10;

  req.pagination = {
    take: perPage,
    page,
    perPage,
    skip: page === 1 ? 0 : (page - 1) * perPage,
  };
};
