interface setCookieProps {
  name: string;
  value: string;
  maxAge: number;
}

const setCookie = ({ name, value, maxAge }: setCookieProps) => {
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; max-age=${maxAge}; path=/`;
};

const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(`${name}=([^;]*)`));

  return matches ? decodeURIComponent(matches[1]) : null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${encodeURIComponent(name)}=; max-age=-1; path=/  `;
};

export { deleteCookie, getCookie, setCookie };
