# 子咸的朋友们 · 爱播们歌单

这是一个用于统一管理多个虚拟主播独立歌单页面的 GitHub Pages 仓库。

## 结构
- `index.html`：全部爱播总站
- `hub.css`：总站样式
- `hub.js`：总站搜索与主播卡片逻辑
- `aibomen.json`：全部爱播登记表
- `aibomen/`：每位爱播的独立文件夹

当前示例：
- `aibomen/aoi-yui/`：苍井结衣_ 的独立歌单页面

每位爱播都可以拥有自己独立的：
- `index.html`
- `style.css`
- `script.js`
- `playlist.json`
- `avatar.png`
- `config.json`

因此不同主播可以使用完全不同的歌单分类方式与页面设计。

## 新增爱播
1. 在 `aibomen/` 下新建一个主播文件夹，例如 `aeri/`。
2. 把该主播自己的网页、头像和歌单文件放进去。
3. 在根目录 `aibomen.json` 中增加该主播的信息、头像路径和页面地址。
4. Commit 后 GitHub Pages 会自动更新。

## 推荐仓库名
将仓库从 `aoi-yui-songlist` 重命名为 `zixian-friends` 后，总站地址会变为：
`https://zixian-1418.github.io/zixian-friends/`

苍井结衣_ 的独立地址会变为：
`https://zixian-1418.github.io/zixian-friends/aibomen/aoi-yui/`
