export default function parseMarkdown(markdown: string): string {
  const replacements = new Map<RegExp, string | ((substring: string, ...args: any[]) => string)>([
    [/^# (.+?)$/gm, '<h1>$1</h1>'],
    [/^## (.+?)$/gm, '<h2>$1</h2>'],
    [/^### (.+?)$/gm, '<h3>$1</h3>'],
    [/^#### (.+?)$/gm, '<h4>$1</h4>'],
    [/\[(.+?)\]\((.+?)\)/gm, '<a href="$2">$1</a>'],
    [/\*\b(.+)\b\*/gm, '<b>$1</b>'],
    [/\/\b(.+)\b\//gm, '<i>$1</i>'],
    [/_\b(.+)\b_/gm, '<u>$1</u>'],
    [/-\b(.+)\b-/gm, '<del>$1</del>'],
    [/\[x\]/gm, '<input type="checkbox" checked/>'],
    [/\[ \]/gm, '<input type="checkbox"/>'],
    [/\n/gm, '<br/>'],
    [unorderedListRegex, unorderedListReplacer],
  ]);

  replacements.forEach((value, key) => {
    markdown = markdown.replace(key, value as string); // replace cannot infer type for union
  });

  // throttle
  // const now = Date.now();
  // while (Date.now() - now < 2 * 1000) {
  //   //
  // }
  // throttle

  return markdown;
}

const unorderedListRegex = /((?:\n|^)\s*(\*)\s.*)+/gm;
const unorderedListReplacer = (fullMatch: string) => {
  const items = fullMatch
    .trim()
    .split('\n')
    .reduce((acc, item) => acc += '<li>' + item.trim().substring(2) + '</li>', '');
  return '<ul>' + items + '</ul>';
};
