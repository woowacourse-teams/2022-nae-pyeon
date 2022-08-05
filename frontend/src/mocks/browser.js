// src/mocks/browser.js
import { setupWorker, rest } from "msw";
import handlers from "./handlers/index";
// This configures a Service Worker with the given request handlers.

export const worker = setupWorker(...handlers);

window.msw = {
  worker,
  rest,
};
