## 配置

设置全局配置

```shell
git config --global user.name "[姓名]"
git config --global user.email "[邮箱]"
```

## 开始使用

创建一个 Git 仓库

```shell
git init
```

克隆一个现有的 Git 仓库

```shell
git clone [url]
```

## 提交 (Commit)

提交所有已追踪的更改

```shell
git commit -am "[提交信息]"
```

将新的修改添加到上一次提交中

```shell
git commit --amend --no-edit
```

## 我犯了个错误

更改最后一次提交信息

```shell
git commit --amend
```

撤销最近一次提交并保留更改

```shell
git reset HEAD~1
```

撤销最近 `N` 次提交并保留更改

```shell
git reset HEAD~N
```

撤销最近一次提交并丢弃更改

```shell
git reset HEAD~1 --hard
```

将分支重置为远程状态

```shell
git fetch origin
git reset --hard origin/[分支名]
```

## 其他

将本地 master 分支重命名为 main

```shell
git branch -m master main
```
