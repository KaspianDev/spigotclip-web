function getAllVersions() {
    fetch("/api")
        .then(data => data.json())
        .then(json => {
            if (json.length === 0) {
                document.getElementById("versions").innerHTML = "<h5>No releases available at this time</h5>";
                return;
            }
            for (let release of json.sort((a, b) => b - a)) {
                document.getElementById("versions").innerHTML +=
                    `<tr>
        <td>${release.version}</td>
        <td><a href="https://hub.spigotmc.org/stash/projects/SPIGOT/repos/spigot/commits/${release.commit}">${release.commit}</a></td>
        <td>${new Date(release.buildDate).toLocaleString()}</td>
        <td>2681dd514ea692a697d25a020ecd04b6</td>
        <td><a href="/downloads/spigotclip-1.16.5-79d53c28.jar">Download</a></td>
    </tr>`;
            }
        });
}

getAllVersions();