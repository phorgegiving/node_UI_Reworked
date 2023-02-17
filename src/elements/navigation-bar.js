import { css, html, LitElement } from "lit";
import { map } from "lit/directives/map.js";
import 'custom-tabs/custom-tabs.js'
import 'custom-tabs/custom-tab.js'

export default customElements.define('navigation-bar', class NavigationBar extends LitElement {
  static properties = {
    items: {
      type: Array,
      reflect: true
    }
  }

  static styles = css`
  :host {
    display: flex;
  }
  custom-tabs {
    border: 1px solid  var(--border-color);
    border-radius: 24px;
    background: var(--secondary-background);
    box-sizing: border-box;
    align-items: center;
    color: var(--font-color);
  }

  custom-tab {
    width: 100%;
    user-select: none;
  }

  custom-tab.custom-selected {
    border: none;
    background: #628ed2;
    font-weight: 600;
    border-radius: 24px;
    box-sizing: border-box;
    height: calc(100% - 1px);
  }
  `

  constructor() {
    super()
  }

  select(value) {
    this.renderRoot.querySelector('custom-tabs').select(value)
  }

  #customSelect({detail}) {
    this.dispatchEvent(new CustomEvent('selected', {detail}))
  }
  render() {
    return html`
    <custom-tabs @selected="${this.#customSelect}" attr-for-selected="data-route">
      ${map(this.items, item => html`
      <custom-tab data-route="${item.route ? item.route : item}" title="${item.title ? item.title : item}"><span>${item.innerHTML ? item.innerHTML : item}</span></custom-tab>
      `
      )}
    </custom-tabs>
    `
  }
})