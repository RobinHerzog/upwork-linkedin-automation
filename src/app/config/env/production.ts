// $export NODE_RIND=true  (will rebuild all mongoose indexes)
let node_rind = false;
if (process.env.NODE_RIND) {
  node_rind = JSON.parse(process.env.NODE_RIND);
}


const config_env_prod = {
  url: 'http://5.189.161.70',
  name: 'production',
  server: {
    virtualHost: false,
    domain: '',
    port: process.env.PORT || 6993
  },
  mongodb: {
    enabled: true,
    rebuildIndexes: node_rind,
    uri: process.env.MONGODB_URI || 'mongodb://swapcard_user:12345@5.189.161.70:27017/upwork-linkedin-automation',
  }
};

export default config_env_prod;
