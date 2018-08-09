
// Actions
export const RENDER_MODAL = "RENDER_MODAL";

// Reducer
const initialState = {
    isModalOpen: undefined,
    component: {},
    props: {}
};

export default function modal(state = initialState, action = {}) {
    switch (action.type) {
        case RENDER_MODAL:
            return Object.assign({}, state, {
                component: action.component || state.component,
                isModalOpen: action.isModalOpen,
                props: action.props || state.props
            });
    };
    return state;
}

// Action creators
export function renderModal(isModalOpen, component, props) {
    return {
        type: RENDER_MODAL,
        isModalOpen,
        component,
        props
    };
}