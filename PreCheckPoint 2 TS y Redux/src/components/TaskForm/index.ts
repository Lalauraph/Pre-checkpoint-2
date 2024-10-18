import { addTask } from '../../store/actions';
import { appState } from '../../store/store';
import { Task } from '../../types/task';
import { dispatch } from '../../store/store';

class TaskForm extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {
			this.shadowRoot.innerHTML = `
			<h2>Preparcial 2</h2>
			<form class="task-form">
			<input type="text" id="task-input" placeholder="nombre de la tarea" required>
			<button type="submit" id="add-btn">Agregar</button>
			</form>
			`;
		}
		const taskForm = this.shadowRoot?.querySelector('.task-form') as HTMLFormElement;
		taskForm.addEventListener('submit', (e) => {
			e.preventDefault();
			const taskInput = this.shadowRoot?.querySelector('#task-input') as HTMLInputElement;
			const taskName = taskInput.value;
			const newTask: Task = {
				id: Date.now(),
				title: taskName,
				state: false,
			};

			dispatch(addTask(newTask));
			console.log(appState);
		});
	}
}

customElements.define('task-form', TaskForm);
export default TaskForm;
