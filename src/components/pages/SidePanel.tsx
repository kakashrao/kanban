import { FC } from "react";

interface MenuItem {
  label: string;
  id: number;
}

const SidePanel: FC = () => {
  const isDarkMode = true;
  const menu: MenuItem[] = [
    { label: "Platform Launch", id: 1 },
    { label: "Marketing Plan", id: 2 },
    { label: "Roadmap", id: 3 },
  ];

  return (
    <div id="sidepanel" className="h-full border-e border-[#3e3f4e]">
      <div className="flex items-center h-[95px] pl-[32px]">
        {isDarkMode ? (
          <img src="/assets/images/logo-light.svg" alt="Kanban Logo" />
        ) : (
          <img src="/assets/images/logo-dark.svg" alt="L=Kanban Logo" />
        )}
      </div>

      <div className="flex flex-col gap-5 mt-4">
        <p className="heading-s pl-[32px]">ALL BOARDS (3)</p>
        <menu>
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
    </div>
  );
};

export default SidePanel;
