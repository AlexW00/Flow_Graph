#!/usr/bin/env sh
set -e
npm run build
cd dist
git init
git checkout master
git add -A
git commit -m 'deploy'
git push -f git@github.com:AlexW00/Flow_Graph.git master:gh-pages
cd -