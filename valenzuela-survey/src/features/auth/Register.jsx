import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { auth, db, storage } from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const useFirebase = import.meta.env.VITE_USE_FIREBASE === 'true';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState(null);

  const handleChange = (k, v) => {
    setForm(prev => ({ ...prev, [k]: v }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
    setGlobalError(null);
  };

  const validate = () => {
    const e = {};
    if (!form.fullName || form.fullName.trim().length < 2) e.fullName = 'Please enter your full name.';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters.';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const uploadProfilePicture = async (uid) => {
    if (!file || !storage) return null;
    const ext = file.name.split('.').pop();
    const path = `users/${uid}/profile.${ext}`;
    const r = storageRef(storage, path);
    await uploadBytes(r, file);
    return getDownloadURL(r);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError(null);
    if (!validate()) return;
    if (!useFirebase) {
      setGlobalError('Firebase not enabled. Set VITE_USE_FIREBASE=true and Firebase env vars.');
      return;
    }
    if (!auth || !db) {
      setGlobalError('Firebase not initialized. Check env and restart dev server.');
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = cred.user;

      // optional profile upload
      let photoURL = null;
      if (file) {
        try {
          photoURL = await uploadProfilePicture(user.uid);
        } catch (err) {
          console.warn('Profile upload failed, continuing without photo', err);
        }
      }

      // update displayName / photoURL
      await updateProfile(user, { displayName: form.fullName, photoURL: photoURL || null });

      // create user document in Firestore
      const userDoc = {
        user_id: user.uid,
        fullName: form.fullName,
        email: form.email,
        profile_picture: photoURL || null,
        created_at: serverTimestamp(),
      };
      await setDoc(doc(db, 'users', user.uid), userDoc);

      // success
      setLoading(false);
      navigate('/'); // redirect to homepage or dashboard
    } catch (err) {
      setLoading(false);
      // mapping common firebase errors
      const code = err?.code || '';
      if (code.includes('auth/email-already-in-use')) {
        setGlobalError('Email already in use.');
      } else if (code.includes('auth/invalid-email')) {
        setGlobalError('Invalid email.');
      } else if (code.includes('auth/weak-password')) {
        setGlobalError('Weak password.');
      } else {
        setGlobalError(err?.message || 'Registration failed.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="w-full max-w-xl">
        <Card padding="p-6">
          <h2 className="text-2xl font-bold mb-4">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              required
              error={errors.fullName}
            />

            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              required
              error={errors.email}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                required
                error={errors.password}
              />
              <Input
                label="Confirm Password"
                type="password"
                value={form.confirm}
                onChange={(e) => handleChange('confirm', e.target.value)}
                required
                error={errors.confirm}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture (optional)</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>

            {globalError && <p className="text-sm text-red-600">{globalError}</p>}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" type="button" onClick={() => navigate(-1)} disabled={loading}>Cancel</Button>
              <Button type="submit" variant="primary" isLoading={loading}>Create account</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;