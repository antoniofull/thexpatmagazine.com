import React, { Component, useRef, useEffect, useState } from 'react';
import { Link, graphql, StaticQuery } from 'gatsby';
import debounce from 'debounce';
import PreviewCompatibleImage from './PreviewCompatibleImage';

import '../styles/featured.css';

// class FeaturedPosts extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       top: 0
//     };
//     this.imgRef = React.createRef();
//   }

//   componentDidMount() {
//     if (typeof window !== 'undefined' || window) {
//       //       // console.log(img.current);
//       //       window.onresize = debounce(() => {
//       //         // const newTop = (img.current.clientHeight * -1) / 2;
//       //         // setTop(newTop);
//       //       }, 100);
//       //       // setTop((img.current.clientHeight * -1) / 2);
//       //     }
//     }
//   }

//   componentDidUpdate() {
//     console.log(this.imgRef.current.imageRef.current);
//   }

//   render() {
//     const { data } = this.props;
//     const { top } = this.state;
//     return (
//       <section className='featured container'>
//         <div className='featured-image'>
//           <PreviewCompatibleImage
//             ref={this.imgRef}
//             imageInfo={{
//               image: data.markdownRemark.frontmatter.featuredimage,
//               alt: `featured image thumbnail for post ${
//                 data.markdownRemark.frontmatter.title
//               }`
//             }}
//           />
//         </div>
//         <article className='featured-post' style={{ top }}>
//           <header>
//             <h2 className='wf-large featured-title'>
//               {data.markdownRemark.frontmatter.title}
//             </h2>
//           </header>
//           <p className='meta'>
//             <span>{data.markdownRemark.frontmatter.date}</span>
//             <span>{data.markdownRemark.frontmatter.author}</span>
//           </p>
//           <p className='featured-post__excerpt'>
//             {data.markdownRemark.excerpt}
//           </p>
//           <button className='read-more--featured btn'>Read More ...</button>
//         </article>
//       </section>
//     );
//   }
// }

const FeaturedPosts = ({ data, count }) => {
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined' || window) {
      const img = document.querySelector('.featured-image img');
      window.onresize = debounce(() => {
        const newTop = (img.clientHeight * -1) / 2;
        setTop(newTop);
      }, 10);
      setTop((img.clientHeight * -1) / 2);
    }
  }, [top]);
  return (
    <section className='featured container'>
      <div className='featured-image'>
        <PreviewCompatibleImage
          imageInfo={{
            image: data.markdownRemark.frontmatter.featuredimage,
            alt: `featured image thumbnail for post ${
              data.markdownRemark.frontmatter.title
            }`
          }}
        />
      </div>
      <article className='featured-post' style={{ top }}>
        <header>
          <h2 className='wf-large featured-title'>
            {data.markdownRemark.frontmatter.title}
          </h2>
        </header>
        <p className='meta'>
          <span>{data.markdownRemark.frontmatter.date}</span>
          <span>{data.markdownRemark.frontmatter.author}</span>
        </p>
        <p className='featured-post__excerpt'>{data.markdownRemark.excerpt}</p>
        <button className='read-more--featured btn'>Read More ...</button>
      </article>
    </section>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query Featured {
        markdownRemark(frontmatter: { featuredpost: { eq: true } }) {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid(maxWidth: 1280, maxHeight: 560, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <FeaturedPosts data={data} count={count} />}
  />
);
