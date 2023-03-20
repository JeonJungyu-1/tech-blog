import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Bio from "../components/Bio";
import Layout from "../components/Layout";
import Seo from "../components/Seo";

export default function Blog({
  location,
  data,
}: PageProps<Queries.BlogPostsQuery>) {
  const siteTitle = data.site?.siteMetadata?.title || `Title`;
  const posts = data.allMdx.nodes;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    );
  }

  return (
    <Layout location={location} title={siteTitle}>
      {/* <section className="grid">
        {data.allMdx.nodes.map((file, index) => (
          <Link to={`/blog/${file.frontmatter?.slug}`}>
            <article key={index}>
              <h3>{file.frontmatter?.title}</h3>
              <h5>
                {file.frontmatter?.author} in:: {file.frontmatter?.category}
              </h5>
              <h6>{file.frontmatter?.date}</h6>
              <hr />
              <p>{file.excerpt}</p>
            </article>
          </Link>
        ))}
      </section> */}
      <Bio />
      <hr />
      <ol style={{ listStyle: `none` }}>
        {data.allMdx.nodes.map((post) => {
          const title = post.frontmatter?.title || post.frontmatter?.slug;

          return (
            <li key={post.frontmatter?.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`blog/${post.frontmatter?.slug!}`} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter?.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter?.description! || post.excerpt!,
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
}

export const query = graphql`
  query BlogPosts {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { frontmatter: { date: DESC } }) {
      nodes {
        frontmatter {
          slug
          author
          category
          description
          date(formatString: "YYYY.MM.DD")
          title
        }
        excerpt(pruneLength: 50)
      }
    }
  }
`;

export const Head = () => <Seo title="Blog" />;
