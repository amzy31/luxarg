#!/usr/bin/env gjs

imports.gi.versions.Gtk = '3.0';

const { GObject, Gtk, Gio, GLib, Gdk } = imports.gi;

const LuxargApp = GObject.registerClass({
    GTypeName: 'LuxargApp',
}, class LuxargApp extends Gtk.Application {
    _init() {
        super._init({ application_id: 'com.luxarg.editor' });
        this.window = null;
        this.textView = null;
        this.statusLabel = null;
        this.mode = 'stop'; // stop, insert, save, open
    }

    vfunc_activate() {
        if (!this.window) {
            this.window = new Gtk.ApplicationWindow({ application: this, title: 'Luxarg - MATE-DESKTOP Editor' });
            this.window.set_default_size(700, 700);
            this.window.set_icon_name('text-editor');

            // Apply sci-fi CSS theme
            let css = `
                window {
                    background-color: #000000;
                }
                textview {
                    background-color: #000000;
                    color: #00ff00;
                    font-family: 'DejaVu Sans Mono', monospace;
                    font-size: 20px;
                    padding: 15px;
                }
                textview text {
                    background-color: #000000;
                    color: #00ff00;
                }
                label {
                    background-color: #000000;
                    color: #ffff00;
                    font-size: 13px;
                }
            `;
            let provider = new Gtk.CssProvider();
            provider.load_from_data(css);
            Gtk.StyleContext.add_provider_for_screen(Gdk.Screen.get_default(), provider, Gtk.STYLE_PROVIDER_PRIORITY_APPLICATION);

            // Status bar
            this.statusLabel = new Gtk.Label({ label: '__STOP_MODE__\nINSERT MODE : <F1> , SAVE MODE : <F2>' });
            this.statusLabel.set_halign(Gtk.Align.START);

            // Text view
            this.textView = new Gtk.TextView();
            this.textView.set_editable(false);
            this.textView.set_wrap_mode(Gtk.WrapMode.WORD);

            // Scrolled window
            let scrolled = new Gtk.ScrolledWindow();
            scrolled.set_policy(Gtk.PolicyType.AUTOMATIC, Gtk.PolicyType.AUTOMATIC);
            scrolled.add(this.textView);

            // VBox
            let vbox = new Gtk.Box({ orientation: Gtk.Orientation.VERTICAL });
            vbox.pack_start(this.statusLabel, false, false, 0);
            vbox.pack_start(scrolled, true, true, 0);

            this.window.add(vbox);

            // Key events
            this.window.connect('key-press-event', (widget, event) => this.onKeyPress(event));

            this.window.show_all();
        }
        this.window.present();
    }

    onKeyPress(event) {
        let keyval = event.get_keyval()[1];
        if (keyval === Gdk.KEY_F1) {
            this.insertMode();
        } else if (keyval === Gdk.KEY_F2) {
            this.saveMode();
        } else if (keyval === Gdk.KEY_F3) {
            this.openMode();
        } else if (keyval === Gdk.KEY_Escape) {
            this.stopMode();
        }
    }

    insertMode() {
        this.mode = 'insert';
        this.textView.set_editable(true);
        this.statusLabel.set_text('__INSERT_MODE__\nINSERT MODE : <F1> , SAVE MODE : <F2>');
    }

    stopMode() {
        this.mode = 'stop';
        this.textView.set_editable(false);
        this.statusLabel.set_text('__STOP_MODE__\nINSERT MODE : <F1> , SAVE MODE : <F2>');
    }

    saveMode() {
        this.mode = 'save';
        let dialog = new Gtk.FileChooserDialog({
            title: 'Save File',
            action: Gtk.FileChooserAction.SAVE,
            transient_for: this.window,
            modal: true
        });
        dialog.add_button('Cancel', Gtk.ResponseType.CANCEL);
        dialog.add_button('Save', Gtk.ResponseType.ACCEPT);
        dialog.connect('response', (dialog, response) => {
            if (response === Gtk.ResponseType.ACCEPT) {
                let filename = dialog.get_filename();
                let buffer = this.textView.get_buffer();
                let [start, end] = buffer.get_bounds();
                let text = buffer.get_text(start, end, false);
                GLib.file_set_contents(filename, text);
            }
            dialog.destroy();
            this.stopMode();
        });
        dialog.show();
    }

    openMode() {
        this.mode = 'open';
        let dialog = new Gtk.FileChooserDialog({
            title: 'Open File',
            action: Gtk.FileChooserAction.OPEN,
            transient_for: this.window,
            modal: true
        });
        dialog.add_button('Cancel', Gtk.ResponseType.CANCEL);
        dialog.add_button('Open', Gtk.ResponseType.ACCEPT);
        dialog.connect('response', (dialog, response) => {
            if (response === Gtk.ResponseType.ACCEPT) {
                let filename = dialog.get_filename();
                let [success, contents] = GLib.file_get_contents(filename);
                if (success) {
                    let text = new TextDecoder('utf-8').decode(contents);
                    let buffer = this.textView.get_buffer();
                    buffer.set_text(text, -1);
                }
            }
            dialog.destroy();
            this.stopMode();
        });
        dialog.show();
    }
});

let app = new LuxargApp();
app.run(ARGV);
