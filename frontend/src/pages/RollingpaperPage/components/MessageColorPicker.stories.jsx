import React from "react";
import MessageColorPicker from "@/pages/RollingpaperPage/components/MessageColorPicker";

const colors = [
  { id: 1, value: "#C5FF98" },
  { id: 2, value: "#FF8181" },
  { id: 3, value: "#FFF598" },
  { id: 4, value: "#98DAFF" },
  { id: 5, value: "#98A2FF" },
  { id: 6, value: "#FF98D0" },
];

export default {
  component: MessageColorPicker,
  title: "components/RollingpaperPage/MessageColorPicker",
};

const Template = (args) => <MessageColorPicker {...args}></MessageColorPicker>;

export const Default = Template.bind({});
Default.args = {
  radios: colors,
  initialSelectedId: colors[0].id,
};
