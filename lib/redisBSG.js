import Redis from "ioredis";

let bsg;

if (!process.env.REDISBSG_URI) {
  throw new Error(
    "Please add your BSG redis (REDISBSG_URI) server as an environment variable."
  );
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._bsg) {
    global._bsg = new Redis(process.env.REDISBSG_URI);
  }
  bsg = global._bsg;
} else {
  // In production mode, it's best to not use a global variable.
  bsg = new Redis(process.env.REDISBSG_URI);
}

export default bsg;
