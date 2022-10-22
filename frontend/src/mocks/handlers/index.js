import memberHandlers from "./memberHandlers";
import messageHandlers from "./messageHandlers";
import rollingpaperHandlers from "./rollingpaperHandlers";
import teamHandlers from "./teamHandlers";
import notificationHandlers from "./notificationHandlers";

const handlers = [
  ...memberHandlers,
  ...messageHandlers,
  ...rollingpaperHandlers,
  ...teamHandlers,
  ...notificationHandlers,
];

export default handlers;
