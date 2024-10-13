Git 团队常用工作流程旨在确保代码库的稳定性和团队协作的高效性。

### Git Flow
Git Flow 是一种功能强大的 Git 工作流程，适用于大型项目。其主要分支结构包括：
- `main`：主分支，包含生产环境的代码。
- `develop`：开发分支，包含下一个发布版本的代码。
- `feature/*`：功能分支，用于开发新功能。
- `release/*`：发布分支，用于准备新的发布版本。
- `hotfix/*`：热修复分支，用于修复生产环境中的紧急问题。

#### Git Flow 基本步骤：
1. 从 `develop` 分支创建 `feature` 分支进行新功能开发。
2. 开发完成后，将 `feature` 分支合并回 `develop`。
3. 准备发布时，从 `develop` 分支创建 `release` 分支。
4. 在 `release` 分支上进行测试和修复 bug，然后合并回 `main` 和 `develop`。
5. 遇到紧急问题时，从 `main` 分支创建 `hotfix` 分支，修复后合并回 `main` 和 `develop`。

### Git Flow 使用示例
下面是一个使用 Git Flow 的实例，假设我们有一个名为 `my-project` 的项目。我们将从项目初始化开始，展示 Git Flow 的具体使用步骤。

#### 初始化项目和 Git Flow

1. **初始化 Git 仓库**：
    ```bash
    git init
    cd my-project
    ```

2. **创建 `main` 和 `develop` 分支**：
    ```bash
    git checkout -b main
    git commit --allow-empty -m "Initial commit"
    git checkout -b develop
    ```

3. **初始化 Git Flow**：
    ```bash
    git flow init
    ```
   这里会提示输入一些默认分支名，我们通常保留默认设置即可。

#### 开发新功能

1. **创建功能分支**：
    ```bash
    git flow feature start new-feature
    ```
   这会从 `develop` 分支创建一个名为 `feature/new-feature` 的分支。

2. **在功能分支上进行开发**：
    ```bash
    # 编辑代码文件
    git add .
    git commit -m "Add new feature"
    ```

3. **完成功能开发并合并回 `develop`**：
    ```bash
    git flow feature finish new-feature
    ```
   这会将 `feature/new-feature` 分支合并回 `develop` 分支，并删除 `feature/new-feature` 分支。

#### 查看代码更新

1. **检测文件变化**
    ```bash
    git checkout feature/new-feature
    git diff origin/develop
    ```
    查看当前文件与当前分支最新commit有什么区别。
    
2. **拉取develop最新代码并rebase自己分支**
   ```bash
   git checkout develop
   git pull origin
   git checkout feature/new-feature
   git rebase develop
   ### ... 解决冲突
   git commit -m "xxx"
   ```

#### 准备发布

1. **创建发布分支**：
    ```bash
    git flow release start 1.0.0
    ```
   这会从 `develop` 分支创建一个名为 `release/1.0.0` 的分支。

2. **在发布分支上进行测试和修复 bug**：
    ```bash
    # 编辑代码文件
    git add .
    git commit -m "Fix bug in release 1.0.0"
    ```

3. **完成发布并合并回 `main` 和 `develop`**：
    ```bash
    git flow release finish 1.0.0
    ```
   这会将 `release/1.0.0` 分支合并回 `main` 和 `develop` 分支，并创建一个标签 `1.0.0`，然后删除 `release/1.0.0` 分支。

#### 修复紧急问题

1. **创建热修复分支**：
    ```bash
    git flow hotfix start fix-critical-bug
    ```
   这会从 `main` 分支创建一个名为 `hotfix/fix-critical-bug` 的分支。

2. **在热修复分支上进行修复**：
    ```bash
    # 编辑代码文件
    git add .
    git commit -m "Fix critical bug"
    ```

3. **完成热修复并合并回 `main` 和 `develop`**：
    ```bash
    git flow hotfix finish fix-critical-bug
    ```
   这会将 `hotfix/fix-critical-bug` 分支合并回 `main` 和 `develop` 分支，并创建一个标签，然后删除 `hotfix/fix-critical-bug` 分支。

#### 总结

通过上述步骤，我们可以看到 Git Flow 的实际使用过程。在开发新功能时使用 `feature` 分支，在准备发布时使用 `release` 分支，在修复紧急问题时使用 `hotfix` 分支。每种分支类型都有其特定的用途和生命周期，确保了代码库的稳定性和有序管理。
