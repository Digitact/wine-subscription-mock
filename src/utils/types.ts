export interface AppState {
    currentStep: StepPosition;
    steps: Step[];
    stepLabels: StepLabel[];
    products: Product[];
    caseSize: number;
    showCustomiseStep: boolean;
    selectedProductId: Product['shopify_id'];
    selectedSellingPlanId: SellingPlan['shopify_id'];
    customRules: ProductCaseWine[];
    customRuleId: ProductCaseWine['sku'];
}

export interface StepLabel {
    key: string;
    name: string;
}

export interface Step {
    step: StepPosition;
    name: StepTitle;
    state: StepState;
    visible: boolean;
}

export enum StepState {
    Complete = 'complete',
    Current = 'current',
    Incomplete = 'incomplete',
}

export enum StepPosition {
    Step1 = 1,
    Step2 = 2,
    Step3 = 3,
    Step4 = 4,
    Step5 = 5,
}

export enum StepTitle {
    Step1 = 'Subscription',
    Step2 = "What's Included",
    Step3 = 'Delivery Frequency',
    Step4 = 'Wines',
    Step5 = 'Confirmation',
}

export enum ERROR_TYPE {
    ERROR = 'error',
    SUCCESS = 'success',
}

export interface ErrorType {
    type: ERROR_TYPE;
    message: string;
}

export interface ProductCaseWine {
    title: string;
    image: string;
    sku: string;
    vintage: string;
    min: string;
    max: string;
    selected: string;
    quantity: string;
    wine_type: string;
    shopify_id: string;
}

export enum ProductCaseType {
    Custom = 'Custom',
    Fixed = 'Fixed',
}

export interface ProductCase {
    product_id: string;
    case_size: string;
    case_type: ProductCaseType;
    product_case_wines: ProductCaseWine[];
}

export interface SellingPlan {
    id: string;
    selling_plan_group_id: string;
    billing_policy_id?: any;
    delivery_policy_id?: any;
    shopify_id: string;
    name: string;
    description: string;
    options: string;
    position: string;
}

export enum SellPlanGroup {
    Automatic = 'Automatic',
    Manual = 'Manual',
}

export interface SellingPlanGroup {
    id: string;
    region_id: string;
    app_id?: any;
    name: string;
    description: string;
    merchant_code: string;
    position: string;
    options: string;
    shopify_id: string;
    type: SellPlanGroup;
    selling_plans: SellingPlan[];
}

export interface Product {
    id: string;
    selling_plan_group_id: string;
    product_variant_id: string;
    product_id: string;
    shopify_id: string;
    variant_title: string;
    variant_sku: string;
    variant_price: string;
    product_title: string;
    product_description: string;
    product_sku: string;
    type: string;
    image: string;
    product_case: ProductCase;
    selling_plan_groups: SellingPlanGroup[];
}

export interface IconProps {
    className?: string;
}
