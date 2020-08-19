"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const arpService_1 = require("../services/arpService");
const arpService = new arpService_1.default();
const cfg = require('config');
let tmpDirectory = path.join(__dirname, '../../src/test.txt');
console.log("dirr", tmpDirectory);
if (cfg.watcher && cfg.watcher.path_to_watch) {
    tmpDirectory = cfg.watcher.path_to_watch;
}
fs.watchFile(tmpDirectory, (curr, prev) => {
    console.log("QUI");
    console.log(`[${new Date().toLocaleString()}] Watching for file changes on: ${tmpDirectory}`);
    arpService.execute();
});
//# sourceMappingURL=watcher.js.map