import { ethers } from 'ethers';
import { ADDRESS, ABI } from './constants.js';
import {Rental, RentOrder, LendData, RentBid} from './interfaces.js';
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
  isRented = async (collection: string, tokenId: number): Promise<boolean> => {
    return await this.rentfun.callStatic.isRented(collection, tokenId);
  };

  getAliveRentals = async (renter: string, collection: string): Promise<Rental[]> => {
    return await this.rentfun.callStatic.getAliveRentals(renter, collection);
  };

  getRentOrders = async (lender: string): Promise<RentOrder[]> => {
    return await this.rentfun.callStatic.getRentOrders(lender);
  };

  // WRITES
  lend = async (lents: LendData[]) => {
    return await this.rentfun.connect(this.signer).lend(lents);
  };

  rent = async (rents: RentBid[]) => {
    return await this.rentfun.connect(this.signer).rent(rents);
  };

  delist = async (hashes: string[]) => {
    return await this.rentfun.connect(this.signer).delist(hashes);
  };

  claimRentFee = async (wbId: number, payment: string) => {
    return await this.rentfun.connect(this.signer).claimRentFee(wbId, payment);
  };
};

export const rawLend = (lents: LendData[]) => {
  return rentfunInterface.encodeFunctionData('lend', [lents]);
};

export const rawRent = (rents: RentBid[]) => {
  return rentfunInterface.encodeFunctionData('rent', [rents]);
};

export const rawDelist = (hashes: string[]) => {
  return rentfunInterface.encodeFunctionData('cancelLend', [hashes]);
};

export const rawClaimRentFee = (wbId: number, payment: string) => {
  return rentfunInterface.encodeFunctionData('claimRentFee', [wbId, payment]);
};
