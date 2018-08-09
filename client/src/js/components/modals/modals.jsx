
import CreateProductSettings from "../create-product-settings";
import UpdateProductSettings from "../update-product-settings";

/**
 * Constants that are used to declare
 * components that will be displayed 
 * inside modal
 */
export const MODAL_TYPES = {
    CREATE_PRODUCT_SETTINGS: "createProductSettings",
    UPDATE_PRODUCT_SETTINGS: "updateProductSettings"
};

export const MODALS = {
    [MODAL_TYPES.CREATE_PRODUCT_SETTINGS]: CreateProductSettings,
    [MODAL_TYPES.UPDATE_PRODUCT_SETTINGS]: UpdateProductSettings
};

/**
 * Function that is responsible for
 * returning component which will be rendered
 * inside modal 
 * 
 * @param {Object} component
 * @returns {Object} 
 */
export function getModalComponent(component) {
    return MODALS[component.type];
}