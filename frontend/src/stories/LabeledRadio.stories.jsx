import React from "react";
import LabeledRadio from "@/components/LabeledRadio";

export default {
  component: LabeledRadio,
  title: "LabeledRadio",
};

const Template = (args) => <LabeledRadio {...args}></LabeledRadio>;

export const Default = Template.bind({});
Default.args = {
  labelText: "라벨 텍스트가 나오는 곳입니다",
  radios: [
    { backgroundColor: "#C5FF98", value: "🐶" },
    { value: "🐶" },
    { backgroundColor: "#FF8181" },
    { backgroundColor: "#FFF598", value: "🐶" },
    { backgroundColor: "#98DAFF", value: "🐶" },
    { backgroundColor: "#98A2FF", value: "🐶" },
    { backgroundColor: "#FF98D0", value: "🐶" },
  ],
};
