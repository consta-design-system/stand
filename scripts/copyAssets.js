const { dirname, relative, resolve } = require('path');
const { readFile, writeFile, ensureDir } = require('fs-extra');

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

copyAssets([], 'src', 'dist/src');
