/// <reference types="vite/client" />

interface Window {
    asset_url: string;
    permanent_domain: string;
    Shopify: {
        routes: {
            root: string;
        };
    };
    goCartInstance: {
        addItemToCartHandler: (item: any) => void;
    };
}
