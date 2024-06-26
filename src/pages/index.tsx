import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import type { MarkdownRemarkConnection, Site } from '../../gatsby-graphql';

type Props = {
  location: Location;
  data: {
    site: Site;
    allMarkdownRemark: MarkdownRemarkConnection;
  };
};

const BlogIndex = ({ data, location }: Props) => {
  const siteTitle = data.site.siteMetadata?.title || `Title` || '';
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the
          "gatsby-source-filesystem" plugin in gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter?.title || post.fields?.slug || '';

          return (
            <li key={post.fields?.slug} className="mb-6">
              <article itemScope itemType="http://schema.org/Article">
                <header>
                  <h2 className="text-3xl">
                    <Link to={post.fields?.slug || ''} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter?.date}</small>
                </header>
                <section>
                  <p
                    className="text-sm text-slate-600"
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter?.description || post.excerpt || '',
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          );
        })}
      </ol>
    </Layout>
  );
};

export default BlogIndex;

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="All posts" />;

export const pageQuery = graphql`
  query getBlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`;
