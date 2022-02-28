export const roleConfig = {
  admin: [
    { name: "Studies", route: "/study" },
    { name: "Experiments", route: "/experiment" },
    { name: "Users", route: "/users" },
    { name: "Setting", route: "/setting" },
  ],
  ra: ["Studies", "Experiments", "Setting"],
  participants: ["Dashboard", "Setting"],
  default: [],
};
