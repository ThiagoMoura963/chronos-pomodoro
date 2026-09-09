import { TimerIcon } from "lucide-react";
import { Heading } from "./assets/components/Heading";

function App() {
  return (
    <>
      <Heading>
        Chronos Pomodoro{" "}
        <button>
          <TimerIcon />
        </button>{" "}
      </Heading>
    </>
  );
}

export default App;
