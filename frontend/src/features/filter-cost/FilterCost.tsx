import { InputNumber, InputNumberProps, Slider } from "antd";
import { useState } from "react";

type FilterCostProps = {
    maxPrice: number;
}

const FilterCost: React.FC<FilterCostProps> = ({maxPrice}) => {
    const [minValue, setMinValue] = useState<number>(0);
    const [maxValue, setMaxValue] = useState<number>(maxPrice);

    const onChange = (value: number[]) => {
        setMinValue(value[0] as number);
        setMaxValue(value[1] as number);
    };

    const onChangeMinValue: InputNumberProps['onChange'] = (newValue) => {
        setMinValue(newValue as number);
    };

    const onChangeMaxValue: InputNumberProps['onChange'] = (newValue) => {
        setMaxValue(newValue as number);
    }

    return(
        <div>
            <div style={{display: "flex", justifyContent: "space-between", gap: 15}}>
                <InputNumber value={minValue} min={0} max={maxPrice} placeholder="От ₽" onChange={onChangeMinValue}/>
                <InputNumber value={maxValue} min={minValue} max={maxPrice} placeholder="До ₽" onChange={onChangeMaxValue}/>
            </div>
            <Slider 
                range 
                min={0} 
                max={maxPrice} 
                defaultValue={[0, maxPrice]} 
                value={[typeof minValue === 'number' ? minValue : 0, typeof maxValue === 'number' ? maxValue : maxPrice]} 
                onChange={onChange}/>
        </div>
    )
}

export default FilterCost;