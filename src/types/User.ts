export interface User {
  access_token: string
  refresh_token: string
  id: string
  email: string
  password: string
  name: string
  role: string
  avatar: string
  creationAt: string
  updatedAt: string
}

export interface RegisterValues {
  name: string
  email: string
  password: string
  avatar: string
}

export interface SignInValues {
  email: string
  password: string
}

export interface UpdateUser {
  email: string
  password: string
  name: string
  role: string
  avatar: string
}
