# 🔧 Firebase Authentication Setup: Quick Start

## ⚡ 5-Minute Setup

### What's the Problem?

Firebase Authentication is **not enabled** in project `lagos-rhythm-19b8a`. The admin claims script can't run until it is.

### ✅ Solution (3 steps, ~5 minutes)

#### **STEP 1: Enable Firebase Auth** (1 minute)

```
1. Go to: https://console.firebase.google.com
2. Click: lagos-rhythm-19b8a project
3. Left menu: Build → Authentication
4. Click: Get Started
5. Select: Email/Password
6. Enable checkbox: ☑️ Email/Password
7. Click: Save
⏱️ Wait 2-3 minutes
```

#### **STEP 2: Create 3 Admin Users** (2-3 minutes)

In Firebase Console, go to **Authentication → Users** tab:

**User 1:**

- Email: `chiscookeke11@gmail.com`
- Password: `TempPass123!` (temporary)
- Click: **Create user**

**User 2:**

- Email: `damola-o@lagosrhythm.com`
- Password: `TempPass123!` (temporary)
- Click: **Create user**

**User 3:**

- Email: `benedictisaac258@gmail.com`
- Password: `TempPass123!` (temporary)
- Click: **Create user**

#### **STEP 3: Assign Admin Claims** (1 minute)

Back in VS Code terminal:

```bash
npm run firebase:set-admin-claims -- chiscookeke11@gmail.com damola-o@lagosrhythm.com benedictisaac258@gmail.com
```

Expected output:

```
Updated admin claim for chiscookeke11@gmail.com (uid: xxxx)
Updated admin claim for damola-o@lagosrhythm.com (uid: xxxx)
Updated admin claim for benedictisaac258@gmail.com (uid: xxxx)
✅ Done. Updated: 3, Missing: 0
```

### 🎯 Verify It Worked

**In Firebase Console:**

1. Go to **Authentication → Users**
2. Click any admin email
3. Scroll to **Custom claims**
4. See: `{"admin": true}` ✅

**In App:**

1. Admin user logs in via Clerk
2. Navigate to `/dashboard`
3. Should see route management UI ✅

---

## 🚨 Common Issues

| Issue                                | Solution                                                           |
| ------------------------------------ | ------------------------------------------------------------------ |
| Script still says "no configuration" | Firebase Auth API needs 2-3 minutes to enable; wait and retry      |
| Users not found                      | Make sure users are created in Firebase Console, not just in Clerk |
| Custom claims not appearing          | Refresh browser, or log out and back in                            |
| Dashboard still shows "unauthorized" | User doesn't have `admin: true` claim—verify in Firebase Console   |

---

## 📋 What This Enables

✅ Admin dashboard access (`/dashboard`)  
✅ Route management (create/edit/delete)  
✅ Feedback collection reading  
✅ Firestore admin-gated operations

All other features (public routes, booking forms, chat) **already work** and don't require this.

---

## 🔗 Links

- [Firebase Console](https://console.firebase.google.com)
- [Authentication Docs](https://firebase.google.com/docs/auth/web/start)
- [Custom Claims](https://firebase.google.com/docs/auth/admin/custom-claims)
