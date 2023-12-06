import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMud } from "src/hooks";
import { Hex, trim } from "viem";
import { useAccount, useSignMessage } from "wagmi";
import { Button } from "../core/Button";
import { AddressDisplay } from "../hud/AddressDisplay";

type LocalToExternalResponse = { address: Hex | null; ensName: string | null };

export function Link() {
  const [linkedAddress, setLinkedAddress] = useState<LocalToExternalResponse>();
  const [signature, setSignature] = useState<string | null>(null);
  const { signMessageAsync } = useSignMessage();
  const externalAccount = useAccount();
  const { network } = useMud();

  const burnerAddress = trim(network.address);
  const fetchLocalLinkedAddress = async () => {
    const res = await fetch(
      `${import.meta.env.PRI_ACCOUNT_LINK_VERCEL_URL}/linked-address/local-to-external/${burnerAddress}`
    );
    const responseJSON = await res.json();
    setLinkedAddress(responseJSON);
  };
  useEffect(() => {
    fetchLocalLinkedAddress();
  }, [externalAccount.address, burnerAddress]);

  useEffect(() => {
    const createMessage = async () => {
      const localSignature = await network.walletClient.signMessage({ message: network.address });
      setSignature(localSignature);
    };
    createMessage();
  }, [network.walletClient, network.address]);

  const signMessageAndLink = async () => {
    if (!externalAccount || !externalAccount.address) return;
    try {
      const externalSignature = await signMessageAsync({ message: externalAccount.address });

      const body = {
        localAddress: burnerAddress,
        localSignature: signature,
        externalAddress: externalAccount.address,
        externalSignature,
      };
      const res = await fetch(`${import.meta.env.PRI_ACCOUNT_LINK_VERCEL_URL}/link`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        method: "POST",
      });
      const jsonRes = await res.json();

      if (res.status !== 200) {
        toast.error(jsonRes.message);
      } else {
        toast.success(jsonRes.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(JSON.stringify(error));
      }
    } finally {
      fetchLocalLinkedAddress();
    }
  };

  if (!externalAccount.address) return null;
  if (!linkedAddress)
    return <div className="text-gray-300 flex justify-center items-center font-bold h-full">Loading...</div>;
  if (linkedAddress.address === externalAccount.address)
    return (
      <div className="text-gray-300 flex justify-center items-center font-bold h-full">These accounts are linked</div>
    );
  return (
    <div className="flex flex-col h-full gap-2 text-left">
      <div className="text-xs text-gray-300 inline flex gap-1">
        Link your wallet (
        {linkedAddress.address ? (
          <>
            linked to
            <AddressDisplay address={linkedAddress.address} />
          </>
        ) : (
          "unlinked"
        )}
        )
      </div>
      <AddressDisplay address={externalAccount.address} notShort className="p-2 bg-gray-700 text-white text-center" />
      <p className="text-xs text-gray-300"> to your Primodium account</p>
      <AddressDisplay address={burnerAddress} notShort className="p-2 bg-gray-700 text-white text-center" />
      <Button className="btn-secondary disabled:opacity-50 flex-1" onClick={signMessageAndLink}>
        <div className="font-bold crt">Link Accounts</div>
      </Button>
    </div>
  );
}
