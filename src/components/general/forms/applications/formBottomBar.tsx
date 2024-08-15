export function NavLink({
  children,
  onClick,
}: {
  children: any;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-white text-black font-bold rounded-md h-fit px-8 text-md p-2"
    >
      {children}
    </button>
  );
}

export function FormTabBottomBar({
  numberOfTabs,
  children,
  currentTab,
  goToNextTab,
  goToPreviousTab,
}: {
  numberOfTabs: number;
  children: React.ReactNode;
  currentTab: number;
  goToNextTab: () => void;
  goToPreviousTab: () => void;
}) {
  const place: "first" | "last" | "other" =
    currentTab === 0 ? "first" : currentTab === numberOfTabs ? "last" : "other";

  return (
    <div className=" flex justify-between gap-4  w-full items-end   py-4 border-neutral-800">
      <nav className=" items-center justify-between w-full p-2 pl-0 hidden md:flex">
        {children}
      </nav>
      {place !== "first" ? (
        <NavLink onClick={goToPreviousTab}>Back</NavLink>
      ) : (
        <div></div>
      )}
      {place !== "last" ? (
        <NavLink onClick={goToNextTab}>Next</NavLink>
      ) : (
        <div></div>
      )}
    </div>
  );
}
