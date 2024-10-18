import { removeTask } from '../../store/actions';
import { addObserver } from '../../store/store';
import { dispatch } from '../../store/store';
export enum TaskItemProps {
	'uid' = 'uid',
	'tasktitle' = 'tasktitle',
	'state' = 'state',
}

class TaskItem extends HTMLElement {
	uid?: number;
	tasktitle?: string;
	state?: boolean;

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		addObserver(this);
	}

	static get observedAttributes() {
		const attrs: Record<TaskItemProps, null> = {
			uid: null,
			tasktitle: null,
			state: null,
		};
		return Object.keys(attrs);
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(propName: TaskItemProps, oldValue: string | undefined, newValue: string | undefined) {
		switch (propName) {
			case TaskItemProps.uid:
				this.uid = newValue ? Number(newValue) : undefined;
				break;

			case TaskItemProps.state:
				this.state = newValue ? newValue === 'true' : undefined;
				break;

			default:
				this[propName] = newValue;
				break;
		}

		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<article>
			<h3>${this.tasktitle}</h3>
			<button class="delete-task">Delete</button>
			<input>} type="checkbox" ${this.state ? 'checked' : ''}class="check-task">
			</article>
			`;
		}

		const deleteBtn = this.shadowRoot?.querySelector('.delete-task') as HTMLButtonElement;
		deleteBtn.addEventListener('click',()=>{
   dispatch(removeTask this.uid!)
		})
	}
}

customElements.define('task-item', TaskItem);
export default TaskItem;
