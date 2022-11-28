import { INodeProperties, NodeOperationError } from 'n8n-workflow';
import FormData from 'form-data';

// Operations for "tasks"
export const attachmentOperations: INodeProperties[] = [{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: [
				'attachments',
			],
		},
	},
	options: [{
		// https://developers.meistertask.com/reference/get-task-attachments
		name: 'Get',
		value: 'get',
		action: 'Get attachments',
		description: 'Get all attachments of a task',
		routing: {
			request: {
				method: 'GET',
				url: '=/tasks/{{$parameter.taskId}}/attachments',
			},
		},
	}, {
		// https://developers.meistertask.com/reference/post-attachment
		name: 'Create',
		value: 'create',
		action: 'Create an attachment',
		description: 'Create an attachment for a task',
		routing: {
			request: {
				method: 'POST',
				url: '=/tasks/{{$parameter.taskId}}/attachments',
			},
			send: {
				preSend: [
					// Handle body creation
					async function (this, requestOptions) {
						// field name of the attachment binary data
						const binaryPropertyName = this.getNodeParameter(
							'inputDataFieldName',
						) as string;

						// get binary data from node input
						const item = this.getInputData();
						if (!item.binary) {
							throw new NodeOperationError(this.getNode(), 'No binary data exists on item!', {
								itemIndex: this.getItemIndex(),
							});
						}

						if (item.binary[binaryPropertyName] === undefined) {
							throw new NodeOperationError(
								this.getNode(),
								`No binary data property "${binaryPropertyName}" does exist on item!`,
								{ itemIndex: this.getItemIndex() },
							);
						}

						// get binary content and type from node input
						const binaryData = item.binary[binaryPropertyName];
						const content = Buffer.from(binaryData.data, 'base64');
						const contentType = binaryData.mimeType;

						// construct form body
						const body = new FormData();
						body.append('name', this.getNodeParameter('name') as string);
						body.append('local', content, {
							contentType,
							filename: this.getNodeParameter('name') as string,
						});

						// Set the headers
						if (!requestOptions.headers) requestOptions.headers = {};
						requestOptions.headers = body.getHeaders();

						// Return the request data
						requestOptions.body = body.getBuffer();
						return requestOptions;
					},
				],
			},
		},
	}],
	default: 'get',
},
];

// Fields for "get" operation
export const getOperation: INodeProperties[] = [{
	displayName: 'Task ID',
	description: 'Choose which task to get',
	required: true,
	name: 'taskId',
	type: 'number',
	default: 0,
	displayOptions: {
		show: {
			resource: ['attachments'],
			operation: ['get'],
		},
	},
}];

// Fields for "create" operation
export const createOperation: INodeProperties[] = [{
	displayName: 'Task ID',
	description: 'Choose which task to attach the data to',
	required: true,
	name: 'taskId',
	type: 'number',
	default: 0,
	displayOptions: {
		show: {
			resource: ['attachments'],
			operation: ['create'],
		},
	},
}, {
	displayName: 'Attachment Data',
	description: 'The name of the incoming field containing the binary file data to be processed',
	required: true,
	name: 'inputDataFieldName',
	type: 'string',
	noDataExpression: true,
	default: '',
	routing: {
		request: {
			encoding: 'blob',
		},
		send: {
			property: 'name',
			type: 'body',
		},
	},
	displayOptions: {
		show: {
			resource: ['attachments'],
			operation: ['create'],
		},
	},
}, {
	displayName: 'Name',
	description: 'The name of the attachment',
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
			resource: ['attachments'],
			operation: ['create'],
		},
	},
}];

export const attachmentDescription = [
	...attachmentOperations,
	...getOperation,
	...createOperation,
];
