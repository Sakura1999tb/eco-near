import React, { Component } from "react";
import { Modal, Button, Card, Table } from "react-bootstrap";
import { pages } from "../constants";
export default class modal extends Component {
  render() {
    const { isShow, saleContractModal, closeModal, isCreateContract, page } =
      this.props;
    const {
      contractInfomation,
      seller,
      buyer,
      id,
      isComplete,
      createdAt,
      closedAt,
    } = saleContractModal;
    const { price, account } = contractInfomation;
    const { accountAuthen, accountProfile } = account;

    if (isCreateContract) {
      return (
        <Modal
          show={isShow}
          onHide={closeModal}
          contentClassName="modal"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#fff" }}>Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Body className="card-body">
              <Card.Title style={{ color: "#e8c22b", marginBottom: "10px" }}>
                <input
                  className="price"
                  name="price"
                  type="number"
                  onChange={(e) => {
                    this.props.onHandleChangeModalSaleContractPrice(e);
                  }}
                  placeholder="price"
                  value={price}
                />
                Ⓝ -
                <input
                  style={{ marginLeft: "10px" }}
                  className="price"
                  name="id"
                  type="number"
                  placeholder="id"
                  value={accountProfile.id}
                  onChange={(e) => {
                    this.props.onHandleChangeModalSaleContractAccountProfile(e);
                  }}
                />
              </Card.Title>
              <div>
                <div>
                  <Table responsive striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Level</th>
                        <th>Wallet</th>
                        <th>Champions</th>
                        <th>Skins</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="transtation">
                        <td>
                          <input
                            name="level"
                            type="number"
                            onChange={(e) => {
                              this.props.onHandleChangeModalSaleContractAccountProfile(
                                e
                              );
                            }}
                            value={accountProfile.level}
                          />
                        </td>
                        <td>
                          <input
                            name="wallet"
                            type="number"
                            onChange={(e) => {
                              this.props.onHandleChangeModalSaleContractAccountProfile(
                                e
                              );
                            }}
                            value={accountProfile.wallet}
                          />
                        </td>
                        <td>
                          <input
                            name="champions"
                            type="number"
                            onChange={(e) => {
                              this.props.onHandleChangeModalSaleContractAccountProfile(
                                e
                              );
                            }}
                            value={accountProfile.champions}
                          />
                        </td>
                        <td>
                          <input
                            name="skins"
                            type="number"
                            onChange={(e) => {
                              this.props.onHandleChangeModalSaleContractAccountProfile(
                                e
                              );
                            }}
                            value={accountProfile.skins}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div>
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="transtation">
                        <td>
                          <input
                            name="username"
                            type="text"
                            onChange={(e) =>
                              this.props.onHandleChangeModalSaleContractAccountAuthen(
                                e
                              )
                            }
                            value={accountAuthen.username}
                          />
                        </td>
                        <td>
                          <input
                            name="password"
                            type="text"
                            onChange={(e) =>
                              this.props.onHandleChangeModalSaleContractAccountAuthen(
                                e
                              )
                            }
                            value={accountAuthen.password}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            </Card.Body>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => this.props.createContract()}
            >
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      );
    } else {
      return (
        <Modal
          show={isShow}
          onHide={closeModal}
          contentClassName="modal"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "#fff" }}>Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card.Img variant="top" src={accountProfile.image} />
            <Card.Body className="card-body">
              <Card.Title style={{ color: "#e8c22b" }}>
                {price} Ⓝ - {id}
              </Card.Title>
              <div>
                <div>
                  <Table responsive striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Champions</th>
                        <th>Skins</th>
                        <th>Wallet</th>
                        <th>Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="transtation">
                        <td>{accountProfile.champions}</td>
                        <td>{accountProfile.skins}</td>
                        <td>{accountProfile.wallet}</td>
                        <td>{accountProfile.level}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div>
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Seller</th>
                        <th>Buyer</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="transtation">
                        <td>{seller}</td>
                        <td>{buyer}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div>
                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>Created At</th>
                        <th>ClosedAt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="transtation">
                        <td>{new Date(parseInt(createdAt)).toUTCString()}</td>
                        <td>
                          {closedAt == 0
                            ? "waiting"
                            : new Date(parseInt(closedAt)).toUTCString()}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                {page == pages.profile && (
                  <div>
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>Username</th>
                          <th>Password</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="transtation">
                          <td>{accountAuthen.username}</td>
                          <td>{accountAuthen.password}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
              </div>
              {isComplete == "1" ? (
                <div className="success-complete">Success</div>
              ) : (
                <div className="saling">Saling</div>
              )}
            </Card.Body>
          </Modal.Body>
          <Modal.Footer>
            {isComplete == "0" ? (
              page == pages.exchanges ? (
                <Button
                  variant="danger"
                  onClick={() => {
                    this.props.buyAccount(saleContractModal);
                  }}
                >
                  Buy now
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={() => {
                    this.props.deleteContract();
                  }}
                >
                  Delete
                </Button>
              )
            ) : (
              <></>
            )}
          </Modal.Footer>
        </Modal>
      );
    }
  }
}
