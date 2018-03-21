const keywords = {
  'variable-int-call': { r: /(int\s)/, s: 'int' },
  'import-call': { r: /(import)/, s: 'import' },
  'package-project': { r: /(package)/, s: 'package' },
  'console-object': { r: /(console)/, s: 'console' }
};

module.exports = keywords;