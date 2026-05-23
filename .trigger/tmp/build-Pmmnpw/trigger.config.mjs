import {
  defineConfig
} from "./chunk-HEYDU7WQ.mjs";
import "./chunk-CACV3OXU.mjs";
import {
  init_esm
} from "./chunk-3C3LT5K7.mjs";

// trigger.config.ts
init_esm();
var trigger_config_default = defineConfig({
  project: "proj_dotnovel",
  runtime: "node",
  logLevel: "log",
  maxDuration: 3600,
  dirs: ["./src/trigger"],
  build: {}
});
var resolveEnvVars = void 0;
export {
  trigger_config_default as default,
  resolveEnvVars
};
//# sourceMappingURL=trigger.config.mjs.map
