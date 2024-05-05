import React from 'react';
import { graphql, HeadProps, Link, PageProps } from 'gatsby';
import Bio from '../components/bio';
import Layout from '../components/layout';
import Seo from '../components/seo';
import type { MarkdownRemark, Site } from '../../gatsby-graphql';

type DataProps = {
  previous: MarkdownRemark;
  next: MarkdownRemark;
  site: Site;
  markdownRemark: MarkdownRemark;
};

const BlogPostTemplate = ({ data: { previous, next, site, markdownRemark: post }, location }: PageProps<DataProps>) => {
  const siteTitle = site?.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <article className="prose" itemScope itemType="http://schema.org/Article">
        <header>
          <h1 itemProp="headline">{post.frontmatter?.title}</h1>
          <p>{post.frontmatter?.date}</p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html || '' }} itemProp="articleBody" />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav>
        <ul className={'flex flex-wrap justify-between list-none p-0'}>
          <li>
            {previous && (
              <Link to={previous.fields?.slug || ''} rel="prev">
                ← {previous.frontmatter?.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields?.slug || ''} rel="next">
                {next.frontmatter?.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export const Head = ({ data: { markdownRemark: post } }: HeadProps<DataProps>) => {
  return (
    <Seo title={post.frontmatter?.title || ''} description={post.frontmatter?.description || post.excerpt || ''} />
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`;
