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
  "0x60806040523480156200001157600080fd5b5060405162002372380380620023728339810160408190526200003491620001dc565b8181620000413362000149565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200021b565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505062000242565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001d957600080fd5b50565b60008060408385031215620001f057600080fd5b8251620001fd81620001c3565b60208401519092506200021081620001c3565b809150509250929050565b6000602082840312156200022e57600080fd5b81516200023b81620001c3565b9392505050565b61212080620002526000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80638da5cb5b116100505780638da5cb5b146100a8578063ae23fc0b146100d5578063f2fde38b146100fa57600080fd5b806309c5eabe1461006c57806367cd725c14610095575b600080fd5b61007f61007a366004611ba0565b61010f565b60405161008c9190611c53565b60405180910390f35b61007f6100a3366004611d10565b610712565b6100b0610748565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161008c565b6100e86100e3366004611d4e565b61078d565b60405160ff909116815260200161008c565b61010d610108366004611d94565b61154d565b005b606060008060008480602001905181019061012a9190611e01565b9250925092506000604051806080016040528061018a60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e60001c6115c9565b73ffffffffffffffffffffffffffffffffffffffff90811682526000546020909201916101d891167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c75406115c9565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161022691167fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e6115c9565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161027491167f2fc9fa89c3e33fdaa5feead211018b3d0b1d3edd613228f7f320915fddd8d0396115c9565b73ffffffffffffffffffffffffffffffffffffffff16815250905060006102d0856040518060400160405280600881526020017f6275696c64696e67000000000000000000000000000000000000000000000000815250611717565b82516040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905291925073ffffffffffffffffffffffffffffffffffffffff169063cccf7a8e90602401602060405180830381865afa15801561033f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103639190611e3f565b6103f4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b2066726f60448201527f6d20616e20656d7074792074696c65000000000000000000000000000000000060648201526084015b60405180910390fd5b81516040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009173ffffffffffffffffffffffffffffffffffffffff1690630ff4c91690602401602060405180830381865afa158015610463573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104879190611e61565b9050610492816117b0565b61051e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b2066726f60448201527f6d2061206e6f6e2d73696c6f2074696c6500000000000000000000000000000060648201526084016103eb565b60208301516040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905260009173ffffffffffffffffffffffffffffffffffffffff1690630ff4c91690602401602060405180830381865afa158015610590573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105b49190611e61565b9050338114610645576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603760248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b2066726f60448201527f6d20612074696c6520796f7520646f206e6f74206f776e00000000000000000060648201526084016103eb565b61064e8561182b565b6106da576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602160248201527f5b41747461636b53797374656d5d20496e76616c696420776561706f6e206b6560448201527f790000000000000000000000000000000000000000000000000000000000000060648201526084016103eb565b6106e68388888861078d565b6040805160ff909216602083015201604051602081830303815290604052975050505050505050919050565b606061074084848460405160200161072c93929190611e7a565b60405160208183030381529060405261010f565b949350505050565b60006107887f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b6040805160808101909152600080549091829181906107e29073ffffffffffffffffffffffffffffffffffffffff167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e6115c9565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161083091167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c75406115c9565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161087e91167fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e6115c9565b73ffffffffffffffffffffffffffffffffffffffff90811682526000546020909201916108cc91167f2fc9fa89c3e33fdaa5feead211018b3d0b1d3edd613228f7f320915fddd8d0396115c9565b73ffffffffffffffffffffffffffffffffffffffff908116909152600080549293509161091a91167f3ee10300fdf6d2b8c2d0e95fa7b5b8c50aa50e011ba55c2da6a5bccfeafb03406115c9565b60008054919250906109629073ffffffffffffffffffffffffffffffffffffffff167ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f15106408456115c9565b905060006109a5876040518060400160405280600881526020017f6275696c64696e67000000000000000000000000000000000000000000000000815250611717565b84516040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905291925073ffffffffffffffffffffffffffffffffffffffff169063cccf7a8e90602401602060405180830381865afa158015610a14573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a389190611e3f565b610ac4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b2066726f60448201527f6d20616e20656d7074792074696c65000000000000000000000000000000000060648201526084016103eb565b60208401516040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009173ffffffffffffffffffffffffffffffffffffffff1690630ff4c91690602401602060405180830381865afa158015610b36573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b5a9190611e61565b9050338103610beb576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f5b41747461636b53797374656d5d2043616e6e6f742061747461636b20796f7560448201527f72206f776e20656e74697479000000000000000000000000000000000000000060648201526084016103eb565b6040805160208082018a90528183018d9052825180830384018152606090920190925280519101206000906040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015610c84573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ca89190611e3f565b15610df8576040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa158015610d1b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d3f9190611e61565b90508015610de25773ffffffffffffffffffffffffffffffffffffffff8516631ab06ee583610d6f600185611eed565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015610dc557600080fd5b505af1158015610dd9573d6000803e3d6000fd5b50505050610df2565b6000975050505050505050610740565b50610e07565b60009650505050505050610740565b85516040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018d9052600091610ea59173ffffffffffffffffffffffffffffffffffffffff90911690630ff4c91690602401602060405180830381865afa158015610e7c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea09190611e61565b6118d0565b8a518c51919250600383900b91610ec491610ebf91611f00565b611967565b60030b1380610eee57508060030b610ee98b602001518d60200151610ebf9190611f00565b60030b135b15610f03576000975050505050505050610740565b60608701516040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810186905273ffffffffffffffffffffffffffffffffffffffff9091169063cccf7a8e90602401602060405180830381865afa158015610f74573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f989190611e3f565b156110e45760608701516040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810186905260009173ffffffffffffffffffffffffffffffffffffffff1690630ff4c91690602401602060405180830381865afa15801561100f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110339190611e61565b905080156110de57876060015173ffffffffffffffffffffffffffffffffffffffff16631ab06ee5866110658d611986565b61106f9085611eed565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156110c557600080fd5b505af11580156110d9573d6000803e3d6000fd5b505050505b5061121f565b86516040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810186905260009173ffffffffffffffffffffffffffffffffffffffff1690630ff4c91690602401602060405180830381865afa158015611153573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111779190611e61565b9050876060015173ffffffffffffffffffffffffffffffffffffffff16631ab06ee5866111a38d611986565b6111af906103e8611eed565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561120557600080fd5b505af1158015611219573d6000803e3d6000fd5b50505050505b60608701516040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810186905260009173ffffffffffffffffffffffffffffffffffffffff1690630ff4c91690602401602060405180830381865afa158015611291573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906112b59190611e61565b1161153b5786516040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810186905273ffffffffffffffffffffffffffffffffffffffff90911690634cc8221590602401600060405180830381600087803b15801561132557600080fd5b505af1158015611339573d6000803e3d6000fd5b50505060208801516040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810187905273ffffffffffffffffffffffffffffffffffffffff9091169150634cc8221590602401600060405180830381600087803b1580156113ab57600080fd5b505af11580156113bf573d6000803e3d6000fd5b50505050866040015173ffffffffffffffffffffffffffffffffffffffff16634cc82215856040518263ffffffff1660e01b815260040161140291815260200190565b600060405180830381600087803b15801561141c57600080fd5b505af1158015611430573d6000803e3d6000fd5b50505060608801516040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810187905273ffffffffffffffffffffffffffffffffffffffff9091169150634cc8221590602401600060405180830381600087803b1580156114a257600080fd5b505af11580156114b6573d6000803e3d6000fd5b50506040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810187905273ffffffffffffffffffffffffffffffffffffffff89169250634cc822159150602401600060405180830381600087803b15801561152257600080fd5b505af1158015611536573d6000803e3d6000fd5b505050505b5060019b9a5050505050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146115bd576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6115c681611a45565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015611639573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261167f9190810190611f42565b905080516000036116ec576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016103eb565b61170d8160008151811061170257611702611fe8565b602002602001015190565b9150505b92915050565b6000826000015160e01b836020015160e01b8361173390612017565b604080517fffffffff0000000000000000000000000000000000000000000000000000000094851660208201529390921660248401527fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000166028830152016040516020818303038152906040526117a990612067565b9392505050565b60007f9d47592473d41327e0ccb0bb0dc69c74c6ac29b77beb0fc78a1c84d6f0bcf87b8214806117ff57507fc5b2723c9f5ebeba49bd048804f6b7427f3d1d14fe2ddde79a8368b46739c69c82145b806117115750507f256c9a7f845a3a11dcb51c159d88557005a005a679ce6cd10a583b028e9d368b1490565b60007f4952f11b5e88ffd88b7a0231ee67228cf0d58eb081bf31517c674f44264c783f82148061187a57507fec80ff155d880c151528d536ae07261be7e0f0ec79c8853fb5205684633239dc82145b806118a457507f0c3016c3f177a1aea6cba33a3ccb8e01cef39a514cc6bb0b1223aecdbbbd349282145b806117115750507fdf054c8ff646f055efa75559586847c60a9365d45c0aa564f013bf3ad4f3621f1490565b60007f62b8a6db8c2becd81f334f44f239638b3953d6488414f03875e37b290f43078582016119015750600a919050565b7f3a4d8dc360a14145b642fb77fb0948bd80c2e2eb01d22218657c974b98c6396482016119305750601e919050565b7fda9365807ba5c5ee234ae3ea6277aa8ffa5ffa598631932ef5a7c4fd7162c975820161195f5750603c919050565b506000919050565b6000808260030b12156119825761197d826120ac565b611711565b5090565b60007fb6ad0ee4a17700277485fdce1198dd730f2a714f7e40ceae8398b0bbd9b387c182016119b757506014919050565b7f137f00eaa277f3eaead72ac951f8d9e4181f0f1386377ac04adfa97b9ccdc62482016119e657506064919050565b7ff3cfe93c0e885e5159345cc5c33471fe310c65aeb33944f4eddc51324442cb6e8201611a15575060c8919050565b7f20fab37009b90faa1058aaa6a797b839f56c9a2ba3f55a9b0fec40c52b0c9de1820161195f575061012c919050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516115c6928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715611b4b57611b4b611af9565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611b9857611b98611af9565b604052919050565b60006020808385031215611bb357600080fd5b823567ffffffffffffffff80821115611bcb57600080fd5b818501915085601f830112611bdf57600080fd5b813581811115611bf157611bf1611af9565b611c21847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611b51565b91508082528684828501011115611c3757600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015611c8057858101830151858201604001528201611c64565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b8060030b81146115c657600080fd5b600060408284031215611ce057600080fd5b611ce8611b28565b90508135611cf581611cbf565b81526020820135611d0581611cbf565b602082015292915050565b600080600060a08486031215611d2557600080fd5b611d2f8585611cce565b9250611d3e8560408601611cce565b9150608084013590509250925092565b60008060008060c08587031215611d6457600080fd5b84359350611d758660208701611cce565b9250611d848660608701611cce565b9396929550929360a00135925050565b600060208284031215611da657600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146117a957600080fd5b600060408284031215611ddc57600080fd5b611de4611b28565b90508151611df181611cbf565b81526020820151611d0581611cbf565b600080600060a08486031215611e1657600080fd5b611e208585611dca565b9250611e2f8560408601611dca565b9150608084015190509250925092565b600060208284031215611e5157600080fd5b815180151581146117a957600080fd5b600060208284031215611e7357600080fd5b5051919050565b60a08101611e9b8286805160030b8252602081015160030b60208301525050565b8351600390810b604084015260209094015190930b606082015260800152919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8181038181111561171157611711611ebe565b600382810b9082900b037fffffffffffffffffffffffffffffffffffffffffffffffffffffffff800000008112637fffffff8213171561171157611711611ebe565b60006020808385031215611f5557600080fd5b825167ffffffffffffffff80821115611f6d57600080fd5b818501915085601f830112611f8157600080fd5b815181811115611f9357611f93611af9565b8060051b9150611fa4848301611b51565b8181529183018401918481019088841115611fbe57600080fd5b938501935b83851015611fdc57845182529385019390850190611fc3565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000815160208301517fffffffffffffffffffffffffffffffffffffffffffffffff00000000000000008082169350601883101561205f5780818460180360031b1b83161693505b505050919050565b805160208083015191908110156120a6577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8160200360031b1b821691505b50919050565b60008160030b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffff8000000081036120e1576120e1611ebe565b6000039291505056fea264697066735822122038c62543e73a5660540d09a8799160bfa5b3d60eb9d2863ab9e72a246e23e8cf64736f6c63430008130033";

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
