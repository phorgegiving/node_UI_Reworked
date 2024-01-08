import { LitElement, PropertyValueMap, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import '../elements/shorten-string.js'
// import { map } from 'lit/directives/map.js'
import '@vandeurenglenn/lit-elements/icon-button.js'
import uEmojiParser from 'universal-emoji-parser'
@customElement('chat-view')
export class ChatView extends LitElement {
  @property({ type: Array })
  peers: [string, {}][] = []

  @property({ type: String })
  peerId: string

  #peerChange = async (peer) => {
    this.peers = await client.peers()
  }

  @property({ type: Boolean })
  showAdditions: boolean = false

  async connectedCallback() {
    super.connectedCallback()
    this.shadowRoot.addEventListener('click', (event) => {
      const paths = event.composedPath()

      console.log(paths[0])
      if (paths[0].localName === 'custom-icon') {
        if (paths[0].getAttribute('icon') === 'mood') {
          this.showAdditions = !this.showAdditions
          if (!customElements.get('emoji-selector')) {
            import('./../elements/emoji-selector.js')
          }
          if (this.showAdditions) this.shadowRoot.querySelector('.additions').setAttribute('open', '')
          else this.shadowRoot.querySelector('.additions').removeAttribute('open')
        }
      }
    })

    // this.shadowRoot.querySelector('.peerId').value = await client.peerId()
    this.peers = await client.peers()
    this.peerId = await client.peerId()
    pubsub.subscribe('peer:connected', this.#peerChange)
    pubsub.subscribe('peer:left', this.#peerChange)
  }

  static get styles() {
    return [
      css`
        :host {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          color: var(--font-color);
        }
        .chat-container {
          height: 100%;
        }
        textarea {
          padding-top: 12px;
          width: 100%;
          border: none;
          resize: none;
          outline: none;
          background: transparent;
          font-size: 20px;
          margin-right: 24px;
        }

        .input-container {
          box-sizing: border-box;
          border-top: 1px solid #eee;
          padding: 12px;
          box-sizing: border-box;
          min-height: 48px;
        }

        .additions {
          position: relative;
          transform: translate(-110%);
        }
        .additions[open] {
          transform: translate(0);
        }

        emoji-selector {
          right: 42px;
          bottom: 24px;
          position: absolute;
        }
      `
    ]
  }

  onAdditionClick = () => {
    console.log('cli')
  }

  @query('textarea')
  textarea

  #onEmojiSelected = ({ detail }) => {
    this.textarea.value += detail
  }

  render() {
    // return html`
    //   <flex-column class="chat-container">
    //     <array-repeat>
    //       <template>
    //         <chat-message></chat-message>
    //       </template>
    //     </array-repeat>
    //   </flex-column>

    //   <flex-column>
    //     <custom-pages>
    //       <emoji-selector data-route="emoji"></emoji-selector>
    //     </custom-pages>

    //     <flex-row>
    //       <custom-tabs>
    //         <custom-tab data-route="emoji" title="emoji"><custom-icon icon="mood"></custom-icon></custom-tab>
    //         <custom-tab data-route="gif" title="gif"><custom-icon icon="gif"></custom-icon></custom-tab>
    //       </custom-tabs>
    //     </flex-row>
    //     <textarea placeholder="type here"></textarea>
    //   </flex-column>
    // `
    return html`
      <flex-column class="chat-container">
        <array-repeat>
          <template>
            <chat-message></chat-message>
          </template>
        </array-repeat>
      </flex-column>

      <flex-column class="additions">
        <emoji-selector data-route="emoji" @emoji-selected=${this.#onEmojiSelected}></emoji-selector>
      </flex-column>
      <flex-row width="100%" center class="input-container">
        <textarea class="textarea" placeholder="type here" mode-edit="true"></textarea>

        <custom-icon icon="mood" @click=${() => this.onAdditionClick()} style="margin-right: 12px;"></custom-icon>
        <custom-icon icon="send"> </custom-icon>
      </flex-row>
    `
  }
}
