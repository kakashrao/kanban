import useWindowDimensions from "@/hooks/windowDimensions";
import { isMobile } from "@/lib/utils";
import { FC, useContext, useEffect } from "react";
import Header from "./Header";
import SidePanel from "./SidePanel";
import Tasks from "./Tasks";
import { fetchBoards } from "@/store/board";
import { StoreDispatchType } from "@/store";
import { useDispatch } from "react-redux";
import { DBContext } from "@/database";

const Layout: FC = () => {
  const { screenWidth } = useWindowDimensions();

  const dispatch = useDispatch<StoreDispatchType>();
  const db = useContext(DBContext);

  useEffect(() => {
    dispatch(fetchBoards(db));
  }, [db, dispatch]);

  return (
    <main className={`kanban-layout flex flex-col h-screen`}>
      <header className="h-[95px] w-full">
        <Header />
      </header>
      <section className="grow flex h-0">
        {!isMobile(screenWidth) && (
          <section className="h-full">
            <SidePanel />
          </section>
        )}
        <section className="grow w-0 h-full">
          <Tasks />
        </section>
      </section>
    </main>
  );
};

export default Layout;
