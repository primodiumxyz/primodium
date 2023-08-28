/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  P_UnitLevelUpgradeComponent,
  P_UnitLevelUpgradeComponentInterface,
} from "../P_UnitLevelUpgradeComponent";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "world",
        type: "address",
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
        components: [
          {
            internalType: "uint256",
            name: "resource",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "value",
            type: "uint32",
          },
        ],
        internalType: "struct ResourceValue",
        name: "resourceValue",
        type: "tuple",
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
        components: [
          {
            internalType: "uint256",
            name: "resource",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "value",
            type: "uint32",
          },
        ],
        internalType: "struct ResourceValue",
        name: "",
        type: "tuple",
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
        components: [
          {
            internalType: "uint256",
            name: "resource",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "value",
            type: "uint32",
          },
        ],
        internalType: "struct ResourceValue",
        name: "value",
        type: "tuple",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200278e3803806200278e833981016040819052620000349162000262565b807f576e16b28e9293926ea839c1404780b4ddce7af1648ccf2ae2d704a6733ba4668181620000633362000127565b60028190556001600160a01b038216156200008357620000838262000190565b5050604051620000939062000246565b604051809103906000f080158015620000b0573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000df9062000254565b604051809103906000f080158015620000fc573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b03929092169190911790555062000294915050565b6000805160206200276e83398151915280546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000805160206200276e833981519152546001600160a01b03163314620001ca57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200022a57600080fd5b505af11580156200023f573d6000803e3d6000fd5b5050505050565b6106c9806200199a83390190565b61070b806200206383390190565b6000602082840312156200027557600080fd5b81516001600160a01b03811681146200028d57600080fd5b9392505050565b6116f680620002a46000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80638b282947116100ad578063b361be4611610071578063b361be461461027e578063b8bc073d14610291578063bf4fe57e146102b1578063cccf7a8e146102c4578063f2fde38b146102d757600080fd5b80638b282947146102265780638da5cb5b1461023957806395699b37146102415780639d2c76b414610254578063af640d0f1461026757600080fd5b80634fef6a38116100f45780634fef6a38146101b45780636b122fe0146101c7578063719a36f1146101dd57806375c0669c146101f0578063861eb9051461020357600080fd5b80630ff4c9161461012657806330b67baa1461015f57806331b933b91461018a5780634cc822151461019f575b600080fd5b61013961013436600461101d565b6102ea565b604080518251815260209283015163ffffffff1692810192909252015b60405180910390f35b600054610172906001600160a01b031681565b6040516001600160a01b039091168152602001610156565b61019261033d565b6040516101569190611036565b6101b26101ad36600461101d565b6103b4565b005b6101b26101c236600461107a565b6103e6565b6101cf610462565b604051610156929190611106565b6101926101eb3660046111d7565b6105c3565b6101b26101fe36600461107a565b6105f3565b61021661021136600461107a565b61066b565b6040519015158152602001610156565b6101b26102343660046112aa565b6106ce565b610172610702565b6101b261024f3660046112f1565b61070c565b6101b261026236600461107a565b610735565b61027060025481565b604051908152602001610156565b61019261028c36600461131e565b6107e9565b6102a461029f36600461101d565b610862565b604051610156919061135b565b6101b26102bf36600461107a565b610904565b6102166102d236600461101d565b61097d565b6101b26102e536600461107a565b6109eb565b604080518082019091526000808252602082015260008061030a84610862565b80602001905181019061031d9190611380565b6040805180820190915291825263ffffffff166020820152949350505050565b60035460408051631043567360e21b815290516060926001600160a01b03169163410d59cc9160048083019260009291908290030181865afa158015610387573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103af91908101906113b0565b905090565b6103bd3361066b565b6103da5760405163203769ed60e11b815260040160405180910390fd5b6103e381610a2d565b50565b6103ee610c56565b6001600160a01b0316336001600160a01b03161461041f57604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19166001179055565b6040805160028082526060828101909352829190816020015b606081526020019060019003908161047b575050604080516002808252606082018352929450919060208301908036833701905050905060405180604001604052806008815260200167556e69745479706560c01b815250826000815181106104e6576104e6611456565b6020026020010181905250600d8160008151811061050657610506611456565b6020026020010190602181111561051f5761051f6110f0565b90816021811115610532576105326110f0565b815250506040518060400160405280600e81526020016d155c19dc985919551bd3195d995b60921b8152508260018151811061057057610570611456565b6020026020010181905250600a8160018151811061059057610590611456565b602002602001019060218111156105a9576105a96110f0565b908160218111156105bc576105bc6110f0565b9052509091565b60606105ed826040516020016105d9919061146c565b6040516020818303038152906040526107e9565b92915050565b6105fc3361066b565b6106195760405163203769ed60e11b815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff16806105ed57506106b4610702565b6001600160a01b0316826001600160a01b03161492915050565b6106d73361066b565b6106f45760405163203769ed60e11b815260040160405180910390fd5b6106fe8282610c84565b5050565b60006103af610c56565b6106fe8282604051602001610721919061146c565b6040516020818303038152906040526106ce565b61073d610c56565b6001600160a01b0316336001600160a01b03161461076e57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156107ce57600080fd5b505af11580156107e2573d6000803e3d6000fd5b5050505050565b6004805482516020840120604051631e5b17a560e21b8152928301526060916001600160a01b039091169063796c5e9490602401600060405180830381865afa15801561083a573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105ed91908101906113b0565b600081815260016020526040902080546060919061087f90611495565b80601f01602080910402602001604051908101604052809291908181526020018280546108ab90611495565b80156108f85780601f106108cd576101008083540402835291602001916108f8565b820191906000526020600020905b8154815290600101906020018083116108db57829003601f168201915b50505050509050919050565b61090c610c56565b6001600160a01b0316336001600160a01b03161461093d57604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19169055565b600354604051636667bd4760e11b8152600481018390526000916001600160a01b03169063cccf7a8e90602401602060405180830381865afa1580156109c7573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ed91906114c9565b6109f3610c56565b6001600160a01b0316336001600160a01b031614610a2457604051632f7a8ee160e01b815260040160405180910390fd5b6103e381610e83565b6004546000828152600160205260409081902090516001600160a01b03909216916385edea1391610a5d916114eb565b60405190819003812060e083901b6001600160e01b03191682526004820152602401602060405180830381865afa158015610a9c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac09190611561565b600003610aca5750565b6004546000828152600160205260409081902090516001600160a01b0390921691636526db7a91610afa916114eb565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101849052604401600060405180830381600087803b158015610b3d57600080fd5b505af1158015610b51573d6000803e3d6000fd5b5050600354604051634cc8221560e01b8152600481018590526001600160a01b039091169250634cc822159150602401600060405180830381600087803b158015610b9b57600080fd5b505af1158015610baf573d6000803e3d6000fd5b50505050610bbc81610e8c565b60005b6005548110156106fe5760058181548110610bdc57610bdc611456565b600091825260209091200154604051634cc8221560e01b8152600481018490526001600160a01b0390911690634cc8221590602401600060405180830381600087803b158015610c2b57600080fd5b505af1158015610c3f573d6000803e3d6000fd5b505050508080610c4e9061157a565b915050610bbf565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b600354604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b158015610cca57600080fd5b505af1158015610cde573d6000803e3d6000fd5b50506004546000858152600160205260409081902090516001600160a01b039092169350636526db7a9250610d12916114eb565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101859052604401600060405180830381600087803b158015610d5557600080fd5b505af1158015610d69573d6000803e3d6000fd5b5050600480548451602086012060405163771602f760e01b815292830152602482018690526001600160a01b0316925063771602f79150604401600060405180830381600087803b158015610dbd57600080fd5b505af1158015610dd1573d6000803e3d6000fd5b50505050610ddf8282610ed4565b60005b600554811015610e7e5760058181548110610dff57610dff611456565b6000918252602090912001546040516242d70760e31b81526001600160a01b0390911690630216b83890610e3990869086906004016115a1565b600060405180830381600087803b158015610e5357600080fd5b505af1158015610e67573d6000803e3d6000fd5b505050508080610e769061157a565b915050610de2565b505050565b6103e381610f55565b6000818152600160205260408120610ea391610fcf565b600054604051630de3b7b560e01b8152600481018390526001600160a01b0390911690630de3b7b5906024016107b4565b6000828152600160205260409020610eec8282611600565b5060005460405163cfd3c57f60e01b81526001600160a01b039091169063cfd3c57f90610f1f90859085906004016115a1565b600060405180830381600087803b158015610f3957600080fd5b505af1158015610f4d573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b508054610fdb90611495565b6000825580601f10610feb575050565b601f0160209004906000526020600020908101906103e391905b808211156110195760008155600101611005565b5090565b60006020828403121561102f57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561106e57835183529284019291840191600101611052565b50909695505050505050565b60006020828403121561108c57600080fd5b81356001600160a01b03811681146110a357600080fd5b9392505050565b6000815180845260005b818110156110d0576020818501810151868301820152016110b4565b506000602082860101526020601f19601f83011685010191505092915050565b634e487b7160e01b600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b8381101561115d57605f1988870301855261114b8683516110aa565b9550938201939082019060010161112f565b50508584038187015286518085528782019482019350915060005b828110156111b2578451602281106111a057634e487b7160e01b600052602160045260246000fd5b84529381019392810192600101611178565b5091979650505050505050565b6000604082840312156111d157600080fd5b50919050565b6000604082840312156111e957600080fd5b6110a383836111bf565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611232576112326111f3565b604052919050565b600082601f83011261124b57600080fd5b813567ffffffffffffffff811115611265576112656111f3565b611278601f8201601f1916602001611209565b81815284602083860101111561128d57600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156112bd57600080fd5b82359150602083013567ffffffffffffffff8111156112db57600080fd5b6112e78582860161123a565b9150509250929050565b6000806060838503121561130457600080fd5b8235915061131584602085016111bf565b90509250929050565b60006020828403121561133057600080fd5b813567ffffffffffffffff81111561134757600080fd5b6113538482850161123a565b949350505050565b6020815260006110a360208301846110aa565b63ffffffff811681146103e357600080fd5b6000806040838503121561139357600080fd5b8251915060208301516113a58161136e565b809150509250929050565b600060208083850312156113c357600080fd5b825167ffffffffffffffff808211156113db57600080fd5b818501915085601f8301126113ef57600080fd5b815181811115611401576114016111f3565b8060051b9150611412848301611209565b818152918301840191848101908884111561142c57600080fd5b938501935b8385101561144a57845182529385019390850190611431565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b813581526040810160208301356114828161136e565b63ffffffff811660208401525092915050565b600181811c908216806114a957607f821691505b6020821081036111d157634e487b7160e01b600052602260045260246000fd5b6000602082840312156114db57600080fd5b815180151581146110a357600080fd5b60008083546114f981611495565b60018281168015611511576001811461152657611555565b60ff1984168752821515830287019450611555565b8760005260208060002060005b8581101561154c5781548a820152908401908201611533565b50505082870194505b50929695505050505050565b60006020828403121561157357600080fd5b5051919050565b60006001820161159a57634e487b7160e01b600052601160045260246000fd5b5060010190565b82815260406020820152600061135360408301846110aa565b601f821115610e7e57600081815260208120601f850160051c810160208610156115e15750805b601f850160051c820191505b81811015610f4d578281556001016115ed565b815167ffffffffffffffff81111561161a5761161a6111f3565b61162e816116288454611495565b846115ba565b602080601f831160018114611663576000841561164b5750858301515b600019600386901b1c1916600185901b178555610f4d565b600085815260208120601f198616915b8281101561169257888601518255948401946001909101908401611673565b50858210156116b05787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220cc550f07caafe6e0edd42fb72017c93f0083aee6770f8b86ef5e03f8bad5c6df64736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610621806100a86000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e1146100f3578063949d225d1461011d578063cccf7a8e1461012e578063f2fde38b1461015157600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461050b565b610164565b005b6100aa6101ef565b6040516100b79190610524565b60405180910390f35b6100a06100ce36600461050b565b610247565b6100db610374565b6040516001600160a01b0390911681526020016100b7565b61010661010136600461050b565b610383565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014161013c36600461050b565b6103b6565b60405190151581526020016100b7565b6100a061015f366004610568565b610419565b61016c61045b565b6001600160a01b0316336001600160a01b03161461019d57604051632f7a8ee160e01b815260040160405180910390fd5b6101a6816103b6565b6101ec57600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561023d57602002820191906000526020600020905b815481526020019060010190808311610229575b5050505050905090565b61024f61045b565b6001600160a01b0316336001600160a01b03161461028057604051632f7a8ee160e01b815260040160405180910390fd5b610289816103b6565b156101ec576000805461029e90600190610598565b815481106102ae576102ae6105bf565b906000526020600020015460006001600084815260200190815260200160002054815481106102df576102df6105bf565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610316576103166105bf565b90600052602060002001548152602001908152602001600020819055506001600082815260200190815260200160002060009055600080548061035b5761035b6105d5565b6001900381819060005260206000200160009055905550565b600061037e61045b565b905090565b60008061038f836103b6565b61039e57506000928392509050565b50506000908152600160208190526040909120549091565b6000805481036103c857506000919050565b60008281526001602052604081205490036104045781600080815481106103f1576103f16105bf565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b61042161045b565b6001600160a01b0316336001600160a01b03161461045257604051632f7a8ee160e01b815260040160405180910390fd5b6101ec81610489565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516101ec92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121561051d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561055c57835183529284019291840191600101610540565b50909695505050505050565b60006020828403121561057a57600080fd5b81356001600160a01b038116811461059157600080fd5b9392505050565b818103818111156105b957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212209120bb0a2a9936c2c457117a2d6e08d1b5892ce4c2794940e794c00e17bf899964736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610663806100a86000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff814610121578063f2fde38b1461014457600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610531565b610157565b005b6100956100a5366004610531565b6102bd565b6100bd6100b8366004610553565b61033a565b6040516100ca919061056c565b60405180910390f35b6100f36100e1366004610553565b60009081526020819052604090205490565b6040519081526020016100ca565b61010961039a565b6040516001600160a01b0390911681526020016100ca565b61013461012f366004610531565b6103a9565b60405190151581526020016100ca565b6100956101523660046105b0565b61043c565b61015f610481565b6001600160a01b0316336001600160a01b03161461019057604051632f7a8ee160e01b815260040160405180910390fd5b61019a82826103a9565b156102b957600082815260208190526040902080546101bb906001906105e0565b815481106101cb576101cb610601565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061020557610205610601565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061025357610253610601565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102a2576102a2610617565b600190038181906000526020600020016000905590555b5050565b6102c5610481565b6001600160a01b0316336001600160a01b0316146102f657604051632f7a8ee160e01b815260040160405180910390fd5b61030082826103a9565b6102b95760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561038e57602002820191906000526020600020905b81548152602001906001019080831161037a575b50505050509050919050565b60006103a4610481565b905090565b60008281526020819052604081205481036103c657506000610436565b60008381526001602090815260408083208584529091528120549003610418576000838152602081905260408120805484929061040557610405610601565b9060005260206000200154149050610436565b50600082815260016020908152604080832084845290915290205415155b92915050565b610444610481565b6001600160a01b0316336001600160a01b03161461047557604051632f7a8ee160e01b815260040160405180910390fd5b61047e816104af565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161047e92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000806040838503121561054457600080fd5b50508035926020909101359150565b60006020828403121561056557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156105a457835183529284019291840191600101610588565b50909695505050505050565b6000602082840312156105c257600080fd5b81356001600160a01b03811681146105d957600080fd5b9392505050565b8181038181111561043657634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212204fe0e51f850fe860844b3ef4690dbe2f4106d195a4c983b0ea09e2b1f7ab027564736f6c634300081300338a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460";

type P_UnitLevelUpgradeComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: P_UnitLevelUpgradeComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class P_UnitLevelUpgradeComponent__factory extends ContractFactory {
  constructor(...args: P_UnitLevelUpgradeComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<P_UnitLevelUpgradeComponent> {
    return super.deploy(
      world,
      overrides || {}
    ) as Promise<P_UnitLevelUpgradeComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): P_UnitLevelUpgradeComponent {
    return super.attach(address) as P_UnitLevelUpgradeComponent;
  }
  override connect(signer: Signer): P_UnitLevelUpgradeComponent__factory {
    return super.connect(signer) as P_UnitLevelUpgradeComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): P_UnitLevelUpgradeComponentInterface {
    return new utils.Interface(_abi) as P_UnitLevelUpgradeComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): P_UnitLevelUpgradeComponent {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as P_UnitLevelUpgradeComponent;
  }
}
