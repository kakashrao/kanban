import "./App.scss";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className=" flex justify-center items-center h-[100vh]">
        <Button variant="destructive" size="sm">
          Button Secondary
        </Button>
      </div>
    </>
  );
}

export default App;
