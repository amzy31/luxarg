# Luxarg

**The Best Sci-Fi Text Editor for MATE-DESKTOP**

Luxarg is a text editor made with GJS (GNOME JavaScript). It has a dark sci-fi look with green text. It works well on MATE Desktop. You can use the keyboard to control it easily.

*Developed on MATE Desktop.*

## Features

- **Sci-Fi Look**: Black background, green text, and yellow labels. It looks like a future computer.
- **Keyboard Controls**:
  - **Insert Mode** (`F1`): Start writing text.
  - **Save Mode** (`F2`): Open a window to save the file.
  - **Open Mode** (`F3`): Open a window to load a file.
  - **Stop Mode** (`Escape`): Stop writing and go back to start.
- **File Work**: Use GTK windows to save or open files.
- **Works on Many Systems**: Runs on GNOME and MATE on different Linux types.

## Pictures

### Icon
![Icon](icon/luxarg.png)

### Editor Screen
![Screenshot](screenshot/1.png)

## How to Install

### What You Need
- A Linux computer with GNOME or MATE.
- GJS and GTK 3 programs.

### Install Programs
For Ubuntu 24.04:

```bash
sudo apt update
sudo apt install gjs libgtk-3-dev
```

### Install Luxarg
1. Get the code from the website.
2. Run this to install:
   ```bash
   make install
   ```
   It will add the needed programs and set up the menu icon.

Or run it by hand:
```bash
gjs main.js
```

## How to Use

- Start the editor: `gjs main.js` or click the icon in the menu.
- Press keys to change modes.
- Write text when in Insert mode.
- Save or open files with the right modes.

## Programs Needed

- **GJS**: JavaScript for GNOME.
- **GTK 3**: Tools for the user interface.

## Help Make It Better

We like your ideas! Copy the project and send changes back.

## License

This is free software under GNU GPL v3. Read the LICENSE file.

## Get Help

Have a problem? Ask on the GitHub page.
