# A股宏观看板

周度宏观仪表盘，覆盖中美两市增长/通胀/流动性/风险偏好四象限。

## 快速开始

### 1. 安装依赖

```bash
cd a-share-macro-dashboard
pip install -r requirements.txt
```

### 2. （可选）配置 FRED API Key

免费申请：https://fred.stlouisfed.org/docs/api/api_key.html

```bash
export FRED_API_KEY="your_key_here"
```

不配置则跳过美国宏观数据，仅拉取 AKShare + yfinance。

### 3. 启动

**静态模式** — 直接浏览器打开 `index.html`，读取 `js/data.js` 中的手动数据。

**实时模式** — 启动 Flask 服务器：

```bash
# 启动并立即拉取一次数据，之后每 30 分钟自动刷新
python backend/server.py --auto-refresh 30 --fetch-on-start

# 仅启动服务器（手动点击页面底部「刷新数据」按钮触发）
python backend/server.py
```

访问 http://127.0.0.1:8080

### 4. 定时调度（cron / launchd）

如需在服务器关闭时也定期更新数据文件：

**Linux / macOS cron**

```bash
# 每周一至周五 9:00 和 18:00 拉取数据
crontab -e
0 9,18 * * 1-5 cd /path/to/a-share-macro-dashboard && python backend/data_fetcher.py
```

**macOS launchd**

将下面内容保存为 `~/Library/LaunchAgents/com.ashare.dashboard.plist`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>com.ashare.dashboard</string>
  <key>ProgramArguments</key>
  <array>
    <string>/usr/bin/python3</string>
    <string>/path/to/a-share-macro-dashboard/backend/data_fetcher.py</string>
  </array>
  <key>StartCalendarInterval</key>
  <array>
    <dict><key>Hour</key><integer>9</integer><key>Minute</key><integer>0</integer></dict>
    <dict><key>Hour</key><integer>18</integer><key>Minute</key><integer>0</integer></dict>
  </array>
  <key>EnvironmentVariables</key>
  <dict>
    <key>FRED_API_KEY</key>
    <string>your_key_here</string>
  </dict>
</dict>
</plist>
```

```bash
launchctl load ~/Library/LaunchAgents/com.ashare.dashboard.plist
```

## API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/data` | GET | 最新数据 JSON |
| `/api/refresh` | POST | 触发数据刷新 |
| `/api/glossary` | GET | 数据字典 |
| `/api/status` | GET | 服务器状态 |

## 数据源

| 来源 | 覆盖 | 需要 Key |
|------|------|----------|
| AKShare | 中国 PMI/CPI/PPI/社融/北向/融资融券 | 否 |
| FRED | 美国利率/通胀/信用利差/VIX/美元 | 是（免费） |
| yfinance | 全球指数行情 | 否 |

## 项目结构

```
├── index.html              # 主页面
├── css/main.css            # 样式
├── js/
│   ├── data.js             # 静态数据（手动更新用）
│   ├── glossary.js         # 数据字典（22+ 指标定义）
│   ├── app.js              # 渲染逻辑
│   └── live.js             # 实时数据轮询
├── backend/
│   ├── server.py           # Flask 服务器
│   └── data_fetcher.py     # 数据拉取脚本
├── data/
│   └── latest.json         # 最新数据缓存
└── requirements.txt
```
