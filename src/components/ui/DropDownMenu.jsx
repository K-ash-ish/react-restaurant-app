function DropDownMenu({ isOpen, setIsOpen, children }) {
  return (
    <ul
      className={`rounded-md shadow-md absolute top-12 md:left-0 -right-4 min-w-[120px] min-h-[80px]   text-sm  flex flex-col gap-2 py-2 bg-gray-50  z-10 font-medium  ${
        isOpen
          ? "translate-y-0 opacity-100"
          : " -translate-y-20 opacity-0 pointer-events-none"
      } transition-all duration-700 ease-in-out`}
    >
      {children}
    </ul>
  );
}

export default DropDownMenu;
