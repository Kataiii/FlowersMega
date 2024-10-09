import { InputNumber, InputNumberProps, Slider } from "antd";
import { useCallback, useState } from "react";
import { selectMaxPrice, selectMinPrice } from "../../entities/filter/redux/selectors";
import { addMaxPrice, addMinPrice } from "../../entities/filter/redux/slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Debouncer } from "../../shared/utils/debounce";

type FilterCostProps = {
    maxPrice: number;
}

const FilterCost: React.FC<FilterCostProps> = ({ maxPrice }) => {
    const minPriceValue = useAppSelector(selectMinPrice);
    const maxPriceValue = useAppSelector(selectMaxPrice);
    const dispatch = useAppDispatch();
    const [sliderValue, setSliderValue] = useState<[number, number]>([0, maxPriceValue]);
    const debouncer = new Debouncer();
    const [minTmpValue, setMinTmpValue] = useState<number>(minPriceValue);
    const [maxTmpValue, setMaxTmpValue] = useState<number>(maxPriceValue);


    const onChange = (value: number[]) => {
        setMinTmpValue(value[0]);
        setMaxTmpValue(value[1]);
        updatePrice(value);
    }

    const debounceChange = debouncer.debounce(onChange, 1000);


    const debounceChangeMin = useCallback(
        debouncer.debounce((newValue: number) => {
            dispatch(addMinPrice(newValue));
        }, 1000), []
    )
    const debounceChangeMax = useCallback(
        debouncer.debounce((newValue: number) => {
            dispatch(addMaxPrice(newValue));
        }, 1000), []
    )

    const updatePrice = useCallback(
        debouncer.debounce((value: number[]) => {
            dispatch(addMinPrice(value[0]));
            dispatch(addMaxPrice(value[1]));
        }, 2000),
        []
    );

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 15 }}>
                <InputNumber value={minPriceValue} min={0} max={maxPrice} placeholder="От ₽" onChange={debounceChangeMin} />
                <InputNumber value={maxPriceValue} min={minPriceValue} max={maxPrice} placeholder="До ₽" onChange={debounceChangeMax} />
            </div>
            <Slider
                range
                min={0}
                max={maxPrice}
                defaultValue={[0, maxPrice]}
                value={[typeof minTmpValue === 'number' ? minTmpValue : 0, typeof maxTmpValue === 'number' ? maxTmpValue : maxPrice]}
                onChange={onChange} />
        </div>
    )
}

export default FilterCost;