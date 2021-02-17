export const cleanLocalStorage = () => {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("uid");
}