import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SidePanel from "./SidePanel";

const Layout: FC = () => {
  return (
    <main className="layout flex h-screen">
      <section className="h-full w-[300px]">
        <SidePanel />
      </section>
      <section className="grow flex flex-col h-full">
        <header className="h-[95px]">
          <Header />
        </header>
        <section className="grow">
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default Layout;
