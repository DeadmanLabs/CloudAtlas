import React, { useState, useCallback, useEffect, useMemo } from 'react';

import './BoringStyle.css';

const Boring = (props) => {
    <>
        <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navigation w-nav">
            <div className="navigation-items">
            <a href="index.html" aria-current="page" className="logo-link w-nav-brand w--current"><img src="images/portfolio-logo2x.png" width="104" alt="" className="logo-image" /></a>
            <div className="navigation-wrap">
                <nav role="navigation" className="navigation-items w-nav-menu">
                <a href="index.html" aria-current="page" className="navigation-item w-nav-link w--current">Home</a>
                <a href="about.html" className="navigation-item w-nav-link">Fun Version</a>
                </nav>
                <div className="menu-button w-nav-button"><img src="images/menu-icon_1menu-icon.png" width="22" alt="" className="menu-icon" /></div>
            </div>
            </div>
        </div>
        <div className="section">
            <div className="container">
            <div className="intro-wrap">
                <div className="name-text">Michael Magahey</div>
                <div className="paragraph-light">Software Developer and Computer Scientist</div>
                <h1 className="heading-jumbo">Hey there! I’m a computer scientist and software developer based in Oshawa Ontario. I specialize in Computer security, Networks and Finance.</h1>
            </div>
            </div>
        </div>
        <div className="section">
            <div id="works-grid" className="w-layout-grid works-grid">
            <div id="w-node-dff26f68-5731-3efa-d3dd-8f65c72d8fa5-2f35ecb4">
                <a className="work-image cc-work-1 w-inline-block"></a>
                <div className="work-description">
                <a className="project-name-link">Gangrene<br /></a>
                <div className="paragraph-light">Binary Network Security Auditing tool</div>
                </div>
            </div>
            <div id="w-node-dff26f68-5731-3efa-d3dd-8f65c72d8fad-2f35ecb4">
                <a className="work-image cc-work-2 w-inline-block"></a>
                <div className="work-description">
                <a className="project-name-link">Pipe Dream</a>
                <div className="paragraph-light">Simplistic Remote HTTPS Solution with Cookie and Autofill Sync</div>
                </div>
            </div>
            <div id="w-node-dff26f68-5731-3efa-d3dd-8f65c72d8fb4-2f35ecb4">
                <a className="work-image cc-work-3 w-inline-block"></a>
                <div className="work-description">
                <a className="project-name-link">Bit Brick</a>
                <div className="paragraph-light">Cryptocurrency Creation and Management Framework</div>
                </div>
            </div>
            <div id="w-node-dff26f68-5731-3efa-d3dd-8f65c72d8fbb-2f35ecb4">
                <a className="work-image cc-work-4 w-inline-block"></a>
                <div className="work-description">
                <a className="project-name-link">Cloud Atlas</a>
                <div className="paragraph-light">Portfolio Website and Web Access to many projects</div>
                </div>
            </div>
            </div>
            <div className="container">
            <div className="carrer-headline-wrap">
                <h2 className="heading">My experience</h2>
                <p className="paragraph-light">Hi, I am a Computer Science graduate from the University of Ontario Institute of Technology. Ever since I was a young child, I have had a keen interest in computers and how they work. I have always had a particular interest in Computer Security, but also have interests in Financial Technology as well. I have many languages and frameworks under my belt, however, my strongest would be C#, Python, JavaScript, Java and C++. I have also been researching and developing cryptocurrency/web3 related applications recently, and have built a large array of knowledge regarding the industry.</p>
            </div>
            <div className="w-layout-grid work-experience-grid">
                <div id="w-node-dff26f68-5731-3efa-d3dd-8f65c72d8fc9-2f35ecb4" className="work-position-wrap">
                <div className="position-name-text">Nanopay Corp.</div>
                <div className="paragraph-light cc-position-name">R&amp;D Software Developer</div>
                <div className="paragraph-tiny cc-paragraph-tiny-light">April 2014 — Mar 2015<br /></div>
                </div>
                <div id="w-node-dff26f68-5731-3efa-d3dd-8f65c72d8fd1-2f35ecb4" className="work-position-wrap">
                <div className="position-name-text">Mackenzie Investments</div>
                <div className="paragraph-light cc-position-name">Security Department Intern</div>
                <div className="paragraph-tiny cc-paragraph-tiny-light">Apr 2015 — Mar 2016<br /></div>
                </div>
                <div id="w-node-dff26f68-5731-3efa-d3dd-8f65c72d8fd9-2f35ecb4" className="work-position-wrap">
                <div className="position-name-text">Scalar Decisions Inc.</div>
                <div className="paragraph-light cc-position-name">Security Analyst</div>
                <div className="paragraph-tiny cc-paragraph-tiny-light">Jun 2016 — Jul 2017<br /></div>
                </div>
                <div id="w-node-dff26f68-5731-3efa-d3dd-8f65c72d8fe1-2f35ecb4" className="work-position-wrap">
                <div className="position-name-text">Deloitte Inc.</div>
                <div className="paragraph-light cc-position-name">Junior Analyst, Omnia AI</div>
                <div className="paragraph-tiny cc-paragraph-tiny-light">Aug 2017 — forever<br /></div>
                </div>
            </div>
            </div>
        </div>
        <div className="section cc-contact">
            <div className="container">
            <div className="contact">
                <div className="contact-headline">
                <h3 className="heading-2">Want to get in touch?<br />Drop me a line!</h3>
                <p className="paragraph-light"><br /></p>
                </div>
                <div className="contact-form-wrap">
                <div className="w-form">
                    <form id="wf-form-Email-Form" name="wf-form-Email-Form" data-name="Email Form" method="get" className="contact-form">
                    <div className="w-layout-grid contact-form-grid">
                        <div id="w-node-d783a17e-0b35-a13a-0448-a852d0df4a32-d0df4a24"><label htmlFor="Name-3">Name</label><input type="text" className="text-field w-input" maxLength={256} name="Name" data-name="Name" placeholder="Enter your name" id="Name" /></div>
                        <div id="w-node-d783a17e-0b35-a13a-0448-a852d0df4a36-d0df4a24"><label htmlFor="Email-3">Email Address</label><input type="email" className="text-field w-input" maxLength={256} name="Email" data-name="Email" placeholder="Enter your email" id="Email" /></div>
                        <div id="w-node-d783a17e-0b35-a13a-0448-a852d0df4a3a-d0df4a24"><label htmlFor="Message">Form Label</label><textarea id="Message" name="Message" placeholder="Enter your message" maxLength={5000} data-name="Message" className="text-field cc-textarea w-input"></textarea></div>
                    </div><input type="submit" value="Submit" data-wait="Please wait..." className="button w-button" />
                    </form>
                    <div className="status-message cc-success-message w-form-done">
                    <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="status-message cc-error-message w-form-fail">
                    <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="footer-wrap">
            <div className="footer-links">

            </div>
        </div>
        <script src="https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=63be3ec717f71c4d9e35ecb0" type="text/javascript" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossOrigin="anonymous"></script>
        <script src="BoringScript.js" type="text/javascript"></script>
    </>
}

export { Boring };