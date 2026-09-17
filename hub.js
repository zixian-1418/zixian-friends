const grid = document.querySelector('#streamerGrid');
const search = document.querySelector('#streamerSearch');
const count = document.querySelector('#streamerCount');
const empty = document.querySelector('#emptyState');

let streamers = [];

function normalize(value) {
  return String(value ?? '').trim().toLowerCase();
}

function render(list) {
  grid.innerHTML = '';
  const frag = document.createDocumentFragment();

  for (const streamer of list) {
    const card = document.createElement('a');
    card.className = 'streamer-card';
    card.href = streamer.url;
    card.setAttribute('aria-label', `进入 ${streamer.name} 的歌单`);

    const imageWrap = document.createElement('div');
    imageWrap.className = 'card-image';
    const image = document.createElement('img');
    image.src = streamer.avatar;
    image.alt = `${streamer.name}头像`;
    image.loading = 'lazy';
    imageWrap.appendChild(image);

    const body = document.createElement('div');
    body.className = 'card-body';

    const top = document.createElement('div');
    top.className = 'card-top';
    const name = document.createElement('h2');
    name.className = 'streamer-name';
    name.textContent = streamer.name;
    top.appendChild(name);

    if (streamer.status) {
      const status = document.createElement('span');
      status.className = 'status';
      status.textContent = streamer.status;
      top.appendChild(status);
    }

    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = streamer.description || '点击查看主播歌单';

    const enter = document.createElement('div');
    enter.className = 'enter';
    const enterText = document.createElement('span');
    enterText.textContent = '查看歌单';
    const arrow = document.createElement('span');
    arrow.textContent = '→';
    enter.append(enterText, arrow);

    body.append(top, description, enter);
    card.append(imageWrap, body);
    frag.appendChild(card);
  }

  grid.appendChild(frag);
  count.textContent = list.length === streamers.length
    ? `共 ${streamers.length} 位爱播`
    : `找到 ${list.length} / ${streamers.length} 位`;
  empty.hidden = list.length !== 0;
}

function applySearch() {
  const q = normalize(search.value);
  if (!q) {
    render(streamers);
    return;
  }
  render(streamers.filter(streamer => {
    const text = [streamer.name, streamer.id, streamer.description, ...(streamer.keywords || [])]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return text.includes(q);
  }));
}

async function init() {
  try {
    const response = await fetch('aibomen.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    streamers = Array.isArray(data.streamers) ? data.streamers : [];
    render(streamers);
  } catch (error) {
    console.error(error);
    count.textContent = '载入失败';
    empty.hidden = false;
    empty.textContent = '无法读取 aibomen.json，请检查文件。';
  }
}

search.addEventListener('input', applySearch);
init();
