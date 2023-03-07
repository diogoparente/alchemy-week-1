const keys = {
  1: {
    pk: "6e98652a5d627a4de4fe106766dad6ee9130218a81fb51a8d83339ad4f7a7bcb",
    pb: "0469ebd9f06afb3c70d9649737dc1c59ffdaab6fb364757ebc4b3925a69a5a175bb2c68298f6bf0043ad8e0a7ee1d8d0757b023d865e23e6c606798431b1dbfd44",
  },
  2: {
    pk: "46a3be91f3b007a6b18708d0863a65e82ee8df73c759e7b1cf59aa7855b02317",
    pb: "04d59e7fdbab0a061908655f7aac04606df83ba54ae5d6e63b664917c8e3548ee06da4b276d15f1ae7b3eec412c12645705c762e9a02453ed649f067798ee64ca4",
  },
  3: {
    pk: "ee1cdf691d9adb6082bb6d1363d70108e65edcd0e58beaaf78ce54d11f7138d5",
    pb: "04b91203c87e3676f65b70fe2b1ab568d26b46106d1f17f0f61d396bd13e6ee9724df85b40cb83079f3d9be8be98ef7d8b19c96c46f97e85c92754a1d45c3a7977",
  },
};

const publicKeys = {
  1: keys[1].pb,
  2: keys[2].pb,
  3: keys[3].pb,
};

const addresses = {
  1: "5071FD35DD6B62FED14D635FE669DB5657F57C2B",
  2: "D9796B73EC73FC882813468513FC1B43865E7DAC",
  3: "BBC9E3AEE398544B9C5F6BA0254EEE0B3EAE2F3E",
};

module.exports = { publicKeys, addresses };
