export interface AppState {
    currentStep: StepType;
    steps: Step[];
    stepLabels: StepLabel[];
    products: Product[];
}

export interface StepLabel {
    key: string;
    name: string;
}

export interface Step {
    name: StepType;
    state: StepState;
    visible: boolean;
}

export enum StepState {
    Complete = 'complete',
    Current = 'current',
    Incomplete = 'incomplete',
}

export enum StepType {
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

export interface ProductCase {
    product_id: string;
    case_size: string;
    case_type: string;
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
    type: string;
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
