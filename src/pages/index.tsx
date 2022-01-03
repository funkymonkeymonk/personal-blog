import * as React from "react";
import { Link } from "gatsby";
import HeaderMenu from "../components/HeaderMenu/HeaderMenu";
import { withLayout, LayoutProps, menuItems } from "../components/Layout";
import {
  Segment,
  Grid,
  Header
} from "semantic-ui-react";
// @ts-ignore
import waveHi from './images/WaveHi.png'

const IndexPage = (props: LayoutProps) =>
  <div>
    {/* Master head */}
    <Segment vertical inverted textAlign="center" className="masthead" >
      <HeaderMenu
        Link={Link} pathname={props.location.pathname} items={menuItems} inverted
      />
    </Segment>

    <Segment vertical className="stripe">
      <Grid stackable verticalAlign="middle" className="container">
        <Grid.Row>
          <Grid.Column width="8">
            <img src={ waveHi } alt="Waving Hello"/>
          </Grid.Column>
          <Grid.Column width="6" floated="right">
          <Header>My name is Will</Header>
            <p>
              I write software, play board and card games and occasionally participate 
                  in historical reenactments with a group called the SCA.
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </div>;

export default withLayout(IndexPage);
