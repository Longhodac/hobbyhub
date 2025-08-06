export const initialPosts = [
  {
    id: 1,
    title: "Golden Hour Street Photography Tips",
    content: "Just spent the evening capturing the magic of golden hour in downtown. The way light filters through buildings creates incredible contrast and mood. Here are my top 5 tips for street photography during this magical time...",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    upvotes: 23,
    comments: [
      { id: 1, text: "Amazing composition! What camera settings did you use?", created_at: new Date('2024-08-05T10:30:00') },
      { id: 2, text: "The shadows in this shot are incredible. Thanks for sharing!", created_at: new Date('2024-08-05T11:15:00') }
    ],
    created_at: new Date('2024-08-04T18:30:00'),
    secret_key: "photo123"
  },
  {
    id: 2,
    title: "Black and White Portrait Series",
    content: "Exploring the timeless art of monochrome portraits. This series focuses on capturing raw emotion without the distraction of color.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    upvotes: 45,
    comments: [
      { id: 3, text: "The contrast is perfect! What lighting setup did you use?", created_at: new Date('2024-08-03T14:20:00') }
    ],
    created_at: new Date('2024-08-03T12:00:00'),
    secret_key: "mono456"
  },
  {
    id: 3,
    title: "Macro Photography: Capturing the Unseen",
    content: "Diving into the microscopic world with my new macro lens. The details you can capture are absolutely mind-blowing!",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop",
    upvotes: 31,
    comments: [],
    created_at: new Date('2024-08-02T09:15:00'),
    secret_key: "macro789"
  }
];