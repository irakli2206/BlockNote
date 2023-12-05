import type { Project } from "../gen";

const template = (project: Project) => `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")!);
root.render(
  // <React.StrictMode >
  <App />
  // </React.StrictMode>
);`;

export default template;
