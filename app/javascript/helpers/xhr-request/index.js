class XhrRequestError extends Error {
  constructor({ response, data}) {
    super(`[ERROR] Request Failed: ${response.status} - ${response.statusText}`);
    this.name = "XhrRequestError";
    this.status = response.status;
    this.data = data;
  }
}

const throwException = async (response) => {
  const data = await response.json();
  throw new XhrRequestError({ response, data });
};

const xhrRequest = async ({ url, options }) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
    },
    ...options,
  });
  return response.ok ? response.json() : throwException(response);
};

export default xhrRequest;
