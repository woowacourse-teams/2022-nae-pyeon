import React from "react";
import { MemoryRouter } from "react-router-dom";

import Loading from "@/components/Loading";

export default {
  component: Loading,
  title: "components/common/Loading",
};

const Template = (args) => (
  <MemoryRouter>
    <Loading {...args}></Loading>
  </MemoryRouter>
);

export const Default = Template.bind({});
