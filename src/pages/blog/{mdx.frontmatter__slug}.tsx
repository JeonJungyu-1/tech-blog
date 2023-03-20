import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from "react";
import Bio from "../../components/Bio";
import Layout from "../../components/Layout";
import Seo from "../../components/Seo";

interface IBlogPostProps {
  data: Queries.PostDetailQuery;
  children: any;
  location: {
    pathname: string;
  };
}

export default function BlogPost({ data, children, location }: IBlogPostProps) {
  const image = getImage(
    data.mdx?.frontmatter?.headerImage?.childImageSharp?.gatsbyImageData!
  );
  const siteTitle = data.site?.siteMetadata?.title || `Title`

  return (
    <Layout title={siteTitle} location={location}>
      <GatsbyImage image={image as any} alt={data.mdx?.frontmatter?.title!} />
      {/* <div>{children}</div> */}

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{data.mdx?.frontmatter?.title}</h1>
          <p>{data.mdx?.frontmatter?.date}</p>
        </header>
        <main>
        {children}
        </main>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      {/* <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav> */}
    </Layout>
  );
}

export const query = graphql`
  query PostDetail($frontmatter__slug: String) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(frontmatter: { slug: { eq: $frontmatter__slug } }) {
      id
      body
      frontmatter {
        author
        category
        date
        title
        slug
        headerImage {
          childImageSharp {
            gatsbyImageData(height: 450, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;

export const Head = ({ data }: IBlogPostProps) => (
  <Seo title={data.mdx?.frontmatter?.title!} />
);
