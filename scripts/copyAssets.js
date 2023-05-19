const { dirname, relative, resolve } = require('path');
const { readFile, writeFile, ensureDir, copy } = require('fs-extra');

const fg = require('fast-glob');

const copyAssets = async (ignore, srcPath, distPath) => {
  const assetFiles = await fg(
    [`${srcPath}/**/*.{svg,jpg,png,gif,md,woff,woff2}`],
    {
      ignore,
    },
  );

  assetFiles.forEach(async (fileName) => {
    const asset = await readFile(fileName);

    const newPath = resolve(distPath, relative(srcPath, fileName));
    await ensureDir(dirname(newPath));
    await writeFile(newPath, asset);
  });
};

const postBuildCopyFiles = async () => {
  await copy('./templates', './dist/templates');
  await copy('./webpack.config.js', './dist/webpack.config.js');
  await copy('./public', './dist/public');
  await copy('./index.js', './dist/index.js');
  await copy('./index.d.ts', './dist/index.d.ts');
  await copy('./scripts', './dist/scripts');
  await copy('./README.md', './dist/README.md');
};

copyAssets([], 'src', 'dist/src');

postBuildCopyFiles();
