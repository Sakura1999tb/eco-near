import React, { Component } from "react";
import Transtation from "./transtation";
import { Table, Container, Row, Button } from "react-bootstrap";
import Banner from "../../assets/images/banner.png";
import { Add } from "@mui/icons-material";
import { emptySaleContractModal } from "../../constants";
import Pagination from "../pagination";
import { LIMITED } from "../../constants";
export default class index extends Component {
  constructor() {
    super();
    this.state = {
      transtations: [],
      transtations_views: [],
      totalpage: 0,
    };
  }

  componentDidMount() {
    const { contract, currentUser } = this.props;
    if (currentUser) {
      contract
        .getMyContracts({ user: currentUser.accountId, page: 1 })
        .then((contracts) => {
          const sort_contract = contracts.sort(function (a, b) {
            return b.createdAt - a.createdAt;
          });
          this.setState({
            transtations: sort_contract,
            transtations_views: sort_contract.slice(0, LIMITED),
            totalpage:
              sort_contract.length % LIMITED == 0
                ? sort_contract.length / LIMITED
                : Math.round(sort_contract.length / LIMITED) + 1,
          });
        });
    }
  }

  handlePagination = (page) => {
    this.setState({
      transtations_views: this.state.transtations.slice(
        (page - 1) * LIMITED,
        page * LIMITED
      ),
    });
    window.scrollTo(0, 0)
  };

  render() {
    const { transtations_views, totalpage } = this.state;
    const { currentUser } = this.props;
    return (
      <Container>
        <Row>
          <img src={Banner} />
        </Row>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="transtations">Your Transtations</h4>
          <Button
            className="sign-out"
            variant="danger"
            onClick={() => {
              this.props.openModal(emptySaleContractModal, true);
            }}
          >
            <Add fontSize={"smail"} />
          </Button>
        </div>
        <Row>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Champions</th>
                <th>Skins</th>
                <th>Price</th>
                <th>Seller</th>
                <th>Buyer</th>
                <th>Created At</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {transtations_views.map((transtation, key) => {
                return (
                  <Transtation
                    saleContract={transtation}
                    key={key}
                    openModal={this.props.openModal}
                    currentUser={currentUser}
                  />
                );
              })}
            </tbody>
          </Table>
        </Row>
        <Pagination
          totalpage={totalpage}
          handlePagination={this.handlePagination}
        />
      </Container>
    );
  }
}
