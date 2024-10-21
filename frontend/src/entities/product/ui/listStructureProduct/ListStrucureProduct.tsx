
type ListStructureProductProps = {
    structure: string;
}

const ListStructureProduct: React.FC<ListStructureProductProps> = ({structure}) => {
    return(
        <>
            <h3 style={{ fontFamily: "Inter", fontWeight: 500, fontSize: 24, color: "var(--secondary-text-color)" }}>Состав и описание</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <p style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 20, color: "#52414680" }}>В состав входит :</p>
                <ul style={{ padding: "0 16px" }}>
                    {
                        structure.split(',').map((item,index) => {
                            return <li key={index} style={{ fontFamily: "Inter", fontWeight: 400, fontSize: 15, color: "#52414680" }}>{item}</li>
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default ListStructureProduct;