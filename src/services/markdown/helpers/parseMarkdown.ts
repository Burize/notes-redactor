export default function parseMarkdown(markdown: string): string {
  const replacements = new Map<RegExp, string | ((substring: string, ...args: any[]) => string)>([
    [/</gm, '&lt'],
    [/>/gm, '&gt'],
    [unorderedListRegex, unorderedListReplacer],
    [/^# (.+?)$/gm, '<h1>$1</h1>'],
    [/^## (.+?)$/gm, '<h2>$1</h2>'],
    [/^### (.+?)$/gm, '<h3>$1</h3>'],
    [/^#### (.+?)$/gm, '<h4>$1</h4>'],
    [/\s\*\b(.+?)(\b|:)\*\s/gm, '<b>$1$2 </b>'],
    [/\s\/\b(.+?)\b\/\s/gm, '<i> $1 </i>'],
    [/\s\b_(.+?)_\b\s/gm, '<u>$1</u>'],
    [/\s-\b(.+?)\b-\s/gm, '<del> $1 </del>'],
    [/\[x\]/gm, '<input type="checkbox" checked/>'],
    [/\[ \]/gm, '<input type="checkbox"/>'],
    [/\[(.+?)\]\((.+?)\)/gm, '<a href="$2">$1</a>'],
    [/\s`(.+?)`\s/gm, ' <code>$1</code> '],
    [/\n\n/gm, '<br/>'],
  ]);

  replacements.forEach((value, key) => {
    markdown = markdown.replace(key, value as string); // replace cannot infer type for union
  });

  return markdown;
}

const unorderedListRegex = /((?:\n|^)\s*(\*)\s.*$)+/gm;

const unorderedListReplacer = (fullMatch: string) => {
  const items = fullMatch
    .trim()
    .split('\n')
    .reduce((acc, item) => acc += '<li> ' + item.substring(2) + '</li>', '');
  return '\n<ul>' + items + '</ul>';
};
