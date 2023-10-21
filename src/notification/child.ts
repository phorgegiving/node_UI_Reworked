import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import '@vandeurenglenn/lit-elements/icon-button.js'

@customElement('notification-child')
export class NotificationChild extends LitElement {
  @property()
  title: string

  @property()
  message: string

  @property()
  type: 'error' | 'info' | 'warning'

  #onclick = () => {
    this.parentElement.removeChild(this)
  }

  static styles = css`:host {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    border: 1px solid;
    border-radius: 12px;
    padding: 6px 12px;
    box-sizing: border-box;
    margin-bottom: 12px;
  }
  
  flex-row {
    height: 24px;
    box-sizing: border-box;
    align-items: center;
  }

  strong {
    font-size: 14px;
  }
  `

  render() {
    return html`
  <flex-row>
    <strong>${this.title}</strong>
    <flex-it></flex-it>
    <custom-icon-button icon="close" @click=${this.#onclick}></custom-icon-button>
  </flex-row>

  <p>${this.message}</p>
    `
  }
}