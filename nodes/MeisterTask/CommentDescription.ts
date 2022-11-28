import { INodeProperties } from 'n8n-workflow';

// Operations for "tasks"
const commentOperations: INodeProperties[] = [{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'comments',
			],
		},
	},
	options: [{
		// https://developers.meistertask.com/reference/post-comment
		name: 'Create',
		value: 'create',
		action: 'Create a comment',
		description: 'Create a new comment',
		routing: {
			request: {
				method: 'POST',
				url: '=/tasks/{{$parameter.taskId}}/comments',
			},
		},
	}],
	default: 'create',
},
];

// Fields for "get" operation
const getOperation: INodeProperties[] = [{
	displayName: 'Task ID',
	description: 'Choose which task to comment',
	required: true,
	name: 'taskId',
	type: 'number',
	default: 0,
	displayOptions: {
		show: {
			resource: ['comments'],
			operation: ['create'],
		},
	},
}, {
	displayName: 'Comment',
	description: 'Comment text - supports Markdown',
	name: 'text',
	type: 'string',
	required: true,
	default: '',
	routing: {
		send: {
			property: 'text',
			type: 'body',
		},
	},
	displayOptions: {
		show: {
			resource: ['comments'],
			operation: ['create'],
		},
	},
}];

export const commentDescription = [
	...commentOperations,
	...getOperation,
];
