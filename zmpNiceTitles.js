// ==UserScript==
// @name         ZMP Utilities
// @namespace    https://github.com/june-pratt/zeta-user-scripts
// @version      2025-10-30
// @description  ZMP Nice Titles
// @author       joonipea
// @match        https://app.zetaglobal.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zetaglobal.net
// @grant        none
// ==/UserScript==
    function openAllPreviews(e) {
    e.preventDefault();
    document.querySelectorAll("[class*='Litmus'] > img").forEach(elm=>elm.click())
    }


(function() {
    'use strict';
    // update Titles
    updateTitle();
    navigation.addEventListener('navigatesuccess', () => {
        updateTitle();
    });
    function updateTitle() {
        console.log("loaded");
        waitForElement("span[data-aid='toolbar-title'],h1,div[data-aid='edit-name-input'],div[class*='styles__Title']:not(div[class*='styles__Athena'] > div),span[class*='styles__NewName'],h5,h3",0).then(function(){
         console.log(document.querySelector("span[data-aid='toolbar-title'],h1,div[data-aid='edit-name-input'],div[class*='styles__Title']:not(div[class*='styles__Athena'] > div),span[class*='styles__NewName'],h5,h3").innerText);
        document.title = document.querySelector("span[data-aid='toolbar-title'],h1,div[data-aid='edit-name-input'],div[class*='styles__Title']:not(div[class*='styles__Athena'] > div),span[class*='styles__NewName'],h5,h3").innerText + " | " + document.querySelector("strong").innerText;
        }).catch(()=>{console.log("something went wrong getting the title :<")})
    }

 /**
 * Wait for an element before resolving a promise
 * @param {String} querySelector - Selector of element to wait for
 * @param {Integer} timeout - Milliseconds to wait before timing out, or 0 for no timeout
 */
    function waitForElement(querySelector, timeout){
        return new Promise((resolve, reject)=>{
            var timer = false;
            if(document.querySelector(querySelector)) return resolve();
            const observer = new MutationObserver(()=>{
                if(document.querySelector(querySelector)){
                    observer.disconnect();
                    if(timer !== false) clearTimeout(timer);
                    return resolve();
                }
            });
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
            if(timeout) timer = setTimeout(()=>{
                observer.disconnect();
                reject();
            }, timeout);
        });
    }

    // remove orbs from navigation menu and improve readability
    document.head.append(Object.assign(document.createElement("style"), {
    type: "text/css",
    textContent: `[class*='NavBarOrbs-styles__FloatingOrbs'] {
        display: none !important;
    }`
    }));
    // add a preview all button to navbar
/*
     waitForElement("[class*='TemplatePreview'] > img",0).then(function(){
    document.querySelectorAll("ul.ant-menu-root")[1].innerHTML += `<li class="ant-menu-item" role="menuitem" tabindex="-1" aria-describedby="rc_unique_8" style="padding-left: 16px;">
<img class="ant-menu-item-icon" src="//d33v4339jhl8k0.cloudfront.net/docs/assets/55ad6bf6e4b0b0593824e281/images/6670a4495173914f806c1de4/litmus-logo.png" alt="Help - Litmus.com" width="16" height="16" style=" height: 16px; width: 16px; cursor: inherit;">
<span class="ant-menu-title-content"><a class="NavBar-styles__NavItemLink-sc-3b711f1e-16 ewGsPR" href="#" style="width: 100%; height: 100%; display: flex; -webkit-box-align: center; align-items: center; flex: 0 0 auto; gap: 8px; transition: none;" onclick="openAllPreviews">Preview</a></span></li>`;
         }).catch(()=>{console.log("something went wrong adding the preview button :<")}) */
})();
