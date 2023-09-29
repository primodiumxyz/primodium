/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  BattleDefenderComponent,
  BattleDefenderComponentInterface,
} from "../BattleDefenderComponent";

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
            name: "participantEntity",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "unitTypes",
            type: "uint256[]",
          },
          {
            internalType: "uint32[]",
            name: "unitLevels",
            type: "uint32[]",
          },
          {
            internalType: "uint32[]",
            name: "unitCounts",
            type: "uint32[]",
          },
        ],
        internalType: "struct BattleParticipant",
        name: "result",
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
            name: "participantEntity",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "unitTypes",
            type: "uint256[]",
          },
          {
            internalType: "uint32[]",
            name: "unitLevels",
            type: "uint32[]",
          },
          {
            internalType: "uint32[]",
            name: "unitCounts",
            type: "uint32[]",
          },
        ],
        internalType: "struct BattleParticipant",
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
        components: [
          {
            internalType: "uint256",
            name: "participantEntity",
            type: "uint256",
          },
          {
            internalType: "uint256[]",
            name: "unitTypes",
            type: "uint256[]",
          },
          {
            internalType: "uint32[]",
            name: "unitLevels",
            type: "uint32[]",
          },
          {
            internalType: "uint32[]",
            name: "unitCounts",
            type: "uint32[]",
          },
        ],
        internalType: "struct BattleParticipant",
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
        internalType: "uint256",
        name: "participantEntity",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "unitTypes",
        type: "uint256[]",
      },
      {
        internalType: "uint32[]",
        name: "unitLevels",
        type: "uint32[]",
      },
      {
        internalType: "uint32[]",
        name: "unitCounts",
        type: "uint32[]",
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
  "0x60806040523480156200001157600080fd5b5060405162002e3d38038062002e3d833981016040819052620000349162000266565b807ff9768ca34b9927c41f0ddbd0cce635ef12f645937c14ca934428e6a9c05e48da8181818162000065336200012b565b60028190556001600160a01b038216156200008557620000858262000194565b505060405162000095906200024a565b604051809103906000f080158015620000b2573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000e19062000258565b604051809103906000f080158015620000fe573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b039290921691909117905550620002989350505050565b60008051602062002e1d83398151915280546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60008051602062002e1d833981519152546001600160a01b03163314620001ce57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200022e57600080fd5b505af115801562000243573d6000803e3d6000fd5b5050505050565b6106c9806200204983390190565b61070b806200271283390190565b6000602082840312156200027957600080fd5b81516001600160a01b03811681146200029157600080fd5b9392505050565b611da180620002a86000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c80638b282947116100ad578063b361be4611610071578063b361be461461028c578063b8bc073d1461029f578063bf4fe57e146102bf578063cccf7a8e146102d2578063f2fde38b146102e557600080fd5b80638b282947146102345780638da5cb5b146102475780639161c2671461024f5780639d2c76b414610262578063af640d0f1461027557600080fd5b80635af59b85116100f45780635af59b85146101c25780636b122fe0146101d557806375c0669c146101eb578063861eb905146101fe5780638afaffec1461022157600080fd5b80630ff4c9161461013157806330b67baa1461015a57806331b933b9146101855780634cc822151461019a5780634fef6a38146101af575b600080fd5b61014461013f3660046111a3565b6102f8565b60405161015191906111fd565b60405180910390f35b60005461016d906001600160a01b031681565b6040516001600160a01b039091168152602001610151565b61018d61036d565b60405161015191906112c3565b6101ad6101a83660046111a3565b6103e4565b005b6101ad6101bd3660046112dd565b610416565b6101ad6101d036600461131e565b610492565b6101dd6104ed565b6040516101519291906113c0565b6101ad6101f93660046112dd565b610760565b61021161020c3660046112dd565b6107d8565b6040519015158152602001610151565b61018d61022f366004611479565b61083c565b6101ad61024236600461156a565b610866565b61016d610896565b6101ad61025d36600461164f565b6108a0565b6101ad6102703660046112dd565b6108c2565b61027e60025481565b604051908152602001610151565b61018d61029a366004611741565b61096f565b6102b26102ad3660046111a3565b6109e8565b6040516101519190611775565b6101ad6102cd3660046112dd565b610a8a565b6102116102e03660046111a3565b610b03565b6101ad6102f33660046112dd565b610b71565b6103236040518060800160405280600081526020016060815260200160608152602001606081525090565b600080600080610332866109e8565b8060200190518101906103459190611847565b6040805160808101825294855260208501939093529183015260608201529695505050505050565b60035460408051631043567360e21b815290516060926001600160a01b03169163410d59cc9160048083019260009291908290030181865afa1580156103b7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103df91908101906118d8565b905090565b6103ed336107d8565b61040a5760405163203769ed60e11b815260040160405180910390fd5b61041381610bb3565b50565b61041e610ddc565b6001600160a01b0316336001600160a01b03161461044f57604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19166001179055565b6104e98282356104a5602085018561190c565b6104b2604087018761190c565b6104bf606089018961190c565b6040516020016104d597969594939291906119c9565b604051602081830303815290604052610866565b5050565b60408051600480825260a08201909252606091829190816020015b606081526020019060019003908161050857505060408051600480825260a0820190925291935060208201608080368337019050509050604051806040016040528060118152602001707061727469636970616e74456e7469747960781b8152508260008151811061057c5761057c611a19565b6020026020010181905250600d8160008151811061059c5761059c611a19565b602002602001019060218111156105b5576105b56113aa565b908160218111156105c8576105c86113aa565b8152505060405180604001604052806009815260200168756e6974547970657360b81b8152508260018151811061060157610601611a19565b6020026020010181905250601f8160018151811061062157610621611a19565b6020026020010190602181111561063a5761063a6113aa565b9081602181111561064d5761064d6113aa565b815250506040518060400160405280600a815260200169756e69744c6576656c7360b01b8152508260028151811061068757610687611a19565b6020026020010181905250601c816002815181106106a7576106a7611a19565b602002602001019060218111156106c0576106c06113aa565b908160218111156106d3576106d36113aa565b815250506040518060400160405280600a815260200169756e6974436f756e747360b01b8152508260038151811061070d5761070d611a19565b6020026020010181905250601c8160038151811061072d5761072d611a19565b60200260200101906021811115610746576107466113aa565b90816021811115610759576107596113aa565b9052509091565b610769336107d8565b6107865760405163203769ed60e11b815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff16806108365750610821610896565b6001600160a01b0316826001600160a01b0316145b92915050565b6060610836826040516020016108529190611a77565b60405160208183030381529060405261096f565b61086f336107d8565b61088c5760405163203769ed60e11b815260040160405180910390fd5b6104e98282610e0a565b60006103df610ddc565b6108bb85858585856040516020016104d59493929190611af7565b5050505050565b6108ca610ddc565b6001600160a01b0316336001600160a01b0316146108fb57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f3034770906044015b600060405180830381600087803b15801561095b57600080fd5b505af11580156108bb573d6000803e3d6000fd5b6004805482516020840120604051631e5b17a560e21b8152928301526060916001600160a01b039091169063796c5e9490602401600060405180830381865afa1580156109c0573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261083691908101906118d8565b6000818152600160205260409020805460609190610a0590611b41565b80601f0160208091040260200160405190810160405280929190818152602001828054610a3190611b41565b8015610a7e5780601f10610a5357610100808354040283529160200191610a7e565b820191906000526020600020905b815481529060010190602001808311610a6157829003601f168201915b50505050509050919050565b610a92610ddc565b6001600160a01b0316336001600160a01b031614610ac357604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19169055565b600354604051636667bd4760e11b8152600481018390526000916001600160a01b03169063cccf7a8e90602401602060405180830381865afa158015610b4d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108369190611b75565b610b79610ddc565b6001600160a01b0316336001600160a01b031614610baa57604051632f7a8ee160e01b815260040160405180910390fd5b61041381611009565b6004546000828152600160205260409081902090516001600160a01b03909216916385edea1391610be391611b97565b60405190819003812060e083901b6001600160e01b03191682526004820152602401602060405180830381865afa158015610c22573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c469190611c0d565b600003610c505750565b6004546000828152600160205260409081902090516001600160a01b0390921691636526db7a91610c8091611b97565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101849052604401600060405180830381600087803b158015610cc357600080fd5b505af1158015610cd7573d6000803e3d6000fd5b5050600354604051634cc8221560e01b8152600481018590526001600160a01b039091169250634cc822159150602401600060405180830381600087803b158015610d2157600080fd5b505af1158015610d35573d6000803e3d6000fd5b50505050610d4281611012565b60005b6005548110156104e95760058181548110610d6257610d62611a19565b600091825260209091200154604051634cc8221560e01b8152600481018490526001600160a01b0390911690634cc8221590602401600060405180830381600087803b158015610db157600080fd5b505af1158015610dc5573d6000803e3d6000fd5b505050508080610dd490611c26565b915050610d45565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b600354604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b158015610e5057600080fd5b505af1158015610e64573d6000803e3d6000fd5b50506004546000858152600160205260409081902090516001600160a01b039092169350636526db7a9250610e9891611b97565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101859052604401600060405180830381600087803b158015610edb57600080fd5b505af1158015610eef573d6000803e3d6000fd5b5050600480548451602086012060405163771602f760e01b815292830152602482018690526001600160a01b0316925063771602f79150604401600060405180830381600087803b158015610f4357600080fd5b505af1158015610f57573d6000803e3d6000fd5b50505050610f65828261105a565b60005b6005548110156110045760058181548110610f8557610f85611a19565b6000918252602090912001546040516242d70760e31b81526001600160a01b0390911690630216b83890610fbf9086908690600401611c4d565b600060405180830381600087803b158015610fd957600080fd5b505af1158015610fed573d6000803e3d6000fd5b505050508080610ffc90611c26565b915050610f68565b505050565b610413816110db565b600081815260016020526040812061102991611155565b600054604051630de3b7b560e01b8152600481018390526001600160a01b0390911690630de3b7b590602401610941565b60008281526001602052604090206110728282611cac565b5060005460405163cfd3c57f60e01b81526001600160a01b039091169063cfd3c57f906110a59085908590600401611c4d565b600060405180830381600087803b1580156110bf57600080fd5b505af11580156110d3573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b50805461116190611b41565b6000825580601f10611171575050565b601f01602090049060005260206000209081019061041391905b8082111561119f576000815560010161118b565b5090565b6000602082840312156111b557600080fd5b5035919050565b600081518084526020808501945080840160005b838110156111f257815163ffffffff16875295820195908201906001016111d0565b509495945050505050565b60208082528251828201528281015160806040840152805160a0840181905260009291820190839060c08601905b8083101561124b578351825292840192600192909201919084019061122b565b5060408701519350601f1992508286820301606087015261126c81856111bc565b9350505060608501518185840301608086015261128983826111bc565b9695505050505050565b600081518084526020808501945080840160005b838110156111f2578151875295820195908201906001016112a7565b6020815260006112d66020830184611293565b9392505050565b6000602082840312156112ef57600080fd5b81356001600160a01b03811681146112d657600080fd5b60006080828403121561131857600080fd5b50919050565b6000806040838503121561133157600080fd5b8235915060208301356001600160401b0381111561134e57600080fd5b61135a85828601611306565b9150509250929050565b6000815180845260005b8181101561138a5760208185018101518683018201520161136e565b506000602082860101526020601f19601f83011685010191505092915050565b634e487b7160e01b600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b8381101561141757605f19888703018552611405868351611364565b955093820193908201906001016113e9565b50508584038187015286518085528782019482019350915060005b8281101561146c5784516022811061145a57634e487b7160e01b600052602160045260246000fd5b84529381019392810192600101611432565b5091979650505050505050565b60006020828403121561148b57600080fd5b81356001600160401b038111156114a157600080fd5b6114ad84828501611306565b949350505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f191681016001600160401b03811182821017156114f3576114f36114b5565b604052919050565b600082601f83011261150c57600080fd5b81356001600160401b03811115611525576115256114b5565b611538601f8201601f19166020016114cb565b81815284602083860101111561154d57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561157d57600080fd5b8235915060208301356001600160401b0381111561159a57600080fd5b61135a858286016114fb565b60006001600160401b038211156115bf576115bf6114b5565b5060051b60200190565b63ffffffff8116811461041357600080fd5b600082601f8301126115ec57600080fd5b813560206116016115fc836115a6565b6114cb565b82815260059290921b8401810191818101908684111561162057600080fd5b8286015b84811015611644578035611637816115c9565b8352918301918301611624565b509695505050505050565b600080600080600060a0868803121561166757600080fd5b85359450602080870135945060408701356001600160401b038082111561168d57600080fd5b818901915089601f8301126116a157600080fd5b81356116af6115fc826115a6565b81815260059190911b8301840190848101908c8311156116ce57600080fd5b938501935b828510156116ec578435825293850193908501906116d3565b97505050606089013592508083111561170457600080fd5b6117108a848b016115db565b9450608089013592508083111561172657600080fd5b5050611734888289016115db565b9150509295509295909350565b60006020828403121561175357600080fd5b81356001600160401b0381111561176957600080fd5b6114ad848285016114fb565b6020815260006112d66020830184611364565b600082601f83011261179957600080fd5b815160206117a96115fc836115a6565b82815260059290921b840181019181810190868411156117c857600080fd5b8286015b8481101561164457805183529183019183016117cc565b600082601f8301126117f457600080fd5b815160206118046115fc836115a6565b82815260059290921b8401810191818101908684111561182357600080fd5b8286015b8481101561164457805161183a816115c9565b8352918301918301611827565b6000806000806080858703121561185d57600080fd5b8451935060208501516001600160401b038082111561187b57600080fd5b61188788838901611788565b9450604087015191508082111561189d57600080fd5b6118a9888389016117e3565b935060608701519150808211156118bf57600080fd5b506118cc878288016117e3565b91505092959194509250565b6000602082840312156118ea57600080fd5b81516001600160401b0381111561190057600080fd5b6114ad84828501611788565b6000808335601e1984360301811261192357600080fd5b8301803591506001600160401b0382111561193d57600080fd5b6020019150600581901b360382131561195557600080fd5b9250929050565b81835260006001600160fb1b0383111561197557600080fd5b8260051b80836020870137939093016020019392505050565b8183526000602080850194508260005b858110156111f25781356119b1816115c9565b63ffffffff168752958201959082019060010161199e565b8781526080602082015260006119e360808301888a61195c565b82810360408401526119f681878961198e565b90508281036060840152611a0b81858761198e565b9a9950505050505050505050565b634e487b7160e01b600052603260045260246000fd5b6000808335601e19843603018112611a4657600080fd5b83016020810192503590506001600160401b03811115611a6557600080fd5b8060051b360382131561195557600080fd5b60208152813560208201526000611a916020840184611a2f565b60806040850152611aa660a08501828461195c565b915050611ab66040850185611a2f565b601f1980868503016060870152611ace84838561198e565b9350611add6060880188611a2f565b93509150808685030160808701525061128983838361198e565b848152608060208201526000611b106080830186611293565b8281036040840152611b2281866111bc565b90508281036060840152611b3681856111bc565b979650505050505050565b600181811c90821680611b5557607f821691505b60208210810361131857634e487b7160e01b600052602260045260246000fd5b600060208284031215611b8757600080fd5b815180151581146112d657600080fd5b6000808354611ba581611b41565b60018281168015611bbd5760018114611bd257611c01565b60ff1984168752821515830287019450611c01565b8760005260208060002060005b85811015611bf85781548a820152908401908201611bdf565b50505082870194505b50929695505050505050565b600060208284031215611c1f57600080fd5b5051919050565b600060018201611c4657634e487b7160e01b600052601160045260246000fd5b5060010190565b8281526040602082015260006114ad6040830184611364565b601f82111561100457600081815260208120601f850160051c81016020861015611c8d5750805b601f850160051c820191505b818110156110d357828155600101611c99565b81516001600160401b03811115611cc557611cc56114b5565b611cd981611cd38454611b41565b84611c66565b602080601f831160018114611d0e5760008415611cf65750858301515b600019600386901b1c1916600185901b1785556110d3565b600085815260208120601f198616915b82811015611d3d57888601518255948401946001909101908401611d1e565b5085821015611d5b5787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea26469706673582212206f94a83415f486148c7c5bed9e101564c11182f96f224677d8d4ea9aa6afda8464736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610621806100a86000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e1146100f3578063949d225d1461011d578063cccf7a8e1461012e578063f2fde38b1461015157600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461050b565b610164565b005b6100aa6101ef565b6040516100b79190610524565b60405180910390f35b6100a06100ce36600461050b565b610247565b6100db610374565b6040516001600160a01b0390911681526020016100b7565b61010661010136600461050b565b610383565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014161013c36600461050b565b6103b6565b60405190151581526020016100b7565b6100a061015f366004610568565b610419565b61016c61045b565b6001600160a01b0316336001600160a01b03161461019d57604051632f7a8ee160e01b815260040160405180910390fd5b6101a6816103b6565b6101ec57600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561023d57602002820191906000526020600020905b815481526020019060010190808311610229575b5050505050905090565b61024f61045b565b6001600160a01b0316336001600160a01b03161461028057604051632f7a8ee160e01b815260040160405180910390fd5b610289816103b6565b156101ec576000805461029e90600190610598565b815481106102ae576102ae6105bf565b906000526020600020015460006001600084815260200190815260200160002054815481106102df576102df6105bf565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610316576103166105bf565b90600052602060002001548152602001908152602001600020819055506001600082815260200190815260200160002060009055600080548061035b5761035b6105d5565b6001900381819060005260206000200160009055905550565b600061037e61045b565b905090565b60008061038f836103b6565b61039e57506000928392509050565b50506000908152600160208190526040909120549091565b6000805481036103c857506000919050565b60008281526001602052604081205490036104045781600080815481106103f1576103f16105bf565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b61042161045b565b6001600160a01b0316336001600160a01b03161461045257604051632f7a8ee160e01b815260040160405180910390fd5b6101ec81610489565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516101ec92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121561051d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561055c57835183529284019291840191600101610540565b50909695505050505050565b60006020828403121561057a57600080fd5b81356001600160a01b038116811461059157600080fd5b9392505050565b818103818111156105b957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea2646970667358221220e26b625121584afbfcdd5a7c76a89bd07c2a082781c4635c0fc11c4dffdf9aed64736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610663806100a86000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff814610121578063f2fde38b1461014457600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610531565b610157565b005b6100956100a5366004610531565b6102bd565b6100bd6100b8366004610553565b61033a565b6040516100ca919061056c565b60405180910390f35b6100f36100e1366004610553565b60009081526020819052604090205490565b6040519081526020016100ca565b61010961039a565b6040516001600160a01b0390911681526020016100ca565b61013461012f366004610531565b6103a9565b60405190151581526020016100ca565b6100956101523660046105b0565b61043c565b61015f610481565b6001600160a01b0316336001600160a01b03161461019057604051632f7a8ee160e01b815260040160405180910390fd5b61019a82826103a9565b156102b957600082815260208190526040902080546101bb906001906105e0565b815481106101cb576101cb610601565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061020557610205610601565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061025357610253610601565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102a2576102a2610617565b600190038181906000526020600020016000905590555b5050565b6102c5610481565b6001600160a01b0316336001600160a01b0316146102f657604051632f7a8ee160e01b815260040160405180910390fd5b61030082826103a9565b6102b95760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561038e57602002820191906000526020600020905b81548152602001906001019080831161037a575b50505050509050919050565b60006103a4610481565b905090565b60008281526020819052604081205481036103c657506000610436565b60008381526001602090815260408083208584529091528120549003610418576000838152602081905260408120805484929061040557610405610601565b9060005260206000200154149050610436565b50600082815260016020908152604080832084845290915290205415155b92915050565b610444610481565b6001600160a01b0316336001600160a01b03161461047557604051632f7a8ee160e01b815260040160405180910390fd5b61047e816104af565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161047e92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000806040838503121561054457600080fd5b50508035926020909101359150565b60006020828403121561056557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156105a457835183529284019291840191600101610588565b50909695505050505050565b6000602082840312156105c257600080fd5b81356001600160a01b03811681146105d957600080fd5b9392505050565b8181038181111561043657634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea264697066735822122074d2dbc3f020a29d6081fb9fcf69e8e3c85026be8658abafc11ba431c108e33464736f6c634300081300338a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460";

type BattleDefenderComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: BattleDefenderComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class BattleDefenderComponent__factory extends ContractFactory {
  constructor(...args: BattleDefenderComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<BattleDefenderComponent> {
    return super.deploy(
      world,
      overrides || {}
    ) as Promise<BattleDefenderComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): BattleDefenderComponent {
    return super.attach(address) as BattleDefenderComponent;
  }
  override connect(signer: Signer): BattleDefenderComponent__factory {
    return super.connect(signer) as BattleDefenderComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BattleDefenderComponentInterface {
    return new utils.Interface(_abi) as BattleDefenderComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): BattleDefenderComponent {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as BattleDefenderComponent;
  }
}
