import React, { Component } from "react";
import { CheckCircle } from "@mui/icons-material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
export default class transtation extends Component {
  render() {
    const { saleContract, currentUser } = this.props;
    const { id, seller, buyer, createdAt, closedAt } = saleContract;
    const { champions, skins } =
      saleContract.contractInfomation.account.accountProfile;
    const { price } = saleContract.contractInfomation;
    const status = saleContract.isComplete == "1" ? true : false;
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
        <td>{new Date(parseInt(createdAt)).toString()}</td>
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
