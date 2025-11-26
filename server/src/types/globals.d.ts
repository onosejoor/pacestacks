interface IFormData {
  name: string;
  email: string;
  password: string;
}

interface ServiceRes<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface IUserPayload {
  id: string;
  role: Role;
}

type Role = "staff" | "admin";

export { IFormData, ServiceRes, Role, IUserPayload };
