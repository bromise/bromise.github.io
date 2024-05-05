import React, { PropsWithChildren } from 'react';
import { Link } from 'gatsby';
import Bio from './bio';

type Props = PropsWithChildren<{
  title: string;
  location: Location;
}>;

const Layout = ({ location, title, children }: Props) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location?.pathname === rootPath;

  return (
    <div className="container mx-auto pt-4" data-is-root-path={isRootPath}>
      <header className="border-b pb-4">
        <div className={'mb-2'}>
          {isRootPath ? (
            <h1>
              <Link className="text-5xl text-sky-600 hover:underline" to="/">
                {title}
              </Link>
            </h1>
          ) : (
            <Link className="text-3xl text-sky-600 hover:underline" to="/">
              {title}
            </Link>
          )}
        </div>
        <Bio />
      </header>
      <main className={'my-4'}>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  );
};

export default Layout;
