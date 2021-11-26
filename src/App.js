import "regenerator-runtime/runtime";
import React, { useState, useEffect, Component } from "react";
import PropTypes from "prop-types";
import Big from "big.js";
import { ExitToApp } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/styles.css";
import Exchanges from "./components/exchanges";
import Profile from "./components/profile";
import logo from "./assets/images/riot-removebg-preview.png";
import name from "./assets/images/name.png";
import { Button } from "react-bootstrap";
import { pages, emptySaleContractModal } from "./constants";
import Modal from "./components/modal";

const BOATLOAD_OF_GAS = Big(5)
  .times(10 ** 13)
  .toFixed();

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: pages.exchanges,
      modal: {
        isShow: false,
        isCreateContract: false,
        saleContractModal: emptySaleContractModal,
      },
    };
  }

  onHandleChangeModalSaleContract = (e) => {
    this.setState({
      modal: {
        ...this.state.modal,
        saleContractModal: {
          ...this.state.modal.saleContractModal,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  onHandleChangeModalSaleContractPrice = (e) => {
    this.setState({
      modal: {
        ...this.state.modal,
        saleContractModal: {
          ...this.state.modal.saleContractModal,
          contractInfomation: {
            ...this.state.modal.saleContractModal.contractInfomation,
            price: e.target.value,
          },
        },
      },
    });
  };

  onHandleChangeModalSaleContractAccountAuthen = (e) => {
    this.setState({
      modal: {
        ...this.state.modal,
        saleContractModal: {
          ...this.state.modal.saleContractModal,
          contractInfomation: {
            ...this.state.modal.saleContractModal.contractInfomation,
            account: {
              ...this.state.modal.saleContractModal.contractInfomation.account,
              accountAuthen: {
                ...this.state.modal.saleContractModal.contractInfomation.account
                  .accountAuthen,
                [e.target.name]: e.target.value,
              },
            },
          },
        },
      },
    });
  };

  onHandleChangeModalSaleContractAccountProfile = (e) => {
    this.setState({
      modal: {
        ...this.state.modal,
        saleContractModal: {
          ...this.state.modal.saleContractModal,
          contractInfomation: {
            ...this.state.modal.saleContractModal.contractInfomation,
            account: {
              ...this.state.modal.saleContractModal.contractInfomation.account,
              accountProfile: {
                ...this.state.modal.saleContractModal.contractInfomation.account
                  .accountProfile,
                [e.target.name]: e.target.value,
              },
            },
          },
        },
      },
    });
  };

  openModal = (saleContractModal, isCreateContract) => {
    this.setState({
      modal: {
        isShow: true,
        saleContractModal,
        isCreateContract,
      },
    });
  };

  closeModal = () => {
    this.setState({
      modal: {
        isShow: false,
        saleContractModal: emptySaleContractModal,
        isCreateContract: false,
      },
    });
  };

  createContract = () => {
    const { contract } = this.props;
    const { contractInfomation } = this.state.modal.saleContractModal;
    console.log("createContract", contractInfomation);
    contract
      .createContract(
        {
          contractInfomation,
          createdAt: Date.now().toString(),
        },
        BOATLOAD_OF_GAS
      )
      .then((status) => {
        console.log("status", status);
        if (status == "1") {
          window.location.reload();
        }
      });
  };

  buyAccount = (saleContract) => {
    const { wallet } = this.props;
    if (wallet.isSignedIn()) {
      const { contract } = this.props;
      console.log("buyAccount", saleContract);
      contract
        .buyAccount(
          {
            id: saleContract.id.toString(),
            closedAt: Date.now().toString(),
          },
          BOATLOAD_OF_GAS,
          Big(saleContract.contractInfomation.price.toString())
            .times(10 ** 24)
            .toFixed()
        )
        .then((status) => {
          console.log("status", status);
        });
    } else {
      wallet.requestSignIn(nearConfig.contractName, "NEAR Guest Book");
    }
  };

  deleteContract = () => {
    const { contract } = this.props;
    const { saleContractModal } = this.state.modal;
    contract
      .deleteContract({ id: saleContractModal.id }, BOATLOAD_OF_GAS)
      .then((status) => {
        if (status == "1") {
          window.location.reload();
        }
      });
  };

  renderPage = () => {
    const { contract, currentUser } = this.props;
    switch (this.state.page) {
      case pages.exchanges:
        return (
          <Exchanges
            contract={contract}
            openModal={this.openModal}
            closeModal={this.closeModal}
            buyAccount={this.buyAccount}
          />
        );
      case pages.profile:
        return (
          <Profile
            contract={contract}
            currentUser={currentUser}
            openModal={this.openModal}
            closeModal={this.closeModal}
          />
        );
      default:
        return null;
    }
  };

  render() {
    const { wallet, currentUser } = this.props;
    const { modal } = this.state;
    console.log("modal", modal);
    console.log("saleContractModal", modal.saleContractModal);

    return (
      <>
        <Modal
          isShow={modal.isShow}
          saleContractModal={modal.saleContractModal}
          isCreateContract={modal.isCreateContract}
          closeModal={this.closeModal}
          onHandleChangeModalSaleContract={this.onHandleChangeModalSaleContract}
          onHandleChangeModalSaleContractAccountAuthen={
            this.onHandleChangeModalSaleContractAccountAuthen
          }
          onHandleChangeModalSaleContractAccountProfile={
            this.onHandleChangeModalSaleContractAccountProfile
          }
          onHandleChangeModalSaleContractPrice={
            this.onHandleChangeModalSaleContractPrice
          }
          createContract={this.createContract}
          deleteContract={this.deleteContract}
          page={this.state.page}
        />
        <header className="header">
          <div className="header-component">
            <img src={logo} width={120} />
          </div>
          <div className="header-component">
            <img
              src={name}
              style={{ marginBottom: "10px", cursor: "pointer" }}
              onClick={() => {
                this.setState({
                  page: pages.exchanges,
                });
              }}
            />
          </div>
          <div className="header-component" style={{ textAlign: "right" }}>
            {wallet.isSignedIn() ? (
              <div>
                <span
                  className="name-user"
                  onClick={() => {
                    this.setState({
                      page: pages.profile,
                    });
                  }}
                >
                  Hi, {currentUser.accountId}
                </span>
                <Button
                  className="sign-out"
                  variant="danger"
                  onClick={() => {
                    wallet.signOut();
                    window.location.replace(
                      window.location.origin + window.location.pathname
                    );
                  }}
                >
                  <ExitToApp fontSize={"smail"} />
                </Button>
              </div>
            ) : (
              <Button
                variant="danger"
                onClick={() => {
                  wallet.requestSignIn(
                    nearConfig.contractName,
                    "NEAR Guest Book"
                  );
                }}
              >
                Sign in
              </Button>
            )}
          </div>
        </header>
        <main style={{ backgroundColor: "#1b1818" }}>{this.renderPage()}</main>
      </>
    );
  }
}

App.propTypes = {
  contract: PropTypes.shape({
    getContracts: PropTypes.func.isRequired,
    getAll: PropTypes.func.isRequired,
    getContracts: PropTypes.func.isRequired,
    createContract: PropTypes.func.isRequired,
    deleteContracts: PropTypes.func.isRequired,
    deleteContract: PropTypes.func.isRequired,
    getMyContracts: PropTypes.func.isRequired,
  }).isRequired,
  nearConfig: PropTypes.shape({
    contractName: PropTypes.string.isRequired,
  }).isRequired,
  wallet: PropTypes.shape({
    requestSignIn: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
