import { NoiserProps } from './NoiserProps';
import { NoiserState } from './NoiserState';
import * as React from 'react';
export declare class Noiser extends React.PureComponent<NoiserProps, NoiserState> {
    readonly state: NoiserState;
    constructor(props: NoiserProps);
    readonly render: () => JSX.Element;
}
