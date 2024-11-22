export const apiService = {
    async post(endpoint: string, body: FormData): Promise<Response> {
        return fetch(`http://127.0.0.1:8000/api${endpoint}`, {
            method: "POST",
            body,
        });
    },
};