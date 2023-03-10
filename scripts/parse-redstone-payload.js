const redstone = require("redstone-protocol");
const { BigNumber } = require("ethers");
const { arrayify, hexlify, toUtf8String } = require("ethers/lib/utils");

const TX_CALLDATA = "0xd8117e2000000000000000000000000000000000000000000000031c79716edb6e453393415641580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000703ee2be425443000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000221cf9f0b4e42555344000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f5e1004554480000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000257a4a6416474c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004944976474d58000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b4862b3e4a4f45000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018e12b94c494e4b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002d2688604d4f4f5f544a5f415641585f555344435f4c50000000000000000000000000000000000000000000000000000000000000000000000000000004dc72d36d5cde504e470000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000058eda0504e475f415641585f4554485f4c50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009a2ed7a45504e475f415641585f555344435f4c50000000000000000000000000000000000000000000000000000000000000000000000000000000000003af0ddb1ef563504e475f415641585f555344545f4c50000000000000000000000000000000000000000000000000000000000000000000000000000000000003a819560afbf8505450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007383c651490000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000112902544a5f415641585f4254435f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000030f1ae61aec1b8544a5f415641585f4554485f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009baa658e8544a5f415641585f555344435f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000447e96a709965544a5f415641585f555344545f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e38d2014d7ff544a5f415641585f73415641585f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000eb2b3eda55534443000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f5dd1755534454000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f6042858415641000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ef073c59414b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b88c54a1959594156335341310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074ac999759595f414156455f4156415800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074ac999759595f474c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005ac284759595f504e475f415641585f4554485f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000ab1e8935459595f504e475f415641585f555344435f4c500000000000000000000000000000000000000000000000000000000000000000000000000000041c62e5b8ccc159595f5054505f73415641580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007dbed30c59595f544a5f415641585f4554485f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000a5b480fac59595f544a5f415641585f555344435f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000004a82861f7396659595f544a5f415641585f73415641585f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000fb1dbe3573415641580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000077c3fcde01868416763000000020000022588786465d16f207708d4e62eb6b7756c5c84221161b948c5edda9b46619ca5b0c0c00bfc0edc25a947700c4456b19f1ff857e0e9dc06b02358e89c016193c371c415641580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000703fb285425443000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000221c11dee2042555344000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f5e100455448000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025794f4b28474c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004944976474d58000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b489534b4a4f45000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018e14294c494e4b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002d23c9404d4f4f5f544a5f415641585f555344435f4c50000000000000000000000000000000000000000000000000000000000000000000000000000004dc72d36d5cde504e470000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000058eda0504e475f415641585f4554485f4c50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009a2e3a9b9504e475f415641585f555344435f4c50000000000000000000000000000000000000000000000000000000000000000000000000000000000003af0ddb1ef563504e475f415641585f555344545f4c50000000000000000000000000000000000000000000000000000000000000000000000000000000000003a81cb8262c93505450000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007383c651490000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000112902544a5f415641585f4254435f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000030f1ae61aec1b8544a5f415641585f4554485f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009ba9c6fdf544a5f415641585f555344435f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000447e96a709965544a5f415641585f555344545f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e390b90e1709544a5f415641585f73415641585f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000eb2b3eda55534443000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f5e10055534454000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f6042858415641000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ef0caa59414b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b88c54a1959594156335341310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074ac999759595f414156455f4156415800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074ac999759595f474c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005ac284759595f504e475f415641585f4554485f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000ab1c0b53559595f504e475f415641585f555344435f4c500000000000000000000000000000000000000000000000000000000000000000000000000000041c62e5b8ccc159595f5054505f73415641580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007dbed30c59595f544a5f415641585f4554485f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000a5b21733259595f544a5f415641585f555344435f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000004a82861f7396659595f544a5f415641585f73415641585f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000fb1dbe3573415641580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000077c3fcde018684167630000000200000226693b05e4ce4e12554e282895dd905c5fbf999dd62874b30b7a93a6fcaea63f247b40a0bb8208f5859dea524c31f259f80777e268cfd38ed521fdeedf7ffd9241b415641580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000703fb285425443000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000221c10eab6a42555344000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f5ec6045544800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002578b678a0474c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004944976474d58000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001b46e777b4a4f45000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018dff0c4c494e4b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002d23c9404d4f4f5f544a5f415641585f555344435f4c50000000000000000000000000000000000000000000000000000000000000000000000000000004dc72d36d5cde504e470000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000058eda0504e475f415641585f4554485f4c50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009a2e6ea00504e475f415641585f555344435f4c50000000000000000000000000000000000000000000000000000000000000000000000000000000000003af2aab680618504e475f415641585f555344545f4c50000000000000000000000000000000000000000000000000000000000000000000000000000000000003a839575e71675054500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000073c823514900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001127d3544a5f415641585f4254435f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000030f32cd3969caa544a5f415641585f4554485f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000009ba9fb33c544a5f415641585f555344435f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000004480aea201372544a5f415641585f555344545f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000003e3af2acfdac1544a5f415641585f73415641585f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000eb326bf355534443000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f5e10055534454000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005f60f3158415641000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ef0caa59414b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b88c54a1959594156335341310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074b3bb7859595f414156455f4156415800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000074b3bb7859595f474c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005ac284759595f504e475f415641585f4554485f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000000000ab216c9d059595f504e475f415641585f555344435f4c500000000000000000000000000000000000000000000000000000000000000000000000000000041c62e5b8ccc159595f5054505f73415641580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007dbed30c59595f544a5f415641585f4554485f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000000a5b74d15159595f544a5f415641585f555344435f4c5000000000000000000000000000000000000000000000000000000000000000000000000000000004a82861f7396659595f544a5f415641585f73415641585f4c500000000000000000000000000000000000000000000000000000000000000000000000000000000000fb1dbe3573415641580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000077c3fcde01868416763000000020000022012c4e6d8784a3ad7652b1040f0ec39fe75ffce0b1af09ec3d1eb87174f13d747bbb51b61338f5a87771fd893489a70d1036f0ff5077c004c57a395f92cf3e861c0003302e302e31352372656473746f6e652d6176616c616e6368652d70726f6400001e000002ed57011e0000";
const LONG_LINE = "------------------------------------------------------------------------";

main();

function main() {
  const txCalldataBytes = arrayify(TX_CALLDATA);
  const parsingResult = redstone.RedstonePayload.parse(txCalldataBytes);

  console.log(parsingResult);

  console.log(LONG_LINE);
  console.log("Unsigned metadata: ", toUtf8String(parsingResult.unsignedMetadata));
  console.log("Data packages count: ", parsingResult.signedDataPackages.length);
  console.log("Calldata without redstone payload: ", hexlify(parsingResult.remainderPrefix));

  let dataPackageIndex = 0;
  for (const signedDataPackage of parsingResult.signedDataPackages) {
    console.log(LONG_LINE);
    console.log(`Data package: ${dataPackageIndex}`);
    console.log(`Timestamp: ${signedDataPackage.dataPackage.timestampMilliseconds}`);
    console.log(`Date and time: ${new Date(signedDataPackage.dataPackage.timestampMilliseconds).toUTCString()}`);
    console.log("Signer address: ", signedDataPackage.recoverSignerAddress());
    console.log("Data points count: ", signedDataPackage.dataPackage.dataPoints.length);
    console.log("Data points symbols: ", signedDataPackage.dataPackage.dataPoints.map(dp => dp.dataFeedId));
    console.log("Data points values: ", signedDataPackage.dataPackage.dataPoints.map(dp => BigNumber.from(dp.value).toNumber()));

    dataPackageIndex++;
  }
  console.log(LONG_LINE);
}