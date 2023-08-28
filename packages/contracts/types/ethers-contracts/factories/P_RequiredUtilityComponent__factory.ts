/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  P_RequiredUtilityComponent,
  P_RequiredUtilityComponentInterface,
} from "../P_RequiredUtilityComponent";

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
            internalType: "uint256[]",
            name: "resources",
            type: "uint256[]",
          },
          {
            internalType: "uint32[]",
            name: "values",
            type: "uint32[]",
          },
        ],
        internalType: "struct ResourceValues",
        name: "resources",
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
            internalType: "uint256[]",
            name: "resources",
            type: "uint256[]",
          },
          {
            internalType: "uint32[]",
            name: "values",
            type: "uint32[]",
          },
        ],
        internalType: "struct ResourceValues",
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
            internalType: "uint256[]",
            name: "resources",
            type: "uint256[]",
          },
          {
            internalType: "uint32[]",
            name: "values",
            type: "uint32[]",
          },
        ],
        internalType: "struct ResourceValues",
        name: "resourceValues",
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
  "0x60806040523480156200001157600080fd5b5060405162002a7038038062002a70833981016040819052620000349162000262565b807f391ed979ad48ef48aa0e385aaffe280328c830054d2153bba1cf3da0b7bf45ab8181620000633362000127565b60028190556001600160a01b038216156200008357620000838262000190565b5050604051620000939062000246565b604051809103906000f080158015620000b0573d6000803e3d6000fd5b50600380546001600160a01b0319166001600160a01b0392909216919091179055604051620000df9062000254565b604051809103906000f080158015620000fc573d6000803e3d6000fd5b50600480546001600160a01b0319166001600160a01b03929092169190911790555062000294915050565b60008051602062002a5083398151915280546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60008051602062002a50833981519152546001600160a01b03163314620001ca57604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f303477090604401600060405180830381600087803b1580156200022a57600080fd5b505af11580156200023f573d6000803e3d6000fd5b5050505050565b6106c98062001c7c83390190565b61070b806200234583390190565b6000602082840312156200027557600080fd5b81516001600160a01b03811681146200028d57600080fd5b9392505050565b6119d880620002a46000396000f3fe608060405234801561001057600080fd5b50600436106101215760003560e01c8063861eb905116100ad578063b361be4611610071578063b361be461461026e578063b8bc073d14610281578063bf4fe57e146102a1578063cccf7a8e146102b4578063f2fde38b146102c757600080fd5b8063861eb905146102065780638b282947146102295780638da5cb5b1461023c5780639d2c76b414610244578063af640d0f1461025757600080fd5b806331b933b9116100f457806331b933b9146101af5780634cc82215146101b75780634fef6a38146101ca5780636b122fe0146101dd57806375c0669c146101f357600080fd5b806304638dbc1461012657806308a43e021461014f5780630ff4c9161461016457806330b67baa14610184575b600080fd5b61013961013436600461103c565b6102da565b6040516101469190611079565b60405180910390f35b61016261015d3660046110bd565b61030a565b005b610177610172366004611104565b610350565b604051610146919061111d565b600054610197906001600160a01b031681565b6040516001600160a01b039091168152602001610146565b61013961039d565b6101626101c5366004611104565b610414565b6101626101d83660046111ac565b610446565b6101e56104c2565b604051610146929190611238565b6101626102013660046111ac565b610627565b6102196102143660046111ac565b61069f565b6040519015158152602001610146565b6101626102373660046113a8565b610702565b610197610732565b6101626102523660046111ac565b61073c565b61026060025481565b604051908152602001610146565b61013961027c3660046113e5565b6107f0565b61029461028f366004611104565b610869565b604051610146919061141a565b6101626102af3660046111ac565b61090b565b6102196102c2366004611104565b610984565b6101626102d53660046111ac565b6109f2565b6060610304826040516020016102f09190611507565b6040516020818303038152906040526107f0565b92915050565b61034c82610318838061155d565b610325602086018661155d565b60405160200161033894939291906115a7565b604051602081830303815290604052610702565b5050565b604080518082019091526060808252602082015260008061037084610869565b8060200190518101906103839190611668565b604080518082019091529182526020820152949350505050565b60035460408051631043567360e21b815290516060926001600160a01b03169163410d59cc9160048083019260009291908290030181865afa1580156103e7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261040f919081019061172c565b905090565b61041d3361069f565b61043a5760405163203769ed60e11b815260040160405180910390fd5b61044381610a34565b50565b61044e610c5d565b6001600160a01b0316336001600160a01b03161461047f57604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19166001179055565b6040805160028082526060828101909352829190816020015b60608152602001906001900390816104db57505060408051600280825260608201835292945091906020830190803683370190505090506040518060400160405280600b81526020016a7265736f7572636549447360a81b8152508260008151811061054957610549611761565b6020026020010181905250601f8160008151811061056957610569611761565b6020026020010190602181111561058257610582611222565b9081602181111561059557610595611222565b815250506040518060400160405280600f81526020016e7265717569726564416d6f756e747360881b815250826001815181106105d4576105d4611761565b6020026020010181905250601c816001815181106105f4576105f4611761565b6020026020010190602181111561060d5761060d611222565b9081602181111561062057610620611222565b9052509091565b6106303361069f565b61064d5760405163203769ed60e11b815260040160405180910390fd5b600580546001810182556000919091527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db00180546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c909602052604081205460ff168061030457506106e8610732565b6001600160a01b0316826001600160a01b03161492915050565b61070b3361069f565b6107285760405163203769ed60e11b815260040160405180910390fd5b61034c8282610c8b565b600061040f610c5d565b610744610c5d565b6001600160a01b0316336001600160a01b03161461077557604051632f7a8ee160e01b815260040160405180910390fd5b600080546001600160a01b0319166001600160a01b038316908117909155600254604051630f30347760e41b8152306004820152602481019190915263f3034770906044015b600060405180830381600087803b1580156107d557600080fd5b505af11580156107e9573d6000803e3d6000fd5b5050505050565b6004805482516020840120604051631e5b17a560e21b8152928301526060916001600160a01b039091169063796c5e9490602401600060405180830381865afa158015610841573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610304919081019061172c565b600081815260016020526040902080546060919061088690611777565b80601f01602080910402602001604051908101604052809291908181526020018280546108b290611777565b80156108ff5780601f106108d4576101008083540402835291602001916108ff565b820191906000526020600020905b8154815290600101906020018083116108e257829003601f168201915b50505050509050919050565b610913610c5d565b6001600160a01b0316336001600160a01b03161461094457604051632f7a8ee160e01b815260040160405180910390fd5b6001600160a01b031660009081527f8ffeadc5cba727b8cc3cdef48739619490ea317fdb3baae1259089d06f92c90960205260409020805460ff19169055565b600354604051636667bd4760e11b8152600481018390526000916001600160a01b03169063cccf7a8e90602401602060405180830381865afa1580156109ce573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061030491906117ab565b6109fa610c5d565b6001600160a01b0316336001600160a01b031614610a2b57604051632f7a8ee160e01b815260040160405180910390fd5b61044381610e8a565b6004546000828152600160205260409081902090516001600160a01b03909216916385edea1391610a64916117cd565b60405190819003812060e083901b6001600160e01b03191682526004820152602401602060405180830381865afa158015610aa3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ac79190611843565b600003610ad15750565b6004546000828152600160205260409081902090516001600160a01b0390921691636526db7a91610b01916117cd565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101849052604401600060405180830381600087803b158015610b4457600080fd5b505af1158015610b58573d6000803e3d6000fd5b5050600354604051634cc8221560e01b8152600481018590526001600160a01b039091169250634cc822159150602401600060405180830381600087803b158015610ba257600080fd5b505af1158015610bb6573d6000803e3d6000fd5b50505050610bc381610e93565b60005b60055481101561034c5760058181548110610be357610be3611761565b600091825260209091200154604051634cc8221560e01b8152600481018490526001600160a01b0390911690634cc8221590602401600060405180830381600087803b158015610c3257600080fd5b505af1158015610c46573d6000803e3d6000fd5b505050508080610c559061185c565b915050610bc6565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b600354604051630801f16960e11b8152600481018490526001600160a01b0390911690631003e2d290602401600060405180830381600087803b158015610cd157600080fd5b505af1158015610ce5573d6000803e3d6000fd5b50506004546000858152600160205260409081902090516001600160a01b039092169350636526db7a9250610d19916117cd565b60405190819003812060e083901b6001600160e01b0319168252600482015260248101859052604401600060405180830381600087803b158015610d5c57600080fd5b505af1158015610d70573d6000803e3d6000fd5b5050600480548451602086012060405163771602f760e01b815292830152602482018690526001600160a01b0316925063771602f79150604401600060405180830381600087803b158015610dc457600080fd5b505af1158015610dd8573d6000803e3d6000fd5b50505050610de68282610edb565b60005b600554811015610e855760058181548110610e0657610e06611761565b6000918252602090912001546040516242d70760e31b81526001600160a01b0390911690630216b83890610e409086908690600401611883565b600060405180830381600087803b158015610e5a57600080fd5b505af1158015610e6e573d6000803e3d6000fd5b505050508080610e7d9061185c565b915050610de9565b505050565b61044381610f5c565b6000818152600160205260408120610eaa91610fd6565b600054604051630de3b7b560e01b8152600481018390526001600160a01b0390911690630de3b7b5906024016107bb565b6000828152600160205260409020610ef382826118e2565b5060005460405163cfd3c57f60e01b81526001600160a01b039091169063cfd3c57f90610f269085908590600401611883565b600060405180830381600087803b158015610f4057600080fd5b505af1158015610f54573d6000803e3d6000fd5b505050505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b508054610fe290611777565b6000825580601f10610ff2575050565b601f01602090049060005260206000209081019061044391905b80821115611020576000815560010161100c565b5090565b60006040828403121561103657600080fd5b50919050565b60006020828403121561104e57600080fd5b813567ffffffffffffffff81111561106557600080fd5b61107184828501611024565b949350505050565b6020808252825182820181905260009190848201906040850190845b818110156110b157835183529284019291840191600101611095565b50909695505050505050565b600080604083850312156110d057600080fd5b82359150602083013567ffffffffffffffff8111156110ee57600080fd5b6110fa85828601611024565b9150509250929050565b60006020828403121561111657600080fd5b5035919050565b6020808252825160408383015280516060840181905260009291820190839060808601905b808310156111625783518252928401926001929092019190840190611142565b5086840151868203601f190160408801528051808352908501935090840191506000905b808210156110b157835163ffffffff168352928401929184019160019190910190611186565b6000602082840312156111be57600080fd5b81356001600160a01b03811681146111d557600080fd5b9392505050565b6000815180845260005b81811015611202576020818501810151868301820152016111e6565b506000602082860101526020601f19601f83011685010191505092915050565b634e487b7160e01b600052602160045260246000fd5b6000604082016040835280855180835260608501915060608160051b8601019250602080880160005b8381101561128f57605f1988870301855261127d8683516111dc565b95509382019390820190600101611261565b50508584038187015286518085528782019482019350915060005b828110156112e4578451602281106112d257634e487b7160e01b600052602160045260246000fd5b845293810193928101926001016112aa565b5091979650505050505050565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff81118282101715611330576113306112f1565b604052919050565b600082601f83011261134957600080fd5b813567ffffffffffffffff811115611363576113636112f1565b611376601f8201601f1916602001611307565b81815284602083860101111561138b57600080fd5b816020850160208301376000918101602001919091529392505050565b600080604083850312156113bb57600080fd5b82359150602083013567ffffffffffffffff8111156113d957600080fd5b6110fa85828601611338565b6000602082840312156113f757600080fd5b813567ffffffffffffffff81111561140e57600080fd5b61107184828501611338565b6020815260006111d560208301846111dc565b6000808335601e1984360301811261144457600080fd5b830160208101925035905067ffffffffffffffff81111561146457600080fd5b8060051b360382131561147657600080fd5b9250929050565b81835260006001600160fb1b0383111561149657600080fd5b8260051b80836020870137939093016020019392505050565b63ffffffff8116811461044357600080fd5b8183526000602080850194508260005b858110156114fc5781356114e4816114af565b63ffffffff16875295820195908201906001016114d1565b509495945050505050565b602081526000611517838461142d565b6040602085015261152c60608501828461147d565b91505061153c602085018561142d565b848303601f190160408601526115538382846114c1565b9695505050505050565b6000808335601e1984360301811261157457600080fd5b83018035915067ffffffffffffffff82111561158f57600080fd5b6020019150600581901b360382131561147657600080fd5b6040815260006115bb60408301868861147d565b82810360208401526115ce8185876114c1565b979650505050505050565b600067ffffffffffffffff8211156115f3576115f36112f1565b5060051b60200190565b600082601f83011261160e57600080fd5b8151602061162361161e836115d9565b611307565b82815260059290921b8401810191818101908684111561164257600080fd5b8286015b8481101561165d5780518352918301918301611646565b509695505050505050565b6000806040838503121561167b57600080fd5b825167ffffffffffffffff8082111561169357600080fd5b61169f868387016115fd565b93506020915081850151818111156116b657600080fd5b85019050601f810186136116c957600080fd5b80516116d761161e826115d9565b81815260059190911b820183019083810190888311156116f657600080fd5b928401925b8284101561171d57835161170e816114af565b825292840192908401906116fb565b80955050505050509250929050565b60006020828403121561173e57600080fd5b815167ffffffffffffffff81111561175557600080fd5b611071848285016115fd565b634e487b7160e01b600052603260045260246000fd5b600181811c9082168061178b57607f821691505b60208210810361103657634e487b7160e01b600052602260045260246000fd5b6000602082840312156117bd57600080fd5b815180151581146111d557600080fd5b60008083546117db81611777565b600182811680156117f3576001811461180857611837565b60ff1984168752821515830287019450611837565b8760005260208060002060005b8581101561182e5781548a820152908401908201611815565b50505082870194505b50929695505050505050565b60006020828403121561185557600080fd5b5051919050565b60006001820161187c57634e487b7160e01b600052601160045260246000fd5b5060010190565b82815260406020820152600061107160408301846111dc565b601f821115610e8557600081815260208120601f850160051c810160208610156118c35750805b601f850160051c820191505b81811015610f54578281556001016118cf565b815167ffffffffffffffff8111156118fc576118fc6112f1565b6119108161190a8454611777565b8461189c565b602080601f831160018114611945576000841561192d5750858301515b600019600386901b1c1916600185901b178555610f54565b600085815260208120601f198616915b8281101561197457888601518255948401946001909101908401611955565b50858210156119925787850151600019600388901b60f8161c191681555b5050505050600190811b0190555056fea26469706673582212209ce1594c81012f129779345dc180341f348d82fa977e3bfe27275206b28d76e964736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610621806100a86000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c80638e7cb6e11161005b5780638e7cb6e1146100f3578063949d225d1461011d578063cccf7a8e1461012e578063f2fde38b1461015157600080fd5b80631003e2d21461008d578063410d59cc146100a25780634cc82215146100c05780638da5cb5b146100d3575b600080fd5b6100a061009b36600461050b565b610164565b005b6100aa6101ef565b6040516100b79190610524565b60405180910390f35b6100a06100ce36600461050b565b610247565b6100db610374565b6040516001600160a01b0390911681526020016100b7565b61010661010136600461050b565b610383565b6040805192151583526020830191909152016100b7565b6000546040519081526020016100b7565b61014161013c36600461050b565b6103b6565b60405190151581526020016100b7565b6100a061015f366004610568565b610419565b61016c61045b565b6001600160a01b0316336001600160a01b03161461019d57604051632f7a8ee160e01b815260040160405180910390fd5b6101a6816103b6565b6101ec57600080548282526001602081905260408320829055810182559080527f290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563018190555b50565b6060600080548060200260200160405190810160405280929190818152602001828054801561023d57602002820191906000526020600020905b815481526020019060010190808311610229575b5050505050905090565b61024f61045b565b6001600160a01b0316336001600160a01b03161461028057604051632f7a8ee160e01b815260040160405180910390fd5b610289816103b6565b156101ec576000805461029e90600190610598565b815481106102ae576102ae6105bf565b906000526020600020015460006001600084815260200190815260200160002054815481106102df576102df6105bf565b60009182526020808320909101929092558281526001918290526040812054815490929190819084908110610316576103166105bf565b90600052602060002001548152602001908152602001600020819055506001600082815260200190815260200160002060009055600080548061035b5761035b6105d5565b6001900381819060005260206000200160009055905550565b600061037e61045b565b905090565b60008061038f836103b6565b61039e57506000928392509050565b50506000908152600160208190526040909120549091565b6000805481036103c857506000919050565b60008281526001602052604081205490036104045781600080815481106103f1576103f16105bf565b9060005260206000200154149050919050565b50600090815260016020526040902054151590565b61042161045b565b6001600160a01b0316336001600160a01b03161461045257604051632f7a8ee160e01b815260040160405180910390fd5b6101ec81610489565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516101ec92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b60006020828403121561051d57600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b8181101561055c57835183529284019291840191600101610540565b50909695505050505050565b60006020828403121561057a57600080fd5b81356001600160a01b038116811461059157600080fd5b9392505050565b818103818111156105b957634e487b7160e01b600052601160045260246000fd5b92915050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212209120bb0a2a9936c2c457117a2d6e08d1b5892ce4c2794940e794c00e17bf899964736f6c63430008130033608060405234801561001057600080fd5b5061001a3361001f565b610099565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b610663806100a86000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c806385edea131161005b57806385edea13146100d35780638da5cb5b14610101578063a0265ff814610121578063f2fde38b1461014457600080fd5b80636526db7a14610082578063771602f714610097578063796c5e94146100aa575b600080fd5b610095610090366004610531565b610157565b005b6100956100a5366004610531565b6102bd565b6100bd6100b8366004610553565b61033a565b6040516100ca919061056c565b60405180910390f35b6100f36100e1366004610553565b60009081526020819052604090205490565b6040519081526020016100ca565b61010961039a565b6040516001600160a01b0390911681526020016100ca565b61013461012f366004610531565b6103a9565b60405190151581526020016100ca565b6100956101523660046105b0565b61043c565b61015f610481565b6001600160a01b0316336001600160a01b03161461019057604051632f7a8ee160e01b815260040160405180910390fd5b61019a82826103a9565b156102b957600082815260208190526040902080546101bb906001906105e0565b815481106101cb576101cb610601565b6000918252602080832090910154848352828252604080842060018452818520868652909352909220548154811061020557610205610601565b60009182526020808320909101929092558381526001825260408082208483528084528183205486845283855291832085845293819052835491939092918490811061025357610253610601565b600091825260208083209091015483528281019390935260409182018120939093558483526001825280832084845282528083208390558483529082905290208054806102a2576102a2610617565b600190038181906000526020600020016000905590555b5050565b6102c5610481565b6001600160a01b0316336001600160a01b0316146102f657604051632f7a8ee160e01b815260040160405180910390fd5b61030082826103a9565b6102b95760009182526020828152604080842080546001808552838720868852855292862081905585845291820181558452922090910155565b6000818152602081815260409182902080548351818402810184019094528084526060939283018282801561038e57602002820191906000526020600020905b81548152602001906001019080831161037a575b50505050509050919050565b60006103a4610481565b905090565b60008281526020819052604081205481036103c657506000610436565b60008381526001602090815260408083208584529091528120549003610418576000838152602081905260408120805484929061040557610405610601565b9060005260206000200154149050610436565b50600082815260016020908152604080832084845290915290205415155b92915050565b610444610481565b6001600160a01b0316336001600160a01b03161461047557604051632f7a8ee160e01b815260040160405180910390fd5b61047e816104af565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161047e92849290916001600160a01b038085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6000806040838503121561054457600080fd5b50508035926020909101359150565b60006020828403121561056557600080fd5b5035919050565b6020808252825182820181905260009190848201906040850190845b818110156105a457835183529284019291840191600101610588565b50909695505050505050565b6000602082840312156105c257600080fd5b81356001600160a01b03811681146105d957600080fd5b9392505050565b8181038181111561043657634e487b7160e01b600052601160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052603160045260246000fdfea26469706673582212204fe0e51f850fe860844b3ef4690dbe2f4106d195a4c983b0ea09e2b1f7ab027564736f6c634300081300338a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460";

type P_RequiredUtilityComponentConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: P_RequiredUtilityComponentConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class P_RequiredUtilityComponent__factory extends ContractFactory {
  constructor(...args: P_RequiredUtilityComponentConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<P_RequiredUtilityComponent> {
    return super.deploy(
      world,
      overrides || {}
    ) as Promise<P_RequiredUtilityComponent>;
  }
  override getDeployTransaction(
    world: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(world, overrides || {});
  }
  override attach(address: string): P_RequiredUtilityComponent {
    return super.attach(address) as P_RequiredUtilityComponent;
  }
  override connect(signer: Signer): P_RequiredUtilityComponent__factory {
    return super.connect(signer) as P_RequiredUtilityComponent__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): P_RequiredUtilityComponentInterface {
    return new utils.Interface(_abi) as P_RequiredUtilityComponentInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): P_RequiredUtilityComponent {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as P_RequiredUtilityComponent;
  }
}
