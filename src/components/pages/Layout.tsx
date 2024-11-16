import { FC } from "react";
import Header from "./Header";
import SidePanel from "./SidePanel";
import Tasks from "./Tasks";

const Layout: FC = () => {
  return (
    <main className={`kanban-layout flex h-screen`}>
      <section className="h-full]">
        <SidePanel />
      </section>
      <section className="grow flex flex-col h-full">
        <header className="h-[95px]">
          <Header />
        </header>
        <section className="grow">
          <Tasks />
        </section>
      </section>
    </main>
  );
};

export default Layout;
