import React, { Component } from "react";
import { Card, Button, Col } from "react-bootstrap";
export default class card extends Component {
  render() {
    const { saleContract } = this.props;
    const {
      contractInfomation,
      seller,
      buyer,
      id,
      isComplete,
      createdAt,
      closedAt,
    } = saleContract;
    const { price, account } = contractInfomation;
    const { accountAuthen, accountProfile } = account;

    return (
      <Col md={3} className="mb-4" style={{ padding: "0px 15px" }}>
        <Card
          style={{ backgroundColor: "#000", transition: ".3s", color: "#fff" }}
        >
          <div
            className="card-image"
            onClick={(e) => this.props.openModal(saleContract, false)}
          >
            <Card.Img variant="top" src={accountProfile.image} />
          </div>
          <Card.Body className="card-body">
            <Card.Title style={{ color: "#e8c22b" }}>{price} Ⓝ</Card.Title>
            <Card.Title className="card-description">
              Champions: {accountProfile.champions}
            </Card.Title>
            <Card.Title className="card-description">
              Skin: {accountProfile.skins}
            </Card.Title>
            <Card.Title className="card-description seller-name">
              {seller}
            </Card.Title>
            <Button
              variant="danger"
              onClick={() => {
                this.props.buyAccount(saleContract);
              }}
            >
              Buy now
            </Button>
          </Card.Body>
        </Card>
      </Col>
    );
  }
}
