import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Script for registering ts-node loader
register("ts-node/esm", pathToFileURL("./"));