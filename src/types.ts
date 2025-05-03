import {ReactElement} from "react";

export interface IStep {
    label: string;
    description?: string;
    component?: ReactElement
}