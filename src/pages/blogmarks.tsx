import * as React from "react";
import { Link } from "gatsby";
import { StaticQuery, graphql } from "gatsby";
import { Header, Grid, Card, List, Container, Feed, Segment, Comment } from "semantic-ui-react";
import { MarkdownRemarkConnection, ImageSharp } from "../graphql-types";
import BlogmarksTitle from "../components/BlogmarksTitle";
import TagsCard from "../components/TagsCard/TagsCard";
import BlogPagination from "../components/BlogPagination/BlogPagination";
import { get } from "lodash";
import {withLayout, LayoutProps} from "../components/Layout";
import { MarkdownRemark } from "../graphql-types";

interface BlogmarksProps extends LayoutProps {
  data: {
    tags: MarkdownRemarkConnection;
    posts: MarkdownRemarkConnection;
  };
  pageContext: {
    tag?: string; // only set into `templates/tags-pages.tsx`
  };
}

const BlogmarksPage = (props: BlogmarksProps) => {
  // const tags = props.data.tags.group;
  const blogmarks = props.data.posts.edges;
  // const { pathname } = props.location;
  // const pageCount = Math.ceil(props.data.posts.totalCount / 10);

  // TODO export posts in a proper component
  const Blogmarks = (
    <Container>
      {blogmarks.map(({ node }: {node: MarkdownRemark}) => {
        const { frontmatter, timeToRead, fields: { slug }, excerpt } = node;
        const avatar = frontmatter.author.avatar.children[0] as ImageSharp;
        const cover = get(frontmatter, "image.children.0.fixed", {});

        const extra = (
          <Comment.Group>
            <Comment>
              {/* <Comment.Avatar
                src={avatar.fixed.src}
                srcSet={avatar.fixed.srcSet}
              /> */}
              <Comment.Content>
                {/* <Comment.Author style={{ fontWeight: 400 }}>
                  Submitted by: {frontmatter.author.id}
                </Comment.Author> */}
                <Comment.Metadata style={{ margin: 0 }}>
                  Added: {frontmatter.updatedDate} {/*- {timeToRead} min read */}
                </Comment.Metadata>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        );

        // TODO: Implement discussions akin to reddit

        return (
          <Card key={frontmatter.title}
            fluid
            // image={cover}
            href={frontmatter.link}
            meta={frontmatter.link}
            header={frontmatter.title}
            extra={extra}
          />
        );
      })}
    </Container>
  );

  return (
    <Container>
      {/* Title */}
      <BlogmarksTitle />

      {/* Content */}
      <Segment vertical>
        <Grid padded style={{ justifyContent: "space-around" }}>
          <div style={{ maxWidth: 600 }}>
            {Blogmarks}
            {/* <Segment vertical textAlign="center">
              <BlogPagination Link={Link} pathname={pathname} pageCount={pageCount} />
            </Segment> */}
          </div>
          {/* <div>
            <TagsCard Link={Link} tags={tags} tag={props.pageContext.tag} />
          </div> */}
        </Grid>
      </Segment>
    </Container>
  );
};

export default withLayout(BlogmarksPage);

export const pageQuery = graphql`
query PageBlogmarks {
  # Get tags
  tags: allMarkdownRemark {
    group(field: frontmatter___tags) {
      fieldValue
      totalCount
    }
  }

  # Get posts
  posts: allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___updatedDate] },
    filter: {
      fileAbsolutePath: { regex: "/blogmarks/" }
    },
    limit: 1000
  ) {
    totalCount
    edges {
      node {
        excerpt
        timeToRead
        fields {
          slug
        }
        frontmatter {
          link
          title
          updatedDate(formatString: "DD MMMM, YYYY")
          image {
          	children {
              ... on ImageSharp {
                fixed(width: 700, height: 100) {
                  src
                  srcSet
                }
              }
            }
          }
          author {
            id
            avatar {
              children {
                ... on ImageSharp {
                  fixed(width: 35, height: 35) {
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;
