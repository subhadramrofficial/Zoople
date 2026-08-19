const users = [
  {
    username: "Hasna",
    password: "123456",
  },
];
export function findByUsername(username) {
  return users.find((user) => user.username === username);
}
