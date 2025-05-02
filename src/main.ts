export async function add(arg1: number, arg2: number): Promise<number> {
  return Promise.resolve(arg1 + arg2)
}

export class MarshallsManager {
  protected pkgs: string[] = []
  protected auditResults: object[] = []

  constructor(pkgs: string[]) {
    this.pkgs = pkgs
  }

  async process(): Promise<object[]> {
    for (const pkg of this.pkgs) {
      const result = await this.processPackage(pkg)
      this.auditResults.push(result)
    }

    return this.auditResults
  }

  async processPackage(pkg: string): Promise<object> {
    // Implementation here
    return {
      [pkg]: {
        name: pkg,
        version: '1.0.0'
      }
    }
  }
}