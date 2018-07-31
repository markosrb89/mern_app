import React from "react";

/**
 * Main page content wrapper.
 */
const Page = ({ children }) => (
    <main className="page" role="main">
        {children}
    </main>
);

export default Page;