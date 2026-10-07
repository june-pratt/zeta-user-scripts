# Zeta User Scripts
This repo contains a few userscripts to make development on Zeta a bit easier

## downloadAllSnippets
IMPORTANT: It's recommended to leave this snippet off unless you're actively using it because it may disable a few buttons. This adds a button to the snippets page that will download all snippets in an instance as json.
### Processing snippets for bitbucket
Use the bash script save_snippets to process and sort these snippets. Note: you will need jq and bash 3.2+.

First time usage

```sh 
chmod +x ./save_snippets && ./save_snippets
```

Usage

```sh
./save_snippets
```

## zmpNiceTitles
This script changes the window title (tab title) to whatever the title of the page is. This may require navigation or adding a "#" to the url. This functionality doesn't work on all pages but will work on Campaigns and Snippets.

## fixCampaignPreview
This fixes the mobile campaign preview so it's 374px wide instead of 274px wide (no more screen for ants).
