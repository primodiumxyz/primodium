declare const abi: [
  {
    inputs: [
      {
        internalType: "uint256";
        name: "length";
        type: "uint256";
      },
      {
        internalType: "uint256";
        name: "accessedIndex";
        type: "uint256";
      }
    ];
    name: "Store_IndexOutOfBounds";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "uint256";
        name: "expected";
        type: "uint256";
      },
      {
        internalType: "uint256";
        name: "received";
        type: "uint256";
      }
    ];
    name: "Store_InvalidDynamicDataLength";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "uint256";
        name: "expected";
        type: "uint256";
      },
      {
        internalType: "uint256";
        name: "received";
        type: "uint256";
      }
    ];
    name: "Store_InvalidFieldNamesLength";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "uint256";
        name: "expected";
        type: "uint256";
      },
      {
        internalType: "uint256";
        name: "received";
        type: "uint256";
      }
    ];
    name: "Store_InvalidKeyNamesLength";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "bytes2";
        name: "expected";
        type: "bytes2";
      },
      {
        internalType: "ResourceId";
        name: "resourceId";
        type: "bytes32";
      },
      {
        internalType: "string";
        name: "resourceIdString";
        type: "string";
      }
    ];
    name: "Store_InvalidResourceType";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "uint40";
        name: "startWithinField";
        type: "uint40";
      },
      {
        internalType: "uint40";
        name: "deleteCount";
        type: "uint40";
      },
      {
        internalType: "uint40";
        name: "fieldLength";
        type: "uint40";
      }
    ];
    name: "Store_InvalidSplice";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "uint256";
        name: "expected";
        type: "uint256";
      },
      {
        internalType: "uint256";
        name: "received";
        type: "uint256";
      }
    ];
    name: "Store_InvalidValueSchemaLength";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "string";
        name: "tableIdString";
        type: "string";
      }
    ];
    name: "Store_TableAlreadyExists";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "string";
        name: "tableIdString";
        type: "string";
      }
    ];
    name: "Store_TableNotFound";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "string";
        name: "resource";
        type: "string";
      },
      {
        internalType: "address";
        name: "caller";
        type: "address";
      }
    ];
    name: "World_AccessDenied";
    type: "error";
  },
  {
    inputs: [];
    name: "World_AlreadyInitialized";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "bytes4";
        name: "functionSelector";
        type: "bytes4";
      }
    ];
    name: "World_CallbackNotAllowed";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "address";
        name: "delegator";
        type: "address";
      },
      {
        internalType: "address";
        name: "delegatee";
        type: "address";
      }
    ];
    name: "World_DelegationNotFound";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "bytes4";
        name: "functionSelector";
        type: "bytes4";
      }
    ];
    name: "World_FunctionSelectorAlreadyExists";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "bytes4";
        name: "functionSelector";
        type: "bytes4";
      }
    ];
    name: "World_FunctionSelectorNotFound";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "uint256";
        name: "balance";
        type: "uint256";
      },
      {
        internalType: "uint256";
        name: "amount";
        type: "uint256";
      }
    ];
    name: "World_InsufficientBalance";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "address";
        name: "contractAddress";
        type: "address";
      },
      {
        internalType: "bytes4";
        name: "interfaceId";
        type: "bytes4";
      }
    ];
    name: "World_InterfaceNotSupported";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "resourceId";
        type: "bytes32";
      },
      {
        internalType: "string";
        name: "resourceIdString";
        type: "string";
      }
    ];
    name: "World_InvalidResourceId";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "bytes2";
        name: "expected";
        type: "bytes2";
      },
      {
        internalType: "ResourceId";
        name: "resourceId";
        type: "bytes32";
      },
      {
        internalType: "string";
        name: "resourceIdString";
        type: "string";
      }
    ];
    name: "World_InvalidResourceType";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "resourceId";
        type: "bytes32";
      },
      {
        internalType: "string";
        name: "resourceIdString";
        type: "string";
      }
    ];
    name: "World_ResourceAlreadyExists";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "resourceId";
        type: "bytes32";
      },
      {
        internalType: "string";
        name: "resourceIdString";
        type: "string";
      }
    ];
    name: "World_ResourceNotFound";
    type: "error";
  },
  {
    inputs: [
      {
        internalType: "address";
        name: "system";
        type: "address";
      }
    ];
    name: "World_SystemAlreadyExists";
    type: "error";
  },
  {
    inputs: [];
    name: "World_UnlimitedDelegationNotAllowed";
    type: "error";
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: "bytes32";
        name: "storeVersion";
        type: "bytes32";
      }
    ];
    name: "HelloStore";
    type: "event";
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: "bytes32";
        name: "worldVersion";
        type: "bytes32";
      }
    ];
    name: "HelloWorld";
    type: "event";
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        indexed: false;
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      }
    ];
    name: "Store_DeleteRecord";
    type: "event";
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        indexed: false;
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        indexed: false;
        internalType: "bytes";
        name: "staticData";
        type: "bytes";
      },
      {
        indexed: false;
        internalType: "PackedCounter";
        name: "encodedLengths";
        type: "bytes32";
      },
      {
        indexed: false;
        internalType: "bytes";
        name: "dynamicData";
        type: "bytes";
      }
    ];
    name: "Store_SetRecord";
    type: "event";
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        indexed: false;
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        indexed: false;
        internalType: "uint48";
        name: "start";
        type: "uint48";
      },
      {
        indexed: false;
        internalType: "uint40";
        name: "deleteCount";
        type: "uint40";
      },
      {
        indexed: false;
        internalType: "PackedCounter";
        name: "encodedLengths";
        type: "bytes32";
      },
      {
        indexed: false;
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "Store_SpliceDynamicData";
    type: "event";
  },
  {
    anonymous: false;
    inputs: [
      {
        indexed: true;
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        indexed: false;
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        indexed: false;
        internalType: "uint48";
        name: "start";
        type: "uint48";
      },
      {
        indexed: false;
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "Store_SpliceStaticData";
    type: "event";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "accepted";
        type: "bytes32";
      }
    ];
    name: "acceptRequestToJoin";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "ResourceId";
            name: "systemId";
            type: "bytes32";
          },
          {
            internalType: "bytes";
            name: "callData";
            type: "bytes";
          }
        ];
        internalType: "struct SystemCallData[]";
        name: "systemCalls";
        type: "tuple[]";
      }
    ];
    name: "batchCall";
    outputs: [
      {
        internalType: "bytes[]";
        name: "returnDatas";
        type: "bytes[]";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address";
            name: "from";
            type: "address";
          },
          {
            internalType: "ResourceId";
            name: "systemId";
            type: "bytes32";
          },
          {
            internalType: "bytes";
            name: "callData";
            type: "bytes";
          }
        ];
        internalType: "struct SystemCallFromData[]";
        name: "systemCalls";
        type: "tuple[]";
      }
    ];
    name: "batchCallFrom";
    outputs: [
      {
        internalType: "bytes[]";
        name: "returnDatas";
        type: "bytes[]";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "attackerEntity";
        type: "bytes32";
      },
      {
        internalType: "bytes32";
        name: "defenderEntity";
        type: "bytes32";
      },
      {
        internalType: "bytes32";
        name: "rockEntity";
        type: "bytes32";
      },
      {
        internalType: "enum ESendType";
        name: "sendType";
        type: "uint8";
      }
    ];
    name: "battle";
    outputs: [
      {
        components: [
          {
            internalType: "bytes32";
            name: "attacker";
            type: "bytes32";
          },
          {
            internalType: "bytes32";
            name: "defender";
            type: "bytes32";
          },
          {
            internalType: "bytes32";
            name: "winner";
            type: "bytes32";
          },
          {
            internalType: "bytes32";
            name: "rock";
            type: "bytes32";
          },
          {
            internalType: "uint256";
            name: "totalCargo";
            type: "uint256";
          },
          {
            internalType: "uint256";
            name: "timestamp";
            type: "uint256";
          },
          {
            internalType: "uint256[]";
            name: "attackerStartingUnits";
            type: "uint256[]";
          },
          {
            internalType: "uint256[]";
            name: "defenderStartingUnits";
            type: "uint256[]";
          },
          {
            internalType: "uint256[]";
            name: "attackerUnitsLeft";
            type: "uint256[]";
          },
          {
            internalType: "uint256[]";
            name: "defenderUnitsLeft";
            type: "uint256[]";
          }
        ];
        internalType: "struct BattleResultData";
        name: "";
        type: "tuple";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "enum EBuilding";
        name: "buildingType";
        type: "uint8";
      },
      {
        components: [
          {
            internalType: "int32";
            name: "x";
            type: "int32";
          },
          {
            internalType: "int32";
            name: "y";
            type: "int32";
          },
          {
            internalType: "bytes32";
            name: "parent";
            type: "bytes32";
          }
        ];
        internalType: "struct PositionData";
        name: "coord";
        type: "tuple";
      }
    ];
    name: "build";
    outputs: [
      {
        internalType: "bytes32";
        name: "buildingEntity";
        type: "bytes32";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "systemId";
        type: "bytes32";
      },
      {
        internalType: "bytes";
        name: "callData";
        type: "bytes";
      }
    ];
    name: "call";
    outputs: [
      {
        internalType: "bytes";
        name: "";
        type: "bytes";
      }
    ];
    stateMutability: "payable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "address";
        name: "delegator";
        type: "address";
      },
      {
        internalType: "ResourceId";
        name: "systemId";
        type: "bytes32";
      },
      {
        internalType: "bytes";
        name: "callData";
        type: "bytes";
      }
    ];
    name: "callFrom";
    outputs: [
      {
        internalType: "bytes";
        name: "";
        type: "bytes";
      }
    ];
    stateMutability: "payable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "enum EObjectives";
        name: "objective";
        type: "uint8";
      }
    ];
    name: "claimObjective";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "name";
        type: "bytes32";
      },
      {
        internalType: "enum EAllianceInviteMode";
        name: "allianceInviteMode";
        type: "uint8";
      }
    ];
    name: "create";
    outputs: [
      {
        internalType: "bytes32";
        name: "allianceEntity";
        type: "bytes32";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [];
    name: "creator";
    outputs: [
      {
        internalType: "address";
        name: "";
        type: "address";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "inviter";
        type: "bytes32";
      }
    ];
    name: "declineInvite";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      }
    ];
    name: "deleteRecord";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "int32";
            name: "x";
            type: "int32";
          },
          {
            internalType: "int32";
            name: "y";
            type: "int32";
          },
          {
            internalType: "bytes32";
            name: "parent";
            type: "bytes32";
          }
        ];
        internalType: "struct PositionData";
        name: "coord";
        type: "tuple";
      }
    ];
    name: "destroy";
    outputs: [
      {
        internalType: "bytes32";
        name: "buildingEntity";
        type: "bytes32";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      }
    ];
    name: "devDeleteRecord";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      },
      {
        internalType: "uint256";
        name: "byteLengthToPop";
        type: "uint256";
      }
    ];
    name: "devPopFromDynamicField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "dataToPush";
        type: "bytes";
      }
    ];
    name: "devPushToDynamicField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "devSetDynamicField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      },
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      }
    ];
    name: "devSetField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "devSetField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "bytes";
        name: "staticData";
        type: "bytes";
      },
      {
        internalType: "PackedCounter";
        name: "encodedLengths";
        type: "bytes32";
      },
      {
        internalType: "bytes";
        name: "dynamicData";
        type: "bytes";
      }
    ];
    name: "devSetRecord";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      },
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      }
    ];
    name: "devSetStaticField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      },
      {
        internalType: "uint40";
        name: "startWithinField";
        type: "uint40";
      },
      {
        internalType: "uint40";
        name: "deleteCount";
        type: "uint40";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "devSpliceDynamicData";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint48";
        name: "start";
        type: "uint48";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "devSpliceStaticData";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "invader";
        type: "bytes32";
      },
      {
        internalType: "bytes32";
        name: "rockEntity";
        type: "bytes32";
      },
      {
        internalType: "enum ESendType";
        name: "sendType";
        type: "uint8";
      }
    ];
    name: "getAttackPoints";
    outputs: [
      {
        internalType: "uint256[]";
        name: "";
        type: "uint256[]";
      },
      {
        internalType: "uint256";
        name: "";
        type: "uint256";
      },
      {
        internalType: "uint256";
        name: "";
        type: "uint256";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      }
    ];
    name: "getDynamicField";
    outputs: [
      {
        internalType: "bytes";
        name: "";
        type: "bytes";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      }
    ];
    name: "getDynamicFieldLength";
    outputs: [
      {
        internalType: "uint256";
        name: "";
        type: "uint256";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      },
      {
        internalType: "uint256";
        name: "start";
        type: "uint256";
      },
      {
        internalType: "uint256";
        name: "end";
        type: "uint256";
      }
    ];
    name: "getDynamicFieldSlice";
    outputs: [
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      },
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      }
    ];
    name: "getField";
    outputs: [
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      }
    ];
    name: "getField";
    outputs: [
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      }
    ];
    name: "getFieldLayout";
    outputs: [
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      },
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      }
    ];
    name: "getFieldLength";
    outputs: [
      {
        internalType: "uint256";
        name: "";
        type: "uint256";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      }
    ];
    name: "getFieldLength";
    outputs: [
      {
        internalType: "uint256";
        name: "";
        type: "uint256";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      }
    ];
    name: "getKeySchema";
    outputs: [
      {
        internalType: "Schema";
        name: "keySchema";
        type: "bytes32";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      }
    ];
    name: "getRecord";
    outputs: [
      {
        internalType: "bytes";
        name: "staticData";
        type: "bytes";
      },
      {
        internalType: "PackedCounter";
        name: "encodedLengths";
        type: "bytes32";
      },
      {
        internalType: "bytes";
        name: "dynamicData";
        type: "bytes";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      }
    ];
    name: "getRecord";
    outputs: [
      {
        internalType: "bytes";
        name: "staticData";
        type: "bytes";
      },
      {
        internalType: "PackedCounter";
        name: "encodedLengths";
        type: "bytes32";
      },
      {
        internalType: "bytes";
        name: "dynamicData";
        type: "bytes";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      },
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      }
    ];
    name: "getStaticField";
    outputs: [
      {
        internalType: "bytes32";
        name: "";
        type: "bytes32";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      }
    ];
    name: "getValueSchema";
    outputs: [
      {
        internalType: "Schema";
        name: "valueSchema";
        type: "bytes32";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "resourceId";
        type: "bytes32";
      },
      {
        internalType: "address";
        name: "grantee";
        type: "address";
      }
    ];
    name: "grantAccess";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "target";
        type: "bytes32";
      },
      {
        internalType: "enum EAllianceRole";
        name: "role";
        type: "uint8";
      }
    ];
    name: "grantRole";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [];
    name: "increment";
    outputs: [
      {
        internalType: "uint256";
        name: "";
        type: "uint256";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "contract IModule";
        name: "coreModule";
        type: "address";
      }
    ];
    name: "initialize";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "contract IModule";
        name: "module";
        type: "address";
      },
      {
        internalType: "bytes";
        name: "args";
        type: "bytes";
      }
    ];
    name: "installModule";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "contract IModule";
        name: "module";
        type: "address";
      },
      {
        internalType: "bytes";
        name: "args";
        type: "bytes";
      }
    ];
    name: "installRootModule";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "rockEntity";
        type: "bytes32";
      }
    ];
    name: "invade";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "target";
        type: "bytes32";
      }
    ];
    name: "invite";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "alliance";
        type: "bytes32";
      }
    ];
    name: "join";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "target";
        type: "bytes32";
      }
    ];
    name: "kick";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [];
    name: "leave";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "int32";
            name: "x";
            type: "int32";
          },
          {
            internalType: "int32";
            name: "y";
            type: "int32";
          },
          {
            internalType: "bytes32";
            name: "parent";
            type: "bytes32";
          }
        ];
        internalType: "struct PositionData";
        name: "fromCoord";
        type: "tuple";
      },
      {
        components: [
          {
            internalType: "int32";
            name: "x";
            type: "int32";
          },
          {
            internalType: "int32";
            name: "y";
            type: "int32";
          },
          {
            internalType: "bytes32";
            name: "parent";
            type: "bytes32";
          }
        ];
        internalType: "struct PositionData";
        name: "toCoord";
        type: "tuple";
      }
    ];
    name: "moveBuilding";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      },
      {
        internalType: "uint256";
        name: "byteLengthToPop";
        type: "uint256";
      }
    ];
    name: "popFromDynamicField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "dataToPush";
        type: "bytes";
      }
    ];
    name: "pushToDynamicField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "rockEntity";
        type: "bytes32";
      }
    ];
    name: "raid";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "rockEntity";
        type: "bytes32";
      }
    ];
    name: "recallAll";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "rockEntity";
        type: "bytes32";
      },
      {
        internalType: "enum ESendType";
        name: "sendType";
        type: "uint8";
      }
    ];
    name: "recallAllOfSendType";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "rockEntity";
        type: "bytes32";
      },
      {
        internalType: "bytes32";
        name: "arrivalId";
        type: "bytes32";
      }
    ];
    name: "recallArrival";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "rockEntity";
        type: "bytes32";
      }
    ];
    name: "recallStationedUnits";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "address";
        name: "delegatee";
        type: "address";
      },
      {
        internalType: "ResourceId";
        name: "delegationControlId";
        type: "bytes32";
      },
      {
        internalType: "bytes";
        name: "initCallData";
        type: "bytes";
      }
    ];
    name: "registerDelegation";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "systemId";
        type: "bytes32";
      },
      {
        internalType: "string";
        name: "systemFunctionSignature";
        type: "string";
      }
    ];
    name: "registerFunctionSelector";
    outputs: [
      {
        internalType: "bytes4";
        name: "worldFunctionSelector";
        type: "bytes4";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "namespaceId";
        type: "bytes32";
      }
    ];
    name: "registerNamespace";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "namespaceId";
        type: "bytes32";
      },
      {
        internalType: "ResourceId";
        name: "delegationControlId";
        type: "bytes32";
      },
      {
        internalType: "bytes";
        name: "initCallData";
        type: "bytes";
      }
    ];
    name: "registerNamespaceDelegation";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "systemId";
        type: "bytes32";
      },
      {
        internalType: "string";
        name: "worldFunctionSignature";
        type: "string";
      },
      {
        internalType: "bytes4";
        name: "systemFunctionSelector";
        type: "bytes4";
      }
    ];
    name: "registerRootFunctionSelector";
    outputs: [
      {
        internalType: "bytes4";
        name: "worldFunctionSelector";
        type: "bytes4";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "contract IStoreHook";
        name: "hookAddress";
        type: "address";
      },
      {
        internalType: "uint8";
        name: "enabledHooksBitmap";
        type: "uint8";
      }
    ];
    name: "registerStoreHook";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "systemId";
        type: "bytes32";
      },
      {
        internalType: "contract WorldContextConsumer";
        name: "system";
        type: "address";
      },
      {
        internalType: "bool";
        name: "publicAccess";
        type: "bool";
      }
    ];
    name: "registerSystem";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "systemId";
        type: "bytes32";
      },
      {
        internalType: "contract ISystemHook";
        name: "hookAddress";
        type: "address";
      },
      {
        internalType: "uint8";
        name: "enabledHooksBitmap";
        type: "uint8";
      }
    ];
    name: "registerSystemHook";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      },
      {
        internalType: "Schema";
        name: "keySchema";
        type: "bytes32";
      },
      {
        internalType: "Schema";
        name: "valueSchema";
        type: "bytes32";
      },
      {
        internalType: "string[]";
        name: "keyNames";
        type: "string[]";
      },
      {
        internalType: "string[]";
        name: "fieldNames";
        type: "string[]";
      }
    ];
    name: "registerTable";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "rockEntity";
        type: "bytes32";
      },
      {
        internalType: "bytes32";
        name: "arrival";
        type: "bytes32";
      }
    ];
    name: "reinforce";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "rejectee";
        type: "bytes32";
      }
    ];
    name: "rejectRequestToJoin";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "alliance";
        type: "bytes32";
      }
    ];
    name: "requestToJoin";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "resourceId";
        type: "bytes32";
      },
      {
        internalType: "address";
        name: "grantee";
        type: "address";
      }
    ];
    name: "revokeAccess";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "target";
        type: "bytes32";
      }
    ];
    name: "revokeInvite";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "uint256[7]";
        name: "unitCounts";
        type: "uint256[7]";
      },
      {
        internalType: "enum ESendType";
        name: "sendType";
        type: "uint8";
      },
      {
        components: [
          {
            internalType: "int32";
            name: "x";
            type: "int32";
          },
          {
            internalType: "int32";
            name: "y";
            type: "int32";
          },
          {
            internalType: "bytes32";
            name: "parent";
            type: "bytes32";
          }
        ];
        internalType: "struct PositionData";
        name: "origin";
        type: "tuple";
      },
      {
        components: [
          {
            internalType: "int32";
            name: "x";
            type: "int32";
          },
          {
            internalType: "int32";
            name: "y";
            type: "int32";
          },
          {
            internalType: "bytes32";
            name: "parent";
            type: "bytes32";
          }
        ];
        internalType: "struct PositionData";
        name: "destination";
        type: "tuple";
      },
      {
        internalType: "bytes32";
        name: "to";
        type: "bytes32";
      }
    ];
    name: "sendUnits";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "setDynamicField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "setField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      },
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      }
    ];
    name: "setField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "bytes";
        name: "staticData";
        type: "bytes";
      },
      {
        internalType: "PackedCounter";
        name: "encodedLengths";
        type: "bytes32";
      },
      {
        internalType: "bytes";
        name: "dynamicData";
        type: "bytes";
      }
    ];
    name: "setRecord";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "fieldIndex";
        type: "uint8";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      },
      {
        internalType: "FieldLayout";
        name: "fieldLayout";
        type: "bytes32";
      }
    ];
    name: "setStaticField";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [];
    name: "spawn";
    outputs: [
      {
        internalType: "bytes32";
        name: "";
        type: "bytes32";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "prototypeEntity";
        type: "bytes32";
      }
    ];
    name: "spawnPirateAsteroid";
    outputs: [
      {
        internalType: "bytes32";
        name: "asteroidEntity";
        type: "bytes32";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint8";
        name: "dynamicFieldIndex";
        type: "uint8";
      },
      {
        internalType: "uint40";
        name: "startWithinField";
        type: "uint40";
      },
      {
        internalType: "uint40";
        name: "deleteCount";
        type: "uint40";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "spliceDynamicData";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "bytes32[]";
        name: "keyTuple";
        type: "bytes32[]";
      },
      {
        internalType: "uint48";
        name: "start";
        type: "uint48";
      },
      {
        internalType: "bytes";
        name: "data";
        type: "bytes";
      }
    ];
    name: "spliceStaticData";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [];
    name: "storeVersion";
    outputs: [
      {
        internalType: "bytes32";
        name: "version";
        type: "bytes32";
      }
    ];
    stateMutability: "view";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "bytes32";
        name: "buildingEntity";
        type: "bytes32";
      },
      {
        internalType: "enum EUnit";
        name: "unit";
        type: "uint8";
      },
      {
        internalType: "uint256";
        name: "count";
        type: "uint256";
      }
    ];
    name: "trainUnits";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "fromNamespaceId";
        type: "bytes32";
      },
      {
        internalType: "address";
        name: "toAddress";
        type: "address";
      },
      {
        internalType: "uint256";
        name: "amount";
        type: "uint256";
      }
    ];
    name: "transferBalanceToAddress";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "fromNamespaceId";
        type: "bytes32";
      },
      {
        internalType: "ResourceId";
        name: "toNamespaceId";
        type: "bytes32";
      },
      {
        internalType: "uint256";
        name: "amount";
        type: "uint256";
      }
    ];
    name: "transferBalanceToNamespace";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "namespaceId";
        type: "bytes32";
      },
      {
        internalType: "address";
        name: "newOwner";
        type: "address";
      }
    ];
    name: "transferOwnership";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "tableId";
        type: "bytes32";
      },
      {
        internalType: "contract IStoreHook";
        name: "hookAddress";
        type: "address";
      }
    ];
    name: "unregisterStoreHook";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "ResourceId";
        name: "systemId";
        type: "bytes32";
      },
      {
        internalType: "contract ISystemHook";
        name: "hookAddress";
        type: "address";
      }
    ];
    name: "unregisterSystemHook";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32";
            name: "attacker";
            type: "bytes32";
          },
          {
            internalType: "bytes32";
            name: "defender";
            type: "bytes32";
          },
          {
            internalType: "bytes32";
            name: "winner";
            type: "bytes32";
          },
          {
            internalType: "bytes32";
            name: "rock";
            type: "bytes32";
          },
          {
            internalType: "uint256";
            name: "totalCargo";
            type: "uint256";
          },
          {
            internalType: "uint256";
            name: "timestamp";
            type: "uint256";
          },
          {
            internalType: "uint256[]";
            name: "attackerStartingUnits";
            type: "uint256[]";
          },
          {
            internalType: "uint256[]";
            name: "defenderStartingUnits";
            type: "uint256[]";
          },
          {
            internalType: "uint256[]";
            name: "attackerUnitsLeft";
            type: "uint256[]";
          },
          {
            internalType: "uint256[]";
            name: "defenderUnitsLeft";
            type: "uint256[]";
          }
        ];
        internalType: "struct BattleResultData";
        name: "br";
        type: "tuple";
      },
      {
        internalType: "enum ESendType";
        name: "sendType";
        type: "uint8";
      }
    ];
    name: "updateUnitsAfterBattle";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "int32";
            name: "x";
            type: "int32";
          },
          {
            internalType: "int32";
            name: "y";
            type: "int32";
          },
          {
            internalType: "bytes32";
            name: "parent";
            type: "bytes32";
          }
        ];
        internalType: "struct PositionData";
        name: "coord";
        type: "tuple";
      }
    ];
    name: "upgradeBuilding";
    outputs: [
      {
        internalType: "bytes32";
        name: "buildingEntity";
        type: "bytes32";
      }
    ];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [];
    name: "upgradeRange";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [
      {
        internalType: "enum EUnit";
        name: "unit";
        type: "uint8";
      }
    ];
    name: "upgradeUnit";
    outputs: [];
    stateMutability: "nonpayable";
    type: "function";
  },
  {
    inputs: [];
    name: "worldVersion";
    outputs: [
      {
        internalType: "bytes32";
        name: "";
        type: "bytes32";
      }
    ];
    stateMutability: "view";
    type: "function";
  }
];
export default abi;
