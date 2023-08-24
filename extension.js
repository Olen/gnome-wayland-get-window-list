const { Gio } = imports.gi;

const MR_DBUS_IFACE = `
<node>
    <interface name="org.gnome.Shell.Extensions.Windows">
        <method name="List">
            <arg type="s" direction="out" name="win"/>
        </method>
        <method name="Focus">
            <arg type="u" direction="in" name="winid"/>
        </method>
        <method name="Minimize">
            <arg type="u" direction="in" name="winid"/>
        </method>
        <method name="Move">
            <arg type="s" direction="in" name="wmclass"/>
            <arg type="u" direction="in" name="workspace"/>
            <arg type="u" direction="in" name="x"/>
            <arg type="u" direction="in" name="y"/>
            <arg type="u" direction="in" name="width"/>
            <arg type="u" direction="in" name="height"/>
        </method>
    </interface>
</node>`;


class Extension {
  enable() {
    this._dbus = Gio.DBusExportedObject.wrapJSObject(MR_DBUS_IFACE, this);
    this._dbus.export(Gio.DBus.session, '/org/gnome/Shell/Extensions/Windows');
  }

  disable() {
    this._dbus.flush();
    this._dbus.unexport();
    delete this._dbus;
  }
  List() {
    let win = global.get_window_actors()
      .map(a => a.meta_window)
      .map(w => ({ class: w.get_wm_class(), pid: w.get_pid(), id: w.get_id(), max: w.get_maximized(), focus: w.has_focus(), title: w.get_title()}));
    return JSON.stringify(win);
  }
  Focus(winid) {
    let win = global.get_window_actors().map(a=>a.meta_window).find(w=>w.get_id()==winid);
    if (win) {
      win.activate(0);
    } else {
      throw new Error('Not found');
    }
  }
  Minimize(winid) {
    let win = global.get_window_actors().map(a=>a.meta_window).find(w=>w.get_id()==winid);
    if (win) {
      win.minimize(0);
    } else {
      throw new Error('Not found');
    }
  }
  Move(winid, workspace, x, y, width, height) {
    let win = global.get_window_actors().map(a=>a.meta_window).find(w=>w.get_id()==winid);
    if (win) {
        win.ws.change_workspace_by_index(workspace, false);
        win.ws.move_resize_frame(0, x, y, width, height);
    } else {
        throw new Error('Not found');
    }
  }
}
function init() {
     return new Extension();
}
