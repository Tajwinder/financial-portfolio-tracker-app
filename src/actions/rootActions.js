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

export function addTickers(payload) {
    return {
        type: "ADD_TICKERS",
        payload: payload
    };
}
export function initStock(payload) {
    return {
        type: "INIT_STOCK",
        payload: payload
    };
}

export function initTickers(payload) {
    return {
        type: "INIT_TICKERS",
        payload: payload
    };
}

export function incrementStocksCount(payload) {
    return {
        type: "INCREMENT_STOCKS_COUNT",
        payload: payload
    };
}

export function decrementStocksCount(payload) {
    return {
        type: "DECREMENT_STOCKS_COUNT",
        payload: payload
    };
}

export function initStocksCount(payload) {
    return {
        type: "INIT_STOCKS_COUNT",
        payload: payload
    };
}