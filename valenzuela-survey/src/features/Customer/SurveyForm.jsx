import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ClipboardList, Star, ThumbsUp, MessageSquare, Send, CheckCircle2, User } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import surveyService from '../../services/surveyService';
import submissionService from '../../services/submissionService';
import authService from '../../services/authService';

const SurveyForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const surveyId = location.state?.surveyId || 1; // default survey id
  const [survey, setSurvey] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // { question_id: answer }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [basicInfo, setBasicInfo] = useState({
    fullName: '',
    email: '',
    birthday: '',
  });

  useEffect(() => {
    const loadSurvey = async () => {
      try {
        // try several ways to get survey and its questions (robust fallback)
        let s = null;
        let qs = null;

        if (typeof surveyService.getSurveyById === 'function') {
          try { s = await surveyService.getSurveyById(surveyId); } catch (err) {
            console.warn('getSurveyById failed:', err);
          }
        }

        // preferred method: getSurveyQuestions
        if (typeof surveyService.getSurveyQuestions === 'function') {
          try { qs = await surveyService.getSurveyQuestions(surveyId); } catch (err) {
            console.warn('getSurveyQuestions failed:', err);
          }
        }

        // alternate method name some projects use
        if (!qs && typeof surveyService.getQuestionsBySurveyId === 'function') {
          try { qs = await surveyService.getQuestionsBySurveyId(surveyId); } catch (err) {
            console.warn('getQuestionsBySurveyId failed:', err);
          }
        }

        // fallback: if getSurveyById returned survey with embedded questions
        if (!qs && s && Array.isArray(s.questions)) {
          qs = s.questions;
        }

        // final fallback: attempt api endpoint if api helper exists
        if (!qs) {
          try {
            // dynamic import to avoid hard dependency if api not present
            const apiModule = await import('../../services/api');
            if (apiModule?.default && typeof apiModule.default.get === 'function') {
              const res = await apiModule.default.get(`/surveys/${surveyId}/questions`);
              // accept res.data or res depending on implementation
              qs = res?.data ?? res;
            }
          } catch (err) {
            console.warn('Fallback API fetch for questions failed:', err);
          }
        }

        setSurvey(s);
        setQuestions(qs || []);
        // initialize answers
        const initial = {};
        (qs || []).forEach(q => { initial[q.question_id] = ''; });
        setAnswers(initial);
      } catch (err) {
        console.error('Failed to load survey:', err);
      }
    };
    loadSurvey();
  }, [surveyId]);

  const handleChangeAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setErrors(prev => ({ ...prev, [questionId]: undefined }));
  };

  const handleBasicChange = (key, value) => {
    setBasicInfo(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const newErrors = {};

    // basic validations
    if (!basicInfo.fullName || basicInfo.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name is required';
    }
    if (!basicInfo.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(basicInfo.email)) {
      newErrors.email = 'Valid email is required';
    }

    // question-level validations based on schema field is_required
    questions.forEach(q => {
      if (q.is_required && (!answers[q.question_id] || String(answers[q.question_id]).trim() === '')) {
        newErrors[q.question_id] = 'This question is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildSubmissionPayload = () => {
    const currentUser = authService.getCurrentUser ? authService.getCurrentUser() : null;
    const answerList = questions.map(q => ({
      question_id: q.question_id,
      answer_text: answers[q.question_id] ? String(answers[q.question_id]) : '',
    }));

    return {
      survey_id: survey?.survey_id || surveyId,
      user_id: currentUser?.user_id || null,
      meta: {
        fullName: basicInfo.fullName,
        email: basicInfo.email,
        birthday: basicInfo.birthday,
      },
      answers: answerList,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const payload = buildSubmissionPayload();
      await submissionService.submitSurvey(payload);
      setIsSubmitting(false);
      alert('Survey submitted successfully! Thank you.');
      navigate('/');
    } catch (err) {
      console.error('Submit error:', err);
      setIsSubmitting(false);
      alert('Failed to submit survey. Please try again.');
    }
  };

  const renderQuestion = (q) => {
    const qKey = q.question_id;
    const value = answers[qKey] ?? '';

    switch (q.question_type) {
      case 'textarea':
        return (
          <div key={qKey}>
            <Input.TextArea
              label={q.question_text}
              rows={4}
              value={value}
              onChange={(e) => handleChangeAnswer(qKey, e.target.value)}
              required={q.is_required === 1}
              className={errors[qKey] ? 'border-red-500' : ''}
            />
            {errors[qKey] && <p className="text-sm text-red-600 mt-1">{errors[qKey]}</p>}
          </div>
        );
      case 'date':
        return (
          <div key={qKey}>
            <Input
              label={q.question_text}
              type="date"
              value={value}
              onChange={(e) => handleChangeAnswer(qKey, e.target.value)}
              required={q.is_required === 1}
            />
            {errors[qKey] && <p className="text-sm text-red-600 mt-1">{errors[qKey]}</p>}
          </div>
        );
      case 'email':
        return (
          <div key={qKey}>
            <Input
              label={q.question_text}
              type="email"
              value={value}
              onChange={(e) => handleChangeAnswer(qKey, e.target.value)}
              required={q.is_required === 1}
            />
            {errors[qKey] && <p className="text-sm text-red-600 mt-1">{errors[qKey]}</p>}
          </div>
        );
      case 'rating':
        // simple numeric rating 1-5
        return (
          <div key={qKey}>
            <label className="block text-sm font-medium text-gray-700 mb-2">{q.question_text}</label>
            <div className="flex items-center space-x-2">
              {[1,2,3,4,5].map(r => (
                <button
                  key={r}
                  type="button"
                  className={`px-3 py-2 rounded-full text-xs ${value == r ? 'bg-accent text-white' : 'bg-gray-100'}`}
                  onClick={() => handleChangeAnswer(qKey, r)}
                >
                  {r}
                </button>
              ))}
            </div>
            {errors[qKey] && <p className="text-sm text-red-600 mt-1">{errors[qKey]}</p>}
          </div>
        );
      default:
        // default to text input
        return (
          <div key={qKey}>
            <Input
              label={q.question_text}
              type="text"
              value={value}
              onChange={(e) => handleChangeAnswer(qKey, e.target.value)}
              required={q.is_required === 1}
            />
            {errors[qKey] && <p className="text-sm text-red-600 mt-1">{errors[qKey]}</p>}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">{survey?.title || 'Customer Satisfaction Survey'}</h1>
          <p className="text-gray-600">{survey?.description || 'Help us improve our services through your feedback.'}</p>
        </div>

        <Card padding="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Full Name"
                type="text"
                value={basicInfo.fullName}
                onChange={(e) => handleBasicChange('fullName', e.target.value)}
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={basicInfo.email}
                onChange={(e) => handleBasicChange('email', e.target.value)}
                required
              />
              <Input
                label="Birthday"
                type="date"
                value={basicInfo.birthday}
                onChange={(e) => handleBasicChange('birthday', e.target.value)}
                required
              />
            </div>

            <div className="space-y-6">
              {questions.length === 0 ? (
                <p className="text-sm text-gray-500">Loading questions...</p>
              ) : (
                questions.map(renderQuestion)
              )}
            </div>

            <div className="flex justify-between pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isSubmitting}
              >
                Back
              </Button>

              <Button
                type="submit"
                variant="primary"
                icon={Send}
                iconPosition="right"
                isLoading={isSubmitting}
              >
                Submit Survey
              </Button>
            </div>
          </form>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-500">
          Need assistance? Contact us at <span className="text-accent font-medium">icto@valenzuela.gov.ph</span>
        </div>
      </div>
    </div>
  );
};

export default SurveyForm;
