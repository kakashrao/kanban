import { StoreSelectorType } from "@/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SidePanel from "./SidePanel";

const Layout: FC = () => {
  const isDarkTheme = useSelector<StoreSelectorType, boolean>(
    (state) => state.theme.isDarkTheme
  );

  return (
    <main className={`layout flex h-screen${isDarkTheme ? " dark" : ""}`}>
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
