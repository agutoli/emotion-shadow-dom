import React from 'react'
import ReactDOM from 'react-dom';
import ShadowDOM from 'react-shadow'

export default (element) => {
  class GlamorShadowDOMWrapper extends React.Component {
    render() {
      return React.createElement(element, {...this.props, ref: this.glamorousInject});
    }

    glamorInject = () => {
      const { injectStyle } = this.props;
      const node = ReactDOM.findDOMNode(this);
      const attributes = Array.prototype.slice.call(node.attributes);
      const prefixId = attributes.find((a) => /^data-css-/.test(a.nodeName))
      prefixId && injectStyle(prefixId.nodeName);
    }

    glamorousInject = (node) => {
      const { injectStyle } = this.props;
      const didUpdate = element.prototype.componentDidUpdate || function() {};
      element.prototype.componentDidUpdate = () => {
        node.className && injectStyle(node.className);
        didUpdate();
      };
    }

    componentDidMount() {
      this.glamorInject();
    }
  }

  return class ShadowDOMHelper extends React.PureComponent {
    injectStyle = (prefixId) => {
      const cssStyleSheet = Array.from(document.querySelectorAll('[data-glamor]')).slice(-1)[0];
      if (cssStyleSheet) {
        Array.from(cssStyleSheet.sheet.cssRules).forEach((cssRule) => {
          if ((new RegExp(prefixId)).test(cssRule.selectorText)) {
            this.styleTag.type = 'text/css';
            if (this.styleTag.styleSheet){
              this.styleTag.styleSheet.cssText = cssRule.cssText;
            } else {
              this.styleTag.appendChild(document.createTextNode(cssRule.cssText));
            }
          }
        });
      }
    }

    render() {
      return (
        <ShadowDOM>
          <span>
            <style ref={(n) => this.styleTag = n} />
            <GlamorShadowDOMWrapper {...this.props} injectStyle={this.injectStyle} />
          </span>
        </ShadowDOM>
      )
    }
  }
}
