/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  S_ResolveBattleSystem,
  S_ResolveBattleSystemInterface,
} from "../S_ResolveBattleSystem";

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
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "battleEntity",
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
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620021fe380380620021fe8339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b611fa880620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780636ad0ccab1461007a5780638da5cb5b1461008d578063f2fde38b146100ad575b600080fd5b61006461005f3660046119f9565b6100c2565b6040516100719190611a8e565b60405180910390f35b610064610088366004611af1565b610289565b6100956102c6565b6040516001600160a01b039091168152602001610071565b6100c06100bb366004611b1d565b6102fe565b005b6060600080838060200190518101906100db9190611b3a565b9092509050600061010b7fe640406de38b5823e93b424dea7e50f1ad48bbf64449bd5a2cb23e5979ef4625610354565b604051636667bd4760e11b8152600481018490529091506001600160a01b0382169063cccf7a8e90602401602060405180830381865afa158015610153573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101779190611b68565b156101e05760405162461bcd60e51b815260206004820152602e60248201527f535f5265736f6c7665426174746c6553797374656d3a20626174746c6520616c60448201526d1c9958591e481c995cdbdb1d995960921b60648201526084015b60405180910390fd5b6001546000906101f9906001600160a01b031684610371565b604051634cbc4bbd60e01b81529091506001600160a01b03831690634cbc4bbd9061022a9086908590600401611bcb565b600060405180830381600087803b15801561024457600080fd5b505af1158015610258573d6000803e3d6000fd5b505050508260405160200161026f91815260200190565b604051602081830303815290604052945050505050919050565b604080516001600160a01b03841660208201529081018290526060906102bf9082016040516020818303038152906040526100c2565b9392505050565b60006102f97f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b031690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460546001600160a01b0316331461034857604051632f7a8ee160e01b815260040160405180910390fd5b610351816108aa565b50565b6000805461036b906001600160a01b0316836108b3565b92915050565b61039560405180606001604052806000815260200160608152602001606081525090565b6103b960405180606001604052806000815260200160608152602001606081525090565b6040516309e4fb4360e31b8152600080516020611f5383398151915260048201526000906001600160a01b03861690634f27da1890602401602060405180830381865afa15801561040e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104329190611c1d565b6001600160a01b0316630ff4c916856040518263ffffffff1660e01b815260040161045f91815260200190565b600060405180830381865afa15801561047c573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526104a49190810190611d44565b606001516040516309e4fb4360e31b8152600080516020611f3383398151915260048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610500573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105249190611c1d565b6001600160a01b0316630ff4c916866040518263ffffffff1660e01b815260040161055191815260200190565b600060405180830381865afa15801561056e573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526105969190810190611d44565b606001519050815167ffffffffffffffff8111156105b6576105b6611989565b6040519080825280602002602001820160405280156105df578160200160208202803683370190505b506020840152805167ffffffffffffffff8111156105ff576105ff611989565b604051908082528060200260200182016040528015610628578160200160208202803683370190505b50604084015260008061063b8888610995565b91509150600061064b8989610d2c565b905060005b855181101561088f576000808463ffffffff161161066f5760006106a0565b8385838151811061068257610682611e03565b602002602001015160646106969190611e2f565b6106a09190611e57565b9050600060646106b08386611e2f565b6106ba9190611e57565b9050600063ffffffff82161561070757846106d6836064611e2f565b6106e09190611e57565b905060648163ffffffff1611156106f957506000610707565b610704816064611e88565b90505b60008088868151811061071c5761071c611e03565b602002602001015163ffffffff1611156107885787858151811061074257610742611e03565b60200260200101518360646107579190611e2f565b6107619190611e57565b905060648163ffffffff16111561077a57506000610788565b610785816064611e88565b90505b60648a868151811061079c5761079c611e03565b6020026020010151826107af9190611e2f565b6107b99190611e57565b8b6020015186815181106107cf576107cf611e03565b602002602001019063ffffffff16908163ffffffff168152505060005b89518110156108775761271083868c848151811061080c5761080c611e03565b602002602001015161081e9190611e2f565b6108289190611e2f565b6108329190611e57565b8c60400151828151811061084857610848611e03565b6020026020010181815161085c9190611eac565b63ffffffff169052508061086f81611ec9565b9150506107ec565b5050505050808061088790611ec9565b915050610650565b5061089b898988610fe6565b86525093979650505050505050565b6103518161120e565b604051637defd0f560e11b81526004810182905260009081906001600160a01b0385169063fbdfa1ea90602401600060405180830381865afa1580156108fd573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526109259190810190611ee2565b9050805160000361096c5760405162461bcd60e51b81526020600482015260116024820152701a59081b9bdd081c9959da5cdd195c9959607a1b60448201526064016101d7565b61098d8160008151811061098257610982611e03565b602002602001015190565b949350505050565b6040516309e4fb4360e31b81527f12b90d29c688229c649485fa67d94dab8898fedda81f9b1df1c45fc0f3748252600482015260609060009081906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610a01573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a259190611c1d565b6040516309e4fb4360e31b8152600080516020611f5383398151915260048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015610a7d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610aa19190611c1d565b6040516307fa648b60e11b8152600481018790529091506000906001600160a01b03831690630ff4c91690602401600060405180830381865afa158015610aec573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610b149190810190611d44565b905080602001515167ffffffffffffffff811115610b3457610b34611989565b604051908082528060200260200182016040528015610b5d578160200160208202803683370190505b5094506000935060005b816020015151811015610d2157600082606001518281518110610b8c57610b8c611e03565b602002602001015163ffffffff161115610d0f576000610bce89846000015185602001518581518110610bc157610bc1611e03565b6020026020010151611288565b9050846001600160a01b0316630ff4c916610c3385602001518581518110610bf857610bf8611e03565b60200260200101518463ffffffff16604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6040518263ffffffff1660e01b8152600401610c5191815260200190565b602060405180830381865afa158015610c6e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c929190611f17565b83606001518381518110610ca857610ca8611e03565b6020026020010151610cba9190611e2f565b878381518110610ccc57610ccc611e03565b602002602001019063ffffffff16908163ffffffff1681525050868281518110610cf857610cf8611e03565b602002602001015186610d0b9190611eac565b9550505b80610d1981611ec9565b915050610b67565b505050509250929050565b6040516309e4fb4360e31b81527f138a246c293714592363fa21f1f1193be57e9ee7c5a4a39cb6e906dcf7c43151600482015260009081906001600160a01b03851690634f27da1890602401602060405180830381865afa158015610d95573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610db99190611c1d565b6040516309e4fb4360e31b8152600080516020611f3383398151915260048201529091506000906001600160a01b03861690634f27da1890602401602060405180830381865afa158015610e11573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e359190611c1d565b6040516307fa648b60e11b8152600481018690529091506000906001600160a01b03831690630ff4c91690602401600060405180830381865afa158015610e80573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610ea89190810190611d44565b90506000935060005b816020015151811015610fdc57600082606001518281518110610ed657610ed6611e03565b602002602001015163ffffffff161115610fca576000610f0b88846000015185602001518581518110610bc157610bc1611e03565b9050846001600160a01b0316630ff4c916610f3585602001518581518110610bf857610bf8611e03565b6040518263ffffffff1660e01b8152600401610f5391815260200190565b602060405180830381865afa158015610f70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f949190611f17565b83606001518381518110610faa57610faa611e03565b6020026020010151610fbc9190611e2f565b610fc69087611eac565b9550505b80610fd481611ec9565b915050610eb1565b5050505092915050565b6040516309e4fb4360e31b8152600080516020611f53833981519152600482015260009081906001600160a01b03861690634f27da1890602401602060405180830381865afa15801561103d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110619190611c1d565b6040516309e4fb4360e31b8152600080516020611f3383398151915260048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa1580156110b9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110dd9190611c1d565b6040516307fa648b60e11b8152600481018790529091506000906001600160a01b03841690630ff4c91690602401600060405180830381865afa158015611128573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111509190810190611d44565b6040516307fa648b60e11b8152600481018890529091506000906001600160a01b03841690630ff4c91690602401600060405180830381865afa15801561119b573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526111c39190810190611d44565b90506111d488888860400151611353565b63ffffffff166111e989898960200151611604565b63ffffffff1611156111fe5781519450611203565b805194505b505050509392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6040805160208082018490528183018590528251808303840181526060909201909252805191012060009081906040516309e4fb4360e31b81527fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e600482015290915061134a906001600160a01b03871690634f27da1890602401602060405180830381865afa158015611320573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113449190611c1d565b826118a9565b95945050505050565b6040516309e4fb4360e31b81527f138a246c293714592363fa21f1f1193be57e9ee7c5a4a39cb6e906dcf7c43151600482015260009081906001600160a01b03861690634f27da1890602401602060405180830381865afa1580156113bc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113e09190611c1d565b6040516309e4fb4360e31b8152600080516020611f3383398151915260048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa158015611438573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061145c9190611c1d565b6040516307fa648b60e11b8152600481018790529091506000906001600160a01b03831690630ff4c91690602401600060405180830381865afa1580156114a7573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526114cf9190810190611d44565b90506000805b8260200151518110156115f85760008782815181106114f6576114f6611e03565b602002602001015163ffffffff1611156115e657600061152b8a856000015186602001518581518110610bc157610bc1611e03565b9050856001600160a01b0316630ff4c91661155586602001518581518110610bf857610bf8611e03565b6040518263ffffffff1660e01b815260040161157391815260200190565b602060405180830381865afa158015611590573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115b49190611f17565b8883815181106115c6576115c6611e03565b60200260200101516115d89190611e2f565b6115e29084611eac565b9250505b806115f081611ec9565b9150506114d5565b50979650505050505050565b6040516309e4fb4360e31b81527f12b90d29c688229c649485fa67d94dab8898fedda81f9b1df1c45fc0f3748252600482015260009081906001600160a01b03861690634f27da1890602401602060405180830381865afa15801561166d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116919190611c1d565b6040516309e4fb4360e31b8152600080516020611f5383398151915260048201529091506000906001600160a01b03871690634f27da1890602401602060405180830381865afa1580156116e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061170d9190611c1d565b6040516307fa648b60e11b8152600481018790529091506000906001600160a01b03831690630ff4c91690602401600060405180830381865afa158015611758573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526117809190810190611d44565b90506000805b8260200151518110156115f85760008782815181106117a7576117a7611e03565b602002602001015163ffffffff1611156118975760006117dc8a856000015186602001518581518110610bc157610bc1611e03565b9050856001600160a01b0316630ff4c91661180686602001518581518110610bf857610bf8611e03565b6040518263ffffffff1660e01b815260040161182491815260200190565b602060405180830381865afa158015611841573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118659190611f17565b88838151811061187757611877611e03565b60200260200101516118899190611e2f565b6118939084611eac565b9250505b806118a181611ec9565b915050611786565b604051636667bd4760e11b8152600481018290526000906001600160a01b0384169063cccf7a8e90602401602060405180830381865afa1580156118f1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119159190611b68565b6119205760006102bf565b6040516307fa648b60e11b8152600481018390526001600160a01b03841690630ff4c91690602401602060405180830381865afa158015611965573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102bf9190611f17565b634e487b7160e01b600052604160045260246000fd5b6040516080810167ffffffffffffffff811182821017156119c2576119c2611989565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156119f1576119f1611989565b604052919050565b60006020808385031215611a0c57600080fd5b823567ffffffffffffffff80821115611a2457600080fd5b818501915085601f830112611a3857600080fd5b813581811115611a4a57611a4a611989565b611a5c601f8201601f191685016119c8565b91508082528684828501011115611a7257600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015611abb57858101830151858201604001528201611a9f565b506000604082860101526040601f19601f8301168501019250505092915050565b6001600160a01b038116811461035157600080fd5b60008060408385031215611b0457600080fd5b8235611b0f81611adc565b946020939093013593505050565b600060208284031215611b2f57600080fd5b81356102bf81611adc565b60008060408385031215611b4d57600080fd5b8251611b5881611adc565b6020939093015192949293505050565b600060208284031215611b7a57600080fd5b815180151581146102bf57600080fd5b600081518084526020808501945080840160005b83811015611bc057815163ffffffff1687529582019590820190600101611b9e565b509495945050505050565b828152604060208201528151604082015260006020830151606080840152611bf660a0840182611b8a565b90506040840151603f19848303016080850152611c138282611b8a565b9695505050505050565b600060208284031215611c2f57600080fd5b81516102bf81611adc565b600067ffffffffffffffff821115611c5457611c54611989565b5060051b60200190565b600082601f830112611c6f57600080fd5b81516020611c84611c7f83611c3a565b6119c8565b82815260059290921b84018101918181019086841115611ca357600080fd5b8286015b84811015611cbe5780518352918301918301611ca7565b509695505050505050565b805163ffffffff81168114611cdd57600080fd5b919050565b600082601f830112611cf357600080fd5b81516020611d03611c7f83611c3a565b82815260059290921b84018101918181019086841115611d2257600080fd5b8286015b84811015611cbe57611d3781611cc9565b8352918301918301611d26565b600060208284031215611d5657600080fd5b815167ffffffffffffffff80821115611d6e57600080fd5b9083019060808286031215611d8257600080fd5b611d8a61199f565b82518152602083015182811115611da057600080fd5b611dac87828601611c5e565b602083015250604083015182811115611dc457600080fd5b611dd087828601611ce2565b604083015250606083015182811115611de857600080fd5b611df487828601611ce2565b60608301525095945050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b63ffffffff818116838216028082169190828114611e4f57611e4f611e19565b505092915050565b600063ffffffff80841680611e7c57634e487b7160e01b600052601260045260246000fd5b92169190910492915050565b63ffffffff828116828216039080821115611ea557611ea5611e19565b5092915050565b63ffffffff818116838216019080821115611ea557611ea5611e19565b600060018201611edb57611edb611e19565b5060010190565b600060208284031215611ef457600080fd5b815167ffffffffffffffff811115611f0b57600080fd5b61098d84828501611c5e565b600060208284031215611f2957600080fd5b6102bf82611cc956fef9768ca34b9927c41f0ddbd0cce635ef12f645937c14ca934428e6a9c05e48da36b0c3b8398693329455058d1e1551eb4ed06a51e8f6e8cffc5da55872caccd8a26469706673582212200b864b9c6e2d626ef5021a2fd97cfaaf2277a1e7556541ae8461b8d63a06d2c164736f6c63430008130033";

type S_ResolveBattleSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: S_ResolveBattleSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class S_ResolveBattleSystem__factory extends ContractFactory {
  constructor(...args: S_ResolveBattleSystemConstructorParams) {
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
  ): Promise<S_ResolveBattleSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<S_ResolveBattleSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): S_ResolveBattleSystem {
    return super.attach(address) as S_ResolveBattleSystem;
  }
  override connect(signer: Signer): S_ResolveBattleSystem__factory {
    return super.connect(signer) as S_ResolveBattleSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): S_ResolveBattleSystemInterface {
    return new utils.Interface(_abi) as S_ResolveBattleSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): S_ResolveBattleSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as S_ResolveBattleSystem;
  }
}
