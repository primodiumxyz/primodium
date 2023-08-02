/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { UpgradeSystem, UpgradeSystemInterface } from "../UpgradeSystem";

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
  "0x60806040523480156200001157600080fd5b5060405162003a1438038062003a148339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b6137be80620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063cb6cbba7146100a7578063f2fde38b146100ba575b600080fd5b61006461005f366004613126565b6100cf565b60405161007191906131ca565b60405180910390f35b61008261141c565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b536600461322a565b611461565b6100cd6100c836600461328d565b6114aa565b005b60606000828060200190518101906100e791906132aa565b600080549192509061012f9073ffffffffffffffffffffffffffffffffffffffff167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c5611526565b60008054919250906101779073ffffffffffffffffffffffffffffffffffffffff167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540611526565b60008054919250906101bf9073ffffffffffffffffffffffffffffffffffffffff167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e611526565b60008054919250906102079073ffffffffffffffffffffffffffffffffffffffff167fe430e9298a0e65a11ff38f1379ec3b263fac5aa2b9f2e7ef43ae89d62ab503f3611526565b9050600061021486611672565b9050806000036102ab576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f5b5570677261646553797374656d5d206e6f206275696c64696e67206174207460448201527f68697320636f6f7264696e61746500000000000000000000000000000000000060648201526084015b60405180910390fd5b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610316573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061033a91906132df565b6103c6576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f5b5570677261646553797374656d5d2043616e6e6f742075706772616465206160448201527f206e6f6e2d6275696c64696e670000000000000000000000000000000000000060648201526084016102a2565b6000336040517f0ff4c91600000000000000000000000000000000000000000000000000000000815260048101849052909150819073ffffffffffffffffffffffffffffffffffffffff871690630ff4c91690602401602060405180830381865afa158015610439573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061045d9190613301565b14610510576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152604260248201527f5b5570677261646553797374656d5d2043616e6e6f742075706772616465206160448201527f206275696c64696e672074686174206973206e6f74206f776e6564206279207960648201527f6f75000000000000000000000000000000000000000000000000000000000000608482015260a4016102a2565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff881690630ff4c91690602401602060405180830381865afa15801561057e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105a29190613301565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015610610573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063491906132df565b801561075457506040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa1580156106a6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106ca9190613333565b63ffffffff168573ffffffffffffffffffffffffffffffffffffffff16630ff4c916856040518263ffffffff1660e01b815260040161070b91815260200190565b602060405180830381865afa158015610728573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061074c9190613333565b63ffffffff16105b610806576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152605d60248201527f5b5570677261646553797374656d5d2043616e6e6f742075706772616465206260448201527f75696c64696e67207468617420646f6573206e6f742068617665206d6178206c60648201527f6576656c206f72206861732072656163686564206d6178206c6576656c000000608482015260a4016102a2565b60006108c5828773ffffffffffffffffffffffffffffffffffffffff16630ff4c916876040518263ffffffff1660e01b815260040161084791815260200190565b602060405180830381865afa158015610864573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108889190613333565b61089390600161337d565b63ffffffff16604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6001549091506108ec9073ffffffffffffffffffffffffffffffffffffffff16828561182a565b61099e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152605260248201527f5b5570677261646553797374656d5d2043616e6e6f742075706772616465206160448201527f206275696c64696e67207468617420646f6573206e6f74206d6565742072657360648201527f656172636820726571756972656d656e74730000000000000000000000000000608482015260a4016102a2565b6000546109e19073ffffffffffffffffffffffffffffffffffffffff167f0842a184a814d4c9890dc4a7e03369a83e6e7490abc9f169e0062ff4011b8a23611526565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e826040518263ffffffff1660e01b8152600401610a1b91815260200190565b602060405180830381865afa158015610a38573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a5c91906132df565b15610c8857600154610a859073ffffffffffffffffffffffffffffffffffffffff168285611b33565b610b11576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603660248201527f5b5570677261646553797374656d5d20596f7520646f206e6f7420686176652060448201527f746865207265717569726564207265736f75726365730000000000000000000060648201526084016102a2565b600154604080517f0d59332e0000000000000000000000000000000000000000000000000000000081529051610bcb9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610b82573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ba691906133a1565b7e68dc162c3977b7de42c7e43f405c4cd8cf0c9100582653a295471b3a157d7a611526565b6040517f6ad0ccab0000000000000000000000000000000000000000000000000000000081523360048201526024810183905273ffffffffffffffffffffffffffffffffffffffff9190911690636ad0ccab906044016000604051808303816000875af1158015610c40573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610c8691908101906133be565b505b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810185905260009073ffffffffffffffffffffffffffffffffffffffff881690630ff4c91690602401602060405180830381865afa158015610cf6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d1a9190613333565b610d2590600161337d565b6040517fd923c3c40000000000000000000000000000000000000000000000000000000081526004810187905263ffffffff8216602482015290915073ffffffffffffffffffffffffffffffffffffffff88169063d923c3c490604401600060405180830381600087803b158015610d9c57600080fd5b505af1158015610db0573d6000803e3d6000fd5b5050600054610df8925073ffffffffffffffffffffffffffffffffffffffff1690507fb17845266e19660bccbe7b1d92254a9fba6cae97921ff171fa1859c50a7f07b1611526565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e610e4a858463ffffffff16604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6040518263ffffffff1660e01b8152600401610e6891815260200190565b602060405180830381865afa158015610e85573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ea991906132df565b1561102a57600154604080517f0d59332e0000000000000000000000000000000000000000000000000000000081529051610f699273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610f1f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f4391906133a1565b7f587aac2f9ba4b6f2e05a67f0dcf566c5085d04e8d2b31b982671b97f51f7e589611526565b6040517f6ad0ccab0000000000000000000000000000000000000000000000000000000081523360048201526024810187905273ffffffffffffffffffffffffffffffffffffffff9190911690636ad0ccab906044016000604051808303816000875af1158015610fde573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261102491908101906133be565b5061129b565b60005461106d9073ffffffffffffffffffffffffffffffffffffffff167f06c984cf8fb25e3e19ad591f6754b5c28f39c15d753d3d2e6022dad6658cb2db611526565b73ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e6110bf858463ffffffff16604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6040518263ffffffff1660e01b81526004016110dd91815260200190565b602060405180830381865afa1580156110fa573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061111e91906132df565b1561129b57600154604080517f0d59332e00000000000000000000000000000000000000000000000000000000815290516111de9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015611194573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111b891906133a1565b7fc48028814bcba975a1f039d67a49bd144dd84621511d51e475df63bde3794cb2611526565b6040517f6ad0ccab0000000000000000000000000000000000000000000000000000000081523360048201526024810187905273ffffffffffffffffffffffffffffffffffffffff9190911690636ad0ccab906044016000604051808303816000875af1158015611253573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261129991908101906133be565b505b6001546040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018790526113cb9173ffffffffffffffffffffffffffffffffffffffff9081169187918d1690630ff4c91690602401602060405180830381865afa158015611313573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113379190613301565b6040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018a905273ffffffffffffffffffffffffffffffffffffffff8c1690630ff4c91690602401602060405180830381865afa1580156113a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113c69190613333565b611eb9565b6001546113f09073ffffffffffffffffffffffffffffffffffffffff168585846121c0565b6040805160208101879052016040516020818303038152906040529a5050505050505050505050919050565b600061145c7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60606114a48260405160200161149091908151600390810b8252602092830151900b9181019190915260400190565b6040516020818303038152906040526100cf565b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461151a576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611523816126bf565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015611596573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526115dc91908101906134bf565b90508051600003611649576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f74207265676973746572656400000000000000000000000000000060448201526064016102a2565b61166a8160008151811061165f5761165f6134f4565b602002602001015190565b949350505050565b6000805481906116b89073ffffffffffffffffffffffffffffffffffffffff167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540611526565b905060006116fb846040518060400160405280600d81526020017f6275696c64696e672e74696c65000000000000000000000000000000000000008152506126c8565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa158015611769573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061178d91906132df565b61179b575060009392505050565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905273ffffffffffffffffffffffffffffffffffffffff831690630ff4c91690602401602060405180830381865afa158015611806573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061166a9190613301565b6000806118c58573ffffffffffffffffffffffffffffffffffffffff1663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801561187b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061189f91906133a1565b7f1203294d5b2b02e65b2344f70a790c2cf726d3822e7f267d74f37f3dbe44a344611526565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810186905290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa158015611933573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061195791906132df565b611965576001915050611b2c565b60006119ff8673ffffffffffffffffffffffffffffffffffffffff1663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa1580156119b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119d991906133a1565b7fcac70f64f2c43ee6b17f4ff03bae772a913c7198090af99d8b3ebb1c25a8641e611526565b90508073ffffffffffffffffffffffffffffffffffffffff1663cccf7a8e611ac88473ffffffffffffffffffffffffffffffffffffffff16630ff4c916896040518263ffffffff1660e01b8152600401611a5b91815260200190565b602060405180830381865afa158015611a78573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611a9c9190613301565b604080516020808201939093528082018a90528151808203830181526060909101909152805191012090565b6040518263ffffffff1660e01b8152600401611ae691815260200190565b602060405180830381865afa158015611b03573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b2791906132df565b925050505b9392505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f0842a184a814d4c9890dc4a7e03369a83e6e7490abc9f169e0062ff4011b8a236004820152600090819073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa158015611bc2573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611be691906133a1565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845600482015290915060009073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa158015611c76573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611c9a91906133a1565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810187905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa158015611d08573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d2c91906132df565b611d3b57600192505050611b2c565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810186905260009073ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401600060405180830381865afa158015611da9573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052611def9190810190613523565b905060005b815151811015611eab576000611e5784611e5285600001518581518110611e1d57611e1d6134f4565b60200260200101518a604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b61275a565b90508063ffffffff1683602001518381518110611e7657611e766134f4565b602002602001015163ffffffff161115611e9857600095505050505050611b2c565b5080611ea381613613565b915050611df4565b506001979650505050505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fb3c62762a3762f5f11947c1589f40ecb45ee2b286a2a0d62946782f12d42327a600482015260009073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa158015611f46573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611f6a91906133a1565b60408051602080820187905263ffffffff861682840152825180830384018152606090920190925280519101209091506000611fab8561089360018761364b565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810184905290915073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015612019573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061203d91906132df565b612049575050506121ba565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401600060405180830381865afa1580156120b7573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526120fd91908101906134bf565b905060005b81518110156121b45760006121318a8a858581518110612124576121246134f4565b6020026020010151612886565b9050600061214c8b86868681518110612124576121246134f4565b6121638c88878781518110612124576121246134f4565b61216d919061364b565b905061219f8b8b868681518110612186576121866134f4565b6020026020010151848661219a919061337d565b612968565b505080806121ac90613613565b915050612102565b50505050505b50505050565b600061225a8573ffffffffffffffffffffffffffffffffffffffff1663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa158015612210573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061223491906133a1565b7f2f51bb3db6fee58a002d21e1cd28ae3babf34dd1f46f8ed1e48748a2f7e58db6611526565b60408051602080820187905263ffffffff861682840152825180830384018152606090920190925280519101209091506000906040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa1580156122fb573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061231f91906132df565b61232a5750506121ba565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f159cc46a31f72f01f0447b0d7fdc3e796e2fa044c2be35b352589e5b5b0194f5600482015260009073ffffffffffffffffffffffffffffffffffffffff881690634f27da1890602401602060405180830381865afa1580156123b7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123db91906133a1565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905290915060009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c916906024016040805180830381865afa15801561244b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061246f9190613668565b516040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810185905290915060009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c916906024016040805180830381865afa1580156124e0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125049190613668565b60200151905060018663ffffffff1611156125b35773ffffffffffffffffffffffffffffffffffffffff8516630ff4c9166125448961089360018b61364b565b6040518263ffffffff1660e01b815260040161256291815260200190565b6040805180830381865afa15801561257e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906125a29190613668565b602001516125b0908261364b565b90505b6000816125eb85611e52868d604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6125f5919061337d565b6040805160208082018790528183018d90528251808303840181526060909201909252805191012090915073ffffffffffffffffffffffffffffffffffffffff85169063d923c3c4906040517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b168152600481019190915263ffffffff84166024820152604401600060405180830381600087803b15801561269b57600080fd5b505af11580156126af573d6000803e3d6000fd5b5050505050505050505050505050565b61152381612f8d565b6000826000015160e01b836020015160e01b836126e490613692565b604080517fffffffff0000000000000000000000000000000000000000000000000000000094851660208201529390921660248401527fffffffffffffffffffffffffffffffffffffffffffffffff000000000000000016602883015201604051602081830303815290604052611b2c906136e2565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa1580156127c8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906127ec91906132df565b6127f7576000611b2c565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa158015612862573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b2c9190613333565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f211ec405e276c4670499c53a5acad168c5576b06d549dd3a610b8d516174e2d9600482015260009061166a9073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa158015612917573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061293b91906133a1565b6040805160208082018790528183018890528251808303840181526060909201909252805191012061275a565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f211ec405e276c4670499c53a5acad168c5576b06d549dd3a610b8d516174e2d9600482015260009073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa1580156129f5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612a1991906133a1565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fb3c62762a3762f5f11947c1589f40ecb45ee2b286a2a0d62946782f12d42327a600482015290915060009073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa158015612aa9573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612acd91906133a1565b604080516020808201889052818301899052825180830384018152606090920190925280519101209091506000906040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015612b69573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612b8d91906132df565b612ef8576040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810187905260609073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015612bff573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190612c2391906132df565b15612e30576040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810188905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401600060405180830381865afa158015612c93573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052612cd991908101906134bf565b9050600081516001612ceb9190613727565b67ffffffffffffffff811115612d0357612d03613039565b604051908082528060200260200182016040528015612d2c578160200160208202803683370190505b50905060005b8251811015612d8457828181518110612d4d57612d4d6134f4565b6020026020010151828281518110612d6757612d676134f4565b602090810291909101015280612d7c81613613565b915050612d32565b508681835181518110612d9957612d996134f4565b60209081029190910101526040517f946aadc600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063946aadc690612df8908b90859060040161373a565b600060405180830381600087803b158015612e1257600080fd5b505af1158015612e26573d6000803e3d6000fd5b5050505050612ef6565b60408051600180825281830190925290602080830190803683370190505090508581600081518110612e6457612e646134f4565b60209081029190910101526040517f946aadc600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063946aadc690612ec3908a90859060040161373a565b600060405180830381600087803b158015612edd57600080fd5b505af1158015612ef1573d6000803e3d6000fd5b505050505b505b6040517fd923c3c40000000000000000000000000000000000000000000000000000000081526004810182905263ffffffff8516602482015273ffffffffffffffffffffffffffffffffffffffff84169063d923c3c490604401600060405180830381600087803b158015612f6c57600080fd5b505af1158015612f80573d6000803e3d6000fd5b5050505050505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561308b5761308b613039565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156130d8576130d8613039565b604052919050565b600067ffffffffffffffff8211156130fa576130fa613039565b50601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b60006020828403121561313857600080fd5b813567ffffffffffffffff81111561314f57600080fd5b8201601f8101841361316057600080fd5b803561317361316e826130e0565b613091565b81815285602083850101111561318857600080fd5b81602084016020830137600091810160200191909152949350505050565b60005b838110156131c15781810151838201526020016131a9565b50506000910152565b60208152600082518060208401526131e98160408501602087016131a6565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169190910160400192915050565b8060030b811461152357600080fd5b60006040828403121561323c57600080fd5b613244613068565b823561324f8161321b565b8152602083013561325f8161321b565b60208201529392505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461152357600080fd5b60006020828403121561329f57600080fd5b8135611b2c8161326b565b6000604082840312156132bc57600080fd5b6132c4613068565b82516132cf8161321b565b8152602083015161325f8161321b565b6000602082840312156132f157600080fd5b81518015158114611b2c57600080fd5b60006020828403121561331357600080fd5b5051919050565b805163ffffffff8116811461332e57600080fd5b919050565b60006020828403121561334557600080fd5b611b2c8261331a565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b63ffffffff81811683821601908082111561339a5761339a61334e565b5092915050565b6000602082840312156133b357600080fd5b8151611b2c8161326b565b6000602082840312156133d057600080fd5b815167ffffffffffffffff8111156133e757600080fd5b8201601f810184136133f857600080fd5b805161340661316e826130e0565b81815285602083850101111561341b57600080fd5b61342c8260208301602086016131a6565b95945050505050565b600067ffffffffffffffff82111561344f5761344f613039565b5060051b60200190565b600082601f83011261346a57600080fd5b8151602061347a61316e83613435565b82815260059290921b8401810191818101908684111561349957600080fd5b8286015b848110156134b4578051835291830191830161349d565b509695505050505050565b6000602082840312156134d157600080fd5b815167ffffffffffffffff8111156134e857600080fd5b61166a84828501613459565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000602080838503121561353657600080fd5b825167ffffffffffffffff8082111561354e57600080fd5b908401906040828703121561356257600080fd5b61356a613068565b82518281111561357957600080fd5b61358588828601613459565b825250838301518281111561359957600080fd5b80840193505086601f8401126135ae57600080fd5b825191506135be61316e83613435565b82815260059290921b830184019184810190888411156135dd57600080fd5b938501935b83851015613602576135f38561331a565b825293850193908501906135e2565b948201949094529695505050505050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036136445761364461334e565b5060010190565b63ffffffff82811682821603908082111561339a5761339a61334e565b60006040828403121561367a57600080fd5b613682613068565b8251815261325f6020840161331a565b6000815160208301517fffffffffffffffffffffffffffffffffffffffffffffffff0000000000000000808216935060188310156136da5780818460180360031b1b83161693505b505050919050565b80516020808301519190811015613721577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8160200360031b1b821691505b50919050565b808201808211156114a4576114a461334e565b6000604082018483526020604081850152818551808452606086019150828701935060005b8181101561377b5784518352938301939183019160010161375f565b509097965050505050505056fea2646970667358221220926f1dc87ff356f1ea87cfcefe59f0b53e9f22d17594dfdf3203a61c43ef1c2e64736f6c63430008130033";

type UpgradeSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UpgradeSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UpgradeSystem__factory extends ContractFactory {
  constructor(...args: UpgradeSystemConstructorParams) {
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
  ): Promise<UpgradeSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<UpgradeSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): UpgradeSystem {
    return super.attach(address) as UpgradeSystem;
  }
  override connect(signer: Signer): UpgradeSystem__factory {
    return super.connect(signer) as UpgradeSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UpgradeSystemInterface {
    return new utils.Interface(_abi) as UpgradeSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UpgradeSystem {
    return new Contract(address, _abi, signerOrProvider) as UpgradeSystem;
  }
}
