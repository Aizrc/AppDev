import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * submitSurvey(payload)
 * - Expects payload: { survey_id, user_id, meta: {...}, answers: [{ question_id, answer_text }] }
 * - Writes to Firestore 'submissions' collection
 */
async function submitSurvey(payload) {
  if (!db) {
    throw new Error('Firestore not initialized. Check VITE_FIREBASE_* env variables and src/config/firebase.js');
  }

  const doc = {
    survey_id: payload?.survey_id ?? null,
    user_id: payload?.user_id ?? null,
    meta: payload?.meta ?? {},
    answers: Array.isArray(payload?.answers) ? payload.answers : [],
    created_at: serverTimestamp(),
  };

  const col = collection(db, 'submissions');
  const ref = await addDoc(col, doc);
  return { id: ref.id };
}

export default { submitSurvey };