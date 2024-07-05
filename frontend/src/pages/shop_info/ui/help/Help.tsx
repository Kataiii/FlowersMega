import { Collapse, ConfigProvider } from "antd";
import { styled } from "styled-components";
import Container from "../../../../shared/ui/containerMain/ContainerMain"
import { Title } from "../../../../shared/ui/forAdditionalPages/Title";
import { HelpBlocks } from "../../../../shared/utils/helpConstants";
import Arrow from "../../../../shared/assets/arrow.svg";

const TitleHelpItem = styled.h5`
    font-family: "Inter";
    font-weight: 600;
    font-size: 24px;
    color: var(--secondary-text-color);
`;

const ArrowUp = styled.img`
`;

const ArrowDown = styled(ArrowUp)`
    transform: rotate(180deg);
`;

const Help: React.FC = () => {
    return(
        <Container style={{margin: "0 auto", flexGrow: 3, padding: "35px 0"}}>
            <Title>Помощь</Title>
            <div style={{display: "flex", flexDirection: "column", gap: 32}}>
            {
                HelpBlocks.map((item, index) => {
                    return  <div style={{display: "flex", flexDirection: "column", gap: 26}} key={`helpBlock-${index}`}>
                                <TitleHelpItem>{item.title}</TitleHelpItem>
                                <>
                                {
                                    <ConfigProvider
                                        theme={{
                                        components: {
                                            Collapse: {
                                                contentBg: "var(--block-bg-color)",
                                                headerBg: "var(--block-bg-color)",
                                                colorBorder: "var(--block-bg-color)",
                                                fontFamily: "Inter",
                                                fontSize: 20,
                                                fontWeightStrong: 600,
                                                
                                            },
                                        },
                                        }}
                                    >
                                        <Collapse 
                                            style={{ fontWeight: 600}}
                                            expandIcon={({ isActive }) => isActive ? <ArrowUp src={Arrow} alt="arrow-up"/> : <ArrowDown src={Arrow} alt="arrow-down"/>} items={item.helpItems}/>
                                    </ConfigProvider>
                                }
                                </>
                            </div>;
                })
            }
            </div>
        </Container>
    )
}

export default Help;