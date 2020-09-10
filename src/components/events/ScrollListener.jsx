import PropTypes from "prop-types";
import React from "react";

class ScrollListener extends React.Component {
  static propTypes = {
    onScroll: PropTypes.func,
    isContentScroll: PropTypes.bool,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    isContentScroll: false,
    onScroll: () => {}
  };

  contentRef = React.createRef();

  componentDidMount() {
    const { isContentScroll } = this.props;

    const scrollElement = isContentScroll
      ? this.contentRef.current
      : document.querySelector("#__next");

    this.scrollElement = scrollElement;

    if (scrollElement) {
      scrollElement.addEventListener("scroll", this.onScroll);
    }
  }

  componentWillUnmount() {
    if (this.scrollElement) {
      this.scrollElement.removeEventListener("scroll", this.onScroll);
    }
  }

  onScroll = () => {
    if (!this.scrollElement) return;
    this.props.onScroll(this.scrollElement);
  };

  render() {
    const { children, isContentScroll } = this.props;

    if (isContentScroll) {
      return (
        <div
          style={{
            overflowY: "auto",
            height: "100%",
            minHeight: "100%",
            flex: 1
          }}
          ref={this.contentRef}
        >
          {children}
        </div>
      );
    }

    return <>{children}</>;
  }
}

export default ScrollListener;
