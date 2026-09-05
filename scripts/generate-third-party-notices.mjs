import fs from "node:fs";
import path from "node:path";

const pkgPath = path.resolve(process.cwd(), "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

const allDeps = {
  ...pkg.dependencies,
  ...pkg.devDependencies
};

let output = `THIRD-PARTY SOFTWARE NOTICES AND INFORMATION\n`;
output += `==============================================\n\n`;
output += `This document contains licensing notices for third-party software components incorporated into Findable.\n\n`;

const licensesSeen = new Map();

for (const depName of Object.keys(allDeps).sort()) {
  try {
    const depPkgPath = path.resolve(process.cwd(), "node_modules", depName, "package.json");
    if (fs.existsSync(depPkgPath)) {
      const depPkg = JSON.parse(fs.readFileSync(depPkgPath, "utf-8"));
      const licenseType = typeof depPkg.license === "object" ? depPkg.license.type : (depPkg.license || "UNKNOWN");
      
      let licenseText = "";
      const licenseFiles = ["LICENSE", "LICENSE.md", "LICENSE.txt", "LICENCE", "license"];
      for (const lf of licenseFiles) {
        const lfPath = path.resolve(process.cwd(), "node_modules", depName, lf);
        if (fs.existsSync(lfPath)) {
          licenseText = fs.readFileSync(lfPath, "utf-8");
          break;
        }
      }

      output += `------------------------------------------------------------------------\n`;
      output += `Package: ${depName}@${depPkg.version || allDeps[depName]}\n`;
      output += `License: ${licenseType}\n`;
      if (depPkg.homepage) output += `Homepage: ${depPkg.homepage}\n`;
      if (depPkg.repository?.url) output += `Repository: ${depPkg.repository.url}\n`;
      output += `\n`;
      if (licenseText) {
        output += licenseText.trim() + `\n\n`;
      }
    }
  } catch (e) {
    // continue
  }
}

fs.writeFileSync(path.resolve(process.cwd(), "THIRD-PARTY-NOTICES.txt"), output, "utf-8");
console.log("Generated THIRD-PARTY-NOTICES.txt successfully.");
