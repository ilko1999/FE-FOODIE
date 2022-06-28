const apiResult = (response) => {
  return response.status === 200
    ? { data: response.data, status: response.status }
    : { error: response.data, status: response.status };
};

export default {
  apiResult,
};
