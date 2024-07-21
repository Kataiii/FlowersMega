import { InputNumber, InputNumberProps, Slider } from "antd";
import { useState } from "react";
import { selectMaxPrice, selectMinPrice } from "../../entities/filter/redux/selectors";
import { addMaxPrice, addMinPrice } from "../../entities/filter/redux/slice";
import { useAppDispatch, useAppSelector } from "../../store/store";

type FilterCostProps = {
    maxPrice: number;
}

const FilterCost: React.FC<FilterCostProps> = ({maxPrice}) => {
    const minPriceValue = useAppSelector(selectMinPrice);
    const maxPriceValue = useAppSelector(selectMaxPrice);
    const dispatch = useAppDispatch();

    const onChange = (value: number[]) => {
        dispatch(addMinPrice(value[0] as number));
        dispatch(addMaxPrice(value[1] as number));
    };

    const onChangeMinValue: InputNumberProps['onChange'] = (newValue) => {
        dispatch(addMinPrice(newValue as number));
    };

    const onChangeMaxValue: InputNumberProps['onChange'] = (newValue) => {
        dispatch(addMaxPrice(newValue as number));
    }

    return(
        <div>
            <div style={{display: "flex", justifyContent: "space-between", gap: 15}}>
                <InputNumber value={minPriceValue} min={0} max={maxPrice} placeholder="От ₽" onChange={onChangeMinValue}/>
                <InputNumber value={maxPriceValue} min={minPriceValue} max={maxPrice} placeholder="До ₽" onChange={onChangeMaxValue}/>
            </div>
            <Slider 
                range 
                min={0} 
                max={maxPrice} 
                defaultValue={[0, maxPrice]} 
                value={[typeof minPriceValue === 'number' ? minPriceValue : 0, typeof maxPriceValue === 'number' ? maxPriceValue : maxPrice]} 
                onChange={onChange}/>
        </div>
    )
}

export default FilterCost;