const fg = require('fast-glob');
const { readFile, writeFile, ensureDir } = require('fs-extra');

const { access, F_OK, existsSync } = require('fs');

const createlazyDocs = async (
  srcWithName,
  standsImportPath,
  type,
  tempale,
  outDir,
) => {
  const docsFile = `${srcWithName}${type}`;

  const template = await readFile(tempale, 'utf8');

  access(docsFile, F_OK, async (err) => {
    if (!err) {
      const lazyDocsFileName = `${docsFile.replace(/\W/g, '_')}.tsx`;

      const imports = `import Docs from '../${standsImportPath}/${docsFile}';\n`;

      const jsCode = template.replace(/#imports#/g, imports);

      await writeFile(`${outDir}${lazyDocsFileName}`, jsCode);
    }
  });
};

const createLazyImage = async (srcWithName, standsImportPath, outDir) => {
  const file = `${srcWithName}.image.svg`;

  access(file, F_OK, async (err) => {
    if (!err) {
      const lazyDocsFileName = `${file.replace(/\W/g, '_')}.tsx`;
      const jsCode = `import Image from '../${standsImportPath}/${file}';\nexport default Image;\n`;

      await writeFile(`${outDir}${lazyDocsFileName}`, jsCode);
    }
  });
};

const createLazyVariants = async (srcWithName, standsImportPath, outDir) => {
  const file = `${srcWithName}.variants.tsx`;

  access(file, F_OK, async (err) => {
    if (!err) {
      const lazyDocsFileName = `${file.replace(/\W/g, '_')}.tsx`;

      const jsCode = `import Variants from '../${standsImportPath}/${srcWithName}.variants';\nexport default Variants;\n`;

      await writeFile(`${outDir}${lazyDocsFileName}`, jsCode);
    }
  });
};

const createLazyPage = async (srcWithName, standsImportPath, outDir) => {
  const file = `${srcWithName}.page.tsx`;

  access(file, F_OK, async (err) => {
    if (!err) {
      const lazyDocsFileName = `${file.replace(/\W/g, '_')}.tsx`;

      const jsCode = `import Page from '../${standsImportPath}/${srcWithName}.page';\nexport default Page;\n`;

      await writeFile(`${outDir}${lazyDocsFileName}`, jsCode);
    }
  });
};

const createLazy = async (
  srcWithName,
  standsImportPath,
  standTabs,
  lazyMdxTemaplatePath,
  standsPath,
) => {
  const lazyMdxPath = `${standsPath}/lazyDocs/`;

  const promises = [
    createlazyDocs(
      srcWithName,
      standsImportPath,
      '.stand.mdx',
      lazyMdxTemaplatePath,
      lazyMdxPath,
    ),
    createLazyImage(srcWithName, standsImportPath, lazyMdxPath),
    createLazyPage(srcWithName, standsImportPath, lazyMdxPath),
    createLazyVariants(srcWithName, standsImportPath, lazyMdxPath),
  ];

  for (let index = 0; index < standTabs.length; index++) {
    promises.push(
      createlazyDocs(
        srcWithName,
        standsImportPath,
        `.${standTabs[index]}.stand.mdx`,
        lazyMdxTemaplatePath,
        lazyMdxPath,
      ),
    );
  }

  await Promise.all(promises);
};

const getComponentDir = (dir) => {
  const [dirStand, name] = dir.match(/.*\/(.*)\/__stand__\//) || [];

  if (dirStand && name) {
    const dirComponent = dirStand.replace('/__stand__/', '');

    if (
      existsSync(`${dirComponent}/${name}.tsx`) ||
      existsSync(`${dirComponent}/${name}.ts`)
    ) {
      return `src/${dirComponent.replace(/(.*)src\//, '')}`;
    }
  }

  return '';
};

const prepareRoutes = async ({ routesPath, projectPath, standsPath }) => {
  await ensureDir(standsPath);
  let jsCode;
  if (routesPath) {
    jsCode = `export * from '${projectPath}${routesPath}';\n`;
  } else {
    jsCode = `export const routes = [];\nexport const defaultRoute = '';\n`;
  }

  await writeFile(`${standsPath}/router.ts`, jsCode);
};

const prepareStands = async ({
  srcPath,
  packagePath,
  projectPath,
  standsTemaplatePath,
  standsPath,
  standsUrlPath,
  standTabs,
  lazyMdxTemaplatePath,
  standsConfig,
}) => {
  await ensureDir(`${standsPath}/lazyDocs/`);

  const path = `${srcPath}/**/*.stand.{ts,tsx}`;

  const standsFiles = await fg(path);

  const template = await readFile(standsTemaplatePath, 'utf8');

  let imports = '';

  if (standsConfig) {
    imports += `import '${projectPath}${standsConfig}'\n`;
  }

  let stands = 'const standsGenerated: CreatedStand[] = [\n';
  let repositoryPaths = 'const repositoryPaths: string[] = [\n';
  let lazyIds = 'const lazyIds: string[] = [\n';
  let lazyDocsAccess = 'const lazyAccess: string[] = [\n';
  let componentsDirs = 'const componentDirs: string[] = [\n';

  standsFiles.forEach(async (fileName, index) => {
    const src = fileName.replace(/\.(ts|tsx)$/, '');
    const srcWithName = fileName.replace(/\.stand\.(ts|tsx)$/, '');
    const dir = fileName.replace(/[^\/]+$/g, '');

    imports += `import stand_${index} from '${projectPath}/${src}';\n`;
    stands += `stand_${index},\n`;
    repositoryPaths += `'${`src/${srcWithName.replace(/(.*)src\//, '')}`}',\n`;
    lazyIds += `'${srcWithName}',\n`;
    componentsDirs += `'${getComponentDir(dir)}',\n`;

    const docsFileStand = `${srcWithName}.stand.mdx`;
    const image = `${srcWithName}.image.svg`;
    const variants = `${srcWithName}.variants.tsx`;
    const page = `${srcWithName}.page.tsx`;

    if (existsSync(page)) {
      lazyDocsAccess += `'${page}',\n`;
    }

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

    await createLazy(
      srcWithName,
      projectPath,
      standTabs,
      lazyMdxTemaplatePath,
      standsPath,
    );
  });

  stands += '];\n';
  repositoryPaths += '];\n';
  lazyIds += '];\n';
  lazyDocsAccess += '];\n';
  componentsDirs += '];\n';

  const jsCode = template
    .replace(/#imports#/g, imports)
    .replace(/#stands#/g, stands)
    .replace(/#repositoryPaths#/g, repositoryPaths)
    .replace(/#lazyIds#/g, lazyIds)
    .replace(/#lazyDocsAccess#/g, lazyDocsAccess)
    .replace(/#componentsDirs#/g, componentsDirs);

  await writeFile(`${standsPath}/index.ts`, jsCode);
};

module.exports = {
  prepareStands,
  prepareRoutes,
};
