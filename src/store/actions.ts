import { Product, SellingPlanGroup } from '@/utils/types';

export interface ActionCreator<ActionType = string, ActionData = unknown> {
    action: ActionType;
    data?: ActionData;
}

export enum ActionType {
    INCREMENT_STEP = 'INCREMENT_STEP',
    GOTO_STEP = 'GOTO_STEP',
    ADD_PRODUCTS = 'ADD_PRODUCTS',
    SELECT_PRODUCT = 'SELECT_PRODUCT',
    SELECT_PLAN = 'SELECT_PLAN',
}

export type Actions =
    | ActionCreator<ActionType.INCREMENT_STEP>
    | ActionCreator<ActionType.GOTO_STEP, number>
    | ActionCreator<ActionType.ADD_PRODUCTS, Product[]>
    | ActionCreator<ActionType.SELECT_PRODUCT, Product>
    | ActionCreator<ActionType.SELECT_PLAN, SellingPlanGroup['shopify_id']>;

export const gotoStep = (data: number): Actions => ({ action: ActionType.GOTO_STEP, data });

export const incrementStep = (): Actions => ({ action: ActionType.INCREMENT_STEP });

export const addProducts = (data: Product[]): Actions => ({ action: ActionType.ADD_PRODUCTS, data });

export const selectProduct = (data: Product): Actions => ({ action: ActionType.SELECT_PRODUCT, data });

export const selectSellingPlan = (data: SellingPlanGroup['shopify_id']): Actions => ({
    action: ActionType.SELECT_PLAN,
    data,
});
