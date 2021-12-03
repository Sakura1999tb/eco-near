import React, { Component } from "react";
import { LIMITED } from "../constants";
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentpage: 1,
    };
  }

  renderPage = () => {
    const arrayPage = Array.from(
      { length: this.props.totalpage },
      (_, i) => i + 1
    );
    const totalpage = Math.round(this.props.totalpage / LIMITED);
    const { currentpage } = this.state;
    if (totalpage < 10) {
      return arrayPage.map((page) => {
        return this.renderItemPagination(page);
      });
    } else {
      if (currentpage <= 5) {
        return [1, 2, 3, 4, 5, 6]
          .map((page) => {
            return this.renderItemPagination(page);
          })
          .concat([
            this.renderItemPagination("..."),
            this.renderItemPagination(totalpage - 1),
            this.renderItemPagination(totalpage),
          ]);
      } else {
        if (currentpage >= totalpage - 5) {
          return [
            this.renderItemPagination(1),
            this.renderItemPagination(2),
            this.renderItemPagination("..."),
          ].concat(
            Array(6)
              .fill()
              .map((_, idx) => totalpage - 5 + idx)
              .map((page) => this.renderItemPagination(page))
          );
        } else {
          return [
            this.renderItemPagination(1),
            this.renderItemPagination(2),
            this.renderItemPagination("..."),
          ]
            .concat([
              this.renderItemPagination(currentpage - 1),
              this.renderItemPagination(currentpage),
              this.renderItemPagination(currentpage + 1),
            ])
            .concat([
              this.renderItemPagination("..."),
              this.renderItemPagination(totalpage - 1),
              this.renderItemPagination(totalpage),
            ]);
        }
      }
    }
  };

  renderItemPagination = (page) => (
    <li className="page-item">
      <input
        type="button"
        className={`page-link ${
          this.state.currentpage === page ? "active-pagination" : ""
        }`}
        value={page}
        onClick={(e) => {
          this.setState({
            currentpage: page,
          });
          this.props.handlePagination(e.target.value);
        }}
      />
    </li>
  );

  render() {
    return (
      <nav aria-label="Page navigation example" className="pagination">
        <ul className="pagination">
          <li className="page-item">
            <input
              type="button"
              className="page-link prenext"
              href="#"
              value={"<<"}
              onClick={() => {
                const page =
                  this.state.currentpage > 1
                    ? this.state.currentpage - 1
                    : this.state.currentpage;
                this.setState({
                  currentpage: page,
                });
                this.props.handlePagination(page);
              }}
            />
          </li>
          {this.renderPage()}
          <li className="page-item">
            <input
              type="button"
              className="page-link prenext"
              href="#"
              value={">>"}
              onClick={() => {
                const page =
                  this.state.currentpage < this.props.totalpage
                    ? this.state.currentpage + 1
                    : this.state.currentpage;
                this.setState({
                  currentpage: page,
                });
                this.props.handlePagination(page);
              }}
            />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
