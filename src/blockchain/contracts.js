import { bsc, bscTestnet, hardhat } from "wagmi/chains";

export const SCAN_LINK = 'https://testnet.bscscan.com'

export const contracts = {
    [hardhat.id]: {
        main: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788',
        usdt: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
        vip: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
        treasury: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
        royalty: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
    },
    [bscTestnet.id]: {
        main: '0xDc21dbEbB7e6792FAe6B9965C7A376030c3beB78',
        usdt: '0xd6beb6cdab0f23e0663a9aa1d201a3bf10e34efe',
        vip: '0x098Ca0671CA1FF8Bd10171F75070Bfca0AC456A1',
        treasury: '0x78568DFe94Fe2236f766a2b4c9755E00c6D14D6d',
        royalty: '0xD2FEb9E51BEAf415A49d48ddD8b221490de4298F',
    },
    [bsc.id]: {
        main: '0xFF4A6bB452A7C0d0C0AB1d4880CD7e3f38B595b4',
        usdt: '0x55d398326f99059fF775485246999027B3197955',
        vip: '0x3E4d2E966CE8d3D4FfCEC4D02074114BC44bD525',
        treasury: '0xD75795C240e897D2FdC5A0eB798ABc3e85D49f5a',
        royalty: '0xFFC328019Af33489D6Cb1617B0a27a3eb080c741',
    },
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const DEFAULT_REFERRER = '0xCe2a7413aAcee78668F640f510daF80d6A2eE1Cb'
