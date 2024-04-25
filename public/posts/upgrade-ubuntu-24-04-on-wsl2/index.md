---
title: WSL2上のUbuntu 22.04 → Ubuntu 24.04アップグレード
description: "普段の開発にUbuntu 22.04 on WSL2を使っています。最近新しいLTSであるUbuntu 24.04が公開されたので、折角なのでアップグレードした際の作業ログです。"
tags: ["linux", "wsl2"]
published: true
publishedAt: "2024-04-26"
---

## はじめに

普段の開発にWSL2上のUbuntu 22.04を使っています。最近新しいLTSであるUbuntu 24.04が公開されたので、折角なのでアップグレードしました。自身がUbuntuのバージョンアップグレードを行うのは初めてであり、いくつか躓いた点もあるので、その作業ログを残しておきます。(尚、躓いたのはUbuntuというよりWSL2の操作に関してです)

## アップグレード前準備

アップグレード前の環境は以下の通りです。

```bash title="/etc/os-release"
% cat /etc/os-release
PRETTY_NAME="Ubuntu 22.04.4 LTS"
NAME="Ubuntu"
VERSION_ID="22.04"
VERSION="22.04.4 LTS (Jammy Jellyfish)"
VERSION_CODENAME=jammy
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=jammy
```

WSL2だと`export`を使うことで簡単にバックアップを取れそうなので、まずバックアップを取ることにしました。
管理者権限で起動したPowershell上で、以下のコマンドを実行します。

```powershell title="powershell"
# 現在の状況を確認
wsl -l -v

  NAME                   STATE           VERSION
* Ubuntu                 Running         2
  docker-desktop         Running         2
  docker-desktop-data    Running         2

# Export前にインスタンスを止める
wsl --shutdown

# 止まっていることを確認
wsl -l -v

  NAME                   STATE           VERSION
* Ubuntu                 Stopped         2
  docker-desktop         Stopped         2
  docker-desktop-data    Stopped         2

# wsl --export でバックアップを取る(vhdx形式)
wsl --export --vhd Ubuntu C:\Users\ubuntu.vhdx

# バックアップから復元できることを確認
wsl --import --vhd --version 2 ubuntu-backup C:\Users\wsl\ubuntu-backup C:\Users\ubuntu.vhdx

# インスタンスを起動して確認する(何故かrootユーザーでログインするが、データは入ってたのでOKと判断)
wsl -d ubuntu-backup
```

## アップグレード

バックアップが取れていることを確認したので、実際のアップグレードの作業です。
といっても、コマンドを一通り打つだけなので、特に難しいことはありませんでした。
時間はかかるので(自分の場合は30分ほど)、そこは気長に待ちましょう。

```bash title="bash"
sudo apt upgrade
sudo apt dist-upgrade
# 自分は既にインストール済みでしたが、なければインストールしてください
sudo apt install update-manager-core
# 出たばかりなので -d オプションが必要
sudo do-release-upgrade -d

# 色々聞かれるので、適宜答えていく
# 最後にWSL2のインスタンスが落ちるので、再度起動する
# 再起動後に以下のコマンドでバージョンが24.04になっていることを確認
cat /etc/os-release

PRETTY_NAME="Ubuntu 24.04 LTS"
NAME="Ubuntu"
VERSION_ID="24.04"
VERSION="24.04 LTS (Noble Numbat)"
VERSION_CODENAME=noble
ID=ubuntu
ID_LIKE=debian
HOME_URL="https://www.ubuntu.com/"
SUPPORT_URL="https://help.ubuntu.com/"
BUG_REPORT_URL="https://bugs.launchpad.net/ubuntu/"
PRIVACY_POLICY_URL="https://www.ubuntu.com/legal/terms-and-policies/privacy-policy"
UBUNTU_CODENAME=noble
LOGO=ubuntu-logo
```

## おわりに

基本的には、この作業をするだけでアップグレードは完了です。ただ、いくつかハマった点があったので、それはこの後に書いておきます。

## ハマった点

### export時のエラー Error code: Wsl/E_ACCESSDENIED

WSL2のインスタンスをエクスポートする際に、以下のエラーが出ました。
```powershell title="powershell"
wsl --export Ubuntu C:\Users
アクセスが拒否されました。
Error code: Wsl/E_ACCESSDENIED
```

これでピンと来る人がいるかも知れませんが、エクスポート先はファイル名を指定する必要があります。以下のようにすればエラーが解消されます。

```powershell title="powershell"
wsl --export Ubuntu C:\Users\ubuntu.tar
```

また、記事内では`--vhd`を使っていますが、tar形式でのエクスポートより大分速かったからです。

### アップグレード後のUbuntu 24.04上で名前解決ができなくなった

これは、アップグレード前の環境に依存すると思います。
私はアップグレード前にDNS周りのトラブルがあったため、`/etc/wsl.conf`を変更することで`/etc/resolve.conf`を自動生成せず、手動で設定していました。[^1]

[^1]: https://qiita.com/kkato233/items/1fc71bde5a6d94f1b982 など

アップグレード後も`/etc/wsl.conf`は引き継がれており、内容も変わらずだったのですが、`/etc/resolve.conf`は自動生成されるものになっていました。`/etc/resolve.conf`を削除して、再度書き直しても解決しませんでした。そのため、`sudo chattr +i /etc/resolve.conf`でファイルをロックすることで解決しました。(多分もっと良い方法はありそう……)[^2]

[^2]: https://github.com/microsoft/WSL/issues/5611#issuecomment-1470864374
