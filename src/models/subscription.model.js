import mongoose, { Schema } from 'mongoose';

const SubscriptionSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        planType: {
            type: String,
            enum: ['free', 'basic', 'standard', 'premium'],
            default: 'free',
        },
        status: {
            type: String,
            enum: ['active', 'canceled', 'expired'],
            default: 'active',
        },
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: {
            type: Date,
            required: true,
        },
        autoRenew: {
            type: Boolean,
            default: true,
        },
        paymentMethod: {
            type: String,
            enum: ['upi', 'card', 'paypal', 'crypto'],
            required: false,
        },
        upiDetails: {
            upiId: { 
                type: String, 
                required: false,
            },
            qrCodeUrl: { 
                type: String, 
                required: false,
            },
        },
        lastPaymentDate: {
            type: Date,
            required: false,
        },
        nextBillingDate: {
            type: Date,
            required: false,
        },
        transactionHistory: [
            {
                transactionId: { 
                    type: String,
                },
                amount: { 
                    type: Number,
                },
                currency: { 
                    type: String, 
                    default: "USD",
                },
                paymentDate: { 
                    type: Date,
                },
                status: { 
                    type: String, 
                    enum: ['success', 'failed', 'pending'],
                },
            },
        ],
        discountApplied: {
            type: Boolean,
            default: false,
        },
        trialPeriod: {
            type: Boolean,
            default: false,
        },
        trialEndDate: {
            type: Date,
            required: false,
        },
        failedPayments: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

export const Subscription = mongoose.model('Subscription', SubscriptionSchema);
