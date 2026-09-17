const state = {
  all: [],
  filtered: [],
  genre: "全部",
  query: "",
  view: localStorage.getItem("songlist-view") || "list"
};

const el = {
  songList: document.querySelector("#songList"),
  filters: document.querySelector("#genreFilters"),
  search: document.querySelector("#searchInput"),
  random: document.querySelector("#randomBtn"),
  result: document.querySelector("#resultText"),
  total: document.querySelector("#totalCount"),
  empty: document.querySelector("#emptyState"),
  toast: document.querySelector("#toast"),
  listBtn: document.querySelector("#listViewBtn"),
  gridBtn: document.querySelector("#gridViewBtn"),
  dialog: document.querySelector("#randomDialog"),
  randomTitle: document.querySelector("#randomTitle"),
  randomMeta: document.querySelector("#randomMeta"),
  copyRandom: document.querySelector("#copyRandomBtn"),
  again: document.querySelector("#againBtn")
};

let randomSong = null;
let toastTimer = null;

function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function asArray(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

function songGenres(song) {
  return asArray(song.genre);
}

function songLanguages(song) {
  return asArray(song.language);
}

function searchable(song) {
  return [song.title, song.artist, ...songGenres(song), ...songLanguages(song), song.note]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function showToast(text) {
  clearTimeout(toastTimer);
  el.toast.textContent = text;
  el.toast.classList.add("show");
  toastTimer = setTimeout(() => el.toast.classList.remove("show"), 1800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

async function copySong(song) {
  const text = `点歌 ${song.title}`;
  await copyText(text);
  showToast(`已复制：${text}`);
}

function applyFilters() {
  const q = normalize(state.query);
  state.filtered = state.all.filter(song => {
    const genreOk = state.genre === "全部" || songGenres(song).includes(state.genre);
    const queryOk = !q || searchable(song).includes(q);
    return genreOk && queryOk;
  });
  renderSongs();
}

function badge(text, className = "") {
  const span = document.createElement("span");
  span.className = `badge ${className}`.trim();
  span.textContent = text;
  return span;
}

function renderSongs() {
  el.songList.innerHTML = "";
  const frag = document.createDocumentFragment();

  for (const song of state.filtered) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "song";
    button.setAttribute("aria-label", `复制点歌：${song.title}`);

    const main = document.createElement("div");
    const title = document.createElement("div");
    title.className = "song-title";
    title.textContent = song.title;
    main.appendChild(title);

    const sub = document.createElement("div");
    sub.className = "song-sub";
    if (song.artist) {
      const artist = document.createElement("span");
      artist.textContent = song.artist;
      sub.appendChild(artist);
    }
    songGenres(song).forEach(g => sub.appendChild(badge(g)));
    songLanguages(song).forEach(l => sub.appendChild(badge(l, "lang")));
    main.appendChild(sub);

    const copy = document.createElement("span");
    copy.className = "song-copy";
    copy.textContent = "点歌";

    button.append(main, copy);
    button.addEventListener("click", () => copySong(song));
    frag.appendChild(button);
  }

  el.songList.appendChild(frag);
  el.result.textContent = state.filtered.length === state.all.length
    ? `共 ${state.all.length} 首`
    : `找到 ${state.filtered.length} / ${state.all.length} 首`;
  el.empty.hidden = state.filtered.length !== 0;
}

function renderFilters() {
  const genres = [...new Set(state.all.flatMap(songGenres))].filter(Boolean);
  const preferred = ["J-POP", "VOCALOID", "动漫", "中文"];
  genres.sort((a, b) => {
    const ai = preferred.indexOf(a), bi = preferred.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b, "zh-CN");
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  for (const genre of ["全部", ...genres]) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `chip${genre === state.genre ? " active" : ""}`;
    btn.textContent = genre;
    btn.addEventListener("click", () => {
      state.genre = genre;
      [...el.filters.children].forEach(x => x.classList.toggle("active", x === btn));
      applyFilters();
    });
    el.filters.appendChild(btn);
  }
}

function setView(view) {
  state.view = view;
  localStorage.setItem("songlist-view", view);
  el.songList.classList.toggle("list-view", view === "list");
  el.songList.classList.toggle("grid-view", view === "grid");
  el.listBtn.classList.toggle("active", view === "list");
  el.gridBtn.classList.toggle("active", view === "grid");
}

function drawRandom() {
  if (!state.filtered.length) {
    showToast("当前筛选条件下没有歌曲");
    return;
  }
  randomSong = state.filtered[Math.floor(Math.random() * state.filtered.length)];
  el.randomTitle.textContent = randomSong.title;
  const meta = [...songGenres(randomSong), ...songLanguages(randomSong)].join(" · ");
  el.randomMeta.textContent = [randomSong.artist, meta].filter(Boolean).join(" · ") || "苍井结衣_歌单";
  if (!el.dialog.open) el.dialog.showModal();
}

async function init() {
  try {
    const res = await fetch("playlist.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.all = Array.isArray(data.items) ? data.items.filter(x => x && x.title) : [];
    state.filtered = [...state.all];
    el.total.textContent = state.all.length;
    renderFilters();
    setView(state.view);
    applyFilters();
  } catch (err) {
    console.error(err);
    el.result.textContent = "歌单载入失败";
    el.empty.hidden = false;
    el.empty.querySelector("p").textContent = "无法读取 playlist.json，请检查文件是否已上传。";
  }
}

el.search.addEventListener("input", e => {
  state.query = e.target.value;
  applyFilters();
});
el.random.addEventListener("click", drawRandom);
el.again.addEventListener("click", drawRandom);
el.copyRandom.addEventListener("click", () => randomSong && copySong(randomSong));
el.listBtn.addEventListener("click", () => setView("list"));
el.gridBtn.addEventListener("click", () => setView("grid"));

init();
