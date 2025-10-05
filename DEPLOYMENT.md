# 🚀 Wedding Website Deployment Guide

## Step 1: Deploy to Vercel

### Option A: GitHub Integration (Recommended)
1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial wedding website"
   git remote add origin https://github.com/yourusername/wedding-website.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Configure:
     - Framework Preset: `Vite`
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Deploy!

### Option B: Vercel CLI
```bash
# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## Step 2: Set up Firebase

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `wedding-rsvp` (or your choice)
4. Enable Google Analytics (optional)
5. Create project

### 2. Set up Firestore Database
1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for now)
4. Select a location close to your users

### 3. Get Firebase Configuration
1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Add app" → Web app (</>) icon
4. Register app with name: `wedding-website`
5. Copy the Firebase config object

### 4. Update Firebase Config
Replace the placeholder values in `src/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-actual-sender-id",
  appId: "your-actual-app-id"
};
```

### 5. Set up Firestore Security Rules
In Firebase Console → Firestore → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read/write RSVPs (you can restrict this later)
    match /rsvps/{document} {
      allow read, write: if true;
    }
  }
}
```

## Step 3: Environment Variables (Optional)

For better security, you can use environment variables:

1. **Create `.env.local`:**
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

2. **Update `src/firebase.ts`:**
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## Step 4: Test Your Deployment

1. **Test the website:** Visit your Vercel URL
2. **Test RSVP:** Use a guest code (e.g., `MZCWJ9`) to submit an RSVP
3. **Check Firebase:** Go to Firestore Database to see if RSVP data is saved
4. **Test language switching:** Verify both languages work

## Step 5: Domain Setup (Optional)

1. **Add custom domain in Vercel:**
   - Go to your project settings
   - Add your domain (e.g., `stefan-gloria-wedding.com`)
   - Follow DNS instructions

## 📊 Viewing RSVP Data

### In Firebase Console:
1. Go to Firestore Database
2. Click on "rsvps" collection
3. View all submitted RSVPs with guest codes as document IDs

### Export Data:
1. In Firestore, you can export data as JSON
2. Or use Firebase Admin SDK to build a dashboard

## 🔒 Security Considerations

1. **Update Firestore Rules:** Restrict access after testing
2. **Rate Limiting:** Consider adding rate limiting for RSVP submissions
3. **Data Validation:** Add server-side validation if needed

## 🎉 You're Done!

Your wedding website is now live with:
- ✅ Vercel hosting
- ✅ Firebase RSVP storage
- ✅ Responsive design
- ✅ Multi-language support
- ✅ Guest management system

**Next Steps:**
- Share your website URL with guests
- Monitor RSVP submissions in Firebase
- Consider adding email notifications for new RSVPs
