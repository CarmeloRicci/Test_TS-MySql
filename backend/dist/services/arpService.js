"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const arp1 = require('arp-a');
const cfg = require('config');
const equal = require('deep-equal');
const fs = require('fs');
const utilities_1 = require("../shared/utilities");
const _ = require("lodash");
class PingService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const arpData = yield this.getElementsFromArpTable();
                console.log("arpData", arpData);
                if (arpData) {
                    const comparation = this.compareOldAndNewObject(arpData);
                    console.log("comparation", comparation);
                    this.saveObjectInFile(JSON.stringify(arpData));
                    if (!comparation) {
                        this.contactGW(arpData);
                    }
                }
            }
            catch (error) {
                console.log("error", error);
            }
        });
    }
    saveObjectInFile(content) {
        fs.writeFile("arp_object", content, function (err) {
            if (err)
                console.log(err);
            else
                console.log("file saved");
        });
    }
    getObjectFromFile() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (fs.existsSync("arp_object")) {
                    const content = yield fs.readFileSync("arp_object", 'utf8');
                    console.log("content", content);
                    return content;
                }
            }
            catch (error) {
                console.log("ERRR", error);
            }
        });
    }
    compareOldAndNewObject(newObject) {
        return __awaiter(this, void 0, void 0, function* () {
            let areEqual = false;
            const oldObjectStringified = yield this.getObjectFromFile();
            if (oldObjectStringified) {
                console.log("oldObjectStringified", oldObjectStringified);
                console.log("newObjectStringified", JSON.stringify(newObject));
                // equal = Object.is(newObjectStringified, oldObjectStringified)
                const oldObject = JSON.parse(oldObjectStringified);
                areEqual = equal(newObject, oldObject);
            }
            return areEqual;
        });
    }
    // il metodo scansiona la tabella degli ARP
    // seleziona le righe relative all'interfaccia indicata nel file di configurazione
    // ritorna una mappa contenente MAC addresses e IPs
    getElementsFromArpTable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promise = new Promise((resolve, reject) => {
                    let tbl = { mac_addresses: {} };
                    arp1.table(function (err, entry) {
                        if (!!err)
                            return console.log('arp: ' + err.message);
                        if (!entry)
                            return;
                        // if (entry.ifname == cfg.arp.interface) {
                        if (entry && entry[cfg.arp.entry_interface] && entry[cfg.arp.entry_interface] == cfg.arp.interface) {
                            if (tbl.mac_addresses[entry.mac]) {
                                if (!tbl.mac_addresses[entry.mac].includes(entry.ip)) {
                                    tbl.mac_addresses[entry.mac].push(entry.ip);
                                }
                            }
                            else {
                                tbl.mac_addresses[entry.mac] = [entry.ip];
                            }
                        }
                        resolve(tbl);
                    });
                });
                return promise;
            }
            catch (error) {
                console.log("ERRR", error);
            }
        });
    }
    // data la mappa contenenet tutti gli IP raggruppati per MAC Address
    // si proverà a fare una richiesta su ogni IP, al fine di inviare all'indirizzo del GW
    // che sta in ascolto tutti gli IP che afferiscono allo stesso MAC address
    contactGW(table) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (table && table.mac_addresses && Object.keys(table.mac_addresses).length > 0) {
                    yield Object.keys(table.mac_addresses).forEach((key) => __awaiter(this, void 0, void 0, function* () {
                        const ipaddrs = table.mac_addresses[key];
                        if (ipaddrs.length > 1) {
                            yield ipaddrs.forEach((ip) => __awaiter(this, void 0, void 0, function* () {
                                let upaddrsToSend = ipaddrs.slice(0);
                                _.remove(upaddrsToSend, (n) => {
                                    return n == ip;
                                });
                                let request_data = {
                                    url: `http://${ip}:3800/ping`,
                                    method: 'POST',
                                    body: {
                                        params: {
                                            ips: upaddrsToSend
                                        }
                                    },
                                    json: true
                                };
                                yield utilities_1.Utilities.request(request_data);
                            }));
                        }
                    }));
                }
            }
            catch (error) {
                console.log("ERROR contact GW", error);
            }
        });
    }
}
exports.default = PingService;
//# sourceMappingURL=arpService.js.map