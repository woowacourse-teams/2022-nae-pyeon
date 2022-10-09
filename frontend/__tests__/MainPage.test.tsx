import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { render, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import MainPage from "@/pages/MainPage";

import theme from "@/styles/theme";

const myTeams = [
  {
    id: 1,
    name: "우테코 4기",
    description: "우테코 4기 설명입니다",
    emoji: "😎",
    color: "#FF8181",
    joined: true,
  },
];

const receivedRollingpapers = [
  {
    id: 1,
    title: "소피아의 생일을 축하해",
    teamId: 2,
    teamName: "우테코 4기",
    recipient: "MEMBER",
  },
  {
    id: 2,
    title: "소피아의 생일을 축하해",
    teamId: 2,
    teamName: "우테코 4기",
    recipient: "TEAM",
  },
];

const server = setupServer(
  rest.get("http://localhost/teams/me", (req, res, ctx) => {
    const result = {
      totalCount: 20,
      currentPage: 0,
      teams: myTeams,
    };

    return res(ctx.json(result));
  }),
  rest.get(
    "http://localhost/members/me/rollingpapers/received",
    (req, res, ctx) => {
      const page = Number(req.url.searchParams.get("page"));
      const count = Number(req.url.searchParams.get("count"));
      const result = {
        totalCount: 7,
        currentPage: 0,
        rollingpapers: receivedRollingpapers,
      };

      return res(ctx.json(result));
    }
  )
);

const queryClient = new QueryClient();

beforeAll(() => {
  server.listen();

  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("메인 페이지에서 모임 목록을 확인할 수 있다.", async () => {
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <MainPage />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );

  await waitFor(() => {
    expect(screen.getByText("우테코 4기 설명입니다")).toBeInTheDocument();
  });
});
