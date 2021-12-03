import React, { Component } from "react";
import Card from "./card";
import { Container, Row } from "react-bootstrap";
import Pagination from "../pagination";
import { LIMITED } from "../../constants";
export default class exchanges extends Component {
  constructor() {
    super();
    this.state = {
      saleContracts: [],
      saleContracts_views: [],
      totalpage: 0,
    };
  }

  componentDidMount() {
    const { contract } = this.props;
    contract.getExchanges().then((saleContracts) => {
      const sort_contract = saleContracts.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });
      this.setState({
        saleContracts: sort_contract,
        saleContracts_views: sort_contract.slice(0, LIMITED),
        totalpage:
          sort_contract.length % LIMITED == 0
            ? sort_contract.length / LIMITED
            : Math.round(sort_contract.length / LIMITED) + 1,
      });
    });
  }

  handlePagination = (page) => {
    this.setState({
      saleContracts_views: this.state.saleContracts.slice(
        (page - 1) * LIMITED,
        page * LIMITED
      ),
    });
    window.scrollTo(0, 0)
  };

  render() {
    const { saleContracts_views, totalpage } = this.state;
    return (
      <Container>
        <Row>
          {saleContracts_views.map((saleContract, key) => {
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
        <Pagination
          totalpage={totalpage}
          handlePagination={this.handlePagination}
        />
      </Container>
    );
  }
}
