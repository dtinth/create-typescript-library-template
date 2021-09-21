require('make-promises-safe')

const execa = require('execa')
const task = require('tasuku')
const fs = require('fs')
const axios = require('axios')

async function run(cmd) {
  await task(`Run "${cmd}"`, async () => {
    await execa(cmd, {
      stdio: 'inherit',
      shell: true,
    })
  })
}

async function main() {
  await run('cd template && pnpm pack --pack-destination ..')
  await run('cd test-consumer && rm -rf package.json yarn.lock')
  await run("cd test-consumer && echo '{}' > package.json")
  await run('cd test-consumer && yarn add ../fresh-library-0.0.1-0.tgz')
  await run('cd test-consumer && node test')
}

main()
