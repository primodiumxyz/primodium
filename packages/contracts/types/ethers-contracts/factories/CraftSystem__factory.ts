/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { CraftSystem, CraftSystemInterface } from "../CraftSystem";

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
  "0x60806040523480156200001157600080fd5b5060405162002b2338038062002b2383398101604081905262000034916200022c565b818162000041336200010f565b6001600160a01b03811615620000585780620000bd565b816001600160a01b031663ba62fbe46040518163ffffffff1660e01b8152600401602060405180830381865afa15801562000097573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190620000bd91906200026b565b600080546001600160a01b03199081166001600160a01b0393841690811790925560018054909116928516928317905562000105919062000183602090811b62001a7617901c565b5050505062000292565b600062000126620001ef60201b62001b071760201c565b80546040519192506001600160a01b03808516929116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380546001600160a01b0319166001600160a01b0392909216919091179055565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a8780546001600160a01b039384166001600160a01b0319918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6001600160a01b03811681146200022957600080fd5b50565b600080604083850312156200024057600080fd5b82516200024d8162000213565b6020840151909250620002608162000213565b809150509250929050565b6000602082840312156200027e57600080fd5b81516200028b8162000213565b9392505050565b61288180620002a26000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c806309c5eabe146100515780638da5cb5b1461007a578063cb6cbba7146100a7578063f2fde38b146100ba575b600080fd5b61006461005f3660046124ba565b6100cf565b604051610071919061256d565b60405180910390f35b61008261196c565b60405173ffffffffffffffffffffffffffffffffffffffff9091168152602001610071565b6100646100b53660046125e8565b6119b1565b6100cd6100c8366004612629565b6119fa565b005b6040805160a08101909152600080546060929081906101249073ffffffffffffffffffffffffffffffffffffffff167f49a4584d9706380e35459e1f31e673445371b5bac20aa516f8ba8650b1843106611b2b565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161017291167f30f1c358b0a577824afcc8e464bcbd763eba254820a547b425765e75cc511f1e611b2b565b73ffffffffffffffffffffffffffffffffffffffff90811682526000546020909201916101c091167faf90be6cd7aa92d6569a9ae629178b74e1b0fbdd1097c27ec1dfffd2dc4c7540611b2b565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161020e91167fe95fc307e3922a4ed7e1a9d135b2e79aad91e806428d8c7ec9a376dfc8aede5e611b2b565b73ffffffffffffffffffffffffffffffffffffffff908116825260005460209092019161025c91167f2fc9fa89c3e33fdaa5feead211018b3d0b1d3edd613228f7f320915fddd8d039611b2b565b73ffffffffffffffffffffffffffffffffffffffff90811690915260008054929350916102aa91167ffba48a04766694c16713a414735f83be9cb20bbb29b5e18846cc8f1510640845611b2b565b90506000848060200190518101906102c2919061265f565b83516040517fbf3bf26a0000000000000000000000000000000000000000000000000000000081528251600390810b60048301526020840151900b602482015291925060009173ffffffffffffffffffffffffffffffffffffffff9091169063bf3bf26a90604401600060405180830381865afa158015610347573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016820160405261038d9190810190612694565b90508051600114610425576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603160248201527f5b437261667453797374656d5d2043616e6e6f7420637261667420617420616e60448201527f20656d70747920636f6f7264696e61746500000000000000000000000000000060648201526084015b60405180910390fd5b6000846040015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168360008151811061045a5761045a61273a565b60200260200101516040518263ffffffff1660e01b815260040161048091815260200190565b602060405180830381865afa15801561049d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104c19190612769565b9050338114610552576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603360248201527f5b437261667453797374656d5d2043616e6e6f7420637261667420617420612060448201527f74696c6520796f7520646f206e6f74206f776e00000000000000000000000000606482015260840161041c565b61057a85608001518360008151811061056d5761056d61273a565b6020026020010151611c77565b610606576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603560248201527f5b437261667453797374656d5d2043616e6e6f7420637261667420617420612060448201527f74696c652077697468207a65726f206865616c74680000000000000000000000606482015260840161041c565b7f02fcfa4b1578384291174d276cbf45b9ac04481dd20e0e1051d17c6fa0028ce360001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168460008151811061065d5761065d61273a565b60200260200101516040518263ffffffff1660e01b815260040161068391815260200190565b602060405180830381865afa1580156106a0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106c49190612769565b036107625761075d847f88897217b7ca352fa62012bfb0aa451ebca6a6ff9208f9698f717331232152a760001c60017f9182d0838cda5b8b8d04b7fdb048ae0d49c90dd4f4ef46ab0958cf6328dfb2ca60001c60017f4952f11b5e88ffd88b7a0231ee67228cf0d58eb081bf31517c674f44264c783f60001c886000815181106107505761075061273a565b6020026020010151611daf565b611945565b7f5e81ec12aa8c2bb4493ce21f35dff56bf746562d8ebf1185b42b173bc80bcace60001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106107b9576107b961273a565b60200260200101516040518263ffffffff1660e01b81526004016107df91815260200190565b602060405180830381865afa1580156107fc573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108209190612769565b036108935761075d847f88897217b7ca352fa62012bfb0aa451ebca6a6ff9208f9698f717331232152a760001c600a7f7deaae6bb7615fd1b4e86953f0141ba774ea3adbdd6e2ee244147bfb86aaace560001c866000815181106108865761088661273a565b602002602001015161201e565b7f9794860cce6121893962dba8949d43114cb9f47063158452a8495d9f41ac14fa60001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106108ea576108ea61273a565b60200260200101516040518263ffffffff1660e01b815260040161091091815260200190565b602060405180830381865afa15801561092d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109519190612769565b036109dd5761075d847f17025afdea42119548a0a5f9ec0cdbdcb19e7a9f4b475913071021a3cdbb5bfd60001c60647f88897217b7ca352fa62012bfb0aa451ebca6a6ff9208f9698f717331232152a760001c60147fbbf0e151801f18e0d112665520a2c0dc8c9590ce85e2851f7f78de30c4c6d51a60001c886000815181106107505761075061273a565b7fca256d02eff068cb848bbd6ac96fb95b98adc5396d2d6e5f8c75e35cf2a11d3a60001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110610a3457610a3461273a565b60200260200101516040518263ffffffff1660e01b8152600401610a5a91815260200190565b602060405180830381865afa158015610a77573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a9b9190612769565b03610b275761075d847fbbf0e151801f18e0d112665520a2c0dc8c9590ce85e2851f7f78de30c4c6d51a60001c600a7f416cd867e38826680c4261f20f5285dd44a10270a8118bdeec1383c9a089cf0460001c60147fec80ff155d880c151528d536ae07261be7e0f0ec79c8853fb5205684633239dc60001c886000815181106107505761075061273a565b7fcd4c83c6e4baad660288e899134b848be43d250ebe563a35a7440fe6f9420da160001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110610b7e57610b7e61273a565b60200260200101516040518263ffffffff1660e01b8152600401610ba491815260200190565b602060405180830381865afa158015610bc1573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610be59190612769565b03610c4b5761075d847f6c4cf968092a55522769ad001f5a4d068bbdc6ea30a7d8f460833f83e9c9727c60001c600a7f5affe8a57277a7102b0bbaade99cebaf060fa104c6f9b2ef54bc3d0b5009e46360001c866000815181106108865761088661273a565b7fbf16ee459ff450e19286f18a5254f689662eba512e1106efa83ea886d6e8821c60001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110610ca257610ca261273a565b60200260200101516040518263ffffffff1660e01b8152600401610cc891815260200190565b602060405180830381865afa158015610ce5573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610d099190612769565b03610d955761075d847f5affe8a57277a7102b0bbaade99cebaf060fa104c6f9b2ef54bc3d0b5009e46360001c600a7fbbf0e151801f18e0d112665520a2c0dc8c9590ce85e2851f7f78de30c4c6d51a60001c60027f19ddbba09381803c7aefa2731f58c344a8370583a0b53b4213e30ce69a4c85c060001c886000815181106107505761075061273a565b7fd8a643fa318db8acc88940eb9acac255a3e4f548e97580eb7f2ddde0b5cb611660001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110610dec57610dec61273a565b60200260200101516040518263ffffffff1660e01b8152600401610e1291815260200190565b602060405180830381865afa158015610e2f573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e539190612769565b03610edf5761075d847f5affe8a57277a7102b0bbaade99cebaf060fa104c6f9b2ef54bc3d0b5009e46360001c60147f19ddbba09381803c7aefa2731f58c344a8370583a0b53b4213e30ce69a4c85c060001c60057ff86d50efe05e7dda79c003b5d4de9920855994c36c1e10fc14b46aaa116073c660001c886000815181106107505761075061273a565b7ff9c605cb8149d0ae8a5d9cd09945aec188d2a15377677572b521bfb0be5c80ed60001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c91684600081518110610f3657610f3661273a565b60200260200101516040518263ffffffff1660e01b8152600401610f5c91815260200190565b602060405180830381865afa158015610f79573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610f9d9190612769565b036110295761075d847ff86d50efe05e7dda79c003b5d4de9920855994c36c1e10fc14b46aaa116073c660001c60017fec80ff155d880c151528d536ae07261be7e0f0ec79c8853fb5205684633239dc60001c60017f0c3016c3f177a1aea6cba33a3ccb8e01cef39a514cc6bb0b1223aecdbbbd349260001c886000815181106107505761075061273a565b7f4250341db0b18fc0ae00a738f16aeb77fe5059ea1e4098b78488b807d408d56e60001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106110805761108061273a565b60200260200101516040518263ffffffff1660e01b81526004016110a691815260200190565b602060405180830381865afa1580156110c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110e79190612769565b0361114d5761075d847ff22d62753c9bef149557affda667bdaa3aff1e69179b0c09e101bfc462bf4fae60001c600a7f86e73de3ac620e292e280fd2df5d7acbc4c214f5d881d6a384e0de3ad7d91cd560001c866000815181106108865761088661273a565b7f13a481631ba1249ac750d2ad108f78a8c956c66fd1d62cd2c0b446a3c865bb2b60001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106111a4576111a461273a565b60200260200101516040518263ffffffff1660e01b81526004016111ca91815260200190565b602060405180830381865afa1580156111e7573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061120b9190612769565b036112715761075d847fb533b87fd579e6a4bd7adf53c6573acece50e469a2a3480b5694a32c710af29160001c600a7f411675c9d4275dfb3010259013ee279130ee32a3a7d9b6372c9b3a0cf2fe007c60001c866000815181106108865761088661273a565b7f32e6f87aceaa4c2d319159525e4fac7cd17c3e4ceede167599303bd1d5f7729e60001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106112c8576112c861273a565b60200260200101516040518263ffffffff1660e01b81526004016112ee91815260200190565b602060405180830381865afa15801561130b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061132f9190612769565b036113bb5761075d847f411675c9d4275dfb3010259013ee279130ee32a3a7d9b6372c9b3a0cf2fe007c60001c60057f86e73de3ac620e292e280fd2df5d7acbc4c214f5d881d6a384e0de3ad7d91cd560001c600a7fd9418932daa63d0584685e5e12e024d763737dd3d7987cba52901bb702a71eba60001c886000815181106107505761075061273a565b7fcfb56e2ea348454073fc6d4fe422a5963dc9b1be76c7f4e4e6bc8cfde39ad2b960001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106114125761141261273a565b60200260200101516040518263ffffffff1660e01b815260040161143891815260200190565b602060405180830381865afa158015611455573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906114799190612769565b036115055761075d847f411675c9d4275dfb3010259013ee279130ee32a3a7d9b6372c9b3a0cf2fe007c60001c600a7f19ddbba09381803c7aefa2731f58c344a8370583a0b53b4213e30ce69a4c85c060001c60057fcb4b1a16e996a77db534cc9953e3a609aaf28bd5d6665555df84fa08ffc0346560001c886000815181106107505761075061273a565b7fc29111c1b03ec36b7ed76742c49be3e45c7472f5cdc4036eb832638f3d23f5ad60001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c9168460008151811061155c5761155c61273a565b60200260200101516040518263ffffffff1660e01b815260040161158291815260200190565b602060405180830381865afa15801561159f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906115c39190612769565b0361164f5761075d847fd9418932daa63d0584685e5e12e024d763737dd3d7987cba52901bb702a71eba60001c60017fcb4b1a16e996a77db534cc9953e3a609aaf28bd5d6665555df84fa08ffc0346560001c60017f91f93424fea36c7a4a1a3de34568499e2122a2870b9f421088a80c2566a3479360001c886000815181106107505761075061273a565b7f289820e95a6c3cf395995d62838f0bbba15a6ec752a76e93cb97b7987a6c693560001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106116a6576116a661273a565b60200260200101516040518263ffffffff1660e01b81526004016116cc91815260200190565b602060405180830381865afa1580156116e9573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061170d9190612769565b036117995761075d847f0c3016c3f177a1aea6cba33a3ccb8e01cef39a514cc6bb0b1223aecdbbbd349260001c600a7f91f93424fea36c7a4a1a3de34568499e2122a2870b9f421088a80c2566a3479360001c60017fdf054c8ff646f055efa75559586847c60a9365d45c0aa564f013bf3ad4f3621f60001c886000815181106107505761075061273a565b7f8354814bff380a814aa9c24aa870ea78a3087fff7347465e1c0cfc24cea1013360001c856020015173ffffffffffffffffffffffffffffffffffffffff16630ff4c916846000815181106117f0576117f061273a565b60200260200101516040518263ffffffff1660e01b815260040161181691815260200190565b602060405180830381865afa158015611833573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906118579190612769565b036118bd5761075d847fae6e54a2162e6ef6bb60a2555b10f3160acb04e5d6181837025ff5cdd9df7ff160001c600a7feca34f2b0223a68bf924ac6039230f608d3402b84363c664fc8e2dadbef21f9e60001c866000815181106108865761088661273a565b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603260248201527f5b437261667453797374656d5d2043616e6e6f742063726166742066726f6d2060448201527f61206e6f6e2d666163746f72792074696c650000000000000000000000000000606482015260840161041c565b60408051600060208201520160405160208183030381529060405295505050505050919050565b60006119ac7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff1690565b905090565b60606119f4826040516020016119e091908151600390810b8252602092830151900b9181019190915260400190565b6040516020818303038152906040526100cf565b92915050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f6716804605473ffffffffffffffffffffffffffffffffffffffff163314611a6a576040517f2f7a8ee100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611a73816121ab565b50565b7ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a87805473ffffffffffffffffffffffffffffffffffffffff9384167fffffffffffffffffffffffff0000000000000000000000000000000000000000918216179091557ff67304f10c7772c78e439bc5cb07781db345424de8878c18100fdaa64d197a868054929093169116179055565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f67168046090565b6040517ffbdfa1ea00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063fbdfa1ea90602401600060405180830381865afa158015611b9b573d6000803e3d6000fd5b505050506040513d6000823e601f3d9081017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0168201604052611be19190810190612694565b90508051600003611c4e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f6964206e6f742072656769737465726564000000000000000000000000000000604482015260640161041c565b611c6f81600081518110611c6457611c6461273a565b602002602001015190565b949350505050565b6040517fcccf7a8e00000000000000000000000000000000000000000000000000000000815260048101829052600090819073ffffffffffffffffffffffffffffffffffffffff85169063cccf7a8e90602401602060405180830381865afa158015611ce7573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611d0b9190612782565b611d16576064611da5565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810184905273ffffffffffffffffffffffffffffffffffffffff851690630ff4c91690602401602060405180830381865afa158015611d81573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190611da59190612769565b1515949350505050565b6000611dc988611dc489856121b4565b6121b4565b612234565b90506000611ddb89611dc488866121b4565b90506000611ded8a611dc487876121b4565b90506000611dfb89856127d3565b90506000611e0988856127d3565b9050600081831115611e1b5781611e1d565b825b905073ffffffffffffffffffffffffffffffffffffffff8d16631ab06ee5611e458e8a6121b4565b611e4f8e8561280e565b611e59908a612825565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015611eaf57600080fd5b505af1158015611ec3573d6000803e3d6000fd5b505050508c73ffffffffffffffffffffffffffffffffffffffff16631ab06ee5611eee8c611dbf8b90565b611ef88c8561280e565b611f029089612825565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015611f5857600080fd5b505af1158015611f6c573d6000803e3d6000fd5b505050508c73ffffffffffffffffffffffffffffffffffffffff16631ab06ee5611f978a611dbf8b90565b611fa18488612838565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b158015611ff757600080fd5b505af115801561200b573d6000803e3d6000fd5b5050505050505050505050505050505050565b600061202a85836121b4565b9050600061203884846121b4565b905060006120468884612234565b905060006120548984612234565b9050600061206288846127d3565b90506000612070898361280e565b905073ffffffffffffffffffffffffffffffffffffffff8b16631ab06ee5876120998488612825565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b1580156120ef57600080fd5b505af1158015612103573d6000803e3d6000fd5b505050508a73ffffffffffffffffffffffffffffffffffffffff16631ab06ee58684866121309190612838565b6040517fffffffff0000000000000000000000000000000000000000000000000000000060e085901b16815260048101929092526024820152604401600060405180830381600087803b15801561218657600080fd5b505af115801561219a573d6000803e3d6000fd5b505050505050505050505050505050565b611a7381612367565b600082826040516020016121f792919091825260601b7fffffffffffffffffffffffffffffffffffffffff00000000000000000000000016602082015260340190565b604080517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081840301815291905280516020909101209392505050565b6040517fcccf7a8e0000000000000000000000000000000000000000000000000000000081526004810182905260009073ffffffffffffffffffffffffffffffffffffffff84169063cccf7a8e90602401602060405180830381865afa1580156122a2573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906122c69190612782565b6122d1576000612360565b6040517f0ff4c9160000000000000000000000000000000000000000000000000000000081526004810183905273ffffffffffffffffffffffffffffffffffffffff841690630ff4c91690602401602060405180830381865afa15801561233c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906123609190612769565b9392505050565b7f8a22373512790c48b83a1fe2efdd2888d4a917bcdc24d0adf63e60f671680460805460405173ffffffffffffffffffffffffffffffffffffffff8481169216907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a380547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff92909216919091179055565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561246557612465612413565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff811182821017156124b2576124b2612413565b604052919050565b600060208083850312156124cd57600080fd5b823567ffffffffffffffff808211156124e557600080fd5b818501915085601f8301126124f957600080fd5b81358181111561250b5761250b612413565b61253b847fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8401160161246b565b9150808252868482850101111561255157600080fd5b8084840185840137600090820190930192909252509392505050565b600060208083528351808285015260005b8181101561259a5785810183015185820160400152820161257e565b5060006040828601015260407fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f8301168501019250505092915050565b8060030b8114611a7357600080fd5b6000604082840312156125fa57600080fd5b612602612442565b823561260d816125d9565b8152602083013561261d816125d9565b60208201529392505050565b60006020828403121561263b57600080fd5b813573ffffffffffffffffffffffffffffffffffffffff8116811461236057600080fd5b60006040828403121561267157600080fd5b612679612442565b8251612684816125d9565b8152602083015161261d816125d9565b600060208083850312156126a757600080fd5b825167ffffffffffffffff808211156126bf57600080fd5b818501915085601f8301126126d357600080fd5b8151818111156126e5576126e5612413565b8060051b91506126f684830161246b565b818152918301840191848101908884111561271057600080fd5b938501935b8385101561272e57845182529385019390850190612715565b98975050505050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60006020828403121561277b57600080fd5b5051919050565b60006020828403121561279457600080fd5b8151801515811461236057600080fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600082612809577f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b500490565b80820281158282048414176119f4576119f46127a4565b818103818111156119f4576119f46127a4565b808201808211156119f4576119f46127a456fea2646970667358221220dbc3601a382b1e089bad6d65e0398500e0025c833761f94f48c2b7c1bec0719664736f6c63430008110033";

type CraftSystemConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: CraftSystemConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class CraftSystem__factory extends ContractFactory {
  constructor(...args: CraftSystemConstructorParams) {
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
  ): Promise<CraftSystem> {
    return super.deploy(
      _world,
      _components,
      overrides || {}
    ) as Promise<CraftSystem>;
  }
  override getDeployTransaction(
    _world: PromiseOrValue<string>,
    _components: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_world, _components, overrides || {});
  }
  override attach(address: string): CraftSystem {
    return super.attach(address) as CraftSystem;
  }
  override connect(signer: Signer): CraftSystem__factory {
    return super.connect(signer) as CraftSystem__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CraftSystemInterface {
    return new utils.Interface(_abi) as CraftSystemInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CraftSystem {
    return new Contract(address, _abi, signerOrProvider) as CraftSystem;
  }
}
