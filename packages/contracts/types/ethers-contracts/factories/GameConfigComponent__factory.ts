/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  GameConfigComponent,
  GameConfigComponentInterface,
} from "../GameConfigComponent";

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
            name: "moveSpeed",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "motherlodeDistance",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxMotherlodesPerAsteroid",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "motherlodeChanceInv",
            type: "uint32",
          },
        ],
        internalType: "struct GameConfig",
        name: "config",
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
            name: "moveSpeed",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "motherlodeDistance",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxMotherlodesPerAsteroid",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "motherlodeChanceInv",
            type: "uint32",
          },
        ],
        internalType: "struct GameConfig",
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
            name: "moveSpeed",
            type: "uint256",
          },
          {
            internalType: "uint32",
            name: "motherlodeDistance",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "maxMotherlodesPerAsteroid",
            type: "uint32",
          },
          {
            internalType: "uint32",
            name: "motherlodeChanceInv",
            type: "uint32",
          },
        ],
        internalType: "struct GameConfig",
        name: "config",
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
  "0x60806040523480156200001157600080fd5b506040516200296238038062002962833981016040819052620000349162000262565b807fee6335467814bca6e120dfa0a8125ce649e003559f84314882ca48e87e9bd3cc8181620000633362000127565b60028190556001600160a01b038216156200008357620000838262000190565b5050604051620000939062000246565b604051809103906000f080158015620000b0573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000df9062000254565b604051809103906000f080158015620000fc573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b03929092169190911790555062000294915050565b6000805160206200294283398151915280546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60008051602062002942833981519152546001600160a01b03163314620001ca57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200022a57600080fd5b505af11580156200023f573d6000803e3d6000fd5b5050505050565b6106c98062001b6e83390190565b61070b806200223783390190565b6000602082840312156200027557600080fd5b81516001600160a01b03811681146200028d57600080fd5b9392505050565b6118ca80620002a46000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c80638da5cb5b116100ad578063b8bc073d11610071578063b8bc073d146102a2578063bf4fe57e146102c2578063cbf71fce146102d5578063cccf7a8e146102e8578063f2fde38b146102fb57600080fd5b80638da5cb5b1461024a5780639d2c76b414610252578063af640d0f14610265578063b20cf44b1461027c578063b361be461461028f57600080fd5b80634fef6a38116100f45780634fef6a38146101d85780636b122fe0146101eb57806375c0669c14610201578063861eb905146102145780638b2829471461023757600080fd5b80630ff4c9161461012657806330b67baa1461018357806331b933b9146101ae5780634cc82215146101c3575b600080fd5b6101396101343660046111ce565b61030e565b60405161017a91908151815260208083015163ffffffff90811691830191909152604080840151821690830152606092830151169181019190915260800190565b60405180910390f35b600054610196906001600160a01b031681565b6040516001600160a01b03909116815260200161017a565b6101b6610389565b60405161017a91906111e7565b6101d66101d13660046111ce565b610400565b005b6101d66101e636600461122b565b610432565b6101f36104ae565b60405161017a9291906112b7565b6101d661020f36600461122b565b61073e565b61022761022236600461122b565b6107b6565b604051901515815260200161017a565b6101d6610245366004611427565b61081a565b61019661084e565b6101d661026036600461122b565b610858565b61026e60025481565b60405190815260200161017a565b6101b661028a366004611486565b61090c565b6101b661029d3660046114a2565b61091a565b6102b56102b03660046111ce565b610993565b60405161017a91906114df565b6101d66102d036600461122b565b610a35565b6101d66102e33660046114f2565b610aae565b6102276102f63660046111ce565b610abb565b6101d661030936600461122b565b610b29565b60408051608081018252600080825260208201819052918101829052606081018290529080808061033e86610993565b8060200190518101906103519190611531565b6040805160808101825263ffffffff958616815293851660208501529184169183019190915290911660608201529695505050505050565b60035460408051631043567360e21b815290516060926001600160a01b03169163410d59cc9160048083019260009291908290030181865afa1580156103d3573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526103fb9190810190611590565b905090565b610409336107b6565b6104265760405163203769ed60e11b815260040160405180910390fd5b61042f81610b6b565b50565b61043a610d94565b6001600160a01b0316336001600160a01b03161461046b57604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19166001179055565b60408051600480825260a08201909252606091829190816020015b60608152602001906001900390816104c957505060408051600480825260a0820190925291935060208201608080368337019050509050604051806040016040528060098152602001681b5bdd9954dc19595960ba1b8152508260008151811061053557610535611636565b6020026020010181905250600a8160008151811061055557610555611636565b6020026020010190602181111561056e5761056e6112a1565b90816021811115610581576105816112a1565b81525050604051806040016040528060128152602001716d6f746865726c6f646544697374616e636560701b815250826001815181106105c3576105c3611636565b6020026020010181905250600a816001815181106105e3576105e3611636565b602002602001019060218111156105fc576105fc6112a1565b9081602181111561060f5761060f6112a1565b815250506040518060400160405280601981526020017f6d61784d6f746865726c6f64657350657241737465726f6964000000000000008152508260028151811061065c5761065c611636565b6020026020010181905250600a8160028151811061067c5761067c611636565b60200260200101906021811115610695576106956112a1565b908160218111156106a8576106a86112a1565b815250506040518060400160405280601381526020017236b7ba3432b93637b232a1b430b731b2a4b73b60691b815250826003815181106106eb576106eb611636565b6020026020010181905250600a8160038151811061070b5761070b611636565b60200260200101906021811115610724576107246112a1565b90816021811115610737576107376112a1565b9052509091565b610747336107b6565b6107645760405163203769ed60e11b815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff168061081457506107ff61084e565b6001600160a01b0316826001600160a01b0316145b92915050565b610823336107b6565b6108405760405163203769ed60e11b815260040160405180910390fd5b61084a8282610dc2565b5050565b60006103fb610d94565b610860610d94565b6001600160a01b0316336001600160a01b03161461089157604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156108f157600080fd5b505af1158015610905573d6000803e3d6000fd5b5050505050565b606061081461029d83610fc1565b6004805482516020840120604051631e5b17a560e21b8152928301526060916001600160a01b039091169063796c5e9490602401600060405180830381865afa15801561096b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526108149190810190611590565b60008181526001602052604090208054606091906109b09061164c565b80601f01602080910402602001604051908101604052809291908181526020018280546109dc9061164c565b8015610a295780601f106109fe57610100808354040283529160200191610a29565b820191906000526020600020905b815481529060010190602001808311610a0c57829003601f168201915b50505050509050919050565b610a3d610d94565b6001600160a01b0316336001600160a01b031614610a6e57604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19169055565b61084a8261024583610fc1565b600354604051636667bd4760e11b8152600481018390526000916001600160a01b03169063cccf7a8e90602401602060405180830381865afa158015610b05573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108149190611680565b610b31610d94565b6001600160a01b0316336001600160a01b031614610b6257604051632f7a8ee160e01b815260040160405180910390fd5b61042f81611034565b6004546000828152600160205260409081902090516001600160a01b03909216916385edea1391610b9b916116a2565b60405190819003812060e083901b6001600160e01b03191682526004820152602401602060405180830381865afa158015610bda573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bfe9190611718565b600003610c085750565b6004546000828152600160205260409081902090516001600160a01b0390921691636526db7a91610c38916116a2565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101849052604401600060405180830381600087803b158015610c7b57600080fd5b505af1158015610c8f573d6000803e3d6000fd5b5050600354604051634cc8221560e01b8152600481018590526001600160a01b039091169250634cc822159150602401600060405180830381600087803b158015610cd957600080fd5b505af1158015610ced573d6000803e3d6000fd5b50505050610cfa8161103d565b60005b60055481101561084a5760058181548110610d1a57610d1a611636565b600091825260209091200154604051634cc8221560e01b8152600481018490526001600160a01b0390911690634cc8221590602401600060405180830381600087803b158015610d6957600080fd5b505af1158015610d7d573d6000803e3d6000fd5b505050508080610d8c90611731565b915050610cfd565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b600354604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b158015610e0857600080fd5b505af1158015610e1c573d6000803e3d6000fd5b50506004546000858152600160205260409081902090516001600160a01b039092169350636526db7a9250610e50916116a2565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101859052604401600060405180830381600087803b158015610e9357600080fd5b505af1158015610ea7573d6000803e3d6000fd5b5050600480548451602086012060405163771602f760e01b815292830152602482018690526001600160a01b0316925063771602f79150604401600060405180830381600087803b158015610efb57600080fd5b505af1158015610f0f573d6000803e3d6000fd5b50505050610f1d8282611085565b60005b600554811015610fbc5760058181548110610f3d57610f3d611636565b6000918252602090912001546040516242d70760e31b81526001600160a01b0390911690630216b83890610f779086908690600401611758565b600060405180830381600087803b158015610f9157600080fd5b505af1158015610fa5573d6000803e3d6000fd5b505050508080610fb490611731565b915050610f20565b505050565b60608135610fd56040840160208501611771565b610fe56060850160408601611771565b610ff56080860160608701611771565b60408051602081019590955263ffffffff93841690850152908216606084015216608082015260a0016040516020818303038152906040529050919050565b61042f81611106565b600081815260016020526040812061105491611180565b600054604051630de3b7b560e01b8152600481018390526001600160a01b0390911690630de3b7b5906024016108d7565b600082815260016020526040902061109d82826117d4565b5060005460405163cfd3c57f60e01b81526001600160a01b039091169063cfd3c57f906110d09085908590600401611758565b600060405180830381600087803b1580156110ea57600080fd5b505af11580156110fe573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b50805461118c9061164c565b6000825580601f1061119c575050565b601f01602090049060005260206000209081019061042f91905b808211156111ca57600081556001016111b6565b5090565b6000602082840312156111e057600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561121f57835183529284019291840191600101611203565b50909695505050505050565b60006020828403121561123d57600080fd5b81356001600160a01b038116811461125457600080fd5b9392505050565b6000815180845260005b8181101561128157602081850181015186830182015201611265565b506000602082860101526020601f19601f83011685010191505092915050565b634e487b7160e01b600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b8381101561130e57605f198887030185526112fc86835161125b565b955093820193908201906001016112e0565b50508584038187015286518085528782019482019350915060005b828110156113635784516022811061135157634e487b7160e01b600052602160045260246000fd5b84529381019392810192600101611329565b5091979650505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff811182821017156113af576113af611370565b604052919050565b600082601f8301126113c857600080fd5b813567ffffffffffffffff8111156113e2576113e2611370565b6113f5601f8201601f1916602001611386565b81815284602083860101111561140a57600080fd5b816020850160208301376000918101602001919091529392505050565b6000806040838503121561143a57600080fd5b82359150602083013567ffffffffffffffff81111561145857600080fd5b611464858286016113b7565b9150509250929050565b60006080828403121561148057600080fd5b50919050565b60006080828403121561149857600080fd5b611254838361146e565b6000602082840312156114b457600080fd5b813567ffffffffffffffff8111156114cb57600080fd5b6114d7848285016113b7565b949350505050565b602081526000611254602083018461125b565b60008060a0838503121561150557600080fd5b82359150611516846020850161146e565b90509250929050565b63ffffffff8116811461042f57600080fd5b6000806000806080858703121561154757600080fd5b84516115528161151f565b60208601519094506115638161151f565b60408601519093506115748161151f565b60608601519092506115858161151f565b939692955090935050565b600060208083850312156115a357600080fd5b825167ffffffffffffffff808211156115bb57600080fd5b818501915085601f8301126115cf57600080fd5b8151818111156115e1576115e1611370565b8060051b91506115f2848301611386565b818152918301840191848101908884111561160c57600080fd5b938501935b8385101561162a57845182529385019390850190611611565b98975050505050505050565b634e487b7160e01b600052603260045260246000fd5b600181811c9082168061166057607f821691505b60208210810361148057634e487b7160e01b600052602260045260246000fd5b60006020828403121561169257600080fd5b8151801515811461125457600080fd5b60008083546116b08161164c565b600182811680156116c857600181146116dd5761170c565b60ff198416875282151583028701945061170c565b8760005260208060002060005b858110156117035781548a8201529084019082016116ea565b50505082870194505b50929695505050505050565b60006020828403121561172a57600080fd5b5051919050565b60006001820161175157634e487b7160e01b600052601160045260246000fd5b5060010190565b8281526040602082015260006114d7604083018461125b565b60006020828403121561178357600080fd5b81356112548161151f565b601f821115610fbc57600081815260208120601f850160051c810160208610156117b55750805b601f850160051c820191505b818110156110fe578281556001016117c1565b815167ffffffffffffffff8111156117ee576117ee611370565b611802816117fc845461164c565b8461178e565b602080601f831160018114611837576000841561181f5750858301515b600019600386901b1c1916600185901b1785556110fe565b600085815260208120601f198616915b8281101561186657888601518255948401946001909101908401611847565b50858210156118845787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea2646970667358221220da8a79f0656d333633f5209b9dde2f2a2627a2320266c1704e08e1e66c4335c964736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610621806100a86000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e1146100f3578063949d225d1461011d578063cccf7a8e1461012e578063f2fde38b1461015157600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461050b565b610164565b005b6100aa6101ef565b6040516100b79190610524565b60405180910390f35b6100a06100ce36600461050b565b610247565b6100db610374565b6040516001600160a01b0390911681526020016100b7565b61010661010136600461050b565b610383565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014161013c36600461050b565b6103b6565b60405190151581526020016100b7565b6100a061015f366004610568565b610419565b61016c61045b565b6001600160a01b0316336001600160a01b03161461019d57604051632f7a8ee160e01b815260040160405180910390fd5b6101a6816103b6565b6101ec57600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561023d57602002820191906000526020600020905b815481526020019060010190808311610229575b5050505050905090565b61024f61045b565b6001600160a01b0316336001600160a01b03161461028057604051632f7a8ee160e01b815260040160405180910390fd5b610289816103b6565b156101ec576000805461029e90600190610598565b815481106102ae576102ae6105bf565b906000526020600020015460006001600084815260200190815260200160002054815481106102df576102df6105bf565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610316576103166105bf565b90600052602060002001548152602001908152602001600020819055506001600082815260200190815260200160002060009055600080548061035b5761035b6105d5565b6001900381819060005260206000200160009055905550565b600061037e61045b565b905090565b60008061038f836103b6565b61039e57506000928392509050565b50506000908152600160208190526040909120549091565b6000805481036103c857506000919050565b60008281526001602052604081205490036104045781600080815481106103f1576103f16105bf565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b61042161045b565b6001600160a01b0316336001600160a01b03161461045257604051632f7a8ee160e01b815260040160405180910390fd5b6101ec81610489565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516101ec92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121561051d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561055c57835183529284019291840191600101610540565b50909695505050505050565b60006020828403121561057a57600080fd5b81356001600160a01b038116811461059157600080fd5b9392505050565b818103818111156105b957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212209120bb0a2a9936c2c457117a2d6e08d1b5892ce4c2794940e794c00e17bf899964736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610663806100a86000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff814610121578063f2fde38b1461014457600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610531565b610157565b005b6100956100a5366004610531565b6102bd565b6100bd6100b8366004610553565b61033a565b6040516100ca919061056c565b60405180910390f35b6100f36100e1366004610553565b60009081526020819052604090205490565b6040519081526020016100ca565b61010961039a565b6040516001600160a01b0390911681526020016100ca565b61013461012f366004610531565b6103a9565b60405190151581526020016100ca565b6100956101523660046105b0565b61043c565b61015f610481565b6001600160a01b0316336001600160a01b03161461019057604051632f7a8ee160e01b815260040160405180910390fd5b61019a82826103a9565b156102b957600082815260208190526040902080546101bb906001906105e0565b815481106101cb576101cb610601565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061020557610205610601565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061025357610253610601565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102a2576102a2610617565b600190038181906000526020600020016000905590555b5050565b6102c5610481565b6001600160a01b0316336001600160a01b0316146102f657604051632f7a8ee160e01b815260040160405180910390fd5b61030082826103a9565b6102b95760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561038e57602002820191906000526020600020905b81548152602001906001019080831161037a575b50505050509050919050565b60006103a4610481565b905090565b60008281526020819052604081205481036103c657506000610436565b60008381526001602090815260408083208584529091528120549003610418576000838152602081905260408120805484929061040557610405610601565b9060005260206000200154149050610436565b50600082815260016020908152604080832084845290915290205415155b92915050565b610444610481565b6001600160a01b0316336001600160a01b03161461047557604051632f7a8ee160e01b815260040160405180910390fd5b61047e816104af565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161047e92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000806040838503121561054457600080fd5b50508035926020909101359150565b60006020828403121561056557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156105a457835183529284019291840191600101610588565b50909695505050505050565b6000602082840312156105c257600080fd5b81356001600160a01b03811681146105d957600080fd5b9392505050565b8181038181111561043657634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212204fe0e51f850fe860844b3ef4690dbe2f4106d195a4c983b0ea09e2b1f7ab027564736f6c634300081300338a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460";

type GameConfigComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GameConfigComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GameConfigComponent__factory extends ContractFactory {
  constructor(...args: GameConfigComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GameConfigComponent> {
    return super.deploy(world, overrides || {}) as Promise<GameConfigComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): GameConfigComponent {
    return super.attach(address) as GameConfigComponent;
  }
  override connect(signer: Signer): GameConfigComponent__factory {
    return super.connect(signer) as GameConfigComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GameConfigComponentInterface {
    return new utils.Interface(_abi) as GameConfigComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GameConfigComponent {
    return new Contract(address, _abi, signerOrProvider) as GameConfigComponent;
  }
}
