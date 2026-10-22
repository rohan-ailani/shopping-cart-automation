
export const config: WebdriverIO.Config = {
  runner: "local",
  tsConfigPath: "./tsconfig.json",

  specs: ["src/specs/**/*.ts"],
  exclude: [],

  maxInstances: 3,

  capabilities: [
    {
      browserName: "chrome",
    },
  ],

  logLevel: "info",
  bail: 0,

  baseUrl: "https://qa-task--oyettijon.replit.app",

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: "mocha",
  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};