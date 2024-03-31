import React from 'react';
import { graphql, PageProps } from 'gatsby';
import Layout from '../components/layout';
import Seo from '../components/seo';
import type { Site } from '../../gatsby-graphql';

type DataProps = {
  site: Site;
};

const NotFoundPage = ({ data, location }: PageProps<DataProps>) => {
  const siteTitle = data.site.siteMetadata?.title || '';

  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

export const Head = () => <Seo title="404: Not Found" />;

export default NotFoundPage;

export const pageQuery = graphql`
  query get404 {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
