# Formspree Setup Guide for Contact Form

This portfolio uses **Formspree API** to send emails directly from GitHub Pages. Follow these steps to enable the contact form.

## Step 1: Create a Formspree Account

1. Go to **https://formspree.io**
2. Click **"Sign Up"**
3. Enter your email and create a password
4. Verify your email address

## Step 2: Create a New Form

1. Log in to Formspree
2. Click **"Create"** or **"+ New Form"**
3. Give it a name (e.g., "Portfolio Contact Form")
4. Select your email address (where you want to receive messages)
5. Click **"Create"**

## Step 3: Copy Your Form ID

1. After creating the form, you'll see a **Form ID** (looks like: `xyzabc123xyz`)
2. Copy this ID

## Step 4: Update the Script File

1. Open `script.js` in your portfolio project
2. Find this line (around line 225):
   ```javascript
   const formId = 'xyzabc'; // THIS NEEDS TO BE REPLACED BY USER
   ```
3. Replace `'xyzabc'` with your actual Form ID from Formspree
4. Example:
   ```javascript
   const formId = 'mpppknep'; // Your actual form ID
   ```
5. Save the file

## Step 5: Test the Contact Form

1. Open your portfolio website
2. Go to the **Contact Section**
3. Fill out the form with test data
4. Click **"Send Message"**
5. You should receive the email at your configured address

## Step 6: Deploy to GitHub Pages

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Configure Formspree for contact form"
   git push origin main
   ```
2. Your portfolio is now live with working email functionality!

## Features Enabled

✅ **Real Email Delivery** - Messages sent directly to your inbox  
✅ **No Backend Required** - Works on GitHub Pages  
✅ **Form Validation** - Required fields are validated  
✅ **Loading Feedback** - Users see a "Sending..." state  
✅ **Success Messages** - Confirmation message displays after sending  
✅ **Error Handling** - Display error message if submission fails  
✅ **Professional UI** - Beautiful success/error notifications  

## Troubleshooting

### Form not sending messages?
- ✓ Verify the Form ID is correct in `script.js`
- ✓ Check that Formspree account is verified (check email)
- ✓ Try the form on mobile and desktop

### Still not receiving emails?
- Go back to Formspree dashboard
- Check the "Submissions" tab to see if messages are arriving there
- Verify the email address on your Formspree account is correct

### Want to customize further?

**Change recipient email:**
- Go to Formspree dashboard
- Select your form
- Click "Settings"
- Update the email address

**Add more fields:**
- Add new input fields to the HTML form
- Use `name="fieldName"` attribute
- Fields will automatically be included in emails

## Security Notes

- Formspree handles SPAM protection automatically
- Your email is never exposed to the client
- All submissions are encrypted
- You can enable CAPTCHA protection in Formspree settings if needed

## Contact Form Structure

The contact form fields are:
- **name** - Your name
- **email** - Your email address  
- **message** - Your message

You can modify the HTML form in `index.html` under the "Contact Section" (around line 370) to add/remove fields as needed.

---

**For more help:** Visit https://formspree.io/help
