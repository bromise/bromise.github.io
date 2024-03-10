import type { GatsbySSR } from 'gatsby';

const onRenderBody: GatsbySSR['onRenderBody'] = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: `en` });
}
