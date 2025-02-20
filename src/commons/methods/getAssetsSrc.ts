export const getAssetsSrc = (asset: string) => {
  return asset.includes("assets/") ? `/static/${asset}` : asset;
};
