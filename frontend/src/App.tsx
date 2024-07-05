import { Breadcrumb } from "antd";
import { BreadcrumbItemType, BreadcrumbSeparatorType } from "antd/es/breadcrumb/Breadcrumb";
import { Outlet, useLocation, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "./shared/ui/footer/Footer";
import Header from "./shared/ui/header/Header";
import SecondHeader from "./shared/ui/secondHeader/SecondHeader";
import { CATEGORY_PATH, HOME_PATH, mapBreads, PRODUCT_PATH, CATALOG_PATH } from "./shared/utils/constants";
import "./shared/utils/cssConstants.css";

const Container = styled.div`
  background-color: var(--main-bg-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContainerHeaders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const App: React.FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = useParams();


  const sliceBreads = (pathname: string) => {
    const arrayBreads: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [];
    const arrayPaths: string[] = pathname.split('/');

    if(arrayPaths.find(element => element === "product")) arrayPaths.pop();

    console.log(arrayPaths);

    arrayBreads.push(
      {
        title: <a href={HOME_PATH}>{mapBreads.get(HOME_PATH)}</a>
      }
    );
    arrayPaths.forEach(item => {
      if (item === "") {
        return;
      }

      if (item !== 'category' && item !== 'product') {
        arrayBreads.push({
          title: <a href={`/${item}`}>{mapBreads.get(`/${item}`)}</a>
        });
      }

      if (`/${item}` === CATEGORY_PATH) {
        arrayBreads.push({
          title: <a href={`/catalog/category?category=${searchParams.get('category')}`}>{searchParams.get('category')}</a>
        });
      }

      if (`/${item}` === PRODUCT_PATH) {
        arrayBreads.push({
          title: <a href={CATALOG_PATH}>{mapBreads.get(CATALOG_PATH)}</a>
        })

        arrayBreads.push({
          title: <a href={`/product/${params.name}/${params.size}`}>{params.name}</a>
        });
      }
    })

    if(arrayPaths.find(element => element === "product")) arrayBreads.pop();

    return arrayBreads;
  }

  return (
    <Container>
      <ContainerHeaders>
        <Header />
        <SecondHeader />
      </ContainerHeaders>
      {
        location.pathname === HOME_PATH
          ? null
          : <div style={{ width: "90%", margin: "0 auto", padding: "25px 0 10px" }}>
            <Breadcrumb items={sliceBreads(location.pathname)} />
          </div>
      }
      <Outlet></Outlet>
      <Footer />
    </Container>
  )
}

export default App;