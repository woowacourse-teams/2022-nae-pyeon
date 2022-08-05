/// <reference types="cypress" />

describe("로그인한 사용자 동작", () => {
  beforeEach(() => {
    Cypress.Cookies.debug(true);

    cy.clearCookies();
    cy.setCookie("accessToken", "mockAccessToken");

    cy.visit("http://localhost:3000");
  });

  it("가입한 모임이 없는 경우, 참여한 모임이 없다는 안내 메시지를 확인할 수 있다.", () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get("/api/v1/teams/me", (req, res, ctx) => {
          const page = +req.url.searchParams.get("page");
          const count = +req.url.searchParams.get("count");

          const result = {
            totalCount: 0,
            currentPage: Number(page),
            teams: [],
          };
          return res.once(ctx.json(result));
        })
      );
    });

    cy.contains("아직 참여한 모임이 없어요!").should("be.visible");
  });

  it("가입한 모임이 있는 경우, 가입한 모임 카드를 확인할 수 있다.", () => {
    cy.window().then((window) => {
      const { worker, rest } = window.msw;
      worker.use(
        rest.get("/api/v1/teams/me", (req, res, ctx) => {
          const page = +req.url.searchParams.get("page");
          const count = +req.url.searchParams.get("count");

          const result = {
            totalCount: 3,
            currentPage: Number(page),
            teams: [
              {
                id: 1,
                name: "우테코 4기",
                description: "우테코 4기 설명입니다",
                emoji: "😎",
                color: "#FF8181",
                joined: true,
              },
              {
                id: 2,
                name: "우테코 4기 우테코 4기 우테코 4기",
                description:
                  "우테코 4기 설명입니다. 우테코 4기 설명입니다. 우테코 4기 설명입니다. 우테코 4기 설명입니다. 우테코 4기 설명입니다. 우테코 4기 설명입니다. 우테코 4기 설명입니다. 우테코 4기 설명입니다. 우테코 4기 설명입니다.",
                emoji: "😎",
                color: "#C5FF98",
                joined: false,
              },
              {
                id: 3,
                name: "우테코 4기",
                description: "우테코 4기 설명입니다",
                emoji: "😎",
                color: "#FFF598",
                joined: true,
              },
            ],
          };
          return res.once(ctx.json(result));
        })
      );
    });

    cy.contains("우테코 4기").should("be.visible");
  });
});
