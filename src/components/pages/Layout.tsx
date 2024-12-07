import { FC } from "react";
import Header from "./Header";
import SidePanel from "./SidePanel";
import Tasks from "./Tasks";

const Layout: FC = () => {
  return (
    <main className={`kanban-layout flex flex-col h-screen`}>
      <header className="h-[95px] w-full">
        <Header />
      </header>
      <section className="grow flex h-full">
        <section className="h-full">
          <SidePanel />
        </section>
        <section className="grow w-0">
          <Tasks />
        </section>
      </section>
    </main>
  );
};

export default Layout;
