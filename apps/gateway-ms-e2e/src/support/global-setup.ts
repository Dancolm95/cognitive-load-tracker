import { waitForPortOpen } from '@nx/node/utils'

/* eslint-disable */
var __TEARDOWN_MESSAGE__: string

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n')

  const host = process.env.HOST ?? 'localhost'
  const port = process.env.PORT ? Number(process.env.PORT) : 3000
  await waitForPortOpen(port, { host })

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n'
}
