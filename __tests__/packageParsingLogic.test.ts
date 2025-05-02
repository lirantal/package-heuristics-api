import { test, describe, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { MarshallsManager } from '../src/main.ts'

describe('MarshallsManager: package parsing logic', () => {

  beforeEach(() => {
    // Reset the mocks before each test
    mock.reset()
  });

  test('Packages are processed successfully', async (t) => {
    const pkgs = ['package1', 'package2']
    const marshallManager = new MarshallsManager(pkgs)
    const results = await marshallManager.process()
    assert.deepStrictEqual(results, [
      {
        package1: {
          name: 'package1',
          version: 'latest'
        }
      },
      {
        package2: {
          name: 'package2',
          version: 'latest'
        }
      }
    ])
  });

  test('Packages with versions specified are processed successfully', async (t) => {
    const pkgs = ['package1@1.1.1', 'package2@next']
    const marshallManager = new MarshallsManager(pkgs)
    const results = await marshallManager.process()
    assert.deepStrictEqual(results, [
      {
        [pkgs[0]]: {
          name: 'package1',
          version: '1.1.1'
        }
      },
      {
        [pkgs[1]]: {
          name: 'package2',
          version: 'next'
        }
      }
    ])
  });

  test('Packages with versions specified are processed successfully', async (t) => {
    const pkgs = ['@lirantal/package1@1.1.1', '@lirantal/package2@next', '@lirantal/package3']
    const marshallManager = new MarshallsManager(pkgs)
    const results = await marshallManager.process()
    assert.deepStrictEqual(results, [
      {
        [pkgs[0]]: {
          name: '@lirantal/package1',
          version: '1.1.1'
        }
      },
      {
        [pkgs[1]]: {
          name: '@lirantal/package2',
          version: 'next'
        }
      },
      {
        [pkgs[2]]: {
          name: '@lirantal/package3',
          version: 'latest'
        }
      }
    ])
  });
  
});