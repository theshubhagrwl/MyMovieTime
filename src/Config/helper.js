export const isAuthenticated = () => {
  if (
    localStorage.getItem("uid") &&
    localStorage.getItem("displayName") &&
    localStorage.getItem("email")
  ) {
    return true;
  } else {
  }
  return false;
};
