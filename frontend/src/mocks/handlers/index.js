import memberHandlers from "./memberHandlers";
import messageHandlers from "./messageHandlers";
import rollingpaperHandlers from "./rollingpaperHandlers";
import teamHandlers from "./teamHandlers";

const handlers = [
  ...memberHandlers,
  ...messageHandlers,
  ...rollingpaperHandlers,
  ...teamHandlers,
];

export default handlers;
