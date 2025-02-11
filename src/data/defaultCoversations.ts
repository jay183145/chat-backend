import { Conversation } from "../types/conversation.js"

export const conversations: Conversation[] = [
    {
        id: 1,
        participants: [
            { userId: 4, user: "David", avatar: "https://i.pravatar.cc/150?img=4" },
            { userId: 2, user: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
        ],
        lastMessage: "I'm building a new side project.",
        timestamp: 1739016600000,
    },
    {
        id: 2,
        participants: [
            { userId: 1, user: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { userId: 3, user: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
        ],
        lastMessage: "What's your favorite editor?",
        timestamp: 1739017200000,
    },
    {
        id: 3,
        participants: [
            { userId: 2, user: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
            { userId: 3, user: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
        ],
        lastMessage: "Let's meet up sometime!",
        timestamp: 1739017800000,
    },
    {
        id: 4,
        participants: [
            { userId: 1, user: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { userId: 2, user: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
        ],
        lastMessage: "Redux or Zustand?",
        timestamp: 1739018400000,
    },
    {
        id: 5,
        participants: [
            { userId: 5, user: "Emma", avatar: "https://i.pravatar.cc/150?img=5" },
            { userId: 4, user: "David", avatar: "https://i.pravatar.cc/150?img=4" },
        ],
        lastMessage: "How do you test your frontend?",
        timestamp: 1739019000000,
    },
    {
        id: 6,
        participants: [
            { userId: 1, user: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { userId: 2, user: "Bob", avatar: "https://i.pravatar.cc/150?img=2" },
        ],
        lastMessage: "End-to-end testing is crucial.",
        timestamp: 1739019600000,
    },
    {
        id: 7,
        participants: [
            { userId: 5, user: "Emma", avatar: "https://i.pravatar.cc/150?img=5" },
            { userId: 4, user: "David", avatar: "https://i.pravatar.cc/150?img=4" },
        ],
        lastMessage: "How do you test your frontend?",
        timestamp: 1739020200000,
    },
    {
        id: 8,
        participants: [
            { userId: 1, user: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { userId: 3, user: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
        ],
        lastMessage: "Nice to meet you!",
        timestamp: 1739020800000,
    },
    {
        id: 9,
        participants: [
            { userId: 1, user: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
            { userId: 3, user: "Charlie", avatar: "https://i.pravatar.cc/150?img=3" },
        ],
        lastMessage: "How's it going?",
        timestamp: 1739021400000,
    },
    {
        id: 10,
        participants: [
            { userId: 5, user: "Emma", avatar: "https://i.pravatar.cc/150?img=5" },
            { userId: 1, user: "Alice", avatar: "https://i.pravatar.cc/150?img=1" },
        ],
        lastMessage: "I'm building a new side project.",
        timestamp: 1739022000000,
    },
]
