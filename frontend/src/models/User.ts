export interface Role {
  name: string;
}

export interface User {
  _id: number;
  email: string;
  name: string;
  surname: string;
  roles: Role[];
}
