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
  await run('rm -rf template')
  await run('mkdir template')
  await run('cp skeleton/package.json template/package.json')
  await run('cp skeleton/tsconfig.json template/tsconfig.json')
  await run('cp .pretterrc template/.pretterrc')
  await run(
    'cd template && pnpm install --save-dev @rushstack/heft @rushstack/heft-web-rig @types/heft-jest @microsoft/api-documenter',
  )
  await task('Create .gitignore', async () => {
    const { data: gitignoreTemplate } = await axios.get(
      'https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore',
    )
    const extra = [
      '# Compiled files',
      '/lib/',
      '/lib-commonjs/',
      '/dist/',
      '',
      '# Heft files',
      '.heft',
      '',
      '# Temporary files',
      'tmp',
      'temp',
      '',
      '# tsdoc',
      'tsdoc-metadata.json',
    ]
    const gitignore = gitignoreTemplate + '\n\n' + extra.join('\n') + '\n'
    fs.writeFileSync('template/.gitignore', gitignore)
  })
  await run('mkdir template/etc')
  await run('cp -Rv skeleton/src template/src')
  await run('cp -Rv skeleton/config template/config')
  await run('cp -Rv skeleton/.github template/.github')
  await run('cd template && pnpm run test')
  await run('cd template && pnpm run build')
  await run('cd template && pnpm run docs')
  await run('mkdir -p tmp')
  await task('Generate commit message', async () => {
    const message =
      'Fresh TypeScript library as of ' +
      new Date(Date.now() - 86400e3).toISOString().split('T')[0]
    fs.writeFileSync('tmp/message', message)
  })
}

main()
