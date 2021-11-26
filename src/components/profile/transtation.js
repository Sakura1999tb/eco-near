import React, { Component } from "react";
import { CheckCircle } from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
export default class transtation extends Component {
  render() {
    const { transtation, currentUser } = this.props;
    const { id, champions, skins, price, status, seller, buyer, createdAt } =
      transtation;
    return (
      <tr
        className="transtation"
        onClick={() => this.props.openModal(this.props.saleContract)}
      >
        <td>{id}</td>
        <td>{champions}</td>
        <td>{skins}</td>
        <td>{price}</td>
        <td
          className={
            seller == currentUser.accountId ? "transtation-name-highlight" : ""
          }
        >
          {seller}
        </td>
        <td
          className={
            buyer == currentUser.accountId ? "transtation-name-highlight" : ""
          }
        >
          {buyer}
        </td>
        <td>{new Date(parseInt(createdAt)).toUTCString()}</td>
        <td>
          {status ? (
            <CheckCircle color="success" />
          ) : (
            <AttachMoneyIcon color={"error"} />
          )}
        </td>
      </tr>
    );
  }
}
