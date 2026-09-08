export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  createdAt: string;
}

export const mockUsers: User[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '+251911234567', password: 'password123', createdAt: '2024-01-01T10:00:00Z' },
  { id: '2', firstName: 'Sarah', lastName: 'Johnson', email: 'sarah@example.com', phone: '+251912345678', password: 'password123', createdAt: '2024-01-02T10:00:00Z' },
  { id: '3', firstName: 'Michael', lastName: 'Smith', email: 'michael@example.com', phone: '+251913456789', password: 'password123', createdAt: '2024-01-03T10:00:00Z' },
  { id: '4', firstName: 'Emily', lastName: 'Davis', email: 'emily@example.com', phone: '+251914567890', password: 'password123', createdAt: '2024-01-04T10:00:00Z' },
];

export const authService = {
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
  async login(email: string, password: string): Promise<User | null> {
    await this.delay(800);
    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword as User;
    }
    return null;
  },
  async register(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    await this.delay(800);
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) throw new Error('Email already registered');
    const newUser: User = { ...userData, id: Date.now().toString(), createdAt: new Date().toISOString() };
    mockUsers.push(newUser);
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword as User;
  },
};