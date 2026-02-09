# IT Tools for Ruck

`it-tools` 是一款致力于为开发人员和 IT 从业者提供各种实用工具的开源集合。作为 Ruck 插件，它将这些功能直接集成到你的工作流中，支持通过搜索框快速打开、输入内容正则表达式自动识别匹配。

![image](https://img.cdn1.vip/i/698970d0c1acf_1770614992.png)

## 核心功能与可用工具

以下是内置的 60 多种可用工具，按功能领域分类整理：

### 1. 密码学与安全 (Crypto)
- **Token Generator**: 生成各种长度和样式的安全令牌。
- **Hash Text**: 计算文本的 MD5, SHA-1, SHA-256, SHA-512 等哈希值。
- **Bcrypt**: 生成并验证 Bcrypt 密码哈希。
- **UUID/ULID Generator**: 生成唯一标识符。
- **Encryption/Decryption**: AES, DES, TripleDES 等常用算法加解密。
- **BIP39 Mnemonic**: 生成助记词。
- **HMAC Generator**: 计算消息认证码。
- **RSA Key Pair Generator**: 生成 RSA 公私钥对。
- **Password Strength Analyser**: 分析密码强度。

### 2. 格式转换 (Converter)
- **Date Time Converter**: 时间戳与日期格式互转。
- **Integer Base Converter**: 二进制、八进制、十进制、十六进制等基数互转。
- **Base64 String/File Converter**: 字符串或文件的 Base64 编码与解码。
- **Color Converter**: HEX, RGB, HSL 等颜色格式互转。
- **Case Converter**: 驼峰、下划线、中划线等命名风格转换。
- **JSON/YAML/XML/TOML 互转**: 支持常见配置格式的相互转换。
- **Markdown to HTML**: 将 Markdown 语法转换为 HTML。

### 3. Web 开发工具 (Web)
- **URL Encoder/Decoder**: 转义 URL 中的特殊字符。
- **HTML Entities**: HTML 实体编码与还原。
- **JWT Parser**: 解析并预览 JWT（JSON Web Token）的内容（Header, Payload）。
- **User-Agent Parser**: 解析浏览器 UA 字符串。
- **HTTP Status Codes**: 快速查阅 HTTP 状态码及其含义。
- **JSON Diff**: 对比两个 JSON 对象之间的差异。
- **Slugify String**: 将字符串转换为 URL Slug 格式。

### 4. 开发与调试 (Development)
- **JSON Viewer/Minify**: JSON 的实时预览、格式化、压缩。
- **SQL Prettify**: 格式化 SQL 语句。
- **Chmod Calculator**: 计算 Linux 文件系统权限代码。
- **Docker Run to Compose**: 将 `docker run` 命令转换为 docker-compose 格式。
- **Git Memo**: Git 常用命令参考速查。
- **Crontab Generator**: 生成 Cron 表达式。
- **Regex Tester**: 测试正则表达式。

### 5. 网络工具 (Network)
- **IPv4 Subnet Calculator**: 子网掩码计算与划分。
- **IPv4 Range Expander**: 批量展开 IP 范围。
- **MAC Address Lookup/Generator**: MAC 地址生成及归属查询。
- **IPv6 ULA Generator**: 生成 IPv6 唯一本地地址。

### 6. 文本处理 (Text)
- **Text Statistics**: 统计字数、行数、字符密度等。
- **Text Diff**: 对比两段大文本的差异。
- **Lorem Ipsum Generator**: 生成占位文本。
- **Emoji Picker**: 查找并复制表情符号。

### 7. 数学与测量 (Math & Measurement)
- **Math Evaluator**: 进行复杂的数学算术计算。
- **Chronometer**: 秒表及计时工具。
- **Temperature Converter**: 温度单位转换。
- **Percentage Calculator**: 百分比计算。

### 8. 媒体工具 (Images and videos)
- **QR Code Generator**: 生成普通或 WiFi 二维码。
- **SVG Placeholder Generator**: 生成 SVG 占位图。
- **Camera Recorder**: 摄像头录制。

## 致谢

本项目基于开源项目 [it-tools](https://github.com/CorentinTh/it-tools) 进行 Ruck 插件适配。
