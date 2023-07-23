/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  StarterPackSystem,
  StarterPackSystemInterface,
} from "../StarterPackSystem";

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
    inputs: [],
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
  "0x608060405234801561001057600080fd5b50604051610dff380380610dff83398101604081905261002f916101ce565b818161003a3361013c565b6001600160a01b0381161561004f57806100b1565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801561008d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100b19190610208565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505061022c565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811681146101cb57600080fd5b50565b600080604083850312156101e157600080fd5b82516101ec816101b6565b60208401519092506101fd816101b6565b809150509250929050565b60006020828403121561021a57600080fd5b8151610225816101b6565b9392505050565b610bc48061023b6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063e1df4ba6146100a7578063f2fde38b146100af575b600080fd5b61006461005f3660046108ef565b6100c4565b60405161007191906109a2565b60405180910390f35b6100826103a6565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646103eb565b6100c26100bd366004610a0e565b610412565b005b600080546060919061010c9073ffffffffffffffffffffffffffffffffffffffff167fb960aa6b4dad4bf34ff8cbba3dcd159af30f5ac6616c8dad47d3c63876d9023061048e565b6040517fcccf7a8e00000000000000000000000000000000000000000000000000000000815233600482015290915073ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa158015610179573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061019d9190610a44565b801561023257506040517f0ff4c91600000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff821690630ff4c91690602401602060405180830381865afa15801561020e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102329190610a44565b1561025a57604080516000602082015201604051602081830303815290604052915050919050565b6000805461029e9073ffffffffffffffffffffffffffffffffffffffff167ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084561048e565b90506102fc816102f57f88897217b7ca352fa62012bfb0aa451ebca6a6ff9208f9698f717331232152a733604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b60c86105e0565b6040517f60fe47b100000000000000000000000000000000000000000000000000000000815233600482015273ffffffffffffffffffffffffffffffffffffffff8316906360fe47b190602401600060405180830381600087803b15801561036357600080fd5b505af1158015610377573d6000803e3d6000fd5b5050604080516001602082015201915061038e9050565b60405160208183030381529060405292505050919050565b60006103e67f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60408051600160208201526060916103e691016040516020818303038152906040526100c4565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610482576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61048b81610689565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa1580156104fe573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105449190810190610a66565b905080516000036105b5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640160405180910390fd5b6105d6816000815181106105cb576105cb610b0c565b602002602001015190565b9150505b92915050565b60006105ec8484610692565b905073ffffffffffffffffffffffffffffffffffffffff8416631ab06ee5846106158585610b3b565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561066b57600080fd5b505af115801561067f573d6000803e3d6000fd5b5050505050505050565b61048b816107c5565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610700573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107249190610a44565b61072f5760006107be565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa15801561079a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107be9190610b75565b9392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156108e7576108e7610871565b604052919050565b6000602080838503121561090257600080fd5b823567ffffffffffffffff8082111561091a57600080fd5b818501915085601f83011261092e57600080fd5b81358181111561094057610940610871565b610970847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016108a0565b9150808252868482850101111561098657600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b818110156109cf578581018301518582016040015282016109b3565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b600060208284031215610a2057600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146107be57600080fd5b600060208284031215610a5657600080fd5b815180151581146107be57600080fd5b60006020808385031215610a7957600080fd5b825167ffffffffffffffff80821115610a9157600080fd5b818501915085601f830112610aa557600080fd5b815181811115610ab757610ab7610871565b8060051b9150610ac88483016108a0565b8181529183018401918481019088841115610ae257600080fd5b938501935b83851015610b0057845182529385019390850190610ae7565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b808201808211156105da577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600060208284031215610b8757600080fd5b505191905056fea2646970667358221220301d507486af4c0ae86f2a68cd7c9eda90458db2aa5140c9cddcd08cbfc309dd64736f6c63430008130033";

type StarterPackSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StarterPackSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StarterPackSystem__factory extends ContractFactory {
  constructor(...args: StarterPackSystemConstructorParams) {
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
  ): Promise<StarterPackSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<StarterPackSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): StarterPackSystem {
    return super.attach(address) as StarterPackSystem;
  }
  override connect(signer: Signer): StarterPackSystem__factory {
    return super.connect(signer) as StarterPackSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StarterPackSystemInterface {
    return new utils.Interface(_abi) as StarterPackSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StarterPackSystem {
    return new Contract(address, _abi, signerOrProvider) as StarterPackSystem;
  }
}
