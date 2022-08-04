describe("empty spec", () => {
  before(() => {
    cy.setCookie("accessToken", "accessToken");
  });

  it("사이트에 접속할 수 있다", () => {
    cy.visit("http://localhost:3000");
  });

  it("참여한 모임을 ");
});
