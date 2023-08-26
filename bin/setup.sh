setup () {
  npm install
  cp ./.git_hooks/pre-commit ./.git/hooks
  npm run test
}

setup