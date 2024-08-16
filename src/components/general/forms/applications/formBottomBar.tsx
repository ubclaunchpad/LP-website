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
    <div className=" flex justify-between gap-4  w-full items-end  lg:px-10 p-4 border-neutral-800">
      {place !== "first" && place !== "last" ? (
        <NavLink onClick={goToPreviousTab}>Back</NavLink>
      ) : (
        <div />
      )}
      {place !== "last" && <NavLink onClick={goToNextTab}>Next</NavLink>}
    </div>
  );
}
