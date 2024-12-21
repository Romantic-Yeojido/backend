import { findTodayMemory, fetchRandomMemory } from '../repositories/user.home.repository.js';

export const getTodayMemory = async (userId) => {
    const memory = await findTodayMemory(userId);
    
    if (!memory) {
        return null;
    }

    const yearsAgo = new Date().getFullYear() - new Date(memory.visit_date).getFullYear();

    return {
        yearsAgo,
        title: memory.title
    };
};

export const getRandomCompleteMemory = async (userId) => {
    try {
        const memory = await fetchRandomMemory(userId);
        if (!memory) {
            return null;
        }
        return memory;
    } catch (error) {
        throw error;
    }
};