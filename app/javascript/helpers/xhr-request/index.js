const XhrRequestError = async (response) => {
  const error = new Error(`Request Failed: ${response.status} - ${response.statusText}`)
  error.status = response.status
  error.data = await response.json()
  return error
}

const throwException = async (response) => {
  throw await new XhrRequestError(response)
}

const xhrRequest = async ({ url, options }) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
    },
    ...options,
  });
  return response.ok ? await response.json() : throwException(response); 
}

export default xhrRequest;