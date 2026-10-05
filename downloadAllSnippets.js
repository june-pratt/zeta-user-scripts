// ==UserScript==
// @name         Zeta Download All Snippets
// @namespace    https://github.com/june-pratt/zeta-user-scripts
// @version      2026-01-08
// @description  Download all snippets from an instance
// @author       June Pratt
// @match        https://app.zetaglobal.net/snippets
// @icon         https://www.google.com/s2/favicons?sz=64&domain=zetaglobal.net
// @grant        none
// ==/UserScript==


async function getAllSnippets(last_retrival="") {
    let max_snippets = parseInt(document.querySelector(".ant-badge-count").title);
    let num_pages = max_snippets / 20;
    const date_today = new Date().toISOString();
    let snippets = [];
    for (let i = 1; i < num_pages+1; i++) {
        const headers = {
            "accept": "application/json",
            "content-type": "application/json",
        };
        const body = `{\"filter\":{\"editor\":[\"html\",\"beefree\"],\"shared_from_account\":false,\"shared_to_account\":false,\"status\":[\"active\"],\"updated_from\":\"${last_retrival}\",\"updated_till\":\"${date_today}\",\"sort_by\":\"-updated_at\"},\"page\":${i},\"per_page\":20}`;
        const data = {
            headers,
            body,
            "method": "POST",
        }
        const res = await fetch("https://app.zetaglobal.net/api/v1/snippets/search", data);
        const json = await res.json();
        snippets = [...snippets, ...json.snippets];
        max_snippets = json.total;
        num_pages = max_snippets / 20;
    }

    return snippets;
}

function downloadSnippets(snippets) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(snippets)));
    element.setAttribute('download', "snippets.json");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

async function downloadButtonClickHandler(e) {
    this.setAttribute("disabled", true);
    const last_retrival = prompt("Add the timestamp of last retrival. Can be found on BitBucket")
    const snippets = await getAllSnippets(last_retrival);
    downloadSnippets(snippets);
    this.removeAttribute("disabled");
}
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

(async function() {
    'use strict';
    const download_button_html = `<div class="ant-space-item"><button id="download-snippets" type="button" class="ant-btn moonglass-antd ant-btn-default ant-btn-color-default ant-btn-variant-outlined ant-btn-sm ant-btn-icon-only"><span class="ant-btn-icon"><svg viewBox="64 64 896 896" focusable="false" data-icon="download" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg></span></button></div>`

    await waitForElement("[name='Filter']",0);
    const toolbar = document.querySelector("[name='Filter']").parentElement.parentElement.parentElement.parentElement;
    toolbar.innerHTML += download_button_html;
    document.querySelector("#download-snippets").addEventListener("click", downloadButtonClickHandler);

    // Your code here...
})();