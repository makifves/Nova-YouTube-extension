# bash: make build

# All .js compiled into a single one.
out="/tmp/novaTube.user.js"

# example of searching in a directory listing
# find . -type f -name "*.txt" ! -path "./Movies/*" ! -path "./Downloads/*" ! -path "./Music/*"

build:
	rm -f $(out)

	cat ./UserScript/meta.js > $(out)

	cat ./UserScript/check-browser-support.js >> $(out)

	# plugins container
	echo -e 'window.nova_plugins = [];' >> $(out)
	# all plugins
	@find ./plugins/* -type f -name "*.js" ! -iname "-*" ! -iname "_blank_plugin.js" | xargs cat >> $(out)
	cat ./js/plugins.js >> $(out)

	cat ./UserScript/user.js >> $(out)

	xdg-open $(out)
