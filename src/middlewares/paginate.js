const paginate = (req, res, next) => {
  let data = [];
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  res.paginatedResults = {
    results: data.slice(startIndex, endIndex),
    currentPage: page,
    totalPages: Math.ceil(data.length / limit),
  };
  next();
};

module.exports = { paginate };
