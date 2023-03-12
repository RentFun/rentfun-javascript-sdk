# [rentfun](https://rentfun.io) 

## Installation

```
npm install rentfun
```

## View Functions

- isRented(contract, tokenId)
- getAliveRentals(renter, contract)

## Write Functions

- lend(contract, tokenId, payment, unitFee)
- rent(contract, tokenId, amount)
- cancelLend(contract, tokenId)

## Raw Functions

These function calls will return back the encoded function data.

- rawLend(contract, tokenId, payment, unitFee)
- rawRent(contract, tokenId, amount)
- rawCancelLend(contract, tokenId)
