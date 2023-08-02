/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  SpendRequiredResourcesSystem,
  SpendRequiredResourcesSystemInterface,
} from "../SpendRequiredResourcesSystem";

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
        name: "targetEntity",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162002008380380620020088339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b611db280620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780636ad0ccab1461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004611872565b6100cf565b6040516100719190611925565b60405180910390f35b6100646100883660046119b3565b61098a565b6100956109d6565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c83660046119df565b610a1b565b005b606061018b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610141573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061016591906119fc565b7f57247228bbd93ac6953378fea0f421ebc4978d448f7383f1a2816e6ca6e2894d610a97565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614806102a95750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161027a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610230573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061025491906119fc565b7f4da6f081491c6405fbf6124fb31464485c6014c63905afcb67dc5016c543a3b2610a97565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b806103995750600154604080517f0d59332e000000000000000000000000000000000000000000000000000000008152905161036a9273ffffffffffffffffffffffffffffffffffffffff1691630d59332e9160048083019260209291908290030181865afa158015610320573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061034491906119fc565b7f28bd09651c4df21cfd0b15ebacd54447608ceb8cbd648faa47fc0f028f9a2285610a97565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16145b610477576040517f08c379a0000000000000000000000000000000000000000000000000000000008152602060048201526064602482018190527f5370656e6452657175697265645265736f757263657353797374656d3a204f6e60448301527f6c79204275696c6453797374656d2c205570677261646553797374656d2c2052908201527f6573656172636853797374656d2063616e2063616c6c20746869732066756e6360848201527f74696f6e0000000000000000000000000000000000000000000000000000000060a482015260c4015b60405180910390fd5b6000808380602001905181019061048e9190611a19565b9150915060006104b18373ffffffffffffffffffffffffffffffffffffffff1690565b6001546040517f4f27da180000000000000000000000000000000000000000000000000000000081527f0842a184a814d4c9890dc4a7e03369a83e6e7490abc9f169e0062ff4011b8a23600482015291925060009173ffffffffffffffffffffffffffffffffffffffff90911690634f27da1890602401602060405180830381865afa158015610545573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061056991906119fc565b6001546040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845600482015291925060009173ffffffffffffffffffffffffffffffffffffffff90911690634f27da1890602401602060405180830381865afa1580156105fd573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062191906119fc565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810186905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa15801561068f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106b39190611a47565b61070d576040805173ffffffffffffffffffffffffffffffffffffffff87166020820152908101859052606001604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0818403019052525b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810185905260009073ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401600060405180830381865afa15801561077b573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526107c19190810190611b11565b905060005b815151811015610944576000610820836000015183815181106107eb576107eb611c01565b602002602001015187604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b600154845180519293506108679273ffffffffffffffffffffffffffffffffffffffff909216918991908690811061085a5761085a611c01565b6020026020010151610be3565b600061087385836112b3565b90508473ffffffffffffffffffffffffffffffffffffffff1663d923c3c483866020015186815181106108a8576108a8611c01565b6020026020010151846108bb9190611c5f565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b15801561091757600080fd5b505af115801561092b573d6000803e3d6000fd5b505050505050808061093c90611c83565b9150506107c6565b506040805173ffffffffffffffffffffffffffffffffffffffff881660208201529081018690526060016040516020818303038152906040529650505050505050919050565b6040805173ffffffffffffffffffffffffffffffffffffffff841660208201529081018290526060906109cd9082016040516020818303038152906040526100cf565b90505b92915050565b6000610a167f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610a8b576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610a94816113df565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610b07573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610b4d9190810190611cbb565b90508051600003610bba576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640161046e565b610bdb81600081518110610bd057610bd0611c01565b602002602001015190565b949350505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f28af5d27f505af4c2623e23765f78ddc3a122099072ad9e28ef93b476bccb6c7600482015260009073ffffffffffffffffffffffffffffffffffffffff851690634f27da1890602401602060405180830381865afa158015610c70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c9491906119fc565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e600482015290915060009073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa158015610d24573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d4891906119fc565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fdf019ceabec02678aa94e8268d5bb2797644fa561da379ee235658f5a3213779600482015290915060009073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa158015610dd8573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610dfc91906119fc565b604080516020808201889052818301899052825180830384018152606090920190925280519101209091506000906040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610e98573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610ebc9190611a47565b610f4f576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810182905243602482015273ffffffffffffffffffffffffffffffffffffffff841690631ab06ee590604401600060405180830381600087803b158015610f2e57600080fd5b505af1158015610f42573d6000803e3d6000fd5b5050505050505050505050565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815260048101829052439073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa158015610fbc573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fe09190611cf0565b03610fee5750505050505050565b6000610ffa83836112b3565b905060008163ffffffff161161109a576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810183905243602482015273ffffffffffffffffffffffffffffffffffffffff851690631ab06ee590604401600060405180830381600087803b15801561107857600080fd5b505af115801561108c573d6000803e3d6000fd5b505050505050505050505050565b60006110a78989896113e8565b905060008163ffffffff1611611148576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810184905243602482015273ffffffffffffffffffffffffffffffffffffffff861690631ab06ee590604401600060405180830381600087803b15801561112557600080fd5b505af1158015611139573d6000803e3d6000fd5b50505050505050505050505050565b60006111548685611511565b61115e9043611d09565b6111689084611d1c565b61117288866112b3565b61117c9190611d44565b90508063ffffffff168263ffffffff1610156111955750805b6040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810185905243602482015273ffffffffffffffffffffffffffffffffffffffff871690631ab06ee590604401600060405180830381600087803b15801561120357600080fd5b505af1158015611217573d6000803e3d6000fd5b50506040517fd923c3c40000000000000000000000000000000000000000000000000000000081526004810187905263ffffffff8416602482015273ffffffffffffffffffffffffffffffffffffffff8a16925063d923c3c49150604401600060405180830381600087803b15801561128f57600080fd5b505af11580156112a3573d6000803e3d6000fd5b5050505050505050505050505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015611321573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113459190611a47565b6113505760006109cd565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa1580156113bb573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109cd9190611d61565b610a948161163d565b6000806113f68585856116e9565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f151064084560048201529091506000906114db9073ffffffffffffffffffffffffffffffffffffffff881690634f27da1890602401602060405180830381865afa15801561148a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114ae91906119fc565b6040805160208082018990528183018a9052825180830384018152606090920190925280519101206112b3565b90508063ffffffff168263ffffffff16116114fb5760009250505061150a565b6115058183611c5f565b925050505b9392505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa15801561157f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115a39190611a47565b6115ae5760006109cd565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa158015611619573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109cd9190611cf0565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f211ec405e276c4670499c53a5acad168c5576b06d549dd3a610b8d516174e2d96004820152600090610bdb9073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa15801561177a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061179e91906119fc565b604080516020808201879052818301889052825180830384018152606090920190925280519101206112b3565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561181d5761181d6117cb565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff8111828210171561186a5761186a6117cb565b604052919050565b6000602080838503121561188557600080fd5b823567ffffffffffffffff8082111561189d57600080fd5b818501915085601f8301126118b157600080fd5b8135818111156118c3576118c36117cb565b6118f3847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611823565b9150808252868482850101111561190957600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b8181101561195257858101830151858201604001528201611936565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b73ffffffffffffffffffffffffffffffffffffffff81168114610a9457600080fd5b600080604083850312156119c657600080fd5b82356119d181611991565b946020939093013593505050565b6000602082840312156119f157600080fd5b813561150a81611991565b600060208284031215611a0e57600080fd5b815161150a81611991565b60008060408385031215611a2c57600080fd5b8251611a3781611991565b6020939093015192949293505050565b600060208284031215611a5957600080fd5b8151801515811461150a57600080fd5b600067ffffffffffffffff821115611a8357611a836117cb565b5060051b60200190565b600082601f830112611a9e57600080fd5b81516020611ab3611aae83611a69565b611823565b82815260059290921b84018101918181019086841115611ad257600080fd5b8286015b84811015611aed5780518352918301918301611ad6565b509695505050505050565b805163ffffffff81168114611b0c57600080fd5b919050565b60006020808385031215611b2457600080fd5b825167ffffffffffffffff80821115611b3c57600080fd5b9084019060408287031215611b5057600080fd5b611b586117fa565b825182811115611b6757600080fd5b611b7388828601611a8d565b8252508383015182811115611b8757600080fd5b80840193505086601f840112611b9c57600080fd5b82519150611bac611aae83611a69565b82815260059290921b83018401918481019088841115611bcb57600080fd5b938501935b83851015611bf057611be185611af8565b82529385019390850190611bd0565b948201949094529695505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b63ffffffff828116828216039080821115611c7c57611c7c611c30565b5092915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611cb457611cb4611c30565b5060010190565b600060208284031215611ccd57600080fd5b815167ffffffffffffffff811115611ce457600080fd5b610bdb84828501611a8d565b600060208284031215611d0257600080fd5b5051919050565b818103818111156109d0576109d0611c30565b63ffffffff818116838216028082169190828114611d3c57611d3c611c30565b505092915050565b63ffffffff818116838216019080821115611c7c57611c7c611c30565b600060208284031215611d7357600080fd5b6109cd82611af856fea264697066735822122052a0f76ba41a31799c7d750f22e75d4a9fb36259b47271094a42c2672d877a3e64736f6c63430008130033";

type SpendRequiredResourcesSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SpendRequiredResourcesSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SpendRequiredResourcesSystem__factory extends ContractFactory {
  constructor(...args: SpendRequiredResourcesSystemConstructorParams) {
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
  ): Promise<SpendRequiredResourcesSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<SpendRequiredResourcesSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): SpendRequiredResourcesSystem {
    return super.attach(address) as SpendRequiredResourcesSystem;
  }
  override connect(signer: Signer): SpendRequiredResourcesSystem__factory {
    return super.connect(signer) as SpendRequiredResourcesSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SpendRequiredResourcesSystemInterface {
    return new utils.Interface(_abi) as SpendRequiredResourcesSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SpendRequiredResourcesSystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SpendRequiredResourcesSystem;
  }
}
