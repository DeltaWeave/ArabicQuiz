import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Utility function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// THEORY QUESTIONS
const theoryQuestions = [
  {
    type: 'multiple',
    question: 'How many types of words are there in Arabic?',
    options: ['2', '3', '4', '5'],
    correct: 1,
    explanation: 'Arabic has 3 types of words: Noun (اسم), Verb (فعل), and Particle (حرف)',
  },
  {
    type: 'trueFalse',
    question: 'A noun in Arabic can take both tanween (ٌٍَ) and alif laam (ال) at the same time.',
    correct: false,
    explanation: 'If a word has alif laam (ال), it cannot also have tanween',
  },
  {
    type: 'multiple',
    question: 'What are the two markers that identify a noun in Arabic?',
    options: [
      'Takes tanween and takes alif laam',
      'Has a verb and has a subject',
      'Uses fatha and kasra',
      'Has masculine and feminine forms',
    ],
    correct: 0,
    explanation: 'Nouns have two key markers: 1) Takes tanween (ٌٍَ), 2) Takes alif laam (ال)',
  },
  {
    type: 'trueFalse',
    question: 'In a Subject-Predicate sentence, the subject (Mubtada) must be definite and the predicate (Khabr) must be indefinite.',
    correct: true,
    explanation: 'Correct! The subject must be definite (for now) and the predicate must be indefinite',
  },
  {
    type: 'multiple',
    question: 'What case do both the subject and predicate take in a nominal sentence?',
    options: ["Mansoob (fatha)", "Raf' (dhamma)", "Jarr (kasra)", "No case"],
    correct: 1,
    explanation: "Both the subject (Mubtada) and predicate (Khabr) must have Dhamma, which is the Raf' case",
  },
  {
    type: 'multiple',
    question: 'Proper nouns like زَيْدٌ (Zayd) are:',
    options: ['Always indefinite', 'Intrinsically definite', 'Need alif laam', 'Not allowed in Arabic'],
    correct: 1,
    explanation: "Proper nouns are intrinsically definite - they don't need ال and cannot take ال",
  },
  {
    type: 'trueFalse',
    question: 'In Arabic, there are neutral words that have no gender.',
    correct: false,
    explanation: 'All words must be designated a gender in Arabic - there are no neutral words',
  },
  {
    type: 'multiple',
    question: 'How do you make a descriptive masculine noun feminine?',
    options: ['Add alif laam (ال)', 'Add tanween', 'Add taa marbuta (ة)', 'Remove the last letter'],
    correct: 2,
    explanation: 'Add ة (taa marbuta) after the word. Example: كَبِيرٌ → كَبِيرَةٌ',
  },
  {
    type: 'trueFalse',
    question: 'The predicate must match the gender of the subject.',
    correct: true,
    explanation: 'Correct! If the subject is feminine, the predicate must also be feminine',
  },
  {
    type: 'multiple',
    question: 'How many forms of plurality does Arabic have?',
    options: [
      '2 (singular and plural)',
      '3 (singular, dual, and plural)',
      '4 (singular, dual, plural, and collective)',
      '5',
    ],
    correct: 1,
    explanation: 'Arabic has 3 forms: Singular, Dual (for 2), and Plural (for 3+)',
  },
  {
    type: 'multiple',
    question: 'What do you add to a singular word to make it dual?',
    options: ['ُونَ', 'انِ', 'اتٌ', 'ال'],
    correct: 1,
    explanation: 'Add انِ (aani) to make a word dual. Example: رَجُلٌ → رَجُلَانِ',
  },
  {
    type: 'trueFalse',
    question: 'When adding the dual ending انِ, the tanween disappears.',
    correct: true,
    explanation: 'Correct! Tanween disappears when you add the dual ending',
  },
  {
    type: 'multiple',
    question: 'What do you add to make a masculine noun plural?',
    options: ['اتٌ', 'ُونَ', 'انِ', 'ة'],
    correct: 1,
    explanation: 'Add ُونَ (oona) to masculine singular: طَالِبٌ → طَالِبُونَ',
  },
  {
    type: 'multiple',
    question: 'How do you make a feminine noun plural?',
    options: ['Add ة', 'Add ُونَ', 'Swap ة for اتٌ', 'Add ال'],
    correct: 2,
    explanation: 'Swap ة for اتٌ (aatun): طالِبَةٌ → طالِبَاتٌ',
  },
  {
    type: 'multiple',
    question: 'What type of plural is رَجُلٌ → رِجَالٌ?',
    options: ['Sound plural', 'Broken/Irregular plural', 'Dual form', 'Feminine plural'],
    correct: 1,
    explanation: 'This is a broken (irregular) plural - the internal structure changes rather than adding an ending',
  },
  {
    type: 'multiple',
    question: 'Where does the adjective come in relation to the noun in Arabic?',
    options: ['Before the noun', 'After the noun', 'Can be either', 'No adjectives in Arabic'],
    correct: 1,
    explanation: 'In Arabic, the adjective comes AFTER the noun. الرَّجُلُ الصَّالِحُ = The pious man',
  },
  {
    type: 'trueFalse',
    question: 'Adjectives must match their noun in case, gender, plurality, AND definiteness.',
    correct: true,
    explanation: 'Correct! Adjectives match in all four aspects: case, gender, plurality, and definiteness',
  },
  {
    type: 'multiple',
    question: 'What is the Arabic term for the "described noun"?',
    options: ['صِفَةٌ (Sifa)', 'مَوْصُوفٌ (Mawsoof)', 'مُبْتَدَا (Mubtada)', 'خَبَرٌ (Khabr)'],
    correct: 1,
    explanation: 'مَوْصُوفٌ (Mawsoof) = the described noun, صِفَةٌ (Sifa) = the adjective',
  },
  {
    type: 'multiple',
    question: 'How many root letters do Arabic words typically have?',
    options: ['2', '3 or 4', '5', 'Always 3'],
    correct: 1,
    explanation: 'Words typically have 3 or 4 root letters (we focus on 3-letter roots initially)',
  },
  {
    type: 'multiple',
    question: 'In a verbal sentence, what is the word order in Arabic?',
    options: [
      'Subject - Verb - Object',
      'Verb - Subject - Object',
      'Object - Verb - Subject',
      'Verb - Object - Subject',
    ],
    correct: 1,
    explanation: 'Arabic: Verb - Subject - Object (ضَرَبَ زَيْدٌ رَجُلاً)',
  },
  {
    type: 'multiple',
    question: 'What case does the object (مَفْعُولُ بِهِ) take?',
    options: ["Raf' (Marfoo')", 'Nasb (Mansoob)', 'Jarr (Majroor)', 'No case'],
    correct: 1,
    explanation: 'The object takes Mansoob (Nasb) case with fatha',
  },
  {
    type: 'trueFalse',
    question: 'To make a noun Mansoob in the singular, you swap the dhamma for a fatha.',
    correct: true,
    explanation: 'Correct! طَالِبٌ (Marfoo\') → طَالِباً (Mansoob)',
  },
  {
    type: 'multiple',
    question: 'How many main cases are there in Arabic?',
    options: ['2', '3', '4', '5'],
    correct: 1,
    explanation: "There are 3 main cases: Marfoo' (Raf'), Mansoob (Nasb), and Majroor (Jarr)",
  },
  {
    type: 'multiple',
    question: 'Which case comes after a preposition?',
    options: ["Marfoo'", 'Mansoob', 'Majroor', 'All of them'],
    correct: 2,
    explanation: 'Prepositions (حَرْفُ الجَرِّ) make the next word Majroor (with kasra)',
  },
  {
    type: 'matching',
    question: 'Match the case with its vowel marker (singular):',
    pairs: [
      { left: "Marfoo' (Raf')", right: 'Dhamma ٌ' },
      { left: 'Mansoob (Nasb)', right: 'Fatha ً' },
      { left: 'Majroor (Jarr)', right: 'Kasra ٍ' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does the preposition فِي mean?',
    options: ['on', 'in', 'from', 'to'],
    correct: 1,
    explanation: 'فِي means "in" - Example: فِي البَيْتِ = in the house',
  },
  {
    type: 'matching',
    question: 'Match the Arabic prepositions:',
    pairs: [
      { left: 'فِي', right: 'in' },
      { left: 'عَلَىٰ', right: 'on' },
      { left: 'مِنْ', right: 'from' },
    ],
  },
  {
    type: 'trueFalse',
    question: 'All non-human plurals are treated grammatically as feminine singular.',
    correct: true,
    explanation: 'Correct! Even if masculine in singular, non-human plurals are treated as feminine singular',
  },
  {
    type: 'multiple',
    question: 'In an idaafa (possession) construction, what happens to the first word?',
    options: ['Gets alif laam', 'Loses its alif laam', 'Gets tanween', 'Becomes plural'],
    correct: 1,
    explanation: 'The first word (mudaaf) loses its ال if it has one',
  },
  {
    type: 'multiple',
    question: 'What case does the second word in an idaafa take?',
    options: ["Marfoo'", 'Mansoob', 'Majroor', 'No case'],
    correct: 2,
    explanation: 'The second word (mudaaf ilayhi) is always Majroor (with kasra)',
  },
];

// VOCABULARY QUESTIONS
const vocabQuestions = [
  {
    type: 'multiple',
    question: 'What does وَلَدٌ mean?',
    options: ['girl', 'boy', 'man', 'house'],
    correct: 1,
    explanation: 'وَلَدٌ means "boy"',
  },
  {
    type: 'multiple',
    question: 'What does كَبِيرٌ mean?',
    options: ['small', 'new', 'big', 'old'],
    correct: 2,
    explanation: 'كَبِيرٌ means "big" (masculine form)',
  },
  {
    type: 'matching',
    question: 'Match the Arabic words with their English meanings:',
    pairs: [
      { left: 'بِنْتٌ', right: 'girl' },
      { left: 'رَجُلٌ', right: 'man' },
      { left: 'بَيْتٌ', right: 'house' },
      { left: 'جَمِيلٌ', right: 'beautiful' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does صَغِيرٌ mean?',
    options: ['big', 'beautiful', 'small', 'new'],
    correct: 2,
    explanation: 'صَغِيرٌ means "small"',
  },
  {
    type: 'multiple',
    question: 'What does قَدِيمٌ mean?',
    options: ['new', 'old', 'beautiful', 'big'],
    correct: 1,
    explanation: 'قَدِيمٌ means "old"',
  },
  {
    type: 'matching',
    question: 'Match the Arabic words:',
    pairs: [
      { left: 'كِتَابٌ', right: 'book' },
      { left: 'قَلَمٌ', right: 'pen' },
      { left: 'مُعَلِّمٌ', right: 'teacher' },
      { left: 'طَالِبٌ', right: 'student' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does صَالِحٌ mean?',
    options: ['oppressor', 'truthful', 'pious/righteous', 'patient'],
    correct: 2,
    explanation: 'صَالِحٌ means "pious/righteous"',
  },
  {
    type: 'multiple',
    question: 'What does بَابٌ mean?',
    options: ['window', 'door', 'house', 'room'],
    correct: 1,
    explanation: 'بَابٌ means "door"',
  },
  {
    type: 'matching',
    question: 'Match the celestial words:',
    pairs: [
      { left: 'شَمْسٌ', right: 'sun' },
      { left: 'قَمَرٌ', right: 'moon' },
      { left: 'سَمَاءٌ', right: 'sky/heaven' },
      { left: 'أَرْضٌ', right: 'earth' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does مَسْجِدٌ mean?',
    options: ['house', 'school', 'mosque', 'market'],
    correct: 2,
    explanation: 'مَسْجِدٌ means "mosque"',
  },
  {
    type: 'multiple',
    question: 'What does طَوِيلٌ mean?',
    options: ['short', 'long/tall', 'near', 'far'],
    correct: 1,
    explanation: 'طَوِيلٌ means "long" or "tall"',
  },
  {
    type: 'matching',
    question: 'Match distance words:',
    pairs: [
      { left: 'قَرِيبٌ', right: 'near' },
      { left: 'بَعِيدٌ', right: 'far' },
      { left: 'قَصِيرٌ', right: 'short' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does كَتَبَ mean (past tense)?',
    options: ['he read', 'he wrote', 'he drank', 'he opened'],
    correct: 1,
    explanation: 'كَتَبَ means "he wrote"',
  },
  {
    type: 'multiple',
    question: 'What does قَرَأَ mean (past tense)?',
    options: ['he wrote', 'he drank', 'he read', 'he opened'],
    correct: 2,
    explanation: 'قَرَأَ means "he read"',
  },
  {
    type: 'matching',
    question: 'Match the past tense verbs:',
    pairs: [
      { left: 'شَرِبَ', right: 'he drank' },
      { left: 'فَتَحَ', right: 'he opened' },
      { left: 'حَمَلَ', right: 'he carried' },
      { left: 'ضَرَبَ', right: 'he hit' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does نَصَرَ mean (past tense)?',
    options: ['he helped', 'he sat', 'he entered', 'he went'],
    correct: 0,
    explanation: 'نَصَرَ means "he helped"',
  },
  {
    type: 'multiple',
    question: 'What does ذَهَبَ mean (past tense)?',
    options: ['he came', 'he returned', 'he went', 'he stayed'],
    correct: 2,
    explanation: 'ذَهَبَ means "he went"',
  },
  {
    type: 'matching',
    question: 'Match the verbs:',
    pairs: [
      { left: 'جَلَسَ', right: 'he sat' },
      { left: 'دَخَلَ', right: 'he entered' },
      { left: 'خَرَجَ', right: 'he exited' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does نُورٌ mean?',
    options: ['darkness', 'light', 'shadow', 'color'],
    correct: 1,
    explanation: 'نُورٌ means "light"',
  },
  {
    type: 'multiple',
    question: 'What does صَعْبٌ mean?',
    options: ['easy', 'difficult', 'simple', 'clear'],
    correct: 1,
    explanation: 'صَعْبٌ means "difficult"',
  },
  {
    type: 'matching',
    question: 'Match the adjectives:',
    pairs: [
      { left: 'سَهْلٌ', right: 'easy' },
      { left: 'بَارِدٌ', right: 'cool' },
      { left: 'مُجْتَهِدٌ', right: 'hardworking' },
      { left: 'ذَكِيٌّ', right: 'intelligent' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does جَائِعٌ mean?',
    options: ['thirsty', 'hungry', 'tired', 'happy'],
    correct: 1,
    explanation: 'جَائِعٌ means "hungry"',
  },
  {
    type: 'multiple',
    question: 'What does فَرِحٌ mean?',
    options: ['sad', 'angry', 'happy', 'afraid'],
    correct: 2,
    explanation: 'فَرِحٌ means "happy"',
  },
  {
    type: 'matching',
    question: 'Match the emotions:',
    pairs: [
      { left: 'حُزْنٌ', right: 'sadness' },
      { left: 'غَضَبٌ', right: 'anger' },
      { left: 'خَوْفٌ', right: 'fear' },
      { left: 'حُبٌّ', right: 'love' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does ذَهَبٌ mean?',
    options: ['silver', 'gold', 'bronze', 'iron'],
    correct: 1,
    explanation: 'ذَهَبٌ means "gold"',
  },
  {
    type: 'multiple',
    question: 'What does نَاسٌ mean?',
    options: ['person', 'people', 'family', 'friend'],
    correct: 1,
    explanation: 'نَاسٌ means "people"',
  },
];

export default function App() {
  const [quizMode, setQuizMode] = useState(null); // null, 'theory', 'vocab', 'both'
  const [questionCount, setQuestionCount] = useState(null); // null, 10, 20, 40, or 'all'
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [matchingAnswers, setMatchingAnswers] = useState({});
  const [matchingSelection, setMatchingSelection] = useState({ left: null, right: null });
  const [shuffledRightOptions, setShuffledRightOptions] = useState([]);

  // Shuffle right-side options when question changes
  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestion]?.type === 'matching') {
      const rightOptions = questions[currentQuestion].pairs.map(pair => pair.right);
      setShuffledRightOptions(shuffleArray(rightOptions));
    }
  }, [currentQuestion, questions]);

  // Initialize quiz based on mode and count
  const startQuiz = (mode, count) => {
    let questionPool = [];
    
    if (mode === 'theory') {
      questionPool = [...theoryQuestions];
    } else if (mode === 'vocab') {
      questionPool = [...vocabQuestions];
    } else if (mode === 'both') {
      questionPool = [...theoryQuestions, ...vocabQuestions];
    }
    
    // Shuffle questions
    questionPool = shuffleArray(questionPool);
    
    // Select number of questions
    if (count !== 'all') {
      questionPool = questionPool.slice(0, count);
    }
    
    setQuestions(questionPool);
    setQuizMode(mode);
    setQuestionCount(count);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
  };

  const handleAnswer = (answer) => {
    if (showFeedback) return;
    setSelectedAnswer(answer);
  };

  const handleMatchingClick = (item, side) => {
    if (showFeedback) return;
    
    if (matchingAnswers[item]) return;

    if (side === 'left') {
      if (matchingSelection.left === item) {
        setMatchingSelection({ left: null, right: matchingSelection.right });
      } else {
        const newSelection = { left: item, right: matchingSelection.right };
        setMatchingSelection(newSelection);
        
        if (newSelection.right) {
          setMatchingAnswers({
            ...matchingAnswers,
            [newSelection.left]: newSelection.right,
          });
          setMatchingSelection({ left: null, right: null });
        }
      }
    } else {
      if (matchingSelection.right === item) {
        setMatchingSelection({ left: matchingSelection.left, right: null });
      } else {
        const newSelection = { left: matchingSelection.left, right: item };
        setMatchingSelection(newSelection);
        
        if (newSelection.left) {
          setMatchingAnswers({
            ...matchingAnswers,
            [newSelection.left]: newSelection.right,
          });
          setMatchingSelection({ left: null, right: null });
        }
      }
    }
  };

  const checkAnswer = () => {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (question.type === 'matching') {
      isCorrect =
        Object.keys(matchingAnswers).length === question.pairs.length &&
        question.pairs.every((pair) => matchingAnswers[pair.left] === pair.right);
    } else {
      isCorrect = selectedAnswer === question.correct;
    }

    if (isCorrect) {
      setScore(score + 1);
    }

    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setMatchingAnswers({});
      setMatchingSelection({ left: null, right: null });
      setShuffledRightOptions([]);
    } else {
      setQuizComplete(true);
    }
  };

  const restartQuiz = () => {
    setQuizMode(null);
    setQuestionCount(null);
    setQuestions([]);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizComplete(false);
    setMatchingAnswers({});
    setMatchingSelection({ left: null, right: null });
    setShuffledRightOptions([]);
  };

  // Mode selection screen
  if (quizMode === null) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Arabic Quiz App</Text>
            <Text style={styles.headerSubtitle}>Select Quiz Mode</Text>
          </View>

          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => setQuizMode('theory')}>
            <Text style={styles.modeButtonText}>📚 Theory Quiz</Text>
            <Text style={styles.modeButtonSubtext}>
              Grammar rules, cases, and Arabic structure
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => setQuizMode('vocab')}>
            <Text style={styles.modeButtonText}>📖 Vocabulary Quiz</Text>
            <Text style={styles.modeButtonSubtext}>
              Words, meanings, and translations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => setQuizMode('both')}>
            <Text style={styles.modeButtonText}>🎯 Combined Quiz</Text>
            <Text style={styles.modeButtonSubtext}>
              Both theory and vocabulary together
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Question count selection screen
  if (questionCount === null) {
    const getQuestionPoolSize = () => {
      if (quizMode === 'theory') return theoryQuestions.length;
      if (quizMode === 'vocab') return vocabQuestions.length;
      return theoryQuestions.length + vocabQuestions.length;
    };

    const poolSize = getQuestionPoolSize();

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              {quizMode === 'theory' ? '📚 Theory Quiz' : 
               quizMode === 'vocab' ? '📖 Vocabulary Quiz' : 
               '🎯 Combined Quiz'}
            </Text>
            <Text style={styles.headerSubtitle}>Select Number of Questions</Text>
            <Text style={styles.headerSubtext}>
              (Available: {poolSize} questions)
            </Text>
          </View>

          <TouchableOpacity
            style={styles.countButton}
            onPress={() => startQuiz(quizMode, 10)}>
            <Text style={styles.countButtonText}>10 Questions</Text>
            <Text style={styles.countButtonSubtext}>Quick practice</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.countButton}
            onPress={() => startQuiz(quizMode, 20)}>
            <Text style={styles.countButtonText}>20 Questions</Text>
            <Text style={styles.countButtonSubtext}>Standard quiz</Text>
          </TouchableOpacity>

          {poolSize >= 40 && (
            <TouchableOpacity
              style={styles.countButton}
              onPress={() => startQuiz(quizMode, 40)}>
              <Text style={styles.countButtonText}>40 Questions</Text>
              <Text style={styles.countButtonSubtext}>Extended practice</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.countButton}
            onPress={() => startQuiz(quizMode, 'all')}>
            <Text style={styles.countButtonText}>All Questions ({poolSize})</Text>
            <Text style={styles.countButtonSubtext}>Complete quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setQuizMode(null)}>
            <Text style={styles.backButtonText}>← Back to Mode Selection</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Quiz complete screen
  if (quizComplete) {
    const percentage = ((score / questions.length) * 100).toFixed(1);
    let grade = '';
    if (percentage >= 90) grade = 'Excellent! 🌟';
    else if (percentage >= 80) grade = 'Great Job! 👏';
    else if (percentage >= 70) grade = 'Good Work! 👍';
    else if (percentage >= 60) grade = 'Keep Practicing! 📚';
    else grade = 'Need More Study 💪';

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Quiz Complete!</Text>
          <Text style={styles.resultScore}>
            Score: {score}/{questions.length}
          </Text>
          <Text style={styles.resultPercentage}>{percentage}%</Text>
          <Text style={styles.resultGrade}>{grade}</Text>
          <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>Start New Quiz</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Quiz screen
  const question = questions[currentQuestion];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {quizMode === 'theory' ? '📚 Theory Quiz' : 
             quizMode === 'vocab' ? '📖 Vocabulary Quiz' : 
             '🎯 Combined Quiz'}
          </Text>
          <Text style={styles.headerProgress}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <Text style={styles.headerScore}>Score: {score}</Text>
        </View>

        {/* Question */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* Answer Options */}
        {!showFeedback && (
          <View>
            {question.type === 'multiple' && (
              <View style={styles.optionsContainer}>
                {question.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswer === index && styles.optionSelected,
                    ]}
                    onPress={() => handleAnswer(index)}>
                    <Text
                      style={[
                        styles.optionText,
                        selectedAnswer === index && styles.optionTextSelected,
                      ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {question.type === 'trueFalse' && (
              <View style={styles.trueFalseContainer}>
                <TouchableOpacity
                  style={[
                    styles.trueFalseButton,
                    selectedAnswer === true && styles.optionSelected,
                  ]}
                  onPress={() => handleAnswer(true)}>
                  <Text style={styles.trueFalseText}>True ✓</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.trueFalseButton,
                    selectedAnswer === false && styles.optionSelected,
                  ]}
                  onPress={() => handleAnswer(false)}>
                  <Text style={styles.trueFalseText}>False ✗</Text>
                </TouchableOpacity>
              </View>
            )}

            {question.type === 'matching' && (
              <View style={styles.matchingContainer}>
                <Text style={styles.matchingHint}>
                  Tap items on the left, then tap their match on the right
                </Text>
                {question.pairs.map((pair, index) => (
                  <View key={index} style={styles.matchingRow}>
                    <TouchableOpacity
                      style={[
                        styles.matchingButton,
                        matchingSelection.left === pair.left && styles.matchingSelected,
                        matchingAnswers[pair.left] && styles.matchingMatched,
                      ]}
                      onPress={() => handleMatchingClick(pair.left, 'left')}>
                      <Text style={styles.matchingText}>{pair.left}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.matchingButton,
                        matchingSelection.right === shuffledRightOptions[index] && styles.matchingSelected,
                        Object.values(matchingAnswers).includes(shuffledRightOptions[index]) &&
                          styles.matchingMatched,
                      ]}
                      onPress={() => handleMatchingClick(shuffledRightOptions[index], 'right')}>
                      <Text style={styles.matchingText}>{shuffledRightOptions[index]}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Submit Button */}
            {((question.type !== 'matching' && selectedAnswer !== null) ||
              (question.type === 'matching' &&
                Object.keys(matchingAnswers).length === question.pairs.length)) && (
              <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
                <Text style={styles.submitButtonText}>Submit Answer</Text>
              </TouchableOpacity>
            )}
          </View>
        )}

        {/* Feedback */}
        {showFeedback && (
          <View style={styles.feedbackCard}>
            <Text
              style={[
                styles.feedbackTitle,
                (question.type === 'matching'
                  ? Object.keys(matchingAnswers).length === question.pairs.length &&
                    question.pairs.every((pair) => matchingAnswers[pair.left] === pair.right)
                  : selectedAnswer === question.correct)
                  ? styles.feedbackCorrect
                  : styles.feedbackIncorrect,
              ]}>
              {question.type === 'matching'
                ? Object.keys(matchingAnswers).length === question.pairs.length &&
                  question.pairs.every((pair) => matchingAnswers[pair.left] === pair.right)
                  ? '✓ Correct!'
                  : '✗ Incorrect'
                : selectedAnswer === question.correct
                ? '✓ Correct!'
                : '✗ Incorrect'}
            </Text>
            <Text style={styles.feedbackText}>
              {question.type === 'matching'
                ? Object.keys(matchingAnswers).length === question.pairs.length &&
                  question.pairs.every((pair) => matchingAnswers[pair.left] === pair.right)
                  ? 'Perfect! All matches are correct.'
                  : 'The correct pairs are:\n' +
                    question.pairs.map((pair) => `${pair.left} → ${pair.right}`).join('\n')
                : question.explanation}
            </Text>
          </View>
        )}

        {/* Next Button */}
        {showFeedback && (
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text style={styles.nextButtonText}>
              {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    backgroundColor: '#1F4788',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtext: {
    fontSize: 14,
    color: '#B8D4FF',
  },
  headerProgress: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  modeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modeButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 8,
  },
  modeButtonSubtext: {
    fontSize: 16,
    color: '#666666',
  },
  countButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  countButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 4,
  },
  countButtonSubtext: {
    fontSize: 14,
    color: '#666666',
  },
  backButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: 28,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#DDDDDD',
  },
  optionSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  optionText: {
    fontSize: 16,
    color: '#333333',
  },
  optionTextSelected: {
    fontWeight: 'bold',
  },
  trueFalseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  trueFalseButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 20,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    alignItems: 'center',
  },
  trueFalseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  matchingContainer: {
    marginBottom: 16,
  },
  matchingHint: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 12,
  },
  matchingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  matchingButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#DDDDDD',
    alignItems: 'center',
  },
  matchingSelected: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  matchingMatched: {
    borderColor: '#9E9E9E',
    backgroundColor: '#F5F5F5',
  },
  matchingText: {
    fontSize: 14,
    color: '#333333',
  },
  submitButton: {
    backgroundColor: '#1F4788',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  feedbackCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedbackCorrect: {
    color: '#4CAF50',
  },
  feedbackIncorrect: {
    color: '#F44336',
  },
  feedbackText: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
  },
  nextButton: {
    backgroundColor: '#1F4788',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 24,
  },
  resultScore: {
    fontSize: 24,
    color: '#333333',
    marginBottom: 8,
  },
  resultPercentage: {
    fontSize: 20,
    color: '#666666',
    marginBottom: 16,
  },
  resultGrade: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 32,
  },
  restartButton: {
    backgroundColor: '#1F4788',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  restartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
