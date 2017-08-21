import React from 'react'
import ReactDOM from 'react-dom';
import ShadowDOM from 'react-shadow'

export default (element) => {
  class EmotionShadowDOMWrapper extends React.Component {
    render() {
      return React.createElement(element, {...this.props, innerRef: this.emotionInject});
    }

    emotionInject = (node) => {
      const { injectStyle } = this.props;
      node = node || ReactDOM.findDOMNode(this);

      node.classList && injectStyle(node.classList);

      const didUpdate = element.prototype.componentDidUpdate || function() {};

      element.prototype.componentDidUpdate = () => {
        node.className && injectStyle(node.classList);
        didUpdate();
      };
    }

    componentDidMount() {
      // this.emotionInject();
    }
  }

  return class ShadowDOMHelper extends React.PureComponent {
    injectStyle = (prefixId) => {
      const cssStyleSheet = Array.from(document.querySelectorAll('[data-emotion]')).slice(-1)[0];
      const className = Array.from(prefixId).slice(-1)[0];
      if (cssStyleSheet) {
        Array.from(cssStyleSheet.sheet.cssRules).forEach((cssRule) => {
          if ((new RegExp(className)).test(cssRule.selectorText.replace(/^\./, ''))) {
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
            <EmotionShadowDOMWrapper {...this.props} injectStyle={this.injectStyle} />
          </span>
        </ShadowDOM>
      )
    }
  }
}
