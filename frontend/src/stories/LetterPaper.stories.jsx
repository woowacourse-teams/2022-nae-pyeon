import React from "react";
import LetterPaper from "@/components/LetterPaper";
import { BrowserRouter } from "react-router-dom";

export default {
  component: LetterPaper,
  title: "LetterPaper",
};

const Template = (args) => {
  return (
    <BrowserRouter>
      <LetterPaper {...args}></LetterPaper>
    </BrowserRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  to: "소피아",
  messageList: [
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
    {
      content: "소피아 생일 축하해 아아아아아아아아",
      from: "도리",
      authorId: 123,
    },
  ],
};
