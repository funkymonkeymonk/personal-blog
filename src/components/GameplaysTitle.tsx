import * as React from "react";
import { Header, Segment, Icon } from "semantic-ui-react";

export default () => {
  return (
    <Segment vertical>
      <Header as="h2">
        <Icon name="chess pawn" />
        <Header.Content>
          Gameplays
          <Header.Subheader>
            I really enjoy games of all types. Here is some of my recent game experiences.
          </Header.Subheader>
        </Header.Content>
      </Header>
    </Segment>
  );
};
