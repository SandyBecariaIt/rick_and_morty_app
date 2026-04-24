const BASE_URL = import.meta.env.VITE_API_URL

const headers = new Headers({
  'Content-Type': 'application/json; charset=utf-8',
  'Authorization': ''
})

async function request<T>(uri: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${uri}`, {
    headers,
    redirect: 'follow',
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }
  
  return response.json()
}

async function requestWhitoutHeader<T>(uri: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${uri}`, {
    redirect: 'follow',
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

export function get<T>(uri: string): Promise<T> {
  return requestWhitoutHeader<T>(uri, { method: 'GET' })
}

export function post<T>(uri: string, body: Record<string, unknown>): Promise<T> {
  return request<T>(uri, {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
