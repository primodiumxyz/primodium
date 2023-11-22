import { Entity } from "@latticexyz/recs";
import { useEffect, useState } from "react";
import { Button } from "src/components/core/Button";
import { components } from "src/network/components";
import { Hex, createPublicClient, formatEther, trim } from "viem";
import { getEnsAddress } from "viem/ens";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

interface TransferTokenProps {
  onTransfer: (address: string, amount: number) => Promise<void>;
  className?: string;
  burnerAddress: Hex;
  externalEntity: Entity;
  client: ReturnType<typeof createPublicClient>;
}

export const TransferToken: React.FC<TransferTokenProps> = ({
  onTransfer,
  className,
  burnerAddress,
  externalEntity,
  client,
}) => {
  const [input, setInput] = useState<string>(trim(burnerAddress) ?? "");
  const [valid, setValid] = useState<boolean>(true);
  const [address, setAddress] = useState<string | null>(null);
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    const fetchEnsName = async (address: string | null) => {
      if (address?.endsWith(".eth")) {
        const addr = await getEnsAddress(client, { name: address });
        setValid(addr !== null);
        setAddress(addr);
      }

      if (address?.startsWith("0x") && address.length === 42) {
        setValid(true);
        setAddress(address);
        return;
      }
      setValid(false);
      setAddress(null);
      return;
    };
    fetchEnsName(input);
  }, [input, client]);

  const externalAccount = useAccount();
  const chain = useNetwork().chain;
  const expectedChain = externalAccount.connector?.chains[0];
  const { isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

  const wrongChain = chain?.id !== expectedChain?.id;
  const balance = components.WETHBalance.use(externalEntity)?.value ?? 0n;

  const handleTransfer = async () => {
    const amountNum = Math.round(Number(amount) * 1e18);
    if (address && amountNum > 0) {
      await onTransfer(address, amountNum);
      setAmount("");
    } else {
      alert("Please enter a valid address and amount.");
    }
  };

  if (!expectedChain) return null;
  const Btn = () =>
    wrongChain ? (
      <Button
        disabled={!switchNetwork || expectedChain.id === chain?.id}
        key={expectedChain.id}
        onClick={() => switchNetwork?.(expectedChain.id)}
        className="btn-secondary grow"
      >
        Switch to {expectedChain.name}
        {isLoading && pendingChainId === expectedChain.id && " (switching)"}
      </Button>
    ) : (
      <Button
        disabled={!valid || !amount || amount === "0" || !address}
        className="btn-secondary grow"
        onClick={handleTransfer}
      >
        <p>transfer</p>
      </Button>
    );

  return (
    <div className={className + " flex flex-col gap-2 h-full"}>
      <div className="relative flex items-center">
        <input
          type="text"
          className={`py-6 px-2 text-sm rounded-md bg-base-100 w-full border ${
            valid ? "border-secondary/25 active:border-secondary/25" : "active:border-error border-error bg-error/25"
          }  disabled:opacity-50`}
          placeholder="enter 0x address or ens name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={wrongChain}
        />
        {address == burnerAddress && (
          <div className="absolute left-2 top-10 text-xs text-gray-500 italic">your Primodium account</div>
        )}
      </div>
      <div className="relative flex items-center">
        <div className="absolute right-2 text-xs flex flex-col items-center">
          <Button
            className="btn-secondary btn-xs w-full disabled:opacity-50"
            disabled={wrongChain || formatEther(balance) === amount}
            onClick={() => setAmount(formatEther(balance))}
          >
            max
          </Button>
          {!wrongChain && <p className="text-gray-400">Balance: {formatEther(balance)}</p>}
        </div>
        <input
          type="number"
          className="py-6 px-2 text-sm rounded-md bg-base-100 border border-secondary/25 w-full disabled:opacity-50"
          placeholder="amount"
          value={amount}
          disabled={wrongChain}
          onChange={(e) => {
            const value = Number(e.target.value);
            const bal = Number(balance) / 1e18;
            if (value < 0) {
              setAmount("");
              return;
            }
            if (value > bal) {
              return;
            }
            setAmount(e.target.value);
          }}
        />
      </div>
      <Btn />
    </div>
  );
};
