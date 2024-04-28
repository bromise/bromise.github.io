import React, { PropsWithChildren } from 'react';
import { Link } from 'gatsby';

type Props = PropsWithChildren<{
  title: string;
  location: Location;
}>;

const Layout = ({ location, title, children }: Props) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location?.pathname === rootPath;

  return (
    <div className="container mx-auto my-8" data-is-root-path={isRootPath}>
      <header className="global-header">
        {isRootPath ? (
          <h1 className="text-6xl">
            <Link to="/">{title}</Link>
          </h1>
        ) : (
          <Link className="text-3xl" to="/">
            {title}
          </Link>
        )}
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
