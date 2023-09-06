import { BigNumber } from "ethers";

// @ts-ignore
export interface LendBid {
    payment: string;
    fee: BigNumber;
    dayDiscount: number;
    weekDiscount: number;
}

// @ts-ignore
export interface LendToken {
    lender: string;
    collection: string;
    tokenId: number;
    amount: number;
    maxEndTime: number;
    vault: string;
}

// @ts-ignore
export interface LendData {
    token: LendToken;
    lendBid: LendBid;
}

/*
 * payment: ETH -> zeroAddress
 * tokenAmount always 0
 * timeBase: hour -> 1, day -> 2, week -> 3
 * timeAmount: amount of timeBase
 */

// @ts-ignore
export interface RentBid {
    collection: string;
    tokenId: number;
    payment: string;
    tokenAmount: number;
    timeBase: number;
    timeAmount: number;
}

export interface Rental {
    renter: string;
    vault: string;
    collection: string;
    tokenId: number;
    amount: number;
    startTime: number;
    endTime: number;
}

export interface RentOrder {
    rentBid: RentBid;
    renter: string;
    vault: string;
    startTime: number;
    endTime: number;
    totalFee: BigNumber;
}