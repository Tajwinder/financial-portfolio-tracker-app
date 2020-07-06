export function showModal(payload) {
    return {
        type: "SHOW_MODAL",
        payload: payload
    };
}

export function hideModal(payload) {
    return {
        type: "HIDE_MODAL",
        payload: payload
    };
}

export function updateSymName(payload) {
    return {
        type: "UPDATE_SYMNAME",
        payload: payload
    };
}
export function addRequest(payload) {
    return {
        type: "ADD_REQUEST",
        payload: payload
    };
}
export function initStock(payload) {
    return {
        type: "INIT_STOCK",
        payload: payload
    };
}