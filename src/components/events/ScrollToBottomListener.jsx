import PropTypes from "prop-types";
import React from "react";

import ScrollListener from "./ScrollListener";

class ScrollToBottomListener extends React.Component {
  static propTypes = {
    offsetHeight: PropTypes.number,
    onScrollReachBottom: PropTypes.func.isRequired,
    isContentScroll: PropTypes.bool,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    isContentScroll: false,
    offsetHeight: 0
  };

  componentDidMount() {
    this.documentElement = document.querySelector("#__next");

    const footerElements = document.getElementById("Player-Container");
    const footerElement =
    footerElements && footerElements.length ? footerElements[0] : null;
    
    this.footerHeight = footerElement ? footerElement.scrollHeight : 0;
  }

  onScroll = scrollElem => {
    const { isContentScroll } = this.props;
    console.log("isContentScroll", isContentScroll)
    const { scrollTop, scrollHeight, offsetHeight } = isContentScroll
      ? scrollElem
      : this.documentElement;
    const isScrollingDown = scrollTop - this.lastScroll > 0;

    if (
      isScrollingDown &&
      scrollHeight - scrollTop - offsetHeight <=
        (this.props.offsetHeight || this.footerHeight)
    ) {
      this.debounceOnScrollReachBottom();
    }

    this.lastScroll = scrollTop;
  };

  debounceOnScrollReachBottom = () => {
    if (this.scrollEdgeTimeout) {
      clearTimeout(this.scrollEdgeTimeout);
    }

    this.scrollEdgeTimeout = setTimeout(() => {
      this.props.onScrollReachBottom();
    }, 300);
  };

  render() {
    const { isContentScroll, children } = this.props;

    return (
      <ScrollListener
        onScroll={this.onScroll}
        isContentScroll={isContentScroll}
      >
        {children}
      </ScrollListener>
    );
  }
}

export default ScrollToBottomListener;
