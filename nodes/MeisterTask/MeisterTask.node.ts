import { INodeType, INodeTypeDescription } from 'n8n-workflow';


export class MeisterTaskNode implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		properties: [{
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [{
				name: 'Task',
				value: 'tasks',
			}, {
				name: 'Attachment',
				value: 'attachments',
			}],
			default: 'tasks',
		}, {
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
				name: 'Get',
				value: 'get',
				action: 'Get a task',
				description: 'Get a task by its ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/tasks/{{$parameter.id}}',
					},
				},
			}],
			default: 'get',
		}, {
			displayName: 'Task ID',
			description: 'Choose which task to get',
			required: true,
			name: 'id',
			type: 'number',
			default: 0,
			displayOptions: {
				show: {
					resource: [
						'tasks',
					],
				},
			},
		}],
		credentials: [{
			name: 'meisterTaskApi',
			required: true,
		}],
		requestDefaults: {
			baseURL: 'https://www.meistertask.com/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		inputs: ['main'],
		outputs: ['main'],
		displayName: 'MeisterTask',
		name: 'MeisterTask',
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		icon: 'file:meistertask.svg',
		group: [],
		version: 0,
		description: 'Accesses the MeisterTask API',
		defaults: {
			name: 'MeisterTask',
		},
	};
}
