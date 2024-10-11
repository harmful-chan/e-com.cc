Git commit 规范旨在提高代码库的可维护性、可读性和一致性。以下是常见的 Git commit 规范：

### 1. 使用简洁明确的提交信息
每次提交信息应该清晰明了，简洁地描述所做的更改。

### 2. 使用命令式的语气
提交信息的标题应该使用命令式语气，例如使用“Add”而不是“Added”。

### 3. 标题和正文之间用空行隔开
如果提交信息包括正文，标题和正文之间应有一个空行。

### 4. 限制标题长度
标题不应超过 50 个字符。

### 5. 分段描述
正文每行不应超过 72 个字符，以提高可读性。

### 6. 详细描述变更
在正文中详细描述变更的内容及其原因，必要时可以描述实现细节。

### 7. 参考相关的 Issue 或 PR
在正文末尾提及相关的 Issue 或 Pull Request。

### 8. 使用合适的关键词
常用的关键词包括：

- feat: 新功能
- fix: 修复 bug
- docs: 文档变更
- style: 代码格式（不影响代码运行的变动）
- refactor: 重构代码（既不是新功能也不是修复 bug 的代码变动）
- test: 添加测试
- chore: 构建过程或辅助工具的变动

### 示例

```plaintext
feat: Add user authentication

Add JWT-based user authentication to the application. This includes:
- User login endpoint
- User registration endpoint
- Middleware for protecting routes

Closes #42
```

### 9. 遵循约定式提交（Conventional Commits）
约定式提交是一种广泛使用的提交信息规范格式，具体规范如下：

```plaintext
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**: 用于说明提交的类型，如 `feat`、`fix` 等。
- **scope**: 可选，用于说明提交的影响范围，如模块、功能等。
- **subject**: 简明扼要的提交说明。
- **body**: 可选，详细的提交说明。
- **footer**: 可选，通常用于关联 Issue、Breaking Changes 等。

### 例子

```plaintext
fix(auth): Correct password hashing method

Ensure the bcrypt method is correctly used for hashing user passwords.
Previously, the salt was being incorrectly applied, causing issues during
authentication. This fix addresses the salting issue.

BREAKING CHANGE: Password hashes generated before this fix will not be
compatible. Users will need to reset their passwords.

Closes #108
```

通过遵循这些规范，团队可以更好地协作，代码库的维护也会更加高效。