const setCookie = (name: string, value: string) => {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
};

const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(`${name}=([^;]*)`));

  return matches ? decodeURIComponent(matches[1]) : null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${encodeURIComponent(name)}=; max-age=-1`;
};

export { deleteCookie, getCookie, setCookie };
