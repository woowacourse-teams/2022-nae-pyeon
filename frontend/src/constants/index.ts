const REGEX = {
  EMAIL: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/,
  USERNAME: /^[가-힣a-zA-Z0-9]{2,20}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/,
  TEAM_NAME: /^[가-힣a-zA-Z\d~!@#$%^&*()+_\-\s]{1,20}$/,
};

const TOTAL_TEAMS_PAGING_COUNT = 5;

export { REGEX, TOTAL_TEAMS_PAGING_COUNT };
