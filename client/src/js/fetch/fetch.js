
import "whatwg-fetch";

import Auth from "../libs/services/auth";

/**
 * Setting default request parameters when using fetch.
 * They can be easily overwritten by providing same
 * through props.
 */

// const defaultFetchHeaders = new Headers({
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${Auth.getToken()}`
// });

let defaultFetchHeaders;

if (Auth.isUserAuthenticated()) {
    defaultFetchHeaders = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Auth.getToken()}`
    });
} else {
    defaultFetchHeaders = new Headers({ "Content-Type": "application/json" });
}

const defaultFetchProps = {
    headers: defaultFetchHeaders
};

fetch = (function (originalFetch) {
    return function (url, props) {
        const fetchProps = {
            ...defaultFetchProps,
            ...props
        };

        return originalFetch(url, fetchProps).then(
            (response) => {
                if (!response.ok) {
                    throw response;
                }

                return response;
            }
        );
    };
})(fetch);