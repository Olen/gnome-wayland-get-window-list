# gnome-wayland-get-window-list
Extension to get the list of running windows using Gnome Wayland

# Install
```
$ mkdir -p ~/.local/share/gnome-shell/extensions/get-windows@olen
$ cp ./extension.js ./metadata.json ~/.local/share/gnome-shell/extensions/get-windows@olen
```

Log out of Gnome and log back in

# Usage
```
$ dbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell/Extensions/Windows --method org.gnome.Shell.Extensions.Windows.List
```
To make it more readable, pipe it through `jq`:
```
$ dbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell/Extensions/Windows --method org.gnome.Shell.Extensions.Windows.List | cut -d "'" -f 2 | jq
```




## Based on these

https://gist.github.com/rbreaves/257c3edfa301786e66e964d7ac036269
https://gist.github.com/tuberry/dc651e69d9b7044359d25f1493ee0b39
