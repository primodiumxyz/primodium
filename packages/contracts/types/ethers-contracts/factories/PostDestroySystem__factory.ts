/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  PostDestroySystem,
  PostDestroySystemInterface,
} from "../PostDestroySystem";

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
  "0x60806040523480156200001157600080fd5b5060405162002540380380620025408339810160408190526200003491620001e0565b8181818162000043336200014d565b6001600160a01b038116156200005a5780620000bf565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000099573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bf91906200021f565b600080546001600160a01b039283166001600160a01b0319918216811790925560018054938616938216841790557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805482169093179092557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a86805490921617905550505050505062000246565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046080546040516001600160a01b038481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b0381168114620001dd57600080fd5b50565b60008060408385031215620001f457600080fd5b82516200020181620001c7565b60208401519092506200021481620001c7565b809150509250929050565b6000602082840312156200023257600080fd5b81516200023f81620001c7565b9392505050565b6122ea80620002566000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780636ad0ccab1461007a5780638da5cb5b1461008d578063f2fde38b146100ba575b600080fd5b61006461005f366004611d64565b6100cf565b6040516100719190611e17565b60405180910390f35b610064610088366004611ea5565b610438565b610095610484565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100cd6100c8366004611ed1565b6104c9565b005b606061018b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16630d59332e6040518163ffffffff1660e01b8152600401602060405180830381865afa158015610141573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101659190611ef5565b7fd573ac88b34a4d827762c3f1e7dc53ea2b602480271c42f976cd9097a3985a01610545565b73ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461024a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603a60248201527f506f73745570677261646553797374656d3a204f6e6c79204275696c6453797360448201527f74656d2063616e2063616c6c20746869732066756e6374696f6e00000000000060648201526084015b60405180910390fd5b600080838060200190518101906102619190611f12565b9150915060006102848373ffffffffffffffffffffffffffffffffffffffff1690565b60008054919250906102cc9073ffffffffffffffffffffffffffffffffffffffff167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c5610545565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916846040518263ffffffff1660e01b815260040161030691815260200190565b602060405180830381865afa158015610323573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103479190611f40565b60005490915061041b90839083906103959073ffffffffffffffffffffffffffffffffffffffff167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e610545565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916876040518263ffffffff1660e01b81526004016103cf91815260200190565b602060405180830381865afa1580156103ec573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104109190611f72565b63ffffffff16610691565b6104258284610a86565b61042f8284610fc7565b50505050919050565b6040805173ffffffffffffffffffffffffffffffffffffffff8416602082015290810182905260609061047b9082016040516020818303038152906040526100cf565b90505b92915050565b60006104c47f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314610539576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610542816113b1565b50565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa1580156105b5573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01682016040526105fb919081019061201c565b90508051600003610668576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f7420726567697374657265640000000000000000000000000000006044820152606401610241565b6106898160008151811061067e5761067e612051565b602002602001015190565b949350505050565b60006106bc7fb3c62762a3762f5f11947c1589f40ecb45ee2b286a2a0d62946782f12d42327a6113ba565b905060006106e97ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f15106408456113ba565b604080516020808201889052818301879052825180830384018152606090920190925280519101209091506000906040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015610785573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107a99190612080565b6107b557505050505050565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401600060405180830381865afa158015610823573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610869919081019061201c565b905060005b8151811015610a7c5760006108c383838151811061088e5761088e612051565b60200260200101518a604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b9050600061090d600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168b86868151811061090057610900612051565b60200260200101516113de565b9050600061094a600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168787878151811061090057610900612051565b905061099e600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168c87878151811061098557610985612051565b6020026020010151848661099991906120d1565b6114c0565b60006109aa8885611ae5565b90506109b682846120d1565b63ffffffff168163ffffffff161115610a655773ffffffffffffffffffffffffffffffffffffffff881663d923c3c4856109f085876120d1565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b158015610a4c57600080fd5b505af1158015610a60573d6000803e3d6000fd5b505050505b505050508080610a74906120f5565b91505061086e565b5050505050505050565b60008054610aca9073ffffffffffffffffffffffffffffffffffffffff167fb97afac52ae5f7b24a52b3a0db2b85c24836c8b85ef3410293168fb1dd71be7c610545565b6000805491925090610c8190610b169073ffffffffffffffffffffffffffffffffffffffff167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c5610545565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916856040518263ffffffff1660e01b8152600401610b5091815260200190565b602060405180830381865afa158015610b6d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b919190611f40565b600054610bd49073ffffffffffffffffffffffffffffffffffffffff167fbd262b900b9f3e3d6078d7a8e45d1bee5f4fd9547063f524ac4cbf611d37b44e610545565b73ffffffffffffffffffffffffffffffffffffffff16630ff4c916866040518263ffffffff1660e01b8152600401610c0e91815260200190565b602060405180830381865afa158015610c2b573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610c4f9190611f72565b63ffffffff16604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa158015610cef573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d139190612080565b15610fc15760008054610d5c9073ffffffffffffffffffffffffffffffffffffffff167f68ea6257b83ac1dab41007760f358c545b17057605f2afaaf2b719f7ec38cec0610545565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905290915060009073ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401600060405180830381865afa158015610dcd573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052610e13919081019061212d565b905060005b815151811015610fbd576000610e7283600001518381518110610e3d57610e3d612051565b602002602001015189604080516020808201949094528082019290925280518083038201815260609092019052805191012090565b90508373ffffffffffffffffffffffffffffffffffffffff1663d923c3c48285602001518581518110610ea757610ea7612051565b60200260200101518773ffffffffffffffffffffffffffffffffffffffff16630ff4c916866040518263ffffffff1660e01b8152600401610eea91815260200190565b602060405180830381865afa158015610f07573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f2b9190611f72565b610f3591906120d1565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b158015610f9157600080fd5b505af1158015610fa5573d6000803e3d6000fd5b50505050508080610fb5906120f5565b915050610e18565b5050505b50505050565b6000805461100b9073ffffffffffffffffffffffffffffffffffffffff167f2f51bb3db6fee58a002d21e1cd28ae3babf34dd1f46f8ed1e48748a2f7e58db6610545565b600080549192509061105790610b169073ffffffffffffffffffffffffffffffffffffffff167f7562ebb298d855e68fb2922ace89e271e36c031fb473ee4be72f900215d523c5610545565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff83169063cccf7a8e90602401602060405180830381865afa1580156110c5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110e99190612080565b15610fc1576040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff841690630ff4c916906024016040805180830381865afa15801561115b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061117f919061221d565b5160008054919250906111c89073ffffffffffffffffffffffffffffffffffffffff167f159cc46a31f72f01f0447b0d7fdc3e796e2fa044c2be35b352589e5b5b0194f5610545565b6040805160208082018690528183018a9052825180830384018152606090920190925280519101209091506000906040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810182905290915060009073ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa158015611267573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061128b9190611f72565b90508273ffffffffffffffffffffffffffffffffffffffff1663d923c3c4838873ffffffffffffffffffffffffffffffffffffffff16630ff4c916896040518263ffffffff1660e01b81526004016112e591815260200190565b6040805180830381865afa158015611301573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611325919061221d565b6020015161133390856120d1565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b168152600481019290925263ffffffff166024820152604401600060405180830381600087803b15801561138f57600080fd5b505af11580156113a3573d6000803e3d6000fd5b505050505050505050505050565b61054281611c11565b6000805461047e9073ffffffffffffffffffffffffffffffffffffffff1683610545565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f211ec405e276c4670499c53a5acad168c5576b06d549dd3a610b8d516174e2d960048201526000906106899073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa15801561146f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114939190611ef5565b60408051602080820187905281830188905282518083038401815260609092019092528051910120611ae5565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527f211ec405e276c4670499c53a5acad168c5576b06d549dd3a610b8d516174e2d9600482015260009073ffffffffffffffffffffffffffffffffffffffff861690634f27da1890602401602060405180830381865afa15801561154d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115719190611ef5565b6040517f4f27da180000000000000000000000000000000000000000000000000000000081527fb3c62762a3762f5f11947c1589f40ecb45ee2b286a2a0d62946782f12d42327a600482015290915060009073ffffffffffffffffffffffffffffffffffffffff871690634f27da1890602401602060405180830381865afa158015611601573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116259190611ef5565b604080516020808201889052818301899052825180830384018152606090920190925280519101209091506000906040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905290915073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa1580156116c1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906116e59190612080565b611a50576040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810187905260609073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015611757573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061177b9190612080565b15611988576040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810188905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401600060405180830381865afa1580156117eb573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052611831919081019061201c565b90506000815160016118439190612253565b67ffffffffffffffff81111561185b5761185b611cbd565b604051908082528060200260200182016040528015611884578160200160208202803683370190505b50905060005b82518110156118dc578281815181106118a5576118a5612051565b60200260200101518282815181106118bf576118bf612051565b6020908102919091010152806118d4816120f5565b91505061188a565b5086818351815181106118f1576118f1612051565b60209081029190910101526040517f946aadc600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff85169063946aadc690611950908b908590600401612266565b600060405180830381600087803b15801561196a57600080fd5b505af115801561197e573d6000803e3d6000fd5b5050505050611a4e565b604080516001808252818301909252906020808301908036833701905050905085816000815181106119bc576119bc612051565b60209081029190910101526040517f946aadc600000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff84169063946aadc690611a1b908a908590600401612266565b600060405180830381600087803b158015611a3557600080fd5b505af1158015611a49573d6000803e3d6000fd5b505050505b505b6040517fd923c3c40000000000000000000000000000000000000000000000000000000081526004810182905263ffffffff8516602482015273ffffffffffffffffffffffffffffffffffffffff84169063d923c3c490604401600060405180830381600087803b158015611ac457600080fd5b505af1158015611ad8573d6000803e3d6000fd5b5050505050505050505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa158015611b53573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611b779190612080565b611b8257600061047b565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa158015611bed573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061047b9190611f72565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff81118282101715611d0f57611d0f611cbd565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611d5c57611d5c611cbd565b604052919050565b60006020808385031215611d7757600080fd5b823567ffffffffffffffff80821115611d8f57600080fd5b818501915085601f830112611da357600080fd5b813581811115611db557611db5611cbd565b611de5847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f84011601611d15565b91508082528684828501011115611dfb57600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b81811015611e4457858101830151858201604001528201611e28565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b73ffffffffffffffffffffffffffffffffffffffff8116811461054257600080fd5b60008060408385031215611eb857600080fd5b8235611ec381611e83565b946020939093013593505050565b600060208284031215611ee357600080fd5b8135611eee81611e83565b9392505050565b600060208284031215611f0757600080fd5b8151611eee81611e83565b60008060408385031215611f2557600080fd5b8251611f3081611e83565b6020939093015192949293505050565b600060208284031215611f5257600080fd5b5051919050565b805163ffffffff81168114611f6d57600080fd5b919050565b600060208284031215611f8457600080fd5b61047b82611f59565b600067ffffffffffffffff821115611fa757611fa7611cbd565b5060051b60200190565b600082601f830112611fc257600080fd5b81516020611fd7611fd283611f8d565b611d15565b82815260059290921b84018101918181019086841115611ff657600080fd5b8286015b848110156120115780518352918301918301611ffa565b509695505050505050565b60006020828403121561202e57600080fd5b815167ffffffffffffffff81111561204557600080fd5b61068984828501611fb1565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561209257600080fd5b81518015158114611eee57600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b63ffffffff8281168282160390808211156120ee576120ee6120a2565b5092915050565b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203612126576121266120a2565b5060010190565b6000602080838503121561214057600080fd5b825167ffffffffffffffff8082111561215857600080fd5b908401906040828703121561216c57600080fd5b612174611cec565b82518281111561218357600080fd5b61218f88828601611fb1565b82525083830151828111156121a357600080fd5b80840193505086601f8401126121b857600080fd5b825191506121c8611fd283611f8d565b82815260059290921b830184019184810190888411156121e757600080fd5b938501935b8385101561220c576121fd85611f59565b825293850193908501906121ec565b948201949094529695505050505050565b60006040828403121561222f57600080fd5b612237611cec565b8251815261224760208401611f59565b60208201529392505050565b8082018082111561047e5761047e6120a2565b6000604082018483526020604081850152818551808452606086019150828701935060005b818110156122a75784518352938301939183019160010161228b565b509097965050505050505056fea264697066735822122063a021add7e41d49d2b8b083231f917130d42a6c19a4922325c903a41423c9f964736f6c63430008130033";

type PostDestroySystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PostDestroySystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PostDestroySystem__factory extends ContractFactory {
  constructor(...args: PostDestroySystemConstructorParams) {
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
  ): Promise<PostDestroySystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<PostDestroySystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): PostDestroySystem {
    return super.attach(address) as PostDestroySystem;
  }
  override connect(signer: Signer): PostDestroySystem__factory {
    return super.connect(signer) as PostDestroySystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PostDestroySystemInterface {
    return new utils.Interface(_abi) as PostDestroySystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PostDestroySystem {
    return new Contract(address, _abi, signerOrProvider) as PostDestroySystem;
  }
}
