import { useCallback, ReactNode } from "react";

function BuildingMenuButton({
  icon,
  text,
  menuIndex,
  menuOpenIndex,
  setMenuOpenIndex,
  children,
}: {
  icon: any;
  text: string;
  menuIndex: number;
  menuOpenIndex: number;
  setMenuOpenIndex: React.Dispatch<React.SetStateAction<number>>;
  children?: ReactNode;
}) {
  const setMenuOpenIndexHelper = useCallback(() => {
    if (menuIndex !== menuOpenIndex) {
      setMenuOpenIndex(menuIndex);
    } else {
      setMenuOpenIndex(-1);
    }
  }, [menuIndex, menuOpenIndex]);

  return (
    <>
      <button
        className="w-16 h-16 text-xs hover:brightness-75"
        onClick={setMenuOpenIndexHelper}
      >
        <img className="w-16 h-16 pixel-images" src={icon}></img>
        <div className="h-2"></div>
        {text}
      </button>
      {menuIndex === menuOpenIndex && children}
    </>
  );
}
export default BuildingMenuButton;
