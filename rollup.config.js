import copy from 'rollup-plugin-copy';
import size from 'rollup-plugin-bundle-size';
import multi from '@rollup/plugin-multi-entry';
export default {
  input: 'modules/*.js',
  output: [
    { file: 'build/bundle.js', format: 'cjs' },
    { file: 'build/module.js', format: 'esm' },
  ],
  plugins: [
    multi(),
    copy({
      targets: [
        { src: 'LICENSE', dest: 'build' },
        { src: 'modules/defaults.css', dest: 'build' },
        { src: 'package.json', dest: 'build', transform: generatePkg },
      ],
    }),
    size(),
  ],
};

function generatePkg(contents) {
  let pkg = JSON.parse(contents.toString());
  return JSON.stringify(
    {
      name: pkg.name,
      version: pkg.version,
      description: pkg.description,
      author: pkg.author,
      license: pkg.license,
      homepage: pkg.homepage,
      repository: pkg.repository,
      main: './bundle.js',
      module: './module.js',
      sideEffects: false,
      files: ['*.js', '*.css'],
      keywords: pkg.keywords,
    },
    null,
    2,
  );
}
