/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  ClaimFromFactorySystem,
  ClaimFromFactorySystemInterface,
} from "../ClaimFromFactorySystem";

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
    stateMutability: "pure",
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
    stateMutability: "pure",
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
  "0x608060405234801561001057600080fd5b5060405161077238038061077283398101604081905261002f916101d2565b8181818161003c33610140565b6001600160a01b0381161561005157806100b3565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801561008f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100b3919061020c565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054909216179055505050505050610230565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811681146101cf57600080fd5b50565b600080604083850312156101e557600080fd5b82516101f0816101ba565b6020840151909250610201816101ba565b809150509250929050565b60006020828403121561021e57600080fd5b8151610229816101ba565b9392505050565b6105338061023f6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461009a578063cb6cbba7146100c7578063f2fde38b146100da575b600080fd5b61008461005f366004610313565b6040805160006020820152606091016040516020818303038152906040529050919050565b60405161009191906103e2565b60405180910390f35b6100a26100ef565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610091565b6100846100d5366004610465565b610134565b6100ed6100e83660046104c0565b6101b4565b005b600061012f7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60606101ae8260405160200161016391908151600390810b8252602092830151900b9181019190915260400190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403019052818152600060208381019190915281518084039091018152918101905290565b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610224576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61022d81610230565b50565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405161022d928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b60006020828403121561032557600080fd5b813567ffffffffffffffff8082111561033d57600080fd5b818401915084601f83011261035157600080fd5b813581811115610363576103636102e4565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0908116603f011681019083821181831017156103a9576103a96102e4565b816040528281528760208487010111156103c257600080fd5b826020860160208301376000928101602001929092525095945050505050565b600060208083528351808285015260005b8181101561040f578581018301518582016040015282016103f3565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b8035600381900b811461046057600080fd5b919050565b60006040828403121561047757600080fd5b6040516040810181811067ffffffffffffffff8211171561049a5761049a6102e4565b6040526104a68361044e565b81526104b46020840161044e565b60208201529392505050565b6000602082840312156104d257600080fd5b813573ffffffffffffffffffffffffffffffffffffffff811681146104f657600080fd5b939250505056fea2646970667358221220a32f45c20e5842d826ffe165797e4204a050e26898ed1bca448fbe075f52dfd164736f6c63430008130033";

type ClaimFromFactorySystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ClaimFromFactorySystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ClaimFromFactorySystem__factory extends ContractFactory {
  constructor(...args: ClaimFromFactorySystemConstructorParams) {
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
  ): Promise<ClaimFromFactorySystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<ClaimFromFactorySystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): ClaimFromFactorySystem {
    return super.attach(address) as ClaimFromFactorySystem;
  }
  override connect(signer: Signer): ClaimFromFactorySystem__factory {
    return super.connect(signer) as ClaimFromFactorySystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ClaimFromFactorySystemInterface {
    return new utils.Interface(_abi) as ClaimFromFactorySystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ClaimFromFactorySystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as ClaimFromFactorySystem;
  }
}
