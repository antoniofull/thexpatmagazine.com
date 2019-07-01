import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';

import '../styles/related.css';

const RelatedArticles = props => {
  const articles = props.articles;
  if (articles && articles.length) {
    return (
      <React.Fragment>
        <h3>You might like also these articles</h3>
        <section className='related-posts'>
          {articles.map(
            article =>
              article.node.frontmatter.featuredimage &&
              article.node.frontmatter.featuredimage.childImageSharp && (
                <Link
                  to={article.node.fields.slug}
                  key={article.node.id}
                  className='related-post has-shadow'
                >
                  <Img
                    alt={article.node.frontmatter.description}
                    className='related-post__image'
                    fluid={
                      article.node.frontmatter.featuredimage.childImageSharp
                        .fluid
                    }
                  />

                  <h3 className='related-post__header'>
                    {article.node.frontmatter.title}
                  </h3>
                </Link>
              )
          )}
        </section>
      </React.Fragment>
    );
  }
  return null;
};

export default RelatedArticles;
