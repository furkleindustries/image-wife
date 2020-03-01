import { RollTypes } from './RollTypes';
export interface CustomSvgFilterProps {
    readonly filterId: number;
    readonly type: typeof RollTypes.MonochromeFilter;
}
