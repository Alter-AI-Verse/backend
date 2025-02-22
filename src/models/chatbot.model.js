import mongoose, { Schema } from 'mongoose';

const ChatBotSchema = new Schema(
    {
        userId:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        botName:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: String,
            default: 'Persona-powered digital chatbot',
        },
        avatar:{
            type: String,
            default: '/defaultBotAvatar.png'
        },
        personality:{
            type: String,
            enum: ['formal', 'casual', 'humorous', 'professional'],
            default: 'professional',
        },
        defaultResponses: [
            {
                question:{
                    type: String,
                    required: true,
                },
                response: {
                    type: String,
                    required: true,
                }
            }
        ],
        behaviorConfig:{
            responseTone:{
            type: String,
            enum: ['neutral', 'friendly', 'direct'],
            default: 'neutral',
            },
            allowedTopics:[{
            type: String,
            }],
            restrictedTopics: [{
            type: String,
            }]
        },
        knowledgeBase: {
            type: Schema.Types.ObjectId,
            ref: 'KnowledgeBase'
        },
        integration:{
            slack:{
                type: Boolean,
                default: false,
            },
            discord:{
                type: Boolean,
                default: false
            },
            whatsapp:{
                type: Boolean,
                default: false,
            },
            telegram:{
                type: Boolean,
                default: false
            },
        },
        analytics:{
            totalInteractions:{
                type: Number,
                default: 0,
            },
            uniqueUsers:{
                type: Number,
                default: 0,
            },
            averageResponseTime:{
                type: Number,
                default: 0
            },
        },
        status:{
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
        chatHistory:{
            type: Schema.Types.ObjectId,
            ref: 'Conversation',
        },
        customizationOptions:{
            greetingMessage:{
                type: String,
                default: 'Hello! How can I assist you today?'
            },
            closingMessage:{
                type: String,
                default: 'Goodbye! Have a great day!'
            },
            botSignature:{
                type: String,
                default: 'Persona - AI digital Assistant',
            }
        }
    },
    {
        timestamps:  true,
    }
);

export const ChatBot = mongoose.model('ChatBot', ChatBotSchema);