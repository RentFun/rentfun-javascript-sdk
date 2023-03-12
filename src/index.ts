import { ethers } from 'ethers';
import { ADDRESS, ABI } from './constants.js';
import { getDefaultProvider } from './utils.js';

const rentfunInterface = new ethers.utils.Interface(ABI);

export const RentFun = class {
  provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider;
  signer: ethers.Signer;
  rentfun: ethers.Contract;

  constructor(provider: ethers.providers.Web3Provider | ethers.providers.JsonRpcProvider = null) {
    this.provider = getDefaultProvider();
    this.signer = null;

    if (provider) {
      this.provider = provider;
      this.signer = this.provider.getSigner();
    }

    this.rentfun = new ethers.Contract(ADDRESS, ABI, this.provider);
  }

  // READS
  isRented = async (contract: string, tokenId: number): Promise<boolean> => {
    return await this.rentfun.callStatic.isRented(contract, tokenId);
  };

  getAliveRentals = async (renter: string, contract: string): Promise<{
    renter: string;
    contract: string;
    tokenId: number;
    vault: string;
    endTime: number;
  }[]> => {
    return await this.rentfun.callStatic.getAliveRentals(renter, contract);
  };

  //////

  // WRITES
  lend = async (contract: string, tokenId: number, payment: string, unitFee: number) => {
    return await this.rentfun.connect(this.signer).lend(contract, tokenId, payment, unitFee);
  };

  rent = async (contract: string, tokenId: number, amount: number) => {
    return await this.rentfun.connect(this.signer).rent(contract, tokenId, amount);
  };

  cancelLend = async (contract: string, tokenId: number) => {
    return await this.rentfun.connect(this.signer).cancelLend(contract, tokenId);
  };
};

export const rawLend = (contract: string, tokenId: number, payment: string, unitFee: number) => {
  return rentfunInterface.encodeFunctionData('lend', [contract, tokenId, payment, unitFee]);
};

export const rawRent = (contract: string, tokenId: number, amount: number) => {
  return rentfunInterface.encodeFunctionData('rent', [contract, tokenId, amount]);
};

export const rawCancelLend = (contract: string, tokenId: number) => {
  return rentfunInterface.encodeFunctionData('cancelLend', [contract, tokenId]);
};
