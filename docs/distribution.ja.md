# 独立したUI公開配布

[English](distribution.md)

0.10.0は未公開候補です。owner CIでsource test/型/build/pack、別consumerへの実TGZ導入、公開宣言/snapshot/型・component SSRを確認して`npm-candidate`を保存します。兄弟sourceや実accountは不要です。public API例はscope違いと実行codeを含む宣言を拒否します。UI scopeはcache分離であり認証ではありません。

別consumerのNuxt peer依存回帰は、正式配布localized-site 0.1.4のsecurity toolを開発時だけ再利用します。UIのruntime依存にはしません。業務handler・route認可・永続state・native worker配布はhostが所有します。

初回OIDC stage前に、main SHA/archive hashを確認し、既存のowner本人確認付きbootstrap手順でnpm packageを登録します。Trusted Publisherはowner `nuxtjp`、repo `declarative-ui`、workflow `publish-npm.yml`、environment `npm-public`です。新たな広域tokenやprivate registryを前提にしません。本人確認が必要な初回登録と、OIDC実library公開を分けます。

`REGISTRY_SECURITY_APPROVED_SHA`を確認済みmain SHAへ設定し、workflowに`expected-source-sha`と`expected-archive-sha256`を渡します。source承認・public main・OIDC contextと候補hashを照合し、consumerを再検証してprovenance付きstageを作ります。npm ownerが該当stageを2FA承認し、正式bytes/署名/source/workflow/runと新consumerを確認してからinteraction fixtureをregistryへ切替えます。それまでは明示的な固定public-source開発checkoutを例外として残します。

OIDC成功とnpm側の従来token禁止の保証は別で確認します。site・worker service・実authorityは有効化しません。
