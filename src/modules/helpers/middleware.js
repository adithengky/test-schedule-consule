export function apiResponse() {
  return (req, res, next) => {
    const response = {};

    const defaultResponse = (code, status, message, data, error = null) => {
      if (error && Object.keys(error).length === 0) error = null;
      const output = {
        meta: {
          code,
          status,
          message,
        },
        data,
        error,
      };
      res.APIResponse = output;
      return output;
    };

    /**
     * Add API success responder
     * @param {string} message
     * @param {object} data, returned data
     * @param {object} meta, meta data
     */
    response.success = (message, data = {}, meta = {}) => {
      if (data.pagination && data.pagination.current_page) {
        data.pagination.current_page = parseInt(data.pagination.current_page);
      }
      if (data.pagination && data.pagination.limit) {
        data.pagination.limit = parseInt(data.pagination.limit);
      }
      if (data.pagination && data.pagination.total_page) {
        data.pagination.total_page = parseInt(data.pagination.total_page);
      }
      if (data.pagination && data.pagination.total_rows) {
        data.pagination.total_rows = parseInt(data.pagination.total_rows);
      }
      return res.status(200).json(defaultResponse(200, true, message, data, null, meta));
    };

    /**
     * Add API error responder
     * @param {object} error, error object data
     */
    response.error = (error, status = 500) => {
      const { httpStatus = status } = error;
      const { previousError = error } = error;
      const { message = 'Error' } = error;
      // eslint-disable-next-line
      delete previousError.httpStatus;
      let detailError = null;
      if (previousError.details) {
        detailError = formatErrorMessage(previousError);
      }
      return res.status(httpStatus)
        .json(defaultResponse(httpStatus, false, message, null, detailError, {}));
    };

    res.API = response;
    next();
  };
}

export const formatErrorMessage = (error) => {
  const detailError = {};
  if (error.details) {
    error.details.forEach((err) => {
      if (!detailError[err.context.key]) detailError[err.context.key] = [];
      detailError[err.context.key].push(err.message);
    });
  }
  return detailError;
};

export const flattenErrorMessage = obj => _(obj).values().flatten().value();

