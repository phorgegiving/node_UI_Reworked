import { html, LitElement } from "lit";
import './../clipboard-copy.js'

export default customElements.define('export-screen', class ExportScreen extends LitElement {
  static properties = {
    shown: {
      type: 'boolean',
      reflect: true
    },
    qrcode: {
      type: 'string'
    },
    exported: {
      type: 'string'
    }
  }

  constructor() {
    super()
    this.addEventListener('click', this.#click.bind(this))
  }

  #click(event) {
    const target = event.composedPath()[0]
    console.log(target.tagName);
    if (target.tagName === 'EXPORT-SCREEN') this.#close()
    

  }

  show(qr, exported) {
    this.qrcode = qr
    this.renderRoot.querySelector('clipboard-copy').value = exported
    this.shown = true
  }

  #close() {
    this.shown = false
  }

  render() {
    return html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        background: radial-gradient(#351fdc, transparent), radial-gradient(#628ed2, transparent);;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        opacity: 0;
        cursor: pointer;
      }

      :host([shown="true"]) {
        opacity: 1;
        pointer-events: auto;
        z-index: 1000;
      }

      .wrapper {
        background: #3647bd;
        border-radius: 12px;
        box-sizing: border-box;
        padding: 12px 24px;
        height: 100%;
        max-height: 440px;
        max-width: 320px;
        width: 100%;
        color: white;
        box-shadow: 1px 1px 6px 8px #475ad96b, 1px 1px 6px 5px #475ad96b;
        pointer-events: none;
        user-select: none;
      }

      custom-svg-icon {
        cursor: pointer;
      }

      img {
        padding: 18px 0;
      }

      small {
        padding-top: 6px;
        padding-bottom: 14px;
      }
      
      .close-tip {
        position: absolute;
        transform: translateX(-50%);
        left: 50%;
        top: 12px;
        box-sizing: border-box;
        padding: 6px 12px;
        border: 1px solid #fff;
        border-radius: 24px;
        color: #fff;
      }
    </style>

    <strong class="close-tip">click outside the box to close.</strong>
    
    <flex-column class="wrapper">
      <strong>scan to login on another device</strong>
      <img src=${this.qrcode}></img>
      <strong>click copy to login on the same device</strong>
      <small>NOTE: never share/send to/with/on anyone or app</small>
      <clipboard-copy>copy</clipboard-copy>
    </flex-column>
    `
  }
})