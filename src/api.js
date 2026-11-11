const API = import.meta.env.VITE_API_URL || "http://localhost:1337";

async function request(path, options = {}) {
    const res = await fetch(`${API}${path}`, {
        headers: { "Content-Type": "application/json" },
        ...options
    });
    if (res.status === 204) return null;
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Något gick fel");
    return data;
}

export const getDocuments = () => request("/documents");
export const getDocument = (id) => request(`/documents/${id}`);
export const createDocument = (doc) =>
    request("/documents", { method: "POST", body: JSON.stringify(doc) });
export const updateDocument = (id, doc) =>
    request(`/documents/${id}`, { method: "PUT", body: JSON.stringify(doc) });
export const deleteDocument = (id) =>
    request(`/documents/${id}`, { method: "DELETE" });
