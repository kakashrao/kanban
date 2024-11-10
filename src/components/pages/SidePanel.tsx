import { StoreDispatchType, StoreSelectorType } from "@/store";
import { themeActions } from "@/store/theme";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "../ui/switch";

interface MenuItem {
  label: string;
  id: number;
}

const SidePanel: FC = () => {
  const isDarkTheme = useSelector<StoreSelectorType, boolean>(
    (state) => state.theme.isDarkTheme
  );
  const dispatch = useDispatch<StoreDispatchType>();

  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const menu: MenuItem[] = [
    { label: "Platform Launch", id: 1 },
    { label: "Marketing Plan", id: 2 },
    { label: "Roadmap", id: 3 },
  ];

  const handleThemeSwitch = () => {
    dispatch(themeActions.toggle());
  };

  const handlePanelToggle = () => {
    setIsPanelOpen((value) => !value);
  };

  return (
    <>
      <div
        id="sidepanel"
        className={`h-full border-e border-[#3e3f4e] flex flex-col${isPanelOpen ? " open" : " close"}`}
      >
        <div className="flex items-center h-[95px] pl-[32px]">
          {isDarkTheme ? (
            <img src="/assets/images/logo-light.svg" alt="Kanban Logo" />
          ) : (
            <img src="/assets/images/logo-dark.svg" alt="Kanban Logo" />
          )}
        </div>

        <div className="flex flex-col gap-5 mt-4 grow overflow-y-hidden">
          <p className="heading-s pl-[32px]">ALL BOARDS (3)</p>
          <menu className="overflow-y-auto">
            {menu.map((d) => (
              <li
                key={d.id}
                className={`board flex gap-4 mb-1 items-center heading-m h-[48px] pl-[32px] w-11/12 ${d.id === 1 ? " active" : " cursor-pointer text-muted-foreground"}`}
              >
                <i className="board-icon"></i> {d.label}
              </li>
            ))}
          </menu>
          <span className="flex gap-2 items-center text-secondary-foreground heading-m cursor-pointer pl-[32px]">
            <i className="board-icon bg-primary"></i> + Create New Board
          </span>
        </div>

        <div
          id="dark-light-switch"
          className={`flex items-center justify-center gap-6 h-[48px] mx-auto w-10/12 mt-3 rounded${isDarkTheme ? "" : " bg-[#f4f7fd]"}`}
        >
          <img src="/assets/images/icon-light-theme.svg" alt="Light Mode" />
          <Switch variants="two-way" onClick={handleThemeSwitch} />
          <img src="/assets/images/icon-dark-theme.svg" alt="Dark Mode" />
        </div>
        <p
          id="hide-sidebar-button"
          className="mb-0 heading-m flex items-center gap-2 mt-4 mb-7 text-muted-foreground cursor-pointer h-[48px] pl-[32px] w-11/12"
          onClick={handlePanelToggle}
        >
          <img src="/assets/images/icon-hide-sidebar.svg" alt="Slashed Eye" />{" "}
          Hide Sidebar
        </p>
      </div>

      <div
        id="show-sidebar-button"
        className={`${isPanelOpen ? "close" : "open"}`}
        onClick={handlePanelToggle}
      >
        <img src="/assets/images/icon-show-sidebar.svg" alt="Open eye" />
      </div>
    </>
  );
};

export default SidePanel;
