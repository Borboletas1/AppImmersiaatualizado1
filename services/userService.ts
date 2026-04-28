// services/userService.ts
const API_URL = 'https://sua-api.com'; // Substitua pela sua URL

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export const userService = {
  async register(data: RegisterData): Promise<User> {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Erro ao cadastrar');
    }

    return response.json();
  },
};