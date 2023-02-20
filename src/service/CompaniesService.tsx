export function getCompanies() {
  return fetch("https://api.npoint.io/e01cac7d042707a00a72")
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
