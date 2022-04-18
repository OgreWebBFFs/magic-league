const tradablesApi = async ({ url, options }) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
    },
    ...options,
  });
  return response.ok ? await response.json() : console.log(response); 
}

export default tradablesApi;