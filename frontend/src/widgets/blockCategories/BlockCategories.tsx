import CardCategory from "../../entities/category/ui/cardCategory/CardCategory";
import Container from "../../shared/ui/containerMain/ContainerMain";
import TitleSection from "../../shared/ui/titleSection/TitleSection";
import { useCategoriesControllerGetAllQuery } from "../../store/category";


const BlockCategories: React.FC = () => {
    const {isLoading, data} = useCategoriesControllerGetAllQuery();

    return(
        <Container>
            <TitleSection content="Популярные категории"/>
            <>
                {
                    isLoading
                    ? <p>Загрузка...</p>
                    : <div>
                        {
                            data && data?.map((item, index) => {
                                return <CardCategory key={index} category={item}/>
                            })
                        }
                      </div>
                }
            </>
        </Container>
    )
}

export default BlockCategories;