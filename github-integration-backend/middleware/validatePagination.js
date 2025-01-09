const validatePagination = (req, res, next) => {
    const { page, per_page } = req.params;
    console.log(">>>", req.params);
    
  
    if (page && (!Number.isInteger(+page) || +page <= 0)) {
      return res.status(400).json({ error: 'Invalid page number' });
    }
  
    if (per_page && (!Number.isInteger(+per_page) || +per_page <= 0)) {
      return res.status(400).json({ error: 'Invalid per_page value' });
    }
  
    next();
  };
  
  module.exports = validatePagination;
  