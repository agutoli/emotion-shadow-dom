import React from 'react'
import ShadowDOM from 'react-shadow'

export default (element) => {
  return class ShadowDOMHelper extends React.PureComponent {
    applyStylesheet = (node) => {
      const didUpdate = element.prototype.componentDidUpdate || function() {};
      element.prototype.componentDidUpdate = () => {
        const cssStyleSheet = Array.from(document.querySelectorAll('[data-glamor]')).slice(-1)[0];
        if (cssStyleSheet) {
          Array.from(cssStyleSheet.sheet.cssRules).forEach((cssRule) => {
            if ((new RegExp(node.className)).test(cssRule.selectorText)) {
              this.styleTag.type = 'text/css';
              if (this.styleTag.styleSheet){
                this.styleTag.styleSheet.cssText = cssRule.cssText;
              } else {
                this.styleTag.appendChild(document.createTextNode(cssRule.cssText));
              }
            }
          });
        }
        didUpdate();
      };
    }
    render() {
      return (
        <ShadowDOM>
          <span>
            <style ref={(n) => this.styleTag = n} />
            {React.createElement(element, {...this.props, ref: this.applyStylesheet})}
          </span>
        </ShadowDOM>
      )
    }
  }
}
