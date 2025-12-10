let API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
API_BASE = API_BASE.replace(/\/+$/, "");

export async function request(path, { method = "GET", body, token } = {}) {
  if (!path.startsWith("/")) path = "/" + path;

  const url = `${API_BASE}${path}`;
  const headers = {};

  if (!(body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const authToken = token || localStorage.getItem("token");
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  const config = { method, headers };

  if (body && method !== "GET") {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  let res;
  try {
    res = await fetch(url, config);
  } catch (err) {
    throw { message: "Network error: cannot reach server" };
  }

  let data;
  try {
    const text = await res.text();
    data = text ? JSON.parse(text) : {};
    //console.log(data);
  } catch (err) {
    if (!res.ok) throw { message: "Unexpected server error" };
    return {};
  }

  if (!res.ok) throw data;

  return data;
}
