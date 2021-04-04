import hljs from 'highlight.js/lib/core';
import clang from 'highlight.js/lib/languages/c';
import 'highlight.js/styles/github-gist.css';

export function setupCodeBackground() {
  fetch('https://raw.githubusercontent.com/torvalds/linux/master/kernel/panic.c').then(result => {
    result.text().then(code => {
      if (code) {
        document.querySelectorAll('.fixed-background code').forEach(element => {
          hljs.registerLanguage('c', clang);

          const highlightedCode = hljs.highlight(code, {language: 'c'}).value;
          element.innerHTML = highlightedCode;
        });
      }
    });

  }, err => { console.warn('Failed to fetch code for a beautiful background :(') });
  
}
