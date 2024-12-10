# SurveyQuill OA

## Task List

- [x] Set up Next.js project
- [x] Create MongoDB connection utility
- [x] Implement Mission model
- [x] Create API routes for CRUD operations
- [x] Implement home page with mission list
- [x] Create "Add Mission" page and form
- [x] Implement "Edit Mission" functionality
- [x] Add "Delete Mission" feature
- [ ] Implement user authentication
- [ ] Add pagination for mission list
- [ ] Implement search functionality
- [ ] Add unit tests
- [x] Set up continuous integration
- [x] Deploy to production

## Problem statement

Create a CRUD application in MERN stack and NextJs and deploy on vercel


## Folder Structure

```
└── 📁surveyquill
    └── 📁.git    
    └── 📁public
    └── 📁src
        └── 📁app
            └── 📁fonts
                └── GeistMonoVF.woff
                └── GeistVF.woff
            └── favicon.ico
            └── globals.css
            └── layout.tsx
        └── 📁components
            └── MissionForm.js
            └── MissionList.js
        └── 📁models
            └── Mission.js
        └── 📁pages
            └── 📁api
                └── 📁missions
                    └── [id].js
                    └── index.js
            └── 📁mission
                └── [id].js
            └── add-mission.js
            └── index.js
        └── 📁styles
        └── 📁utils
            └── dbConnect.js
    └── .env.local
    └── .eslintrc.json
    └── .gitignore
    └── package-lock.json
    └── README.md
    └── tsconfig.json
```

## Installation

1. Clone the repository:
   `https://github.com/RudradevArya/SurveryQuill-OA.git`
2. Navigate to the project directory:
   `cd SurveryQuill-OA`
3. Install dependencies:
   `npm install`
4. Create a `.env.local` file in the root directory and add your MongoDB connection string:
   `MONGODB_URI=your_mongodb_connection_string_here`
5. Run the development server:
   `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

- **View Missions**: The home page displays a list of all space missions.
- **Add Mission**: Click the "Add New Mission" button on the home page to create a new mission.
- **Edit Mission**: Click the "View/Edit" link on a mission card to edit its details.
- **Delete Mission**: On the edit page, click the "Delete Mission" button to remove a mission.

## API Routes

- `GET /api/missions`: Fetch all missions
- `POST /api/missions`: Create a new mission
- `GET /api/missions/[id]`: Fetch a specific mission
- `PUT /api/missions/[id]`: Update a specific mission
- `DELETE /api/missions/[id]`: Delete a specific mission


