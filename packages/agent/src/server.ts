import { createApp } from "./app.js";

const port = Number(process.env.PORT ?? 7337);
const host = "127.0.0.1";

const app = createApp();

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`MoltBot Ops Agent listening on http://${host}:${port}`);
});
