'use client';

/**
 * Simple markdown-to-HTML renderer for lesson content.
 * Handles: headings, code blocks, inline code, tables, bold, italic, lists, links.
 * No external dependency — keeps bundle small.
 */
export function MarkdownContent({ content }: { content: string }) {
  const html = markdownToHtml(content);
  return (
    <div
      className="prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:dark:bg-zinc-800 prose-table:text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function markdownToHtml(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;
  let inList: 'ul' | 'ol' | null = null;

  function closeList() {
    if (inList) {
      out.push(inList === 'ul' ? '</ul>' : '</ol>');
      inList = null;
    }
  }

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.startsWith('```')) {
      closeList();
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(escapeHtml(lines[i]));
        i++;
      }
      i++; // skip closing ```
      out.push(
        `<pre${lang ? ` class="language-${lang}"` : ''}><code>${codeLines.join('\n')}</code></pre>`
      );
      continue;
    }

    // Table
    if (line.includes('|') && line.trim().startsWith('|')) {
      closeList();
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      out.push(parseTable(tableLines));
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      closeList();
      const level = headingMatch[1].length;
      out.push(`<h${level}>${inlineFormat(headingMatch[2])}</h${level}>`);
      i++;
      continue;
    }

    // Unordered list
    if (line.match(/^[-*]\s+/)) {
      if (inList !== 'ul') {
        closeList();
        inList = 'ul';
        out.push('<ul>');
      }
      out.push(`<li>${inlineFormat(line.replace(/^[-*]\s+/, ''))}</li>`);
      i++;
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      if (inList !== 'ol') {
        closeList();
        inList = 'ol';
        out.push('<ol>');
      }
      out.push(`<li>${inlineFormat(olMatch[1])}</li>`);
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      closeList();
      i++;
      continue;
    }

    // Paragraph
    closeList();
    out.push(`<p>${inlineFormat(line)}</p>`);
    i++;
  }

  closeList();
  return out.join('\n');
}

function inlineFormat(s: string): string {
  let result = escapeHtml(s);
  // Bold
  result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  // Italic
  result = result.replace(/\*(.+?)\*/g, '<em>$1</em>');
  // Inline code
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Links
  result = result.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );
  return result;
}

function parseTable(lines: string[]): string {
  const rows = lines
    .filter((l) => !l.match(/^\|[\s:-]+\|$/)) // skip separator
    .filter((l) => !l.match(/^\|\s*-+/)) // skip separator variant
    .map((l) =>
      l
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim())
    );

  if (rows.length === 0) return '';

  // Check if second original line is separator
  const isSep = (l: string) => l.replace(/[|\s:-]/g, '').length === 0;
  const hasHeader = lines.length > 1 && isSep(lines[1]);

  let html = '<table>';
  rows.forEach((cells, idx) => {
    const tag = hasHeader && idx === 0 ? 'th' : 'td';
    const wrap = hasHeader && idx === 0 ? 'thead' : idx === 1 || (!hasHeader && idx === 0) ? 'tbody' : '';
    if (wrap === 'thead') html += '<thead>';
    if (wrap === 'tbody') html += hasHeader ? '</thead><tbody>' : '<tbody>';
    html += '<tr>';
    cells.forEach((c) => {
      html += `<${tag}>${inlineFormat(c)}</${tag}>`;
    });
    html += '</tr>';
  });
  html += '</tbody></table>';
  return html;
}
