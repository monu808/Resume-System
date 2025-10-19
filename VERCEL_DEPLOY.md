# Vercel Deployment Guide

## Quick Deploy Steps:

### 1. Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### 2. Deploy via Vercel Dashboard (Recommended)

1. **Go to** [vercel.com](https://vercel.com)
2. **Sign in** with GitHub
3. **Click** "Add New Project"
4. **Import** your `Resume-System` repository
5. **Configure Project**:
   - Framework Preset: **Other**
   - Root Directory: **./** (leave as root)
   - Build Command: Leave empty (vercel.json handles it)
   - Output Directory: Leave empty
   - Install Command: `npm install`

6. **Add Environment Variables** (click "Environment Variables"):
   ```
   MONGODB_URI = mongodb+srv://your-connection-string
   JWT_SECRET = your-secret-key-here
   NODE_ENV = production
   PORT = 5000
   ```

7. **Click** "Deploy"
8. **Wait** 2-3 minutes ⏳
9. **Done!** 🎉

### 3. Your URLs:
- **Frontend**: `https://your-project.vercel.app`
- **Backend API**: `https://your-project.vercel.app/api/*`

---

## Deploy via CLI (Alternative)

```bash
# From project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? resume-system
# - In which directory is your code? ./
# - Want to override settings? No

# Add environment variables
vercel env add MONGODB_URI
vercel env add JWT_SECRET
vercel env add NODE_ENV
vercel env add PORT

# Deploy to production
vercel --prod
```

---

## Update Frontend API URL

After deployment, your frontend will automatically use the same domain for API calls because both are on the same Vercel deployment!

No need to change `api.js` - it will work automatically! ✨

---

## Troubleshooting

If deployment fails:
1. Check Vercel logs in dashboard
2. Ensure all environment variables are set
3. Make sure MongoDB allows connections from anywhere (0.0.0.0/0)
4. Check that `vercel.json` is in root directory

---

## Testing

After deployment:
1. Visit `https://your-project.vercel.app`
2. Register a new account
3. Create a resume
4. Check if data is saved in MongoDB

---

## Redeploy

Any push to `main` branch will automatically redeploy! 🚀
