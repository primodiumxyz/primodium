/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  Uint32Component,
  Uint32ComponentInterface,
} from "../Uint32Component";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "world",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "BareComponent__NotImplemented",
    type: "error",
  },
  {
    inputs: [],
    name: "OwnableWritable__NotWriter",
    type: "error",
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
        internalType: "address",
        name: "writer",
        type: "address",
      },
    ],
    name: "authorizeWriter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEntities",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "value",
        type: "uint32",
      },
    ],
    name: "getEntitiesWithValue",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "value",
        type: "bytes",
      },
    ],
    name: "getEntitiesWithValue",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "getRawValue",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getSchema",
    outputs: [
      {
        internalType: "string[]",
        name: "keys",
        type: "string[]",
      },
      {
        internalType: "enum LibTypes.SchemaValue[]",
        name: "values",
        type: "uint8[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "getValue",
    outputs: [
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "has",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "id",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
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
        name: "indexer",
        type: "address",
      },
    ],
    name: "registerIndexer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_world",
        type: "address",
      },
    ],
    name: "registerWorld",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
    ],
    name: "remove",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "value",
        type: "bytes",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "entity",
        type: "uint256",
      },
      {
        internalType: "uint32",
        name: "value",
        type: "uint32",
      },
    ],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "writer",
        type: "address",
      },
    ],
    name: "unauthorizeWriter",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "world",
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
        name: "operator",
        type: "address",
      },
    ],
    name: "writeAccess",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620030443803806200304483398101604081905262000034916200029a565b81818181620000433362000108565b60028190556001600160a01b03821615620000635762000063826200017c565b505060405162000073906200027e565b604051809103906000f08015801562000090573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000bf906200028c565b604051809103906000f080158015620000dc573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b039290921691909117905550620002d692505050565b60006200011f6200023460201b62000cb81760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6200018662000258565b6001600160a01b0316336001600160a01b031614620001b857604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200021857600080fd5b505af11580156200022d573d6000803e3d6000fd5b5050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b60006200026f6200023460201b62000cb81760201c565b546001600160a01b0316919050565b61084c8062001f6a83390190565b61088e80620027b683390190565b60008060408385031215620002ae57600080fd5b82516001600160a01b0381168114620002c657600080fd5b6020939093015192949293505050565b611c8480620002e66000396000f3fe608060405234801561001057600080fd5b50600436106101515760003560e01c80638b282947116100cd578063b8bc073d11610081578063cccf7a8e11610066578063cccf7a8e146102ef578063d923c3c414610302578063f2fde38b1461031557600080fd5b8063b8bc073d146102bc578063bf4fe57e146102dc57600080fd5b80639d2c76b4116100b25780639d2c76b41461027f578063af640d0f14610292578063b361be46146102a957600080fd5b80638b282947146102645780638da5cb5b1461027757600080fd5b80634cc82215116101245780636b122fe0116101095780636b122fe01461021857806375c0669c1461022e578063861eb9051461024157600080fd5b80634cc82215146101f05780634fef6a381461020557600080fd5b80630ff4c9161461015657806330b67baa1461018357806331b933b9146101c8578063447e2bd2146101dd575b600080fd5b61016961016436600461144a565b610328565b60405163ffffffff90911681526020015b60405180910390f35b6000546101a39073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161017a565b6101d061034e565b60405161017a9190611463565b6101d06101eb3660046114b9565b610409565b6102036101fe36600461144a565b61043b565b005b6102036102133660046114d6565b610486565b610220610564565b60405161017a92919061159f565b61020361023c3660046114d6565b610650565b61025461024f3660046114d6565b610706565b604051901515815260200161017a565b61020361027236600461179b565b610790565b6101a36107dd565b61020361028d3660046114d6565b61081d565b61029b60025481565b60405190815260200161017a565b6101d06102b73660046117e2565b610946565b6102cf6102ca36600461144a565b610a03565b60405161017a919061181f565b6102036102ea3660046114d6565b610aa5565b6102546102fd36600461144a565b610b80565b610203610310366004611832565b610c14565b6102036103233660046114d6565b610c3f565b60008061033483610a03565b8060200190518101906103479190611862565b9392505050565b600354604080517f410d59cc000000000000000000000000000000000000000000000000000000008152905160609273ffffffffffffffffffffffffffffffffffffffff169163410d59cc9160048083019260009291908290030181865afa1580156103be573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610404919081019061187f565b905090565b6040805163ffffffff831660208201526060916104359101604051602081830303815290604052610946565b92915050565b61044433610706565b61047a576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61048381610cdc565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146104f6576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00166001179055565b604080516001808252818301909252606091829190816020015b606081526020019060019003908161057e575050604080516001808252818301909252919350602080830190803683370190505090506040518060400160405280600581526020017f76616c7565000000000000000000000000000000000000000000000000000000815250826000815181106105fd576105fd611925565b6020026020010181905250600a8160008151811061061d5761061d611925565b6020026020010190602181111561063657610636611570565b9081602181111561064957610649611570565b9052509091565b61065933610706565b61068f576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b73ffffffffffffffffffffffffffffffffffffffff811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff1680610435575061075c6107dd565b73ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161492915050565b61079933610706565b6107cf576040517f406ed3da00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6107d98282610f9b565b5050565b60006104047f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461088d576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081179091556002546040517ff3034770000000000000000000000000000000000000000000000000000000008152306004820152602481019190915263f3034770906044015b600060405180830381600087803b15801561092b57600080fd5b505af115801561093f573d6000803e3d6000fd5b5050505050565b60048054825160208401206040517f796c5e940000000000000000000000000000000000000000000000000000000081529283015260609173ffffffffffffffffffffffffffffffffffffffff9091169063796c5e9490602401600060405180830381865afa1580156109bd573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610435919081019061187f565b6000818152600160205260409020805460609190610a2090611954565b80601f0160208091040260200160405190810160405280929190818152602001828054610a4c90611954565b8015610a995780601f10610a6e57610100808354040283529160200191610a99565b820191906000526020600020905b815481529060010190602001808311610a7c57829003601f168201915b50505050509050919050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610b15576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b73ffffffffffffffffffffffffffffffffffffffff1660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c9096020526040902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00169055565b6003546040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810183905260009173ffffffffffffffffffffffffffffffffffffffff169063cccf7a8e90602401602060405180830381865afa158015610bf0573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061043591906119a7565b6040805163ffffffff831660208201526107d991849101604051602081830303815290604052610790565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610caf576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61048381611232565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b60045460008281526001602052604090819020905173ffffffffffffffffffffffffffffffffffffffff909216916385edea1391610d19916119c9565b60405190819003812060e083901b7fffffffff000000000000000000000000000000000000000000000000000000001682526004820152602401602060405180830381865afa158015610d70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d949190611a5d565b600003610d9e5750565b60045460008281526001602052604090819020905173ffffffffffffffffffffffffffffffffffffffff90921691636526db7a91610ddb916119c9565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101849052604401600060405180830381600087803b158015610e3657600080fd5b505af1158015610e4a573d6000803e3d6000fd5b50506003546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff9091169250634cc822159150602401600060405180830381600087803b158015610eba57600080fd5b505af1158015610ece573d6000803e3d6000fd5b50505050610edb8161123b565b60005b6005548110156107d95760058181548110610efb57610efb611925565b6000918252602090912001546040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690634cc8221590602401600060405180830381600087803b158015610f7057600080fd5b505af1158015610f84573d6000803e3d6000fd5b505050508080610f9390611a76565b915050610ede565b6003546040517f1003e2d20000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff90911690631003e2d290602401600060405180830381600087803b15801561100757600080fd5b505af115801561101b573d6000803e3d6000fd5b505060045460008581526001602052604090819020905173ffffffffffffffffffffffffffffffffffffffff9092169350636526db7a925061105c916119c9565b60405190819003812060e083901b7fffffffff00000000000000000000000000000000000000000000000000000000168252600482015260248101859052604401600060405180830381600087803b1580156110b757600080fd5b505af11580156110cb573d6000803e3d6000fd5b505060048054845160208601206040517f771602f7000000000000000000000000000000000000000000000000000000008152928301526024820186905273ffffffffffffffffffffffffffffffffffffffff16925063771602f79150604401600060405180830381600087803b15801561114557600080fd5b505af1158015611159573d6000803e3d6000fd5b5050505061116782826112a9565b60005b60055481101561122d576005818154811061118757611187611925565b6000918252602090912001546040517f0216b83800000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff90911690630216b838906111e89086908690600401611ad5565b600060405180830381600087803b15801561120257600080fd5b505af1158015611216573d6000803e3d6000fd5b50505050808061122590611a76565b91505061116a565b505050565b61048381611350565b6000818152600160205260408120611252916113fc565b6000546040517f0de3b7b50000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff90911690630de3b7b590602401610911565b60008281526001602052604090206112c18282611b34565b506000546040517fcfd3c57f00000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff9091169063cfd3c57f9061131a9085908590600401611ad5565b600060405180830381600087803b15801561133457600080fd5b505af1158015611348573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b50805461140890611954565b6000825580601f10611418575050565b601f01602090049060005260206000209081019061048391905b808211156114465760008155600101611432565b5090565b60006020828403121561145c57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561149b5783518352928401929184019160010161147f565b50909695505050505050565b63ffffffff8116811461048357600080fd5b6000602082840312156114cb57600080fd5b8135610347816114a7565b6000602082840312156114e857600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461034757600080fd5b6000815180845260005b8181101561153257602081850181015186830182015201611516565b5060006020828601015260207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011685010191505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b83811015611614577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa088870301855261160286835161150c565b955093820193908201906001016115c8565b50508584038187015286518085528782019482019350915060005b8281101561168257845160228110611670577f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b8452938101939281019260010161162f565b5091979650505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156117055761170561168f565b604052919050565b600082601f83011261171e57600080fd5b813567ffffffffffffffff8111156117385761173861168f565b61176960207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016116be565b81815284602083860101111561177e57600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156117ae57600080fd5b82359150602083013567ffffffffffffffff8111156117cc57600080fd5b6117d88582860161170d565b9150509250929050565b6000602082840312156117f457600080fd5b813567ffffffffffffffff81111561180b57600080fd5b6118178482850161170d565b949350505050565b602081526000610347602083018461150c565b6000806040838503121561184557600080fd5b823591506020830135611857816114a7565b809150509250929050565b60006020828403121561187457600080fd5b8151610347816114a7565b6000602080838503121561189257600080fd5b825167ffffffffffffffff808211156118aa57600080fd5b818501915085601f8301126118be57600080fd5b8151818111156118d0576118d061168f565b8060051b91506118e18483016116be565b81815291830184019184810190888411156118fb57600080fd5b938501935b8385101561191957845182529385019390850190611900565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600181811c9082168061196857607f821691505b6020821081036119a1577f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b50919050565b6000602082840312156119b957600080fd5b8151801515811461034757600080fd5b60008083546119d781611954565b600182811680156119ef5760018114611a2257611a51565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0084168752821515830287019450611a51565b8760005260208060002060005b85811015611a485781548a820152908401908201611a2f565b50505082870194505b50929695505050505050565b600060208284031215611a6f57600080fd5b5051919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611ace577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b828152604060208201526000611817604083018461150c565b601f82111561122d57600081815260208120601f850160051c81016020861015611b155750805b601f850160051c820191505b8181101561134857828155600101611b21565b815167ffffffffffffffff811115611b4e57611b4e61168f565b611b6281611b5c8454611954565b84611aee565b602080601f831160018114611bb55760008415611b7f5750858301515b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600386901b1c1916600185901b178555611348565b6000858152602081207fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe08616915b82811015611c0257888601518255948401946001909101908401611be3565b5085821015611c3e57878501517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220135d97c8637693542f9578a1b7f829bd9acd08352ae5b7b4c7cb697657ce9ce664736f6c63430008110033608060405234801561001057600080fd5b5061001a3361001f565b6100b4565b600061003361009060201b6105431760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b610789806100c36000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e114610100578063949d225d1461012a578063cccf7a8e1461013b578063f2fde38b1461015e57600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461061b565b610171565b005b6100aa610233565b6040516100b79190610634565b60405180910390f35b6100a06100ce36600461061b565b61028b565b6100db6103ef565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100b7565b61011361010e36600461061b565b610434565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014e61014936600461061b565b610467565b60405190151581526020016100b7565b6100a061016c366004610678565b6104ca565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146101e1576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6101ea81610467565b61023057600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561028157602002820191906000526020600020905b81548152602001906001019080831161026d575b5050505050905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146102fb576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61030481610467565b156102305760008054610319906001906106b5565b81548110610329576103296106f5565b9060005260206000200154600060016000848152602001908152602001600020548154811061035a5761035a6106f5565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610391576103916106f5565b9060005260206000200154815260200190815260200160002081905550600160008281526020019081526020016000206000905560008054806103d6576103d6610724565b6001900381819060005260206000200160009055905550565b600061042f7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60008061044083610467565b61044f57506000928392509050565b50506000908152600160208190526040909120549091565b60008054810361047957506000919050565b60008281526001602052604081205490036104b55781600080815481106104a2576104a26106f5565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461053a576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61023081610567565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610230928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b60006020828403121561062d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561066c57835183529284019291840191600101610650565b50909695505050505050565b60006020828403121561068a57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146106ae57600080fd5b9392505050565b818103818111156106ef577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea26469706673582212209a78eb981d2558ca25aabc42133a6a0bf0a3f201072d3f86592ff4e562d30cf364736f6c63430008110033608060405234801561001057600080fd5b5061001a3361001f565b6100b4565b600061003361009060201b6105691760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6107cb806100c36000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff81461012e578063f2fde38b1461015157600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610641565b610164565b005b6100956100a5366004610641565b610301565b6100bd6100b8366004610663565b6103b5565b6040516100ca919061067c565b60405180910390f35b6100f36100e1366004610663565b60009081526020819052604090205490565b6040519081526020016100ca565b610109610415565b60405173ffffffffffffffffffffffffffffffffffffffff90911681526020016100ca565b61014161013c366004610641565b61045a565b60405190151581526020016100ca565b61009561015f3660046106c0565b6104ed565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146101d4576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6101de828261045a565b156102fd57600082815260208190526040902080546101ff906001906106fd565b8154811061020f5761020f610737565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061024957610249610737565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061029757610297610737565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102e6576102e6610766565b600190038181906000526020600020016000905590555b5050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610371576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61037b828261045a565b6102fd5760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561040957602002820191906000526020600020905b8154815260200190600101908083116103f5575b50505050509050919050565b60006104557f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b6000828152602081905260408120548103610477575060006104e7565b600083815260016020908152604080832085845290915281205490036104c957600083815260208190526040812080548492906104b6576104b6610737565b90600052602060002001541490506104e7565b50600082815260016020908152604080832084845290915290205415155b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461055d576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6105668161058d565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610566928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6000806040838503121561065457600080fd5b50508035926020909101359150565b60006020828403121561067557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156106b457835183529284019291840191600101610698565b50909695505050505050565b6000602082840312156106d257600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146106f657600080fd5b9392505050565b818103818111156104e7577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603160045260246000fdfea26469706673582212203cab7859742f0ed568efd4384357586443224b9d521c17701377f93aaf4967ec64736f6c63430008110033";

type Uint32ComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Uint32ComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Uint32Component__factory extends ContractFactory {
  constructor(...args: Uint32ComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    id: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Uint32Component> {
    return super.deploy(world, id, overrides || {}) as Promise<Uint32Component>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    id: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, id, overrides || {});
  }
  override attach(address: string): Uint32Component {
    return super.attach(address) as Uint32Component;
  }
  override connect(signer: Signer): Uint32Component__factory {
    return super.connect(signer) as Uint32Component__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Uint32ComponentInterface {
    return new utils.Interface(_abi) as Uint32ComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Uint32Component {
    return new Contract(address, _abi, signerOrProvider) as Uint32Component;
  }
}
