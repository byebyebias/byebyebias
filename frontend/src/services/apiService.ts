const apiUrl = import.meta.env.VITE_API_URL;


export const apiService = {
  async post(endpoint: string, body: FormData): Promise<Response> {
    return fetch(`${apiUrl}/api${endpoint}`, {
      method: "POST",
      body,
    });
  },
};