// ==UserScript==
// @name         ZMP Campaign Preview
// @namespace    https://github.com/june-pratt/zeta-user-scripts
// @version      2025-10-30
// @description  ZMP Fix Mobile Previews
// @author       joonipea
// @match        https://app.zetaglobal.net/campaigns/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zetaglobal.net
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.head.append(Object.assign(document.createElement("style"), {
    type: "text/css",
    textContent: `#Mobile-preview-iframe {
        width: 372px !important;
    }
    div:has(> #Mobile-preview-iframe) {
        width: 372px !important;
    }
    [class*='styles__PreviewColumns'] > div[class*='styles__PreviewCol-'] {
        max-width: fit-content !important;
    }`
    }));
})();
