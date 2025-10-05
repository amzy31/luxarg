#############################
# preinstall requirements   #
# 1. install gjs          	#
# 2. install gir1.2-gtk-3.0	#
# 3. install gir1.2-vte-2.91	#
#############################

all: luxarg

luxarg: main.js
	cp main.js luxarg
	chmod +x luxarg

deps:
	sudo apt update && sudo apt full-upgrade -y && sudo apt install gjs gir1.2-gtk-3.0 gir1.2-vte-2.91 libgtk-3-dev libnotify-bin zenity libvte-2.91-dev


install: luxarg
	mkdir -p ~/.luxarg/ ; cp -rf . ~/.luxarg/
	sudo mkdir -p /opt/luxarg/
	sudo cp main.js /opt/luxarg/main.js
	sudo chmod +x /opt/luxarg/main.js
	sudo ln -sf /opt/luxarg/main.js /bin/luxarg
	sudo cp -rf ./xdg/luxarg.desktop /usr/share/applications
	cp -rf ./xdg/luxarg.desktop ~/.local/share/applications
	sudo cp -rf ./icon/luxarg.png /usr/share/icons/hicolor/256x256/apps/
	sudo cp -rf ./icon/luxarg.png /usr/share/icons/hicolor/256x256/apps/
	sudo cp -rf ./icon/luxarg.png /usr/share/icons/

