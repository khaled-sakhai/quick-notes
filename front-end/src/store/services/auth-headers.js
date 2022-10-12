export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    const myHeaders = new Headers({
      Authorization: "Bearer " + user.token,
      "Content-Type": "application/json",
    });
    return myHeaders;
  } else {
    return {};
  }
}
