# 苍井结衣_ 歌单（GitHub Pages）

这是一个纯静态歌单页面，不需要服务器或 Node.js。

## 文件
- `index.html`：页面结构
- `style.css`：页面样式
- `script.js`：搜索、分类、随机、复制点歌等功能
- `playlist.json`：歌单数据
- `avatar.png`：头像

## 发布到 GitHub Pages
1. 新建公开仓库，例如 `aoi-yui-songlist`。
2. 将本目录里的 5 个文件上传到仓库根目录并 Commit。
3. 打开仓库 `Settings` → `Pages`。
4. `Build and deployment` 的 Source 选择 `Deploy from a branch`。
5. Branch 选择 `main`，文件夹选择 `/(root)`，保存。
6. 稍等部署完成，地址通常是：`https://你的用户名.github.io/aoi-yui-songlist/`

## 更新歌曲
编辑或替换 `playlist.json`，Commit 后 GitHub Pages 会自动重新部署。
