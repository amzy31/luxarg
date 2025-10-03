.PHONY: install run clean

install:
	@echo "Installing Luxarg dependencies and desktop entry for Ubuntu 24.04..."
	@sudo apt update && sudo apt install -y gjs libgtk-3-dev
	@echo "Copying desktop entry..."
	@mkdir -p ~/.local/share/applications
	@cp xdg/luxarg.desktop ~/.local/share/applications/
	@echo "Installation complete."

run:
	@gjs main.js

clean:
	@echo "Nothing to clean."
