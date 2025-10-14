import { database } from './config';
import { ref, set, push, get, update, remove } from 'firebase/database';

// ============= QUIZ FUNCTIONS =============

export const createQuiz = async (quizData) => {
  try {
    const quizzesRef = ref(database, 'quizzes');
    const newQuizRef = push(quizzesRef);
    await set(newQuizRef, {
      ...quizData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    return { id: newQuizRef.key, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

export const getQuizzesByClass = async (classId) => {
  try {
    const quizzesRef = ref(database, `quizzes`);
    const snapshot = await get(quizzesRef);
    if (snapshot.exists()) {
      const allQuizzes = snapshot.val();
      const classQuizzes = Object.entries(allQuizzes)
        .filter(([id, quiz]) => quiz.classId === classId)
        .map(([id, quiz]) => ({ id, ...quiz }));
      return { quizzes: classQuizzes, error: null };
    }
    return { quizzes: [], error: null };
  } catch (error) {
    return { quizzes: [], error: error.message };
  }
};

export const getQuizById = async (quizId) => {
  try {
    const quizRef = ref(database, `quizzes/${quizId}`);
    const snapshot = await get(quizRef);
    if (snapshot.exists()) {
      return { quiz: { id: quizId, ...snapshot.val() }, error: null };
    }
    return { quiz: null, error: 'Quiz not found' };
  } catch (error) {
    return { quiz: null, error: error.message };
  }
};

// ============= QUESTION FUNCTIONS =============

export const addQuestionToQuiz = async (quizId, questionData) => {
  try {
    const questionsRef = ref(database, `quizzes/${quizId}/questions`);
    const newQuestionRef = push(questionsRef);
    await set(newQuestionRef, questionData);
    return { id: newQuestionRef.key, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

// ============= STUDENT ATTEMPT FUNCTIONS =============

export const saveQuizAttempt = async (attemptData) => {
  try {
    const attemptsRef = ref(database, 'attempts');
    const newAttemptRef = push(attemptsRef);
    await set(newAttemptRef, {
      ...attemptData,
      submittedAt: Date.now()
    });
    return { id: newAttemptRef.key, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

export const getStudentAttempts = async (studentId) => {
  try {
    const attemptsRef = ref(database, 'attempts');
    const snapshot = await get(attemptsRef);
    if (snapshot.exists()) {
      const allAttempts = snapshot.val();
      const studentAttempts = Object.entries(allAttempts)
        .filter(([id, attempt]) => attempt.studentId === studentId)
        .map(([id, attempt]) => ({ id, ...attempt }));
      return { attempts: studentAttempts, error: null };
    }
    return { attempts: [], error: null };
  } catch (error) {
    return { attempts: [], error: error.message };
  }
};

// ============= FLAGGED QUESTIONS FUNCTIONS =============

export const flagQuestionForTeacher = async (flagData) => {
  try {
    const flagsRef = ref(database, 'flaggedQuestions');
    const newFlagRef = push(flagsRef);
    await set(newFlagRef, {
      ...flagData,
      flaggedAt: Date.now(),
      resolved: false
    });
    return { id: newFlagRef.key, error: null };
  } catch (error) {
    return { id: null, error: error.message };
  }
};

export const getFlaggedQuestionsByClass = async (classId) => {
  try {
    const flagsRef = ref(database, 'flaggedQuestions');
    const snapshot = await get(flagsRef);
    if (snapshot.exists()) {
      const allFlags = snapshot.val();
      const classFlags = Object.entries(allFlags)
        .filter(([id, flag]) => flag.classId === classId && !flag.resolved)
        .map(([id, flag]) => ({ id, ...flag }));
      return { flags: classFlags, error: null };
    }
    return { flags: [], error: null };
  } catch (error) {
    return { flags: [], error: error.message };
  }
};

// ============= USER FUNCTIONS =============

export const createUserProfile = async (uid, userData) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    await set(userRef, {
      ...userData,
      createdAt: Date.now()
    });
    return { error: null };
  } catch (error) {
    return { error: error.message };
  }
};

export const getUserProfile = async (uid) => {
  try {
    const userRef = ref(database, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return { user: snapshot.val(), error: null };
    }
    return { user: null, error: 'User not found' };
  } catch (error) {
    return { user: null, error: error.message };
  }
};