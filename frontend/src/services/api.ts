type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

const API_URL = (import.meta.env.VITE_API as string) || 'http://localhost:3333'

export async function api(method: Method, url: string, payload?: object) {
  const response = await fetch(`${API_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: method !== 'GET' ? JSON.stringify(payload) : null,
  })
  return response.json()
}
