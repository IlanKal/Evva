import { Request, Response } from 'express';
import EventConversationService from '../services/EventRequestService';

export const conversation = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, conversationId, answer } = req.body;

        if (!userId && !conversationId) {
            res.status(400).json({ message: 'Missing userId or conversationId.' });
            return; 
        }

        const result = await EventConversationService.continueConversation({
            userId,
            conversationId,
            answer,
        });

        res.status(200).json(result); // Send response without returning it
    } catch (error) {
        console.error('Error during conversation:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Send error response
    }
};
