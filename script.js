// Only change the values in this object to personalize the site.
const siteConfig = {
  discordUrl: "https://discord.gg/5hEnye5rg2",
};

document.querySelectorAll("[data-discord]").forEach((link) => {
  link.href = siteConfig.discordUrl;
});

const inviteCode = new URL(siteConfig.discordUrl).pathname.replace("/", "");
const memberCountElement = document.querySelector("#member-count");
const onlineCountElement = document.querySelector("#online-count");
const offlineCountElement = document.querySelector("#offline-count");

function refreshMemberCounts() {
  fetch(`https://discord.com/api/v10/invites/${inviteCode}?with_counts=true&with_expiration=true`)
    .then((response) => response.ok ? response.json() : Promise.reject())
    .then((invite) => {
      const members = invite.approximate_member_count;
      const online = invite.approximate_presence_count;
      if (typeof members === "number") memberCountElement.textContent = members.toLocaleString();
      if (typeof members === "number" && typeof online === "number") {
        onlineCountElement.textContent = online.toLocaleString();
        offlineCountElement.textContent = Math.max(0, members - online).toLocaleString();
      }
    })
    .catch(() => {});
}

refreshMemberCounts();
setInterval(refreshMemberCounts, 60000);

const music = document.querySelector("#music");
const musicFile = document.querySelector("#music-file");
const musicToggle = document.querySelector("#music-toggle");
const musicTitle = document.querySelector("#music-title");
let musicUrl;

musicFile.addEventListener("change", () => {
  const [file] = musicFile.files;
  if (!file) return;
  if (musicUrl) URL.revokeObjectURL(musicUrl);
  musicUrl = URL.createObjectURL(file);
  music.src = musicUrl;
  musicTitle.textContent = file.name.replace(/\.[^/.]+$/, "").toUpperCase();
  musicToggle.disabled = false;
  music.play();
});

musicToggle.addEventListener("click", () => {
  if (music.paused) music.play();
  else music.pause();
});

music.addEventListener("play", () => {
  musicToggle.innerHTML = '<span aria-hidden="true">❚❚</span> MUSIC';
  musicToggle.setAttribute("aria-label", "Pause music");
});

music.addEventListener("pause", () => {
  musicToggle.innerHTML = '<span aria-hidden="true">▶</span> MUSIC';
  musicToggle.setAttribute("aria-label", "Play music");
});
