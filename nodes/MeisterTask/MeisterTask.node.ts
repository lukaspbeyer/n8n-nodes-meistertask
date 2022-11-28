import { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { attachmentDescription } from './AttachmentDescription';
import { commentDescription } from './CommentDescription';
import { taskDescription } from './TaskDescription';


export class MeisterTask implements INodeType {
	description: INodeTypeDescription = {
		// General description
		displayName: 'MeisterTask',
		name: 'meisterTask',
		icon: 'file:meistertask.svg',
		group: [],
		inputs: ['main'],
		outputs: ['main'],
		version: 0,
		subtitle: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'Accesses the MeisterTask API',
		// Credentials
		credentials: [{
			name: 'meisterTaskApi',
			required: true,
		}],
		// Default API URL
		requestDefaults: {
			baseURL: 'https://www.meistertask.com/api',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		defaults: {
			name: 'MeisterTask',
		},
		properties: [{
			// Ressources: tasks, attachments and comments
			displayName: 'Resource',
			name: 'resource',
			type: 'options',
			noDataExpression: true,
			options: [{
				name: 'Task',
				value: 'tasks',
			}, {
				name: 'Comment',
				value: 'comments',
			}, {
				name: 'Attachment',
				value: 'attachments',
			}],
			default: 'tasks',
		},
		...taskDescription,
		...commentDescription,
		...attachmentDescription,
		],
	};
}
