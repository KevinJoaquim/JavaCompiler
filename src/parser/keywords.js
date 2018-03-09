const keywords = {
  'variable-declaraction': { r: /(var\s)/, s: 'var' },
  'variable-int-call': { r: /(int\s)/, s: 'int' },
  'console-object': { r: /(console)/, s: 'console' }
};

module.exports = keywords;