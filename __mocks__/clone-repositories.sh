rm -fr ./repositories
mkdir ./repositories

git clone -b master https://${REPO_ACCESS_TOKEN}@github.com/consta-design-system/analytic-ui.git ./repositories/analytic-ui
git clone -b master https://${REPO_ACCESS_TOKEN}@github.com/consta-design-system/uikit.git ./repositories/uikit
git clone -b master https://${REPO_ACCESS_TOKEN}@github.com/consta-design-system/stats.git ./repositories/stats
