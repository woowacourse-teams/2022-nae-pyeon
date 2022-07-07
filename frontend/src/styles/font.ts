import { css } from "@emotion/react";
import SeoulNamsanM from "@/assets/fonts/SeoulNamsanM.ttf";

const font = css`
  @font-face {
    font-family: "SeoulNamsanM";
    src: url(${SeoulNamsanM}) format("truetype");
  }

  body {
    font-family: "SeoulNamsanM";
  }
`;

export default font;
