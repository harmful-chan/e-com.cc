
import type { MDXComponents } from 'mdx/types'
import { Label } from './components/ui/label';
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h2: ({ children }) => (
      <h2 style={{ color: 'black', fontSize: '24px', padding: '10px 0'}}>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 style={{ color: 'black', fontSize: '18.72px', padding: '10px 0'}}>{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 style={{ color: 'black', fontSize: '16px', padding: '5px 0'}}>{children}</h4>
    ),
    p: ({ children }) =>(
      <p style={{ fontSize: '16px', padding: '0 0 10px 0', lineHeight: '1.5'}}>{children}</p>
    ),
    ol: ({ children }) =>(
      <ol style={{ paddingLeft: '20px', paddingBottom: '10px'}}>{children}</ol>
    ),
    li: ({ children }) =>(
      <li style={{listStyleType:'decimal', listStylePosition:'inside', paddingBottom: '4px'}}>{children}</li>
    ),
    ...components,
};
}