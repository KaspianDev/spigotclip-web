function getLatest() {
    fetch("/api")
        .then(data => data.json())
        .then(json => {
            if (json.length === 0) {
                document.getElementById("latest").innerHTML = "<h5>No releases available at this time</h5>";
                return;
            }
            let output = json.sort((a, b) => b - a)[0];
            document.getElementById("latest").innerHTML =
                `<div class="card-body">
                <h5 class="card-title">Latest release</h5>
                <div>Version <strong>${output.version}</strong></div>
                <div>Commit
                    <a class="link-secondary"
                    href="https://hub.spigotmc.org/stash/projects/SPIGOT/repos/spigot/commits/${output.commit}">
                ${output.commit}
                </a>
            </div>
            <div>Built <strong>${new Date(output.buildDate).toLocaleString()}</strong></div>
            <div>MD5 <strong>${output.md5}</strong></div>
            <a class="btn btn-primary my-3" href="/downloads/spigotclip-${output.version}-${output.commit}.jar">Download
            </a> <a class="btn btn-secondary" href="/downloads.html">All downloads</a>
            </div>`
        });
}

getLatest();