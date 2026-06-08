const fs = require('fs');

let content = fs.readFileSync('appIcons.js', 'utf8');
content = content.replace(/GLib\.timeout_add\(GLib\.PRIORITY_DEFAULT, 100,/g, "GLib.timeout_add(GLib.PRIORITY_DEFAULT, 350,");
fs.writeFileSync('appIcons.js', content);

let content2 = fs.readFileSync('windowPreview.js', 'utf8');
content2 = content2.replace(/GLib\.timeout_add\(GLib\.PRIORITY_DEFAULT, 100,/g, "GLib.timeout_add(GLib.PRIORITY_DEFAULT, 350,");

// Also add enter-event to windowPreview.js
const constructorEnd = "this.actor.connect('leave-event', () => {";
const replaceWith = `
        this.actor.connect('enter-event', () => {
            if (this._hideTimeoutId) {
                GLib.source_remove(this._hideTimeoutId);
                this._hideTimeoutId = 0;
            }
            if (this._source._hidePreviewTimeoutId) {
                GLib.source_remove(this._source._hidePreviewTimeoutId);
                this._source._hidePreviewTimeoutId = 0;
            }
        });

        this.actor.connect('leave-event', () => {`;
content2 = content2.replace(constructorEnd, replaceWith);

fs.writeFileSync('windowPreview.js', content2);
