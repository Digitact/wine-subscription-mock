import { Product, ProductCaseWine, SellingPlan, SellingPlanGroup, StepPosition } from '@/utils/types';

export interface ActionCreator<ActionType = string, ActionData = unknown> {
    action: ActionType;
    data?: ActionData;
}

export enum ActionType {
    INCREMENT_STEP = 'INCREMENT_STEP',
    GOTO_STEP = 'GOTO_STEP',
    ADD_PRODUCTS = 'ADD_PRODUCTS',
    SELECT_PRODUCT = 'SELECT_PRODUCT',
    SELECT_PLAN_GROUP = 'SELECT_PLAN_GROUP',
    SELECT_PLAN = 'SELECT_PLAN',
    INCREMENT_CASE_ITEM = 'INCREMENT_CASE_ITEM',
    DECREMENT_CASE_ITEM = 'DECREMENT_CASE_ITEM',
}

export type Actions =
    | ActionCreator<ActionType.INCREMENT_STEP>
    | ActionCreator<ActionType.GOTO_STEP, StepPosition>
    | ActionCreator<ActionType.ADD_PRODUCTS, Product[]>
    | ActionCreator<ActionType.SELECT_PRODUCT, Product>
    | ActionCreator<ActionType.SELECT_PLAN_GROUP, SellingPlanGroup>
    | ActionCreator<ActionType.SELECT_PLAN, SellingPlan>
    | ActionCreator<ActionType.INCREMENT_CASE_ITEM, ProductCaseWine>
    | ActionCreator<ActionType.DECREMENT_CASE_ITEM, ProductCaseWine>;

export const gotoStep = (data: StepPosition): Actions => ({ action: ActionType.GOTO_STEP, data });

export const incrementStep = (): Actions => ({ action: ActionType.INCREMENT_STEP });

export const addProducts = (data: Product[]): Actions => ({ action: ActionType.ADD_PRODUCTS, data });

export const selectProduct = (data: Product): Actions => ({ action: ActionType.SELECT_PRODUCT, data });

export const selectSellingPlanGroup = (data: SellingPlanGroup): Actions => ({
    action: ActionType.SELECT_PLAN_GROUP,
    data,
});
export const selectSellingPlan = (data: SellingPlan): Actions => ({
    action: ActionType.SELECT_PLAN,
    data,
});
export const incrementCaseItem = (data: ProductCaseWine): Actions => ({
    action: ActionType.INCREMENT_CASE_ITEM,
    data,
});
export const decrementCaseItem = (data: ProductCaseWine): Actions => ({
    action: ActionType.DECREMENT_CASE_ITEM,
    data,
});
