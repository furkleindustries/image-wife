import { NoiserFilterProps } from './NoiserFilterProps';
export interface NoiserProps {
    readonly imagesPreloadedPromise?: Promise<any>;
    readonly imageUrls: string[];
    readonly filter?: Partial<NoiserFilterProps>;
    readonly opacity?: number;
    readonly zIndex?: number;
}
