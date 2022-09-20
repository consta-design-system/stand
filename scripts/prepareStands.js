const fg = require('fast-glob');
const { readFile, writeFile, ensureDir, remove } = require('fs-extra');
const { join } = require('path');

const { access, F_OK, existsSync } = require('fs');

const createlazyDocs = async (srcWithName, standsImportPath, type) => {
  const docsFile = `${srcWithName}${type}`;

  const template = await readFile(
    'node_modules/@consta/stand/templates/lazydocs.tsx.template',
    'utf8',
  );

  access(docsFile, F_OK, async (err) => {
    if (!err) {
      const lazyDocsFileName = `${docsFile.replace(/\W/g, '_')}.tsx`;

      const imports = `import Docs from '../${standsImportPath}/${docsFile}';\n`;

      const jsCode = template.replace(/#imports#/g, imports);

      await writeFile(
        `node_modules/@consta/stand/src/stands/lazyDocs/${lazyDocsFileName}`,
        jsCode,
      );
    }
  });
};

const createlazyImage = async (srcWithName, standsImportPath) => {
  const file = `${srcWithName}.image.svg`;

  access(file, F_OK, async (err) => {
    if (!err) {
      const lazyDocsFileName = `${file.replace(/\W/g, '_')}.tsx`;
      const jsCode = `import Image from '../${standsImportPath}/${file}';\nexport default Image;\n`;

      await writeFile(
        `node_modules/@consta/stand/src/stands/lazyDocs/${lazyDocsFileName}`,
        jsCode,
      );
    }
  });
};

const createlazyVariants = async (srcWithName, standsImportPath) => {
  const file = `${srcWithName}.variants.tsx`;

  access(file, F_OK, async (err) => {
    if (!err) {
      const lazyDocsFileName = `${file.replace(/\W/g, '_')}.tsx`;
      const jsCode = `import Variants from '../${standsImportPath}/${file}';\nexport default Variants;\n`;

      await writeFile(
        `node_modules/@consta/stand/src/stands/lazyDocs/${lazyDocsFileName}`,
        jsCode,
      );
    }
  });
};

const createLazy = async (srcWithName, standsImportPath, standTabs) => {
  const promises = [
    createlazyDocs(srcWithName, standsImportPath, '.stand.mdx'),
    createlazyImage(srcWithName, standsImportPath),
    createlazyVariants(srcWithName, standsImportPath),
  ];

  for (let index = 0; index < standTabs.length; index++) {
    promises.push(
      createlazyDocs(
        srcWithName,
        standsImportPath,
        `.${standTabs[index]}.stand.mdx`,
      ),
    );
  }

  await Promise.all(promises);
};

const prepareStands = async ({
  srcPath,
  packagePath,
  projectPath,
  standsTemaplatePath,
  standsPath,
  standsImportPath,
  standsUrlPath,
  standTabs,
}) => {
  await remove('node_modules/@consta/stand/src/stands');
  await ensureDir('node_modules/@consta/stand/src/stands/lazyDocs/');

  const path = join(srcPath, '**', '*.stand.{ts,tsx}');

  const standsFiles = await fg(path);

  console.info(standsFiles);

  const template = await readFile(standsTemaplatePath, 'utf8');

  let imports = '';
  let stands = 'export const standsGenerated: CreatedStand[] = [\n';
  let paths = 'export const pathsGenerated: string[] = [\n';
  let lazyIds = 'export const lazyIds: string[] = [\n';
  let lazyDocsAccess = 'export const lazyAccess: string[] = [\n';

  standsFiles.forEach(async (fileName, index) => {
    const src = fileName.replace(/\.(ts|tsx)$/, '');
    const srcWithName = fileName.replace(/\.stand\.(ts|tsx)$/, '');
    const dir = fileName.replace(/[^\/]+$/g, '');

    imports += `import stand_${index} from '${projectPath}/${src}';\n`;
    stands += `stand_${index},\n`;
    paths += `'${standsImportPath}/${dir}',\n`;
    lazyIds += `'${srcWithName}',\n`;

    const docsFileStand = `${srcWithName}.stand.mdx`;
    const image = `${srcWithName}.image.svg`;
    const variants = `${srcWithName}.variants.tsx`;

    if (existsSync(docsFileStand)) {
      lazyDocsAccess += `'${docsFileStand}',\n`;
    }

    if (existsSync(image)) {
      lazyDocsAccess += `'${image}',\n`;
    }
    if (existsSync(variants)) {
      lazyDocsAccess += `'${variants}',\n`;
    }

    for (let index = 0; index < standTabs.length; index++) {
      const tab = standTabs[index];
      const docsFileStandTab = `${srcWithName}.${tab}.stand.mdx`;

      if (existsSync(docsFileStandTab)) {
        lazyDocsAccess += `'${docsFileStandTab}',\n`;
      }
    }

    await createLazy(srcWithName, standsImportPath, standTabs);
  });

  stands += '];\n';
  paths += '];\n';
  lazyIds += '];\n';
  lazyDocsAccess += '];\n';

  const jsCode = template
    .replace(/#imports#/g, imports)
    .replace(/#stands#/g, stands)
    .replace(/#paths#/g, paths)
    .replace(/#lazyIds#/g, lazyIds)
    .replace(/#lazyDocsAccess#/g, lazyDocsAccess);

  await writeFile(standsPath, jsCode);
};

module.exports = {
  prepareStands,
};
