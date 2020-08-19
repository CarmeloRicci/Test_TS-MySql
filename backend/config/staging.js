// config.js
module.exports = {
  env: {
    envFilename: `.env.staging`
  },
  arp: {
    interface: "edge0",
    entry_interface: "iface"
  },
  watcher: {
    path_to_watch: "/proc/net/arp"
  },
  general: {
    ipDnsServer: "10.10.0.1"
  }
};
