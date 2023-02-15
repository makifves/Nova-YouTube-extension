# Nova YouTube

Combine small plugins, expanding the possibilities of YouTube.

The extension is based on the plugin files themselves. The rest of the files only serve them.
- ease of extensibility
- low probability of conflict with other extensions.

![Nova YouTube-extension](https://user-images.githubusercontent.com/13064767/212359552-117dde00-d0a7-42be-b719-4bd1745687e4.png)

## Installation
[![Chrome Web Store](https://img.shields.io/chrome-web-store/users/miiheelkbegpkflplpmmkidaklfgjecb?style=flat-square&label=Chrome%20Web%20Store)](https://chrome.google.com/webstore/detail/miiheelkbegpkflplpmmkidaklfgjecb)
[![openuserjs](https://img.shields.io/badge/dynamic/json?style=flat-square&color=eee&amp;label=OpenUserJS&amp;query=%24.OpenUserJS.installs%5B0%5D.value&amp;suffix=%20installs&amp;url=https%3A%2F%2Fopenuserjs.org%2Fmeta%2Fraingart%2FNova_YouTube.meta.json)](https://openuserjs.org/scripts/raingart/Nova_YouTube)
[![greasyfork](https://img.shields.io/badge/dynamic/json?style=flat-square&color=blue&amp;label=GreasyFork&amp;query=total_installs&amp;suffix=%20installs&amp;url=https%3A%2F%2Fgreasyfork.org%2Fscripts%2F433360.json)](https://greasyfork.org/en/scripts/433360-nova-youtube)

OR

You can now load the extension into your browser through the browser's extension tools page:
1. [Download](https://github.com/raingart/Nova-YouTube-extension/archive/refs/heads/master.zip) the script and extract
2. Type `chrome://extensions` in your address bar to bring up the extensions page.
3. Enable __Developer Mode__ (checkbox)
4. Click the "Load unpacked extension" button, navigate to extracted script folder, and click "OK". Or drag the script folder onto the extensions page.

## Building
>Only for Unix shell**. All output will be in the `/tmp/` directory.

**Extensions**: `$ ./package-extensions.sh`

**Userscript**: `$ make`

## Development
### File structure
>The extension is based on plugin files. The remaining files only serve them.

* [/js/loader.js](https://github.com/raingart/Nova-YouTube-extension/tree/master/js/loader.js) - initial loading and connection of plugins.
* [/js/plugins.js](https://github.com/raingart/Nova-YouTube-extension/blob/master/js/plugins.js) - a list of all plugins and their module to run them.
* [/js/optionsBilder.js](https://github.com/raingart/Nova-YouTube-extension/blob/master/js/optionsBilder.js) - generator of plugins configuration file.
* [/js/libs/](https://github.com/raingart/Nova-YouTube-extension/blob/master/js/libs) - directory of internal components of the extension. Not used by plugins, only by the extension itself.
* [/plugins/common-lib.js](https://github.com/raingart/Nova-YouTube-extension/blob/master/plugins/common-lib.js) - common library for all plugins.
* [/plugins/](https://github.com/raingart/Nova-YouTube-extension/tree/master/plugins) - directory of all plugins and files available for connection to the YouTube page.
  * [plugin example](https://github.com/raingart/Nova-YouTube-extension/blob/master/plugins/plugin_example.js) - file use to understand basic functions
