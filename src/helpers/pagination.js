export const paginationPage = (req, reply) => {
  const page = +req.query.page || 1;
  const take = +req.query.take || 10;
  const skip = page === 1 ? 0 : (page - 1) * take;

  req.pagination = {
    page,
    take,
    skip,
  };
};
