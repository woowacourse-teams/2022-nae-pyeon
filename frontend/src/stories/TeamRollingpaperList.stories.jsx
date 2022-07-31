import React from "react";
import { BrowserRouter } from "react-router-dom";
import TeamRollingpaperList from "@/pages/TeamDetailPage/components/TeamRollingpaperList";

export default {
  component: TeamRollingpaperList,
  title: "TeamRollingpaperList",
};

const dummyRollingpapers = [
  {
    id: 1,
    title: "우테코 고마워",
    to: "우아한테크코스",
  },
  {
    id: 2,
    title: "소피아 생일 축하해 🎉",
    to: "소피아",
  },
  {
    id: 3,
    title: "오늘의 내 편 데일리 미팅",
    to: "내 편",
  },
  {
    id: 4,
    title: "이번 주 우리의 한 마디",
    to: "우아한테크코스",
  },
];

const Template = (args) => {
  return (
    <BrowserRouter>
      <TeamRollingpaperList {...args}></TeamRollingpaperList>
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  rollingpapers: dummyRollingpapers,
};
