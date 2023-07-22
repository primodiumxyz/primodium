/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  PostUpgradeFactorySystem,
  PostUpgradeFactorySystemInterface,
} from "../PostUpgradeFactorySystem";

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
        name: "buildingEntity",
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
  "0x60806040523480156200001157600080fd5b50604051620025dd380380620025dd8339810160408190526200003491620001dc565b8181620000413362000149565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200021b565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8680549092161790555050505062000242565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001d957600080fd5b50565b60008060408385031215620001f057600080fd5b8251620001fd81620001c3565b60208401519092506200021081620001c3565b809150509250929050565b6000602082840312156200022e57600080fd5b81516200023b81620001c3565b9392505050565b61238b80620002526000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780636ad0ccab1461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004611f76565b6100cf565b6040516100719190612029565b60405180910390f35b6100646100883660046120b7565b6102b5565b610095610301565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c83660046120e3565b610346565b005b606061018b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610141573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101659190612107565b7f4da6f081491c6405fbf6124fb31464485c6014c63905afcb67dc5016c543a3b26103c2565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461024a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603c60248201527f506f73745570677261646553797374656d3a204f6e6c7920557067726164655360448201527f797374656d2063616e2063616c6c20746869732066756e6374696f6e0000000060648201526084015b60405180910390fd5b600080838060200190518101906102619190612124565b9150915060006102848373ffffffffffffffffffffffffffffffffffffffff1690565b9050610290818361050e565b6040805160208101849052016040516020818303038152906040529350505050919050565b6040805173ffffffffffffffffffffffffffffffffffffffff841660208201529081018290526060906102f89082016040516020818303038152906040526100cf565b90505b92915050565b60006103417f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1633146103b6576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103bf81610da9565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015610432573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526104789190810190612152565b905080516000036104e5576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f7420726567697374657265640000000000000000000000000000006044820152606401610241565b610506816000815181106104fb576104fb6121f8565b602002602001015190565b949350505050565b600080546105529073ffffffffffffffffffffffffffffffffffffffff167fcabc06205c984db0f3ebca7b107980eafab5163e9a8d77445f085dc3030950b96103c2565b600080549192509061059a9073ffffffffffffffffffffffffffffffffffffffff167ff79fe0c9ac8ebbe25f4c70b53af3a544460171cd0578bf2b3c5291c3d98a47ec6103c2565b60008054919250906105e29073ffffffffffffffffffffffffffffffffffffffff167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e6103c2565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810186905290915073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610650573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106749190612227565b61067f575050505050565b600080546106c39073ffffffffffffffffffffffffffffffffffffffff167f98ae6e39b6a858b1e7ad1d701d4818f1fd32693c155ff6b2221a4140af0d79196103c2565b905060006108018373ffffffffffffffffffffffffffffffffffffffff16630ff4c916886040518263ffffffff1660e01b815260040161070591815260200190565b602060405180830381865afa158015610722573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107469190612249565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810189905273ffffffffffffffffffffffffffffffffffffffff871690630ff4c91690602401602060405180830381865afa1580156107b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107d59190612249565b604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6001546040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018390529192506108a69173ffffffffffffffffffffffffffffffffffffffff918216918a9190861690630ff4c916906024016040805180830381865afa15801561087c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108a09190612262565b51610db2565b60008273ffffffffffffffffffffffffffffffffffffffff16630ff4c9166109df8673ffffffffffffffffffffffffffffffffffffffff16630ff4c9168b6040518263ffffffff1660e01b815260040161090291815260200190565b602060405180830381865afa15801561091f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109439190612249565b6040517f0ff4c916000000000000000000000000000000000000000000000000000000008152600481018c905260019073ffffffffffffffffffffffffffffffffffffffff8b1690630ff4c91690602401602060405180830381865afa1580156109b1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109d59190612249565b6107d591906122e0565b6040518263ffffffff1660e01b81526004016109fd91815260200190565b6040805180830381865afa158015610a19573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a3d9190612262565b8051604080516020808201939093528082018c90528151808203830181526060909101909152805191012060005491925090610abd9088908890610ab79073ffffffffffffffffffffffffffffffffffffffff167f0d469bcaf5f43a6290ca2906ecdeb5ef80d7723e8cad27045bddb6e1eb9da4356103c2565b8b6115d8565b15610c445760015460208301516040517f0ff4c91600000000000000000000000000000000000000000000000000000000815260048101869052610c3f9273ffffffffffffffffffffffffffffffffffffffff9081169285929091891690630ff4c916906024016040805180830381865afa158015610b40573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b649190612262565b60200151610b7291906122e0565b600054610bb59073ffffffffffffffffffffffffffffffffffffffff167fd76fe4a121a9b3538dd84ce7c5dcb89d64902d545f492b90d7d3123d5c4f61256103c2565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916866040518263ffffffff1660e01b8152600401610bef91815260200190565b602060405180830381865afa158015610c0c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c309190612249565b610c3a91906122f3565b611895565b610d9e565b6040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810189905273ffffffffffffffffffffffffffffffffffffffff881690634cc8221590602401600060405180830381600087803b158015610cac57600080fd5b505af1158015610cc0573d6000803e3d6000fd5b50506001546020850151600054610d9e945073ffffffffffffffffffffffffffffffffffffffff92831693508592610d1991167fd76fe4a121a9b3538dd84ce7c5dcb89d64902d545f492b90d7d3123d5c4f61256103c2565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916866040518263ffffffff1660e01b8152600401610d5391815260200190565b602060405180830381865afa158015610d70573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d949190612249565b610c3a91906122e0565b505050505050505050565b6103bf81611c75565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f28af5d27f505af4c2623e23765f78ddc3a122099072ad9e28ef93b476bccb6c7600482015260009073ffffffffffffffffffffffffffffffffffffffff851690634f27da1890602401602060405180830381865afa158015610e3f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e639190612107565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e600482015290915060009073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa158015610ef3573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f179190612107565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f9f85518fa78d19707d21ed71beac799d54132f94e1d11ffd9d00557724d9b47f600482015290915060009073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa158015610fa7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610fcb9190612107565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fd76fe4a121a9b3538dd84ce7c5dcb89d64902d545f492b90d7d3123d5c4f6125600482015290915060009073ffffffffffffffffffffffffffffffffffffffff881690634f27da1890602401602060405180830381865afa15801561105b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061107f9190612107565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845600482015290915060009073ffffffffffffffffffffffffffffffffffffffff891690634f27da1890602401602060405180830381865afa15801561110f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111339190612107565b6040805160208082018a90528183018b9052825180830384018152606090920190925280519101209091506000906040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff86169063cccf7a8e90602401602060405180830381865afa1580156111cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906111f39190612227565b611288576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810182905243602482015273ffffffffffffffffffffffffffffffffffffffff861690631ab06ee590604401600060405180830381600087803b15801561126557600080fd5b505af1158015611279573d6000803e3d6000fd5b50505050505050505050505050565b6040517f0ff4c91600000000000000000000000000000000000000000000000000000000815260048101829052439073ffffffffffffffffffffffffffffffffffffffff871690630ff4c91690602401602060405180830381865afa1580156112f5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906113199190612249565b0361132957505050505050505050565b60006113358483611d21565b9050600081116113d1576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810183905243602482015273ffffffffffffffffffffffffffffffffffffffff871690631ab06ee590604401600060405180830381600087803b1580156113ad57600080fd5b505af11580156113c1573d6000803e3d6000fd5b5050505050505050505050505050565b60006113df86858c8c611e4d565b90506000811161147c576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810184905243602482015273ffffffffffffffffffffffffffffffffffffffff881690631ab06ee590604401600060405180830381600087803b15801561145757600080fd5b505af115801561146b573d6000803e3d6000fd5b505050505050505050505050505050565b60006114888885611d21565b61149290436122e0565b61149c9084612306565b6114a68a86611d21565b6114b091906122f3565b9050808210156114bd5750805b6040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810185905243602482015273ffffffffffffffffffffffffffffffffffffffff891690631ab06ee590604401600060405180830381600087803b15801561152b57600080fd5b505af115801561153f573d6000803e3d6000fd5b50506040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018790526024810184905273ffffffffffffffffffffffffffffffffffffffff8c169250631ab06ee59150604401600060405180830381600087803b1580156115b257600080fd5b505af11580156115c6573d6000803e3d6000fd5b50505050505050505050505050505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff86169063cccf7a8e90602401602060405180830381865afa158015611646573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061166a9190612227565b61167657506000610506565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905260009073ffffffffffffffffffffffffffffffffffffffff861690630ff4c91690602401602060405180830381865afa1580156116e4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906117089190612249565b6040517ffbdfa1ea0000000000000000000000000000000000000000000000000000000081526004810185905290915060009073ffffffffffffffffffffffffffffffffffffffff86169063fbdfa1ea90602401600060405180830381865afa158015611779573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526117bf9190810190612152565b905060005b815181101561188757828773ffffffffffffffffffffffffffffffffffffffff16630ff4c9168484815181106117fc576117fc6121f8565b60200260200101516040518263ffffffff1660e01b815260040161182291815260200190565b602060405180830381865afa15801561183f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118639190612249565b10156118755760009350505050610506565b8061187f8161231d565b9150506117c4565b506001979650505050505050565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fd76fe4a121a9b3538dd84ce7c5dcb89d64902d545f492b90d7d3123d5c4f6125600482015260009073ffffffffffffffffffffffffffffffffffffffff851690634f27da1890602401602060405180830381865afa158015611922573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119469190612107565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e600482015290915060009073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa1580156119d6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906119fa9190612107565b905060008311611b01576040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff821690634cc8221590602401600060405180830381600087803b158015611a6c57600080fd5b505af1158015611a80573d6000803e3d6000fd5b50506040517f4cc822150000000000000000000000000000000000000000000000000000000081526004810187905273ffffffffffffffffffffffffffffffffffffffff85169250634cc8221591506024015b600060405180830381600087803b158015611aed57600080fd5b505af1158015610d9e573d6000803e3d6000fd5b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810185905273ffffffffffffffffffffffffffffffffffffffff82169063cccf7a8e90602401602060405180830381865afa158015611b6c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b909190612227565b611c1b576040517f1ab06ee50000000000000000000000000000000000000000000000000000000081526004810185905243602482015273ffffffffffffffffffffffffffffffffffffffff821690631ab06ee590604401600060405180830381600087803b158015611c0257600080fd5b505af1158015611c16573d6000803e3d6000fd5b505050505b6040517f1ab06ee5000000000000000000000000000000000000000000000000000000008152600481018590526024810184905273ffffffffffffffffffffffffffffffffffffffff831690631ab06ee590604401611ad3565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015611d8f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611db39190612227565b611dbe5760006102f8565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa158015611e29573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102f89190612249565b600080611e5b868585611ec2565b90506000611e9986611e948688604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b611d21565b9050808211611ead57600092505050610506565b611eb781836122e0565b979650505050505050565b60408051602080820184905281830185905282518083038401815260609092019092528051910120600090610506908590611d21565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611f6e57611f6e611ef8565b604052919050565b60006020808385031215611f8957600080fd5b823567ffffffffffffffff80821115611fa157600080fd5b818501915085601f830112611fb557600080fd5b813581811115611fc757611fc7611ef8565b611ff7847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611f27565b9150808252868482850101111561200d57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b818110156120565785810183015185820160400152820161203a565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b73ffffffffffffffffffffffffffffffffffffffff811681146103bf57600080fd5b600080604083850312156120ca57600080fd5b82356120d581612095565b946020939093013593505050565b6000602082840312156120f557600080fd5b813561210081612095565b9392505050565b60006020828403121561211957600080fd5b815161210081612095565b6000806040838503121561213757600080fd5b825161214281612095565b6020939093015192949293505050565b6000602080838503121561216557600080fd5b825167ffffffffffffffff8082111561217d57600080fd5b818501915085601f83011261219157600080fd5b8151818111156121a3576121a3611ef8565b8060051b91506121b4848301611f27565b81815291830184019184810190888411156121ce57600080fd5b938501935b838510156121ec578451825293850193908501906121d3565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561223957600080fd5b8151801515811461210057600080fd5b60006020828403121561225b57600080fd5b5051919050565b60006040828403121561227457600080fd5b6040516040810181811067ffffffffffffffff8211171561229757612297611ef8565b604052825181526020928301519281019290925250919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b818103818111156102fb576102fb6122b1565b808201808211156102fb576102fb6122b1565b80820281158282048414176102fb576102fb6122b1565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361234e5761234e6122b1565b506001019056fea26469706673582212202c4ec13d70e8f50f4a472c49866233b89af42815a03d27b3e4a14e47ea7e05b064736f6c63430008130033";

type PostUpgradeFactorySystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PostUpgradeFactorySystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PostUpgradeFactorySystem__factory extends ContractFactory {
  constructor(...args: PostUpgradeFactorySystemConstructorParams) {
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
  ): Promise<PostUpgradeFactorySystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<PostUpgradeFactorySystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): PostUpgradeFactorySystem {
    return super.attach(address) as PostUpgradeFactorySystem;
  }
  override connect(signer: Signer): PostUpgradeFactorySystem__factory {
    return super.connect(signer) as PostUpgradeFactorySystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PostUpgradeFactorySystemInterface {
    return new utils.Interface(_abi) as PostUpgradeFactorySystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PostUpgradeFactorySystem {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as PostUpgradeFactorySystem;
  }
}
