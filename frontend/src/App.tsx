import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "./shared/ui/footer/Footer";
import Header from "./shared/ui/header/Header";
import SecondHeader from "./shared/ui/secondHeader/SecondHeader";
import "./shared/utils/cssConstants.css";

const Container = styled.div`
  background-color: var(--main-bg-color);
  min-height: 100vh;
`;

const ContainerHeaders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const App: React.FC = () => {
  return(
    <Container>
      <ContainerHeaders>
        <Header/>
        <SecondHeader/>
      </ContainerHeaders>
      <Outlet></Outlet>
      <Footer/>
    </Container>
  )
}

export default App;