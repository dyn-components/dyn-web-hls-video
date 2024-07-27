import BaseComponent from "./BaseComponent";
import Hls from 'hls.js';
class WebComponent extends BaseComponent {
	private hls?: Hls;
	private video: HTMLVideoElement;

	// 监听的属性列表
	static get observedAttributes(): string[] {
		return ['src', 'controls', 'autoplay', 'muted', 'loop', 'poster'];
	}
	constructor() {
		super();

		this.video = document.createElement('video');
		this.video.classList.add("dyn-component--web-components", "dyn-hls-video");
		this.video.setAttribute('playsinline', 'true'); // 添加 playsinline 属性
		this.shadowRoot?.appendChild(this.video);
	}
	connectedCallback() {
		super.connectedCallback();

		this.updateAttributes();
		if (Hls.isSupported()) {
			this.hls = new Hls();
			this.hls.attachMedia(this.video);
			this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
				if (this.hasAttribute('muted')) {
					this.video.muted = true;
				}
				if (this.hasAttribute('autoplay')) {
					this.video.play();
				}
			});
			this.hls.on(Hls.Events.ERROR, (event: any, data: any) => {
				console.error(event, data)
				if (data.fatal) {
					switch (data.type) {
						case Hls.ErrorTypes.NETWORK_ERROR:
							// try to recover network error
							console.error('fatal network error encountered, try to recover');
							this.hls!.startLoad();
							break;
						case Hls.ErrorTypes.MEDIA_ERROR:
							console.error('fatal media error encountered, try to recover');
							this.hls!.recoverMediaError()
							break;
						default:
							// cannot recover
							this.hls!.destroy()
							break
					}
				}
			})

			if (this.hasAttribute('src')) {
				this.hls.loadSource(this.getAttribute('src') || '');
			}
		} else if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
			this.video.src = this.getAttribute('src') || '';
			this.video.addEventListener('loadedmetadata', () => {
				if (this.hasAttribute('autoplay')) {
					this.video.play();
				}
			});
		}

	}
	attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null) {
		super.attributeChangedCallback(name, oldValue, newValue);

		if (name === 'src' && oldValue !== newValue) {
			this.video.src = newValue || '';
			if (this.hls) {
				this.hls.loadSource(newValue || '');
			} else {
				this.video.src = newValue || '';
			}
		} else {
			this.updateAttributes();
		}
	}

	disconnectedCallback() {
		super.disconnectedCallback();

		if (this.hls) {
			this.hls.destroy();
		}
	}

	private updateAttributes() {
		['controls', 'autoplay', 'muted', 'loop', 'poster'].forEach(attr => {
			if (this.hasAttribute(attr)) {
				this.video.setAttribute(attr, this.getAttribute(attr) || '');
			} else {
				this.video.removeAttribute(attr);
			}
		});
	}
}



const define = (name: string, options?: ElementDefinitionOptions) => {
	customElements.define(name, WebComponent, options);
};

export { define };
export default WebComponent;
