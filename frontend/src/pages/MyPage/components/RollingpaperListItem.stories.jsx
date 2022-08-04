import React from "react";
import RollingpaperCard from "@/pages/MyPage/components/RollingpaperCard";

export default {
  component: RollingpaperCard,
  title: "components/MyPage/RollingpaperCard",
};

const Template = (args) => <RollingpaperCard {...args}></RollingpaperCard>;

export const Default = Template.bind({});
Default.args = { title: "소피아의 생일을 축하해", teamName: "우테코 4기" };
