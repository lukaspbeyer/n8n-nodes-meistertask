import { INodeProperties } from 'n8n-workflow';

// Operations for "tasks"
const taskOperations: INodeProperties[] = [{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'tasks',
			],
		},
	},
	options: [{
		// https://developers.meistertask.com/reference/get-task
		name: 'Get',
		value: 'get',
		action: 'Get a task',
		description: 'Get a task by its ID',
		routing: {
			request: {
				method: 'GET',
				url: '=/tasks/{{$parameter.taskId}}',
			},
		},
	}, {
		// https://developers.meistertask.com/reference/post-task
		name: 'Create',
		value: 'create',
		action: 'Create a task',
		description: 'Create a new task',
		routing: {
			request: {
				method: 'POST',
				url: '=/sections/{{$parameter.sectionId}}/tasks',
			},
		},
	}],
	default: 'get',
},
];

// Fields for "get" operation
const getOperation: INodeProperties[] = [{
	displayName: 'Task ID',
	description: 'Choose which task to get',
	required: true,
	name: 'taskId',
	type: 'number',
	default: 0,
	displayOptions: {
		show: {
			resource: ['tasks'],
			operation: ['get'],
		},
	},
}];

// Fields for "create" operation
const createOperation: INodeProperties[] = [{
	displayName: 'Section ID',
	description: 'Choose which section to create task in',
	required: true,
	name: 'sectionId',
	type: 'number',
	default: 0,
	displayOptions: {
		show: {
			resource: ['tasks'],
			operation: ['create'],
		},
	},
}, {
	displayName: 'Name',
	description: 'The name of the new task',
	required: true,
	name: 'name',
	type: 'string',
	default: '',
	routing: {
		send: {
			property: 'name',
			type: 'body',
		},
	},
	displayOptions: {
		show: {
			resource: ['tasks'],
			operation: ['create'],
		},
	},
}, {
	displayName: 'Notes',
	description: 'The description of the new task',
	name: 'notes',
	type: 'string',
	default: '',
	routing: {
		send: {
			property: 'notes',
			type: 'body',
		},
	},
	displayOptions: {
		show: {
			resource: ['tasks'],
			operation: ['create'],
		},
	},
}];

export const taskDescription = [
	...taskOperations,
	...getOperation,
	...createOperation,
];
