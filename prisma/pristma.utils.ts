// Exclude keys from user
export function exclude<User, Key extends keyof User>(
  user: User,
  keys: Key[]
): Omit<User, Key> {
  return Object.fromEntries(
    Object.entries(user).filter(([key]) => !keys.includes(key))
  );
}

//   function main() {
//     const user = await prisma.user.findUnique({ where: 1 })
//     const userWithoutPassword = exclude(user, ['password'])
//   }
