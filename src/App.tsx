import { Container } from "./components/Container";
import { Heading } from "./components/Heading";
import "./styles/global.css";
import "./styles/theme.css";

function App() {
  return (
    <>
      <Container>
        <Heading>LOGO</Heading>
      </Container>

      <Container>
        <Heading>MENU</Heading>
      </Container>
    </>
  );
}

export default App;
