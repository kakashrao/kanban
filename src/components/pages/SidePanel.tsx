import useWindowDimensions from "@/hooks/windowDimensions";
import { isMobile } from "@/lib/utils";
import { StoreDispatchType, StoreSelectorType } from "@/store";
import { themeActions } from "@/store/theme";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "../ui/switch";
import CreateEditBoardDialog from "./CreateEditBoardDialog";

interface MenuItem {
  label: string;
  id: number;
}

const SidePanel: FC = () => {
  const isDarkTheme = useSelector<StoreSelectorType, boolean>(
    (state) => state.theme.isDarkTheme
  );
  const isPanelOpen = useSelector<StoreSelectorType, boolean>(
    (state) => state.theme.sidePanelOpen
  );

  const dispatch = useDispatch<StoreDispatchType>();

  const { screenWidth } = useWindowDimensions();
  const [openBoardDialog, setOpenBoardDialog] = useState(false);

  const menu: MenuItem[] = [
    { label: "Platform Launch", id: 1 },
    { label: "Marketing Plan", id: 2 },
    { label: "Roadmap", id: 3 },
  ];

  const handleThemeSwitch = () => {
    dispatch(themeActions.toggleTheme());

    if (isDarkTheme) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  const handlePanelToggle = () => {
    dispatch(themeActions.toggleSidePanel());
  };

  const handleDialogOpen = () => {
    setOpenBoardDialog(true);
  };

  return (
    <>
      <div
        id="sidepanel"
        className={`h-full border-e theme-border flex flex-col justify-between gap-5 pt-4 overflow-y-auto bg-panel${isPanelOpen ? " open" : " close"}`}
      >
        <div className="flex flex-col gap-5 grow">
          <p className="heading-s pl-[32px]">ALL BOARDS (3)</p>
          <menu
            className="overflow-y-auto flex flex-col gap-2"
            style={{ maxHeight: "calc(100vh - 353px)", minHeight: "150px" }}
          >
            {menu.map((d) => (
              <li
                key={d.id}
                className={`board flex gap-4 items-center heading-m min-h-[48px] pl-[32px] w-11/12 ${d.id === 1 ? " active" : " cursor-pointer text-muted-foreground"}`}
              >
                <i className="board-icon"></i> {d.label}
              </li>
            ))}
          </menu>
          <span
            className="flex gap-2 items-center text-secondary-foreground heading-m cursor-pointer pl-[32px]"
            onClick={handleDialogOpen}
          >
            <i className="board-icon bg-primary"></i> + Create New Board
          </span>
        </div>

        <div className="flex flex-col gap-5 pb-8">
          <div
            id="dark-light-switch"
            className={`flex items-center justify-center gap-6 h-[48px] mx-auto w-10/12 rounded${isDarkTheme ? "" : " bg-[#f4f7fd]"}`}
          >
            <img src="/assets/images/icon-light-theme.svg" alt="Light Mode" />
            <Switch variants="two-way" onClick={handleThemeSwitch} />
            <img src="/assets/images/icon-dark-theme.svg" alt="Dark Mode" />
          </div>
          {!isMobile(screenWidth) && (
            <p
              id="hide-sidebar-button"
              className="mb-0 heading-m flex items-center gap-2 text-muted-foreground cursor-pointer h-[48px] pl-[32px] w-11/12"
              onClick={handlePanelToggle}
            >
              <img
                src="/assets/images/icon-hide-sidebar.svg"
                alt="Slashed Eye"
              />{" "}
              Hide Sidebar
            </p>
          )}
        </div>
      </div>

      {!isMobile(screenWidth) && (
        <div
          id="show-sidebar-button"
          className={`${isPanelOpen ? "close" : "open"}`}
          onClick={handlePanelToggle}
        >
          <img src="/assets/images/icon-show-sidebar.svg" alt="Open eye" />
        </div>
      )}

      <CreateEditBoardDialog
        open={openBoardDialog}
        onClose={() => setOpenBoardDialog(false)}
      />
    </>
  );
};

export default SidePanel;
