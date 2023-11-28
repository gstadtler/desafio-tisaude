enum Roles {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
}

export const RolePermissions = {
  'product.read': ['ADMIN', 'CUSTOMER'],
  'product.create': ['ADMIN'],
  'product.update': ['ADMIN'],
  'product.delete': ['ADMIN'],
}

type Permission = keyof typeof RolePermissions

export const can = (role: string, permission: Permission) => {
  const acceptableRoles = RolePermissions[permission]
  return acceptableRoles.includes(role)
}

export const isAdmin = (role: string) => role.toUpperCase() === Roles.ADMIN
