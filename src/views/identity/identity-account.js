// import { nativeToken } from './../../../node_modules/@leofcoin/addresses/src/addresses'
import { parseUnits } from '@leofcoin/utils'
import { LitElement, html } from 'lit'
import { map } from 'lit/directives/map.js'

export default customElements.define('identity-account', class IdentityAccount extends LitElement {

  static properties = {
    accounts: {
      type: 'object'
    }
  }

  constructor() {
    super()
  }

  render() {
    return html`
<style>
  * {
    pointer-events: none;
  }

  :host {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 24px;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
  .account-container {
    padding: 12px;
    box-sizing: border-box;
  }

  .container {
    max-width: 480px;
    max-height: 480px;
    width: 100%;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    background: #ffffff52;
    border-radius: 24px;
    box-shadow: 1px 1px 14px 0px #0000002e;
  }
  
</style>
<flex-column class="container">
${map(this.accounts, ([name, external, internal]) => html`
    <strong>${name}</strong>
  <flex-column class="account-container">
    
    <flex-row>
      <strong>external</strong>
      <flex-one></flex-one>
      <span>${external}</span>
    </flex-row>

    <flex-row>
      <strong>internal</strong>
      <flex-one></flex-one>
      <span>${internal}</span>
    </flex-row>
  </flex-column>
`)}
</flex-column>
`
  }
})
