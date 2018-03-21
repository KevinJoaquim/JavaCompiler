const keywords = {
  'variable-declaration-call': { r: /(int\s)/, s: 'int' },
  'variable-declaration-call': { r: /(float\s)/, s: 'float' },
  'variable-declaration-call': { r: /(double\s)/, s: 'double' },
  'variable-declaration-call': { r: /(Double\s)/, s: 'Double' },
  'variable-declaration-call': { r: /(String\s)/, s: 'string' },
  'import-call': { r: /(import)/, s: 'import' },
  'package-project': { r: /(package)/, s: 'package' },
  'console-object': { r: /(console)/, s: 'console' },
  'public-class': { r: /(public)\s(class)/, s: 'public class' },
  'public-static-void': { r: /(public)\s(static)\s(void)\s/, s: 'public static void' }
};

module.exports = keywords;