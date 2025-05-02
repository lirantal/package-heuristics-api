import { test, describe, beforeEach, mock } from 'node:test'
import assert from 'node:assert'
import { MarshallsManager } from '../src/main.ts'

describe('MarshallsManager', () => {

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
          version: '1.0.0'
        }
      },
      {
        package2: {
          name: 'package2',
          version: '1.0.0'
        }
      }
    ])
  });
  
});