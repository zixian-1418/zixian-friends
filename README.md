# 子咸的朋友们 · 爱播们歌单

这是一个用于统一管理多个虚拟主播独立歌单页面的 GitHub Pages 仓库。

## 当前结构

- `index.html`：爱播们总站
- `hub.css`：总站样式
- `hub.js`：总站搜索与主播卡片逻辑
- `aibomen.json`：主播登记表
- `aibomen/`：每位爱播的独立目录
- `aibomen/index.html`：访问 `/aibomen/` 时返回总站

当前主播：

- `aibomen/aoi-yui/`：苍井结衣_
- `aibomen/riyu/`：莉由_riyu
- `aibomen/kira/`：雪鹤千绪Kira

每位主播目录可以独立拥有：

- `index.html`
- `style.css`
- `script.js`
- `playlist.json`
- `avatar.webp`
- `config.json`

这样不同主播可以使用不同的歌单分类和页面风格，同时由总站统一入口管理。

## 新增爱播

1. 在 `aibomen/` 下新建主播目录，例如 `aeri/`。
2. 放入该主播自己的网页、头像和歌单文件。
3. 在根目录 `aibomen.json` 的 `streamers` 数组里登记主播名称、头像路径、页面地址、简介与搜索关键词。
4. Commit 后 GitHub Pages 会自动更新。

## 页面地址

总站：

`https://zixian-1418.github.io/zixian-friends/`

苍井结衣_：

`https://zixian-1418.github.io/zixian-friends/aibomen/aoi-yui/`

莉由_riyu：

`https://zixian-1418.github.io/zixian-friends/aibomen/riyu/`

雪鹤千绪Kira：

`https://zixian-1418.github.io/zixian-friends/aibomen/kira/`

## 头像规范

- 主播头像统一使用高质量 WebP，建议尺寸 512×512。
- 文件名统一使用 `avatar.webp`，便于总站和主播页面维护。

## 维护建议

- 主播自己的素材只放在对应的 `aibomen/<id>/` 中，不要在仓库根目录重复保存。
- 修改歌单时只编辑对应主播目录里的 `playlist.json`。
- 新增主播时记得同步更新 `aibomen.json`。
- `config.json` 作为该主播的维护信息保留；当前网页运行不依赖它。
