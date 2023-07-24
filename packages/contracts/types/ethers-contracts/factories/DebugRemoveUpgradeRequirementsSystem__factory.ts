/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  DebugRemoveUpgradeRequirementsSystem,
  DebugRemoveUpgradeRequirementsSystemInterface,
} from "../DebugRemoveUpgradeRequirementsSystem";

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
        internalType: "uint256",
        name: "buildingId",
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
        internalType: "uint256",
        name: "buildingId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "level",
        type: "uint256",
      },
    ],
    name: "removeRequiredResourcesAndTechnologyConditionsForUpgradingBuildingIdLevel",
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
  "0x608060405234801561001057600080fd5b5060405162000ea038038062000ea0833981016040819052610031916101d0565b818161003c3361013e565b6001600160a01b0381161561005157806100b3565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801561008f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100b3919061020a565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505061022e565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03811681146101cd57600080fd5b50565b600080604083850312156101e357600080fd5b82516101ee816101b8565b60208401519092506101ff816101b8565b809150509250929050565b60006020828403121561021c57600080fd5b8151610227816101b8565b9392505050565b610c62806200023e6000396000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c8063596317c811610050578063596317c8146100a85780638da5cb5b146100bb578063f2fde38b146100e857600080fd5b806309c5eabe1461006c5780633e991df314610095575b600080fd5b61007f61007a366004610900565b6100fd565b60405161008c91906109b3565b60405180910390f35b61007f6100a3366004610a1f565b6101d5565b61007f6100b6366004610a38565b610207565b6100c3610477565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200161008c565b6100fb6100f6366004610a7c565b6104bc565b005b6001546060906101229073ffffffffffffffffffffffffffffffffffffffff16610538565b61018d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f4e6f7420696e206465627567206d6f646500000000000000000000000000000060448201526064015b60405180910390fd5b6000828060200190518101906101a39190610aa0565b905060005b60648110156101ce576101bb8282610207565b50806101c681610ab9565b9150506101a8565b5050919050565b6060610201826040516020016101ed91815260200190565b6040516020818303038152906040526100fd565b92915050565b60015460609061022c9073ffffffffffffffffffffffffffffffffffffffff16610538565b610292576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f4e6f7420696e206465627567206d6f64650000000000000000000000000000006044820152606401610184565b600080546102d69073ffffffffffffffffffffffffffffffffffffffff167f1203294d5b2b02e65b2344f70a790c2cf726d3822e7f267d74f37f3dbe44a344610682565b600080549192509061031e9073ffffffffffffffffffffffffffffffffffffffff167f0842a184a814d4c9890dc4a7e03369a83e6e7490abc9f169e0062ff4011b8a23610682565b604080516020808201899052818301889052825180830384018152606083019384905280519101207f4cc8221500000000000000000000000000000000000000000000000000000000909252606481019190915290915073ffffffffffffffffffffffffffffffffffffffff831690634cc8221590608401600060405180830381600087803b1580156103b057600080fd5b505af11580156103c4573d6000803e3d6000fd5b50506040805160208082018a9052818301899052825180830384018152606083019384905280519101207f4cc8221500000000000000000000000000000000000000000000000000000000909252606481019190915273ffffffffffffffffffffffffffffffffffffffff84169250634cc822159150608401600060405180830381600087803b15801561045757600080fd5b505af115801561046b573d6000803e3d6000fd5b50505050505092915050565b60006104b77f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff16331461052c576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610535816107ce565b50565b60006105d28273ffffffffffffffffffffffffffffffffffffffff1663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa158015610588573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105ac9190610b18565b7fc3e18fdee44dca3d8fa1615250f268046d17fbc35f417d176d5c09d7ca8d3202610682565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081527fc3e18fdee44dca3d8fa1615250f268046d17fbc35f417d176d5c09d7ca8d3202600482015273ffffffffffffffffffffffffffffffffffffffff919091169063cccf7a8e90602401602060405180830381865afa15801561065e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102019190610b35565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa1580156106f2573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526107389190810190610b57565b905080516000036107a5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f7420726567697374657265640000000000000000000000000000006044820152606401610184565b6107c6816000815181106107bb576107bb610bfd565b602002602001015190565b949350505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804608054604051610535928492909173ffffffffffffffffffffffffffffffffffffffff8085169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156108f8576108f8610882565b604052919050565b6000602080838503121561091357600080fd5b823567ffffffffffffffff8082111561092b57600080fd5b818501915085601f83011261093f57600080fd5b81358181111561095157610951610882565b610981847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f840116016108b1565b9150808252868482850101111561099757600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b818110156109e0578581018301518582016040015282016109c4565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b600060208284031215610a3157600080fd5b5035919050565b60008060408385031215610a4b57600080fd5b50508035926020909101359150565b73ffffffffffffffffffffffffffffffffffffffff8116811461053557600080fd5b600060208284031215610a8e57600080fd5b8135610a9981610a5a565b9392505050565b600060208284031215610ab257600080fd5b5051919050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203610b11577f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b5060010190565b600060208284031215610b2a57600080fd5b8151610a9981610a5a565b600060208284031215610b4757600080fd5b81518015158114610a9957600080fd5b60006020808385031215610b6a57600080fd5b825167ffffffffffffffff80821115610b8257600080fd5b818501915085601f830112610b9657600080fd5b815181811115610ba857610ba8610882565b8060051b9150610bb98483016108b1565b8181529183018401918481019088841115610bd357600080fd5b938501935b83851015610bf157845182529385019390850190610bd8565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fdfea2646970667358221220459425fb39524034b2ac1c7eead197dcbd6367fc0fa8eb7406855f482af82f5364736f6c63430008130033";

type DebugRemoveUpgradeRequirementsSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DebugRemoveUpgradeRequirementsSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class DebugRemoveUpgradeRequirementsSystem__factory extends ContractFactory {
  constructor(...args: DebugRemoveUpgradeRequirementsSystemConstructorParams) {
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
  ): Promise<DebugRemoveUpgradeRequirementsSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<DebugRemoveUpgradeRequirementsSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): DebugRemoveUpgradeRequirementsSystem {
    return super.attach(address) as DebugRemoveUpgradeRequirementsSystem;
  }
  override connect(
    signer: Signer
  ): DebugRemoveUpgradeRequirementsSystem__factory {
    return super.connect(
      signer
    ) as DebugRemoveUpgradeRequirementsSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DebugRemoveUpgradeRequirementsSystemInterface {
    return new utils.Interface(
      _abi
    ) as DebugRemoveUpgradeRequirementsSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DebugRemoveUpgradeRequirementsSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as DebugRemoveUpgradeRequirementsSystem;
  }
}
