import React from "react";

import Page from "./common/page";

const About = props => {
    return (
        <Page>
            <section className="about">
                <div className="about__wrapper">
                    <p> MERN Stack app</p>
                    <p>Version 1.0.0</p>
                </div>
            </section>
        </Page>
    );
}

export default About;