# RTK Chat App - Frontend

The frontend application for the RTK Chat App, built with React 19, Redux Toolkit, Vite, and Tailwind CSS.

## 🚀 Features

- **Real-time Chat Interface** - Modern chat UI with Socket.io integration
- **Video Calling** - WebRTC-based video calling with PeerJS
- **User Authentication** - Login/register with JWT tokens
- **Contact Management** - Add, search, and manage contacts
- **Message History** - Persistent chat history with MongoDB
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **State Management** - Redux Toolkit for predictable state management

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **Redux Toolkit** - Modern Redux with RTK Query
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.io Client** - Real-time communication
- **PeerJS** - WebRTC peer-to-peer connections
- **React Router** - Client-side routing
- **Headless UI** - Accessible UI components

## 📦 Installation

### Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

### Setup

1. **Install dependencies** (from project root):

   ```bash
   pnpm install
   ```

2. **Environment Configuration**:

   ```bash
   cp .env.example .env
   ```

   Configure the following environment variables:

   ```env
   VITE_API_URL=http://localhost:5000
   VITE_SOCKET_URL=http://localhost:5000
   ```

3. **Start development server**:

   ```bash
   # From project root
   pnpm --filter @rtk-app/web dev
   
   # Or from this directory
   cd apps/web
   pnpm dev
   ```

The application will be available at [http://localhost:5173](http://localhost:5173).

## 📜 Available Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm build:prod       # Build for production with prod mode
pnpm preview          # Preview production build
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors
```

## 🏗️ Project Structure

```md
apps/web/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── shared/         # Shared UI components
│   │   ├── ContactsList.jsx
│   │   ├── Message.jsx
│   │   ├── MessageSidebar.jsx
│   │   └── ...
│   ├── features/           # Redux slices and API logic
│   │   ├── api/           # RTK Query API definitions
│   │   ├── auth/          # Authentication slice
│   │   ├── messages/      # Messages slice
│   │   └── room/          # Room/chat slice
│   ├── pages/             # Route components
│   │   ├── Dashboard.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Room.jsx
│   ├── hooks/             # Custom React hooks
│   ├── contexts/          # React contexts
│   ├── utils/             # Utility functions
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── public/                # Static assets
├── dist/                  # Build output
└── vercel.json           # Vercel deployment config
```

## 🔧 Development

### Key Components

- **`App.jsx`** - Main application component with routing
- **`Dashboard.jsx`** - Main chat interface
- **`Room.jsx`** - Individual chat room component
- **`MessageSidebar.jsx`** - Contacts and message list
- **`Message.jsx`** - Individual message component

### State Management

The app uses Redux Toolkit with the following slices:

- **`authSlice`** - User authentication state
- **`messagesSlice`** - Chat messages and conversations
- **`roomSlice`** - Video calling and room state
- **`filterSlice`** - Search and filtering state

### API Integration

RTK Query is used for API calls:

- **`authApi`** - Authentication endpoints
- **`apiSlice`** - Base API configuration

## 🎨 Styling

The application uses Tailwind CSS for styling with:

- Custom color palette
- Responsive design utilities
- Component-based styling approach
- Dark/light mode support (if implemented)

## 🚀 Deployment

The frontend is automatically deployed to Vercel:

- **Production URL**: <https://rtk-chat-app-cyan.vercel.app>
- **Auto-deployment**: On push to main branch
- **Configuration**: `vercel.json`

### Manual Deployment

```bash
pnpm build
pnpm preview  # Test production build locally
```

## 🔗 Integration

This frontend integrates with:

- **Backend API** - Express.js server for authentication and data
- **Socket.io** - Real-time messaging and notifications
- **WebRTC** - Peer-to-peer video calling

## 📱 Browser Support

- Chrome >= 88
- Firefox >= 85
- Safari >= 14
- Edge >= 88

## 🤝 Contributing

1. Follow the project's coding standards
2. Use TypeScript for type safety
3. Write meaningful commit messages
4. Test your changes thoroughly
5. Update documentation as needed
