import { colors } from "@/styles/theme";

const REGEX = {
  EMAIL: /^[_a-z0-9-]+(.[_a-z0-9-]+)*@(?:\w+\.)+\w+$/,
  USERNAME: /^[가-힣a-zA-Z0-9]{2,20}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d~!@#$%^&*()+|=]{8,20}$/,
  TEAM_NAME: /^[가-힣a-zA-Z\d~!@#$%^&*()+_\-\s]{1,20}$/,
};

const COLORS = {
  GREEN: colors.LIGHT_GREEN_300,
  RED: colors.RED_300,
  YELLOW: colors.YELLOW_300,
  BLUE: colors.SKY_BLUE_300,
  PURPLE: colors.PURPLE_300,
  PINK: colors.PINK_300,
};

const TOTAL_TEAMS_PAGING_COUNT = 5;

export { REGEX, COLORS, TOTAL_TEAMS_PAGING_COUNT };
