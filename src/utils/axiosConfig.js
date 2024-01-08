export const base_url = "http://localhost:5000/api/";
const getUserFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
console.log(getUserFromLocalStorage);
export const config = {
  headers: {
    Authorization: `Bearer ${
      getUserFromLocalStorage !== null ? getUserFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
