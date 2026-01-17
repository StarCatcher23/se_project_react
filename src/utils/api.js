const baseUrl = "http://localhost:3001";

const headers = {
  "Content-Type": "application/json",
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

// NEW helper function
function request(url, options) {
  return fetch(url, options).then(handleServerResponse);
}

export const getItems = () => {
  return request(`${baseUrl}/items`, { headers });
};

export const addItem = (item) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify(item),
  });
};

export const removeItem = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers,
  });
};
