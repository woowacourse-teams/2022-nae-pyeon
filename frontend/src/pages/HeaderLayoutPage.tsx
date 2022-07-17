import React from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/Header";

const HeaderLayoutPage = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default HeaderLayoutPage;
