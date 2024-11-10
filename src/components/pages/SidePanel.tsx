import { FC } from "react";
import { Switch } from "../ui/switch";

interface MenuItem {
  label: string;
  id: number;
}

const SidePanel: FC = () => {
  const isDarkMode = false;
  const menu: MenuItem[] = [
    { label: "Platform Launch", id: 1 },
    { label: "Marketing Plan", id: 2 },
    { label: "Roadmap", id: 3 },
  ];

  return (
    <div
      id="sidepanel"
      className="h-full border-e border-[#3e3f4e] flex flex-col"
    >
      <div className="flex items-center h-[95px] pl-[32px]">
        {isDarkMode ? (
          <img src="/assets/images/logo-light.svg" alt="Kanban Logo" />
        ) : (
          <img src="/assets/images/logo-dark.svg" alt="Kanban Logo" />
        )}
      </div>

      <div className="flex flex-col gap-5 mt-4 grow overflow-y-hidden">
        <p className="heading-s pl-[32px]">ALL BOARDS (3)</p>
        <menu className="grow overflow-y-auto">
          {menu.map((d) => (
            <li
              key={d.id}
              className={`flex gap-4 mb-1 items-center heading-m h-[48px] pl-[32px] w-11/12${d.id === 1 ? " rounded-tr-full rounded-br-full bg-primary text-primary-foreground" : " cursor-pointer"}`}
            >
              <i
                className={`board-icon${d.id === 1 ? " bg-white" : " bg-[#828fa3]"}`}
              ></i>{" "}
              {d.label}
            </li>
          ))}
        </menu>
        <span className="flex gap-2 items-center text-secondary-foreground heading-m cursor-pointer pl-[32px]">
          <i className="board-icon bg-primary"></i> + Create New Board
        </span>
      </div>

      <div className="mx-auto w-10/12 flex flex-col gap-4 mb-7 pt-3">
        <div
          id="dark-light-switch"
          className={`flex items-center justify-center gap-6 h-[48px]${isDarkMode ? "" : " bg-[#f4f7fd]"}`}
        >
          <img src="/assets/images/icon-light-theme.svg" alt="Light Mode" />
          <Switch variants="two-way" />
          <img src="/assets/images/icon-dark-theme.svg" alt="Dark Mode" />
        </div>
        <p className="mb-0 heading-m flex items-center gap-2 text-[#828fa3] cursor-pointer">
          <img src="/assets/images/icon-hide-sidebar.svg" alt="Slashed Eye" />{" "}
          Hide Sidebar
        </p>
      </div>
    </div>
  );
};

export default SidePanel;
