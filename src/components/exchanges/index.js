import React, { Component } from "react";
import Card from "./card";
import { Container, Row } from "react-bootstrap";
export default class exchanges extends Component {
  constructor() {
    super();
    this.state = {
      saleContracts: [],
    };
  }

  componentDidMount() {
    const { contract } = this.props;
    contract.getContracts({ page: 1 }).then((saleContracts) => {
      this.setState({
        saleContracts,
      });
    });
  }

  render() {
    const { saleContracts } = this.state;
    return (
      <Container>
        <Row>
          {saleContracts.map((saleContract, key) => {
            return (
              <Card
                openModal={this.props.openModal}
                saleContract={saleContract}
                buyAccount={this.props.buyAccount}
                key={key}
              />
            );
          })}
        </Row>
      </Container>
    );
  }
}
