import { DBContext } from "@/database";
import useWindowDimensions from "@/hooks/windowDimensions";
import { isMobile } from "@/lib/utils";
import { StoreDispatchType, StoreSelectorType } from "@/store";
import { boardActions, fetchBoards } from "@/store/board";
import { themeActions } from "@/store/theme";
import { FC, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "../ui/switch";
import CreateEditBoardDialog, { BoardDialogRef } from "./CreateEditBoardDialog";

const SidePanel: FC = () => {
  const themeStore = useSelector<StoreSelectorType, StoreSelectorType["theme"]>(
    (state) => state.theme
  );
  const boardStore = useSelector<StoreSelectorType, StoreSelectorType["board"]>(
    (state) => state.board
  );

  const dispatch = useDispatch<StoreDispatchType>();
  const db = useContext(DBContext);

  const { screenWidth } = useWindowDimensions();
  const boardDialogRef = useRef<BoardDialogRef | null>(null);

  useEffect(() => {
    dispatch(fetchBoards(db));
  }, [db, dispatch]);

  const handleBoardChange = (id: string) => {
    dispatch(boardActions.changeBoard(id));
  };

  const handleThemeSwitch = () => {
    dispatch(themeActions.toggleTheme());

    if (themeStore.isDarkTheme) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  const handlePanelToggle = () => {
    dispatch(themeActions.toggleSidePanel());
  };

  const handleAddBoard = () => {
    boardDialogRef.current.open();
  };

  return (
    <>
      <div
        id="sidepanel"
        className={`h-full border-e theme-border flex flex-col justify-between gap-5 pt-4 overflow-y-auto bg-panel${themeStore.sidePanelOpen ? " open" : " close"}`}
      >
        <div className="flex flex-col gap-5 grow">
          <p className="heading-s pl-[32px]">
            ALL BOARDS ({boardStore.boards.length})
          </p>
          <menu
            className="overflow-y-auto flex flex-col gap-2"
            style={{ maxHeight: "calc(100vh - 353px)", minHeight: "150px" }}
          >
            {boardStore.boards.map((d) => (
              <li
                key={d.id}
                className={`board flex gap-4 items-center heading-m min-h-[48px] pl-[32px] w-11/12 ${d.id === boardStore.active ? " active" : " cursor-pointer text-muted-foreground"}`}
                onClick={() => handleBoardChange(d.id)}
              >
                <i className="board-icon"></i> {d.name}
              </li>
            ))}
          </menu>
          <span
            className="flex gap-2 items-center text-secondary-foreground heading-m cursor-pointer pl-[32px]"
            onClick={handleAddBoard}
          >
            <i className="board-icon bg-primary"></i> + Create New Board
          </span>
        </div>

        <div className="flex flex-col gap-5 pb-8">
          <div
            id="dark-light-switch"
            className={`flex items-center justify-center gap-6 h-[48px] mx-auto w-10/12 rounded${themeStore.isDarkTheme ? "" : " bg-[#f4f7fd]"}`}
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
          className={`${themeStore.sidePanelOpen ? "close" : "open"}`}
          onClick={handlePanelToggle}
        >
          <img src="/assets/images/icon-show-sidebar.svg" alt="Open eye" />
        </div>
      )}

      <CreateEditBoardDialog ref={boardDialogRef} />
    </>
  );
};

export default SidePanel;
