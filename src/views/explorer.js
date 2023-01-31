import { css, html, LitElement } from 'lit'
import {map} from 'lit/directives/map.js'
import '../elements/latest.js'
import '../elements/explorer/info-container.js'
import { formatBytes } from '@leofcoin/utils'
import 'custom-tabs/custom-tabs.js'

import 'custom-tabs/custom-tab.js'

export default customElements.define('explorer-view', class ExplorerView extends LitElement {
  static get styles() {
    return css`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .navigation-bar {
      padding-bottom: 24px;
    }
    custom-tabs {
      border: 1px solid #eee;
      border-radius: 24px;
      background: #2c314a00;
      box-sizing: border-box;
      box-shadow: 0px 0px 16px 6px #8890b75c;
      align-items: center;
    }

    custom-tab {
      color:#17418d;
    }

    custom-tab.custom-selected {
      border: none;
      background: #628ed2;
      font-weight: 600;
      border-radius: 24px;
      color: #eee;
      box-sizing: border-box;
      height: calc(100% - 1px);
    }
    `
  }
  constructor() {
    super()
  }

  async select(selected) {
    console.log(selected);
    if (!customElements.get(`explorer-${selected}`)) await import(`./explorer-${selected}.js`)
    this.shadowRoot.querySelector('custom-pages').select(selected)
    this.renderRoot.querySelector('custom-tabs').select(selected)
  }

  #customSelect({detail}) {
    location.hash = `#!/explorer?selected=${detail}`
    // this.select(detail)
  }

  render() {
    return html`
    <custom-pages attr-for-selected="data-route">
      <explorer-dashboard data-route="dashboard"></explorer-dashboard>
      <explorer-blocks data-route="blocks"></explorer-blocks>
      <explorer-block data-route="block"></explorer-block>
      <explorer-transactions data-route="transactions"></explorer-transactions>
      <explorer-transaction data-route="transaction"></explorer-transaction>
    </custom-pages>

    <flex-row class="navigation-bar">
      <flex-one></flex-one>
      <custom-tabs attr-for-selected="data-route" @selected="${this.#customSelect}">
        <custom-tab data-route="dashboard">
          <span>
          dashboard
          </span>
        </custom-tab>
        <custom-tab data-route="blocks">
          <span>
          blocks
          </span>
        </custom-tab>
        <custom-tab data-route="transactions">
          <span>
          transactions
          </span>
        </custom-tab>
      </custom-tabs>
      <flex-one></flex-one>
    </flex-row>
`
  }
})
