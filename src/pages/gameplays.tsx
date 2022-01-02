import * as React from "react";
import { graphql } from "gatsby";
import { Grid, Card, Container, Segment } from "semantic-ui-react";
import { MarkdownRemarkConnection } from "../graphql-types";
import {withLayout, LayoutProps} from "../components/Layout";
import GameplaysTitle from "../components/GameplaysTitle";

interface GameplaysProps extends LayoutProps {
  data: {
    tags: MarkdownRemarkConnection;
    posts: MarkdownRemarkConnection;
  };
  pageContext: {
    tag?: string; // only set into `templates/tags-pages.tsx`
  };
}

const GameplaysPage = (props: GameplaysProps) => {
  // const tags = props.data.tags.group;
  const plays = props.data.allGoogleGameplaysSheet.edges;
  // const { pathname } = props.location;
  // const pageCount = Math.ceil(props.data.posts.totalCount / 10);

  const Blogmarks = (
    <Container>
      {plays.map(({ node }) => {
        const { id, whatGame, date, outcome, otherData, scenario } = node;
        let cardHeader: string;
        if (scenario) {
          cardHeader = whatGame + " - " + scenario;
        } else {
          cardHeader = whatGame;
        }

        return (
          <Card key={id}
                fluid
            // image={cover}
                meta={outcome}
                header={cardHeader}
                description={otherData}
                extra={date}
          />
        );
      })}
    </Container>
  );

  return (
    <Container>
      {/* Title */}
      <GameplaysTitle />

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

export default withLayout(GameplaysPage);

export const pageQuery = graphql`
query PageGameplays {
  allGoogleGameplaysSheet {
    totalCount,
    edges {
      node {
        id, whatGame, date, timestamp, outcome, otherData, scenario
      }
    }
  }
}
`;
