import { Container } from "./components/Container";
import { CountDown } from "./components/Container/CountDown";
import { Logo } from "./components/Logo";
import { Menu } from "./components/Menu";
import "./styles/global.css";
import "./styles/theme.css";

function App() {
  return (
    <>
      <Container>
        <Logo />
      </Container>

      <Container>
        <Menu />
      </Container>

      <Container>
        <CountDown />
      </Container>
    </>
  );
}

export default App;
