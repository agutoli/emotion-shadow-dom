import React from 'react'
import ReactDOM from 'react-dom';
import ShadowDOM from 'react-shadow'

export default (element) => {
  class EmotionShadowDOMWrapper extends React.Component {
    render() {
      return React.createElement(element, {...this.props, ref: this.emotionInject});
    }

    emotionInject = (node) => {
      const { injectStyle } = this.props;
      const didUpdate = element.prototype.componentDidUpdate || function() {};
      element.prototype.componentDidUpdate = () => {
        node.className && injectStyle(node.className);
        didUpdate();
      };
    }
  }

  return class ShadowDOMHelper extends React.PureComponent {
    injectStyle = (prefixId) => {
      const cssStyleSheet = Array.from(document.querySelectorAll('[data-emotion]')).slice(-1)[0];
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
            <EmotionShadowDOMWrapper {...this.props} injectStyle={this.injectStyle} />
          </span>
        </ShadowDOM>
      )
    }
  }
}
