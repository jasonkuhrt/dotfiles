import { createRoot } from "react-dom/client"
import { App } from "./workbench/App"
import { content } from "./content/dw"

createRoot(document.getElementById("root")!).render(<App content={content} />)
