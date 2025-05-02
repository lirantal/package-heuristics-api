import { PackageVersionMap } from './types.ts'

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
    const pkgNameStruct: PackageVersionMap = this.createPackageVersionMap(pkg)

    return {
      [pkg]: {
        name: pkgNameStruct.packageName,
        version: pkgNameStruct.packageVersion
      }
    }
  }
  createPackageVersionMap(pkg: string): PackageVersionMap {
    const versionSymbolPosition = pkg.lastIndexOf('@')
    const versionPosition =
      versionSymbolPosition === -1 || versionSymbolPosition === 0
        ? pkg.length
        : versionSymbolPosition

    return {
      packageName: pkg.substring(0, versionPosition),
      packageVersion: pkg.substring(versionPosition + 1) || 'latest',
      packageString: pkg
    }
  }
}
