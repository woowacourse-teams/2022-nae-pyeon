const REGEX = {
  EMAIL: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/,
  USERNAME: /^[가-힣a-zA-Z0-9]{2,20}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/,
  TEAM_NAME: /^[가-힣a-zA-Z\d~!@#$%^&*()+_\-\s]{1,20}$/,
};

const API_URL =
  process.env.NODE_ENV === "production"
    ? "http://54.180.122.233:8080/api/v1"
    : "/api/v1";

export { REGEX, API_URL };
