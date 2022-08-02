import React from "react";
import LabeledRadio from "@/components/LabeledRadio";

export default {
  component: LabeledRadio,
  title: "components/common/LabeledRadio",
};

const Template = (args) => <LabeledRadio {...args}></LabeledRadio>;

export const Default = Template.bind({});
Default.args = {
  labelText: "라벨 텍스트가 나오는 곳입니다",
  radios: [
    { id: 1, backgroundColor: "#C5FF98", value: "🐶" },
    { id: 2, value: "🐶" },
    { id: 3, backgroundColor: "#FF8181" },
    { id: 4, backgroundColor: "#FFF598", value: "🐶" },
    { id: 5, backgroundColor: "#98DAFF", value: "🐶" },
    { id: 6, backgroundColor: "#98A2FF", value: "🐶" },
    { id: 7, backgroundColor: "#FF98D0", value: "🐶" },
  ],
};
