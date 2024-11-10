import { StoreSelectorType } from "@/store";
import { FC } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import SidePanel from "./SidePanel";
import Tasks from "./Tasks";

const Layout: FC = () => {
  const isDarkTheme = useSelector<StoreSelectorType, boolean>(
    (state) => state.theme.isDarkTheme
  );

  return (
    <main className={`layout flex h-screen${isDarkTheme ? " dark" : ""}`}>
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
