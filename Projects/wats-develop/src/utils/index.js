export const encodeToken = payload => {
  const { data, salt } = payload;
  let hash = JSON.stringify(data);
  Array(salt).forEach(index => {
    hash = btoa(hash);
  });
  const token = btoa(
    JSON.stringify({
      hash,
      salt
    })
  );
  return token;
};
export const decodeToken = token => {
  if (!token) return;
  let { hash, salt } = JSON.parse(atob(token));
  Array(salt).forEach(index => {
    hash = atob(hash);
  });
  const data = JSON.parse(hash);
  return data;
};
