import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./shared/ui/header/Header";
import "./shared/utils/cssConstants.css";

const Container = styled.div`
  background-color: var(--main-bg-color);
  min-height: 100vh;
`

const App: React.FC = () => {
  return(
    <Container>
      <Header/>
      <Outlet></Outlet>
    </Container>
  )
}

export default App;