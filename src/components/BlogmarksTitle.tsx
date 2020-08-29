import * as React from "react";
import { Header, Segment, Icon } from "semantic-ui-react";

export default () => {
  return (
    <Segment vertical>
      <Header as="h2">
        <Icon name="bookmark" />
        <Header.Content>
          Blogmarks
            <Header.Subheader>
            Interesting links I've picked up along the way and tend to share alot.
            </Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  );
};
