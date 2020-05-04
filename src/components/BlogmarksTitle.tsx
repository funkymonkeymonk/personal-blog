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
            Interesting links and possibly interesting commentary
            </Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  );
};
