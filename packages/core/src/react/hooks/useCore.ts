import { useContext } from "react";
import { CoreContext } from "@/react/hooks/providers/CoreProvider";
import { Core } from "@/lib/types";

/**
 * Provides access to the CoreContext.
 * Throws an error if used outside of a Core Provider.
 * @returns The value from the CoreContext.
 * @throws {Error} If used outside of a Core Provider.
 */
export const useCore = (): Core => {
  const value = useContext(CoreContext);
  if (!value) throw new Error("Must be used within a Core Provider");
  return value;
};
