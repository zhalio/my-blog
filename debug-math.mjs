import { remark } from 'remark';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const markdown = '$a$';

console.log('Processing:', markdown);

async function main() {
  try {
    const file = await remark()
      .use(remarkMath)
      .use(remarkRehype, {
        handlers: {
          inlineMath(arg0, arg1) {
            console.log('--- inlineMath handler ---');
            console.log('typeof arg0:', typeof arg0);
            // utilize console.dir for better object inspection if needed, but log is fine
            console.log('arg0:', arg0);
            
            if (typeof arg0 === 'function') {
              console.log('arg0 is a function. Attempting call...');
              try {
                // Assuming it might be 'h', it usually takes (node, tagName, props?, children?)
                // Just calling it might throw if arguments are missing, but user asked to try.
                // We'll pass dummy args just in case it is h
                // h(node, 'span')
                if (arg1) {
                    const result = arg0(arg1, 'span', { class: 'math' }, ['test']);
                    console.log('Result of arg0(...):', result);
                    return result; 
                } else {
                     console.log('arg1 is missing, cannot simulate h call properly');
                }
              } catch (e) {
                console.error('Error calling arg0:', e);
              }
            } else {
                // If it is state, arg0.h might be the h function?
                // or arg0.applyData
                console.log('Keys of arg0:', Object.keys(arg0));
            }
            
            // Fallback return to allow stringify to proceed roughly
            return { type: 'text', value: '[MATH]' };
          }
        }
      })
      .use(rehypeStringify)
      .process(markdown);

    console.log('\nOutput HTML:', String(file));
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
