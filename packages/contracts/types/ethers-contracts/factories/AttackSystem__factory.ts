/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { AttackSystem, AttackSystemInterface } from "../AttackSystem";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract IWorld",
        name: "_world",
        type: "address",
      },
      {
        internalType: "address",
        name: "_components",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "Ownable__NotOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "Ownable__NotTransitiveOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "attackEntity",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "int32",
            name: "x",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "y",
            type: "int32",
          },
        ],
        internalType: "struct Coord",
        name: "coord",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int32",
            name: "x",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "y",
            type: "int32",
          },
        ],
        internalType: "struct Coord",
        name: "targetCoord",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "weaponKey",
        type: "uint256",
      },
    ],
    name: "attack",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "args",
        type: "bytes",
      },
    ],
    name: "execute",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "int32",
            name: "x",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "y",
            type: "int32",
          },
        ],
        internalType: "struct Coord",
        name: "coord",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "int32",
            name: "x",
            type: "int32",
          },
          {
            internalType: "int32",
            name: "y",
            type: "int32",
          },
        ],
        internalType: "struct Coord",
        name: "targetCoord",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "weaponKey",
        type: "uint256",
      },
    ],
    name: "executeTyped",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200243a3803806200243a8339810160408190526200003491620001dc565b8181620000413362000149565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200021b565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505062000242565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001d957600080fd5b50565b60008060408385031215620001f057600080fd5b8251620001fd81620001c3565b60208401519092506200021081620001c3565b809150509250929050565b6000602082840312156200022e57600080fd5b81516200023b81620001c3565b9392505050565b6121e880620002526000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80638da5cb5b116100505780638da5cb5b146100a8578063ae23fc0b146100d5578063f2fde38b146100fa57600080fd5b806309c5eabe1461006c57806367cd725c14610095575b600080fd5b61007f61007a366004611cd5565b61010f565b60405161008c9190611d88565b60405180910390f35b61007f6100a3366004611e45565b61075e565b6100b0610794565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161008c565b6100e86100e3366004611e83565b6107d9565b60405160ff909116815260200161008c565b61010d610108366004611ec9565b61169b565b005b606060008060008480602001905181019061012a9190611f3d565b92509250925060006040518060a0016040528061018a60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff167f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b184310660001c611717565b73ffffffffffffffffffffffffffffffffffffffff90811682526000546020909201916101d891167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e611717565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161022691167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540611717565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161027491167fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e611717565b73ffffffffffffffffffffffffffffffffffffffff90811682526000546020909201916102c291167f2fc9fa89c3e33fdaa5feead211018b3d0b1d3edd613228f7f320915fddd8d039611717565b73ffffffffffffffffffffffffffffffffffffffff1681525090506000816000015173ffffffffffffffffffffffffffffffffffffffff1663bf3bf26a866040518263ffffffff1660e01b815260040161031c9190611f7b565b600060405180830381865afa158015610339573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261037f9190810190611f9c565b90508051600114610417576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b2066726f60448201527f6d20616e20656d7074792074696c65000000000000000000000000000000000060648201526084015b60405180910390fd5b6000826020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168360008151811061044c5761044c612042565b60200260200101516040518263ffffffff1660e01b815260040161047291815260200190565b602060405180830381865afa15801561048f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104b39190612071565b90506104be81611865565b61054a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b2066726f60448201527f6d2061206e6f6e2d73696c6f2074696c65000000000000000000000000000000606482015260840161040e565b6000836040015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168460008151811061057f5761057f612042565b60200260200101516040518263ffffffff1660e01b81526004016105a591815260200190565b602060405180830381865afa1580156105c2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e69190612071565b9050338114610677576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b2066726f60448201527f6d20612074696c6520796f7520646f206e6f74206f776e000000000000000000606482015260840161040e565b610680856118e0565b61070c576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f5b41747461636b53797374656d5d20496e76616c696420776561706f6e206b6560448201527f7900000000000000000000000000000000000000000000000000000000000000606482015260840161040e565b6107328360008151811061072257610722612042565b60200260200101518888886107d9565b6040805160ff909216602083015201604051602081830303815290604052975050505050505050919050565b606061078c8484846040516020016107789392919061208a565b60405160208183030381529060405261010f565b949350505050565b60006107d47f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b6040805160a081019091526000805490918291819061082e9073ffffffffffffffffffffffffffffffffffffffff167f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b1843106611717565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161087c91167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e611717565b73ffffffffffffffffffffffffffffffffffffffff90811682526000546020909201916108ca91167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540611717565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161091891167fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e611717565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161096691167f2fc9fa89c3e33fdaa5feead211018b3d0b1d3edd613228f7f320915fddd8d039611717565b73ffffffffffffffffffffffffffffffffffffffff90811690915260008054929350916109b491167f3ee10300fdf6d2b8c2d0e95fa7b5b8c50aa50e011ba55c2da6a5bccfeafb0340611717565b60008054919250906109fc9073ffffffffffffffffffffffffffffffffffffffff167ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845611717565b90506000836000015173ffffffffffffffffffffffffffffffffffffffff1663bf3bf26a886040518263ffffffff1660e01b8152600401610a3d9190611f7b565b600060405180830381865afa158015610a5a573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610aa09190810190611f9c565b90508051600114610b33576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b2066726f60448201527f6d20616e20656d7074792074696c650000000000000000000000000000000000606482015260840161040e565b6000846040015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91683600081518110610b6857610b68612042565b60200260200101516040518263ffffffff1660e01b8152600401610b8e91815260200190565b602060405180830381865afa158015610bab573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bcf9190612071565b9050338103610c60576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b20796f7560448201527f72206f776e20656e746974790000000000000000000000000000000000000000606482015260840161040e565b6000610c6c888c611985565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015610cda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cfe91906120ce565b15610e4e576040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa158015610d71573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d959190612071565b90508015610e385773ffffffffffffffffffffffffffffffffffffffff8516631ab06ee583610dc560018561211f565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015610e1b57600080fd5b505af1158015610e2f573d6000803e3d6000fd5b50505050610e48565b600097505050505050505061078c565b50610e5d565b6000965050505050505061078c565b6000610ee7876020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168e6040518263ffffffff1660e01b8152600401610ea191815260200190565b602060405180830381865afa158015610ebe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ee29190612071565b611a05565b8a518c51919250600383900b91610f0691610f0191612132565b611a9c565b60030b1380610f3057508060030b610f2b8b602001518d60200151610f019190612132565b60030b135b15610f4557600097505050505050505061078c565b866080015173ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e85600081518110610f7857610f78612042565b60200260200101516040518263ffffffff1660e01b8152600401610f9e91815260200190565b602060405180830381865afa158015610fbb573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fdf91906120ce565b1561114b576000876080015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168660008151811061101957611019612042565b60200260200101516040518263ffffffff1660e01b815260040161103f91815260200190565b602060405180830381865afa15801561105c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110809190612071565b9050801561114557876080015173ffffffffffffffffffffffffffffffffffffffff16631ab06ee5866000815181106110bb576110bb612042565b60200260200101516110cc8d611abb565b6110d6908561211f565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561112c57600080fd5b505af1158015611140573d6000803e3d6000fd5b505050505b506112a9565b6000876020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168660008151811061118057611180612042565b60200260200101516040518263ffffffff1660e01b81526004016111a691815260200190565b602060405180830381865afa1580156111c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111e79190612071565b9050876080015173ffffffffffffffffffffffffffffffffffffffff16631ab06ee58660008151811061121c5761121c612042565b602002602001015161122d8d611abb565b611239906103e861211f565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561128f57600080fd5b505af11580156112a3573d6000803e3d6000fd5b50505050505b6000876080015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916866000815181106112de576112de612042565b60200260200101516040518263ffffffff1660e01b815260040161130491815260200190565b602060405180830381865afa158015611321573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113459190612071565b1161168957866000015173ffffffffffffffffffffffffffffffffffffffff16634cc822158560008151811061137d5761137d612042565b60200260200101516040518263ffffffff1660e01b81526004016113a391815260200190565b600060405180830381600087803b1580156113bd57600080fd5b505af11580156113d1573d6000803e3d6000fd5b50505050866020015173ffffffffffffffffffffffffffffffffffffffff16634cc822158560008151811061140857611408612042565b60200260200101516040518263ffffffff1660e01b815260040161142e91815260200190565b600060405180830381600087803b15801561144857600080fd5b505af115801561145c573d6000803e3d6000fd5b50505050866040015173ffffffffffffffffffffffffffffffffffffffff16634cc822158560008151811061149357611493612042565b60200260200101516040518263ffffffff1660e01b81526004016114b991815260200190565b600060405180830381600087803b1580156114d357600080fd5b505af11580156114e7573d6000803e3d6000fd5b50505050866060015173ffffffffffffffffffffffffffffffffffffffff16634cc822158560008151811061151e5761151e612042565b60200260200101516040518263ffffffff1660e01b815260040161154491815260200190565b600060405180830381600087803b15801561155e57600080fd5b505af1158015611572573d6000803e3d6000fd5b50505050866080015173ffffffffffffffffffffffffffffffffffffffff16634cc82215856000815181106115a9576115a9612042565b60200260200101516040518263ffffffff1660e01b81526004016115cf91815260200190565b600060405180830381600087803b1580156115e957600080fd5b505af11580156115fd573d6000803e3d6000fd5b505050508573ffffffffffffffffffffffffffffffffffffffff16634cc822158560008151811061163057611630612042565b60200260200101516040518263ffffffff1660e01b815260040161165691815260200190565b600060405180830381600087803b15801561167057600080fd5b505af1158015611684573d6000803e3d6000fd5b505050505b5060019b9a5050505050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461170b576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61171481611b7a565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015611787573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526117cd9190810190611f9c565b9050805160000361183a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640161040e565b61185b8160008151811061185057611850612042565b602002602001015190565b9150505b92915050565b60007f9d47592473d41327e0ccb0bb0dc69c74c6ac29b77beb0fc78a1c84d6f0bcf87b8214806118b457507fc5b2723c9f5ebeba49bd048804f6b7427f3d1d14fe2ddde79a8368b46739c69c82145b8061185f5750507f256c9a7f845a3a11dcb51c159d88557005a005a679ce6cd10a583b028e9d368b1490565b60007f4952f11b5e88ffd88b7a0231ee67228cf0d58eb081bf31517c674f44264c783f82148061192f57507fec80ff155d880c151528d536ae07261be7e0f0ec79c8853fb5205684633239dc82145b8061195957507f0c3016c3f177a1aea6cba33a3ccb8e01cef39a514cc6bb0b1223aecdbbbd349282145b8061185f5750507fdf054c8ff646f055efa75559586847c60a9365d45c0aa564f013bf3ad4f3621f1490565b600082826040516020016119c892919091825260601b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016602082015260340190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815291905280516020909101209392505050565b60007f62b8a6db8c2becd81f334f44f239638b3953d6488414f03875e37b290f4307858201611a365750600a919050565b7f3a4d8dc360a14145b642fb77fb0948bd80c2e2eb01d22218657c974b98c639648201611a655750601e919050565b7fda9365807ba5c5ee234ae3ea6277aa8ffa5ffa598631932ef5a7c4fd7162c9758201611a945750603c919050565b506000919050565b6000808260030b1215611ab757611ab282612174565b61185f565b5090565b60007fb6ad0ee4a17700277485fdce1198dd730f2a714f7e40ceae8398b0bbd9b387c18201611aec57506014919050565b7f137f00eaa277f3eaead72ac951f8d9e4181f0f1386377ac04adfa97b9ccdc6248201611b1b57506064919050565b7ff3cfe93c0e885e5159345cc5c33471fe310c65aeb33944f4eddc51324442cb6e8201611b4a575060c8919050565b7f20fab37009b90faa1058aaa6a797b839f56c9a2ba3f55a9b0fec40c52b0c9de18201611a94575061012c919050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051611714928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715611c8057611c80611c2e565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611ccd57611ccd611c2e565b604052919050565b60006020808385031215611ce857600080fd5b823567ffffffffffffffff80821115611d0057600080fd5b818501915085601f830112611d1457600080fd5b813581811115611d2657611d26611c2e565b611d56847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611c86565b91508082528684828501011115611d6c57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015611db557858101830151858201604001528201611d99565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b8060030b811461171457600080fd5b600060408284031215611e1557600080fd5b611e1d611c5d565b90508135611e2a81611df4565b81526020820135611e3a81611df4565b602082015292915050565b600080600060a08486031215611e5a57600080fd5b611e648585611e03565b9250611e738560408601611e03565b9150608084013590509250925092565b60008060008060c08587031215611e9957600080fd5b84359350611eaa8660208701611e03565b9250611eb98660608701611e03565b9396929550929360a00135925050565b600060208284031215611edb57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff81168114611eff57600080fd5b9392505050565b600060408284031215611f1857600080fd5b611f20611c5d565b90508151611f2d81611df4565b81526020820151611e3a81611df4565b600080600060a08486031215611f5257600080fd5b611f5c8585611f06565b9250611f6b8560408601611f06565b9150608084015190509250925092565b6040810161185f8284805160030b8252602081015160030b60208301525050565b60006020808385031215611faf57600080fd5b825167ffffffffffffffff80821115611fc757600080fd5b818501915085601f830112611fdb57600080fd5b815181811115611fed57611fed611c2e565b8060051b9150611ffe848301611c86565b818152918301840191848101908884111561201857600080fd5b938501935b838510156120365784518252938501939085019061201d565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561208357600080fd5b5051919050565b60a081016120ab8286805160030b8252602081015160030b60208301525050565b8351600390810b604084015260209094015190930b606082015260800152919050565b6000602082840312156120e057600080fd5b81518015158114611eff57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8181038181111561185f5761185f6120f0565b600382810b9082900b037fffffffffffffffffffffffffffffffffffffffffffffffffffffffff800000008112637fffffff8213171561185f5761185f6120f0565b60008160030b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000000081036121a9576121a96120f0565b6000039291505056fea2646970667358221220bc207e241d78286e034bb0803d318e7f2eb98dee77fbe7b37fcf8720d607e25264736f6c63430008130033";

type AttackSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AttackSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AttackSystem__factory extends ContractFactory {
  constructor(...args: AttackSystemConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AttackSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<AttackSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): AttackSystem {
    return super.attach(address) as AttackSystem;
  }
  override connect(signer: Signer): AttackSystem__factory {
    return super.connect(signer) as AttackSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AttackSystemInterface {
    return new utils.Interface(_abi) as AttackSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AttackSystem {
    return new Contract(address, _abi, signerOrProvider) as AttackSystem;
  }
}
