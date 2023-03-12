import { ethers } from 'ethers';

export const getDefaultProvider = (): ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider => {

  if (typeof process !== 'undefined' && process.env?.PROVIDER_URL)
    return new ethers.providers.JsonRpcProvider(process.env.PROVIDER_URL);

    // @ts-ignore
  if (typeof window !== 'undefined' && window.ethereum) {
    // @ts-ignore
    return new ethers.providers.Web3Provider(window.ethereum);
  }

  return null;
};
