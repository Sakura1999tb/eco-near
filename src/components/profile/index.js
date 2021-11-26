import React, { Component } from "react";
import Transtation from "./transtation";
import { Table, Container, Row, Button } from "react-bootstrap";
import Banner from "../../assets/images/banner.png";
import { Add } from "@mui/icons-material";
import { emptySaleContractModal } from "../../constants";
export default class index extends Component {
  constructor() {
    super();
    this.state = {
      transtations: [],
    };
  }

  componentDidMount() {
    const { contract, currentUser } = this.props;
    if (currentUser) {
      contract
        .getMyContracts({ user: currentUser.accountId, page: 1 })
        .then((contracts) => {
          console.log("contracts", contracts);
          this.setState({
            transtations: contracts.map((contract, key) => {
              return {
                transtation: {
                  id: contract.id,
                  champions:
                    contract.contractInfomation.account.accountProfile
                      .champions,
                  skins:
                    contract.contractInfomation.account.accountProfile.skins,
                  price: contract.contractInfomation.price,
                  seller: contract.seller,
                  buyer: contract.buyer,
                  createdAt: contract.createdAt,
                  closedAt: contract.closedAt,
                  status: contract.isComplete == "1" ? true : false,
                },
                contract,
              };
            }),
          });
        });
    }
  }

  render() {
    const { transtations } = this.state;
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
              {transtations.map((transtation, key) => {
                return (
                  <Transtation
                    transtation={transtation.transtation}
                    saleContract={transtation.contract}
                    key={key}
                    openModal={this.props.openModal}
                    currentUser={currentUser}
                  />
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}
