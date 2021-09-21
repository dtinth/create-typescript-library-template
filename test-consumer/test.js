const assert = require('assert')

async function main() {
  const { FreshLibrary } = require('fresh-library')
  assert.equal(new FreshLibrary().add(1, 2), 3)
  console.log('It works!')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
