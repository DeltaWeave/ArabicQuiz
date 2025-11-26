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
  // Additional theory questions from rules tables
  {
    type: 'multiple',
    question: 'What is the marker for Raf\' (Marfoo\') case in the singular?',
    options: ['Fatha (ً)', 'Dhamma (ٌ)', 'Kasra (ٍ)', 'Sukoon'],
    correct: 1,
    explanation: 'The marker for Raf\' in singular is Dhamma (ٌ)',
  },
  {
    type: 'multiple',
    question: 'What is the marker for Raf\' case in the dual form?',
    options: ['ُونَ', 'انِ', 'َيْنِ', 'اتٌ'],
    correct: 1,
    explanation: 'The marker for Raf\' in dual is انِ (aani)',
  },
  {
    type: 'multiple',
    question: 'What is the marker for Raf\' case in the masculine plural?',
    options: ['ُونَ', 'ِينَ', 'اتٌ', 'انِ'],
    correct: 0,
    explanation: 'The marker for Raf\' in masculine plural is ُونَ (oona)',
  },
  {
    type: 'multiple',
    question: 'What happens to a dual noun when it becomes Mansoob (object)?',
    options: ['Stays the same', 'انِ becomes َيْنِ', 'Loses tanween', 'Adds ال'],
    correct: 1,
    explanation: 'When dual is Mansoob, انِ changes to َيْنِ',
  },
  {
    type: 'trueFalse',
    question: 'In an idaafa, the first word (mudaaf) can have alif laam (ال).',
    correct: false,
    explanation: 'The mudaaf (first word) cannot have ال, only the mudaaf ilayhi can',
  },
  {
    type: 'multiple',
    question: 'What harakat appears on letter 1 of a regular past tense verb (masc./sing)?',
    options: ['Fatha', 'Dhamma', 'Kasra', 'Sukoon'],
    correct: 0,
    explanation: 'The first letter of past tense has fatha: كَتَبَ',
  },
  {
    type: 'multiple',
    question: 'What harakat appears on letter 3 of a regular past tense verb (masc./sing)?',
    options: ['Fatha', 'Dhamma', 'Kasra', 'Sukoon'],
    correct: 0,
    explanation: 'The third letter of past tense has fatha: كَتَبَ',
  },
  {
    type: 'multiple',
    question: 'How do you make a feminine singular verb from a masculine verb?',
    options: ['Add ة', 'Add ت', 'Add ات', 'Add ون'],
    correct: 1,
    explanation: 'Add ت to make feminine verb: كَتَبَ → كَتَبَتْ',
  },
  {
    type: 'matching',
    question: 'Match the prepositions:',
    pairs: [
      { left: 'بِ', right: 'by/with' },
      { left: 'لِ', right: 'for/to' },
      { left: 'كَ', right: 'like/as' },
      { left: 'عَنْ', right: 'from/about' },
    ],
  },
  {
    type: 'trueFalse',
    question: 'In a verbal sentence, the word order is: Verb - Subject - Object.',
    correct: true,
    explanation: 'Correct! Arabic verbal sentences follow VSO order',
  },
  {
    type: 'multiple',
    question: 'What are the two parts of a nominal sentence?',
    options: ['Verb and Subject', 'Mubtada and Khabr', 'Subject and Object', 'Noun and Verb'],
    correct: 1,
    explanation: 'Nominal sentences have Mubtada (subject) and Khabr (predicate)',
  },
  {
    type: 'multiple',
    question: 'What are the three parts of a verbal sentence?',
    options: ['Mubtada, Khabr, Sifa', 'Fi\'l, Fa\'il, Maf\'ool', 'Noun, Verb, Particle', 'Subject, Predicate, Object'],
    correct: 1,
    explanation: 'Verbal sentences have Fi\'l (verb), Fa\'il (subject), Maf\'ool (object)',
  },
  // Grammar identification questions
  {
    type: 'multiple',
    question: 'In "الطالبُ صادقٌ", what is the case of صادقٌ?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'No case'],
    correct: 0,
    explanation: 'صادقٌ is the Khabr, so it is Marfoo\' (Raf\' case)',
  },
  {
    type: 'multiple',
    question: 'In "كَتَبَ الطالبُ كتابًا", what is the case of كتابًا?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'No case'],
    correct: 1,
    explanation: 'كتابًا is the Maf\'ool (object), so it is Mansoob (Nasb case)',
  },
  {
    type: 'multiple',
    question: 'In "في البيتِ", what is the case of البيتِ?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'No case'],
    correct: 2,
    explanation: 'البيتِ comes after a preposition (في), so it is Majroor',
  },
  {
    type: 'multiple',
    question: 'In "بيتُ الرجلِ", what is the case of الرجلِ?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'No case'],
    correct: 2,
    explanation: 'الرجلِ is mudaaf ilayhi (second word in idaafa), so it is always Majroor',
  },
  {
    type: 'trueFalse',
    question: 'In "الطالبانِ جالسانِ", both words are in the Raf\' case.',
    correct: true,
    explanation: 'Both Mubtada and Khabr must be Marfoo\' (Raf\' case)',
  },
  {
    type: 'multiple',
    question: 'In "ضَرَبَ المعلمونَ الطالبينَ", what is the case of الطالبينَ?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'No case'],
    correct: 1,
    explanation: 'الطالبينَ is the object (Maf\'ool), so it is Mansoob',
  },
  {
    type: 'multiple',
    question: 'What is wrong with "الرجلُ صادقةٌ"?',
    options: ['Case mismatch', 'Gender mismatch', 'Number mismatch', 'Definiteness mismatch'],
    correct: 1,
    explanation: 'Gender mismatch: الرجلُ is masculine but صادقةٌ is feminine',
  },
  {
    type: 'multiple',
    question: 'What is wrong with "كتبٌ جديدٌ"?',
    options: ['Number mismatch', 'Gender mismatch', 'Case error', 'Nothing wrong'],
    correct: 0,
    explanation: 'Number/gender mismatch: كتبٌ (non-human plural) needs feminine singular adjective: جديدةٌ',
  },
  // Root Letter Identification
  {
    type: 'multiple',
    question: 'What are the root letters of فَهِمَ (he understood)?',
    options: ['ف ه م', 'ف ع ل', 'ه م ف', 'ف ل م'],
    correct: 0,
    explanation: 'The root letters are: ف ه م',
  },
  {
    type: 'multiple',
    question: 'What are the root letters of ضَرَبَ (he hit)?',
    options: ['ض ب ر', 'ض ر ب', 'ر ب ض', 'ب ر ض'],
    correct: 1,
    explanation: 'The root letters are: ض ر ب',
  },
  {
    type: 'multiple',
    question: 'What are the root letters of كَتَبَ (he wrote)?',
    options: ['ك ب ت', 'ت ب ك', 'ك ت ب', 'ب ت ك'],
    correct: 2,
    explanation: 'The root letters are: ك ت ب',
  },
  {
    type: 'trueFalse',
    question: 'Arabic words typically have 3 or 4 root letters.',
    correct: true,
    explanation: 'Correct! Most Arabic words are derived from 3 or 4 root letters',
  },
  {
    type: 'multiple',
    question: 'How do you make the verb دَعَا (he called) feminine?',
    options: ['دَعَاتْ', 'دَعَتْ', 'دَعَى', 'دَعِيَتْ'],
    correct: 1,
    explanation: 'When a verb ends with madd (ا), drop it when adding تْ: دَعَا → دَعَتْ',
  },
  {
    type: 'multiple',
    question: 'How do you make the verb مَشَى (he walked) feminine?',
    options: ['مَشَتْ', 'مَشَاتْ', 'مَشَىتْ', 'مَشِيَتْ'],
    correct: 0,
    explanation: 'Drop the madd when adding تْ: مَشَى → مَشَتْ',
  },
  {
    type: 'multiple',
    question: 'How do you make the verb بَكَى (he cried) feminine?',
    options: ['بَكَىتْ', 'بَكَتْ', 'بَكَاتْ', 'بَكِيَتْ'],
    correct: 1,
    explanation: 'Drop the madd when adding تْ: بَكَى → بَكَتْ',
  },
  {
    type: 'multiple',
    question: 'In "بَيْتُ الأَسَدِ الْكَبِيْرُ", which word does الْكَبِيْرُ describe?',
    options: ['الأَسَدِ (lion)', 'بَيْتُ (house)', 'both', 'neither'],
    correct: 1,
    explanation: 'الْكَبِيْرُ (Marfoo\') describes بَيْتُ (house) - "the big house of the lion"',
  },
  {
    type: 'multiple',
    question: 'In "بَيْتُ الأَسَدِ الْكَبِيْرِ", which word does الْكَبِيْرِ describe?',
    options: ['بَيْتُ (house)', 'الأَسَدِ (lion)', 'both', 'neither'],
    correct: 1,
    explanation: 'الْكَبِيْرِ (Majroor) describes الأَسَدِ (lion) - "the house of the big lion"',
  },
  {
    type: 'trueFalse',
    question: 'In an idaafa, if the adjective is Marfoo\', it describes the first word (mudaaf).',
    correct: true,
    explanation: 'Correct! The adjective matches the case of the word it describes',
  },
  {
    type: 'trueFalse',
    question: 'In an idaafa, if the adjective is Majroor, it describes the second word (mudaaf ilayhi).',
    correct: true,
    explanation: 'Correct! The adjective matches the case of the word it describes',
  },
  {
    type: 'trueFalse',
    question: 'In "بَيْتُ أَسَدٍ", the first word (بَيْتُ) is considered indefinite.',
    correct: true,
    explanation: 'When the second word is indefinite, the whole idaafa is indefinite',
  },
  {
    type: 'trueFalse',
    question: 'In "بَيْتُ الأَسَدِ", the first word (بَيْتُ) is considered definite.',
    correct: true,
    explanation: 'When the second word is definite, the whole idaafa is definite',
  },
  {
    type: 'multiple',
    question: 'What determines if an idaafa construction is definite or indefinite?',
    options: ['The first word', 'The second word', 'Both words', 'Neither word'],
    correct: 1,
    explanation: 'The second word (mudaaf ilayhi) determines the definiteness of the entire idaafa',
  },
  {
    type: 'multiple',
    question: 'In "الطالبانِ الصالحانِ جالسانِ", what case are all the words?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'Mixed'],
    correct: 0,
    explanation: 'All words are Marfoo\' (Raf\' case) - this is a Mubtada-Khabr sentence',
  },
  {
    type: 'multiple',
    question: 'In "كَتَبَ المعلمُ الدرسَ", what case is الدرسَ?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'No case'],
    correct: 1,
    explanation: 'الدرسَ is Mansoob because it\'s the object (Maf\'ool)',
  },
  {
    type: 'multiple',
    question: 'Which word is Majroor in "الطالبُ في المسجدِ"?',
    options: ['الطالبُ', 'في', 'المسجدِ', 'none'],
    correct: 2,
    explanation: 'المسجدِ is Majroor because it comes after the preposition في',
  },
  {
    type: 'multiple',
    question: 'In "الرجلُ الصالحُ كتبَ كتابًا", what is the grammatical function of الصالحُ?',
    options: ['Mubtada', 'Khabr', 'Sifa', 'Fa\'il'],
    correct: 2,
    explanation: 'الصالحُ is a Sifa (adjective) describing الرجلُ',
  },
  {
    type: 'multiple',
    question: 'In "زَيْدٌ رَجُلٌ صَالِحٌ", what is the grammatical function of رَجُلٌ?',
    options: ['Mubtada', 'Khabr', 'Sifa', 'Mawsoof'],
    correct: 1,
    explanation: 'رَجُلٌ is the Khabr (predicate) in this nominal sentence',
  },
  {
    type: 'multiple',
    question: 'In "زَيْدٌ رَجُلٌ صَالِحٌ", what is the grammatical function of صَالِحٌ?',
    options: ['Khabr of زَيْدٌ', 'Sifa of رَجُلٌ', 'Mubtada', 'Maf\'ool'],
    correct: 1,
    explanation: 'صَالِحٌ is the Sifa (adjective) describing رَجُلٌ',
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
  // Translation questions (English to Arabic concepts)
  {
    type: 'multiple',
    question: 'How would you say "The boy is big" in Arabic?',
    options: ['الولدُ كبيرٌ', 'ولدٌ كبيرٌ', 'الولدَ كبيرٌ', 'الولدُ الكبيرُ'],
    correct: 0,
    explanation: 'الولدُ كبيرٌ - Mubtada (definite) + Khabr (indefinite)',
  },
  {
    type: 'multiple',
    question: 'How would you say "a big boy" (as a phrase, not a sentence)?',
    options: ['الولدُ كبيرٌ', 'ولدٌ كبيرٌ', 'الولدُ الكبيرُ', 'ولدُ كبيرُ'],
    correct: 1,
    explanation: 'ولدٌ كبيرٌ - Both indefinite for a phrase (Sifa Mawsoof)',
  },
  {
    type: 'multiple',
    question: 'How would you say "The big boy" (as a phrase)?',
    options: ['الولدُ كبيرٌ', 'ولدٌ كبيرٌ', 'الولدُ الكبيرُ', 'ولدَ الكبيرَ'],
    correct: 2,
    explanation: 'الولدُ الكبيرُ - Both definite for a phrase (Sifa Mawsoof)',
  },
  {
    type: 'multiple',
    question: 'What does "الطالبُ جالسٌ" mean?',
    options: ['The student is sitting', 'A student is sitting', 'The sitting student', 'Students are sitting'],
    correct: 0,
    explanation: 'الطالبُ جالسٌ means "The student is sitting" (Mubtada Khabr)',
  },
  {
    type: 'multiple',
    question: 'What does "كَتَبَ الطالبُ الدرسَ" mean?',
    options: ['The student wrote the lesson', 'The lesson wrote the student', 'The student reads the lesson', 'A student wrote lessons'],
    correct: 0,
    explanation: 'كَتَبَ الطالبُ الدرسَ = The student wrote the lesson (VSO)',
  },
  {
    type: 'multiple',
    question: 'What does "بيتُ الرجلِ" mean?',
    options: ['The man\'s house', 'A man\'s house', 'The house and the man', 'Houses of men'],
    correct: 0,
    explanation: 'بيتُ الرجلِ = The man\'s house (idaafa construction)',
  },
  {
    type: 'multiple',
    question: 'What does "في البيتِ" mean?',
    options: ['to the house', 'in the house', 'from the house', 'on the house'],
    correct: 1,
    explanation: 'في البيتِ = in the house (preposition فِي + noun)',
  },
  {
    type: 'matching',
    question: 'Match the Arabic phrases with their meanings:',
    pairs: [
      { left: 'الطالبانِ جالسانِ', right: 'The two students are sitting' },
      { left: 'الطالباتُ جالساتٌ', right: 'The students (f.) are sitting' },
      { left: 'الطالبُ الجالسُ', right: 'The sitting student' },
      { left: 'طالبٌ جالسٌ', right: 'A sitting student' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does "شَرِبَ الولدُ ماءً" mean?',
    options: ['The boy drank water', 'The boy drinks water', 'A boy drank the water', 'Boys drank water'],
    correct: 0,
    explanation: 'شَرِبَ الولدُ ماءً = The boy drank water (past tense verb)',
  },
  {
    type: 'multiple',
    question: 'What does "فَتَحَتِ المرأةُ البابَ" mean?',
    options: ['The woman opened the door', 'The door opened the woman', 'Women opened doors', 'The woman opens doors'],
    correct: 0,
    explanation: 'فَتَحَتِ المرأةُ البابَ = The woman opened the door (feminine verb)',
  },
  {
    type: 'multiple',
    question: 'What does "مِفتاحُ البيتِ" mean?',
    options: ['The house\'s key', 'The key and the house', 'Keys of houses', 'A key in the house'],
    correct: 0,
    explanation: 'مِفتاحُ البيتِ = The house\'s key (idaafa)',
  },
  {
    type: 'matching',
    question: 'Match the sentences with their meanings:',
    pairs: [
      { left: 'خَلَقَ اللهُ السماءَ', right: 'Allah created the sky' },
      { left: 'حَمَلَ المعلمُ قلمًا', right: 'The teacher carried a pen' },
      { left: 'نَصَرَ اللهُ المؤمنينَ', right: 'Allah helped the believers' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does "الرجلُ في المسجدِ" mean?',
    options: ['The man in the mosque', 'The man to the mosque', 'A man from the mosque', 'Men in mosques'],
    correct: 0,
    explanation: 'الرجلُ في المسجدِ = The man is in the mosque',
  },
  {
    type: 'multiple',
    question: 'What does "كتابُ الطالبِ جديدٌ" mean?',
    options: ['The student\'s book is new', 'The new student\'s book', 'A student\'s new book', 'The student is a new book'],
    correct: 0,
    explanation: 'كتابُ الطالبِ جديدٌ = The student\'s book is new',
  },
  {
    type: 'multiple',
    question: 'What does "ذَهَبَ الولدُ إلى المدرسةِ" mean?',
    options: ['The boy went to the school', 'The boy is going to school', 'Boys went to schools', 'A boy goes to the school'],
    correct: 0,
    explanation: 'ذَهَبَ الولدُ إلى المدرسةِ = The boy went to the school',
  },
  // Additional verbs from comprehensive vocab list
  {
    type: 'multiple',
    question: 'What does سَمِعَ mean (past tense)?',
    options: ['he saw', 'he heard', 'he said', 'he ate'],
    correct: 1,
    explanation: 'سَمِعَ means "he heard"',
  },
  {
    type: 'multiple',
    question: 'What does أَكَلَ mean (past tense)?',
    options: ['he drank', 'he ate', 'he broke', 'he killed'],
    correct: 1,
    explanation: 'أَكَلَ means "he ate"',
  },
  {
    type: 'multiple',
    question: 'What does قَالَ mean (past tense)?',
    options: ['he said', 'he killed', 'he broke', 'he heard'],
    correct: 0,
    explanation: 'قَالَ means "he said"',
  },
  {
    type: 'multiple',
    question: 'What does كَسَرَ mean (past tense)?',
    options: ['he wrote', 'he read', 'he broke', 'he opened'],
    correct: 2,
    explanation: 'كَسَرَ means "he broke"',
  },
  {
    type: 'multiple',
    question: 'What does قَتَلَ mean (past tense)?',
    options: ['he helped', 'he killed', 'he protected', 'he created'],
    correct: 1,
    explanation: 'قَتَلَ means "he killed"',
  },
  {
    type: 'matching',
    question: 'Match the verbs (past tense):',
    pairs: [
      { left: 'دَخَلَ', right: 'he entered' },
      { left: 'خَرَجَ', right: 'he exited' },
      { left: 'جَلَسَ', right: 'he sat' },
      { left: 'قَامَ', right: 'he stood' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does مَشَى mean (past tense)?',
    options: ['he walked', 'he ran', 'he sat', 'he stood'],
    correct: 0,
    explanation: 'مَشَى means "he walked"',
  },
  {
    type: 'multiple',
    question: 'What does طَعَامٌ mean?',
    options: ['drink', 'food', 'lesson', 'room'],
    correct: 1,
    explanation: 'طَعَامٌ means "food"',
  },
  {
    type: 'multiple',
    question: 'What does شَرَابٌ mean?',
    options: ['food', 'water', 'drink', 'juice'],
    correct: 2,
    explanation: 'شَرَابٌ means "drink"',
  },
  {
    type: 'multiple',
    question: 'What does غُرْفَةٌ mean?',
    options: ['house', 'room', 'door', 'window'],
    correct: 1,
    explanation: 'غُرْفَةٌ means "room"',
  },
  {
    type: 'multiple',
    question: 'What does مِفْتَاحٌ mean?',
    options: ['door', 'key', 'lock', 'handle'],
    correct: 1,
    explanation: 'مِفْتَاحٌ means "key"',
  },
  {
    type: 'matching',
    question: 'Match the adjectives:',
    pairs: [
      { left: 'قَوِيٌّ', right: 'strong' },
      { left: 'حَزِينٌ', right: 'sad' },
      { left: 'غَاضِبٌ', right: 'angry' },
      { left: 'شُجَاعٌ', right: 'brave' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does مَلِكٌ mean?',
    options: ['soldier', 'king', 'enemy', 'friend'],
    correct: 1,
    explanation: 'مَلِكٌ means "king"',
  },
  {
    type: 'multiple',
    question: 'What does جُنْدِيٌّ mean?',
    options: ['king', 'soldier', 'brave', 'strong'],
    correct: 1,
    explanation: 'جُنْدِيٌّ means "soldier"',
  },
  {
    type: 'multiple',
    question: 'What does عَدُوٌّ mean?',
    options: ['friend', 'soldier', 'enemy', 'king'],
    correct: 2,
    explanation: 'عَدُوٌّ means "enemy"',
  },
  {
    type: 'multiple',
    question: 'What is the plural of وَلَدٌ (boy)?',
    options: ['ولدون', 'أَوْلَادٌ', 'ولدان', 'ولدات'],
    correct: 1,
    explanation: 'أَوْلَادٌ is the broken plural of وَلَدٌ',
  },
  {
    type: 'multiple',
    question: 'What is the plural of رَجُلٌ (man)?',
    options: ['رجلون', 'رِجَالٌ', 'رجلان', 'رجلات'],
    correct: 1,
    explanation: 'رِجَالٌ is the broken plural of رَجُلٌ',
  },
  {
    type: 'multiple',
    question: 'What is the plural of اِمْرَأَةٌ (woman)?',
    options: ['امرأتان', 'امرأات', 'نِسَاءٌ', 'امرأون'],
    correct: 2,
    explanation: 'نِسَاءٌ is the broken plural of اِمْرَأَةٌ',
  },
  {
    type: 'matching',
    question: 'Match the singular with its broken plural:',
    pairs: [
      { left: 'كِتَابٌ', right: 'كُتُبٌ' },
      { left: 'بَابٌ', right: 'أَبْوَابٌ' },
      { left: 'قَلَمٌ', right: 'أَقْلَامٌ' },
      { left: 'قَمَرٌ', right: 'أَقْمَارٌ' },
    ],
  },
  {
    type: 'multiple',
    question: 'What is the plural of مَلِكٌ (king)?',
    options: ['ملوك', 'مُلُوكٌ', 'ملكون', 'ملكات'],
    correct: 1,
    explanation: 'مُلُوكٌ is the broken plural of مَلِكٌ',
  },
  {
    type: 'multiple',
    question: 'What is the plural of صَدِيقٌ (friend)?',
    options: ['صدقاء', 'أَصْدِقَاءُ', 'صديقون', 'صديقات'],
    correct: 1,
    explanation: 'أَصْدِقَاءُ is the broken plural of صَدِيقٌ',
  },
  {
    type: 'multiple',
    question: 'What is the plural of طَالِبٌ (student)?',
    options: ['طلاب', 'طُلَّابٌ', 'طالبون', 'طالبات'],
    correct: 1,
    explanation: 'طُلَّابٌ is the broken plural of طَالِبٌ',
  },
  {
    type: 'matching',
    question: 'Match the animals:',
    pairs: [
      { left: 'جَمَلٌ', right: 'camel (male)' },
      { left: 'نَاقَةٌ', right: 'camel (female)' },
      { left: 'طَيْرٌ', right: 'bird' },
      { left: 'أَسَدٌ', right: 'lion' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does الكَلْبُ mean?',
    options: ['the cat', 'the dog', 'the bird', 'the lion'],
    correct: 1,
    explanation: 'الكَلْبُ means "the dog"',
  },
  {
    type: 'multiple',
    question: 'What does القِطَّةُ mean?',
    options: ['the dog', 'the bird', 'the cat', 'the camel'],
    correct: 2,
    explanation: 'القِطَّةُ means "the cat"',
  },
  {
    type: 'matching',
    question: 'Match the verbs:',
    pairs: [
      { left: 'رَجَعَ', right: 'he returned' },
      { left: 'سَكَنَ', right: 'he lived' },
      { left: 'عَلِمَ', right: 'he knew' },
      { left: 'نَامَ', right: 'he slept' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does ذَكَرَ mean (past tense)?',
    options: ['he forgot', 'he remembered', 'he knew', 'he slept'],
    correct: 1,
    explanation: 'ذَكَرَ means "he remembered"',
  },
  {
    type: 'multiple',
    question: 'What does نَسِيَ mean (past tense)?',
    options: ['he remembered', 'he forgot', 'he knew', 'he slept'],
    correct: 1,
    explanation: 'نَسِيَ means "he forgot"',
  },
  {
    type: 'multiple',
    question: 'What is the plural of بَيْتٌ (house)?',
    options: ['بيوت', 'بُيُوتٌ', 'بيتون', 'بيتات'],
    correct: 1,
    explanation: 'بُيُوتٌ is the broken plural of بَيْتٌ',
  },
  {
    type: 'multiple',
    question: 'What is the plural of مَسْجِدٌ (mosque)?',
    options: ['مساجد', 'مَسَاجِدُ', 'مسجدون', 'مسجدات'],
    correct: 1,
    explanation: 'مَسَاجِدُ is the broken plural of مَسْجِدٌ',
  },
  {
    type: 'multiple',
    question: 'What is the plural of كَلِمَةٌ (word)?',
    options: ['كلمون', 'كَلِمَاتٌ', 'كلمان', 'كلام'],
    correct: 1,
    explanation: 'كَلِمَاتٌ is the plural of كَلِمَةٌ',
  },
  {
    type: 'matching',
    question: 'Match the verbs:',
    pairs: [
      { left: 'عَمِلَ', right: 'he worked' },
      { left: 'عَبَدَ', right: 'he worshipped' },
      { left: 'دَرَسَ', right: 'he studied' },
      { left: 'لَعِبَ', right: 'he played' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does غَلَقَ mean (past tense)?',
    options: ['he opened', 'he closed', 'he broke', 'he locked'],
    correct: 1,
    explanation: 'غَلَقَ means "he closed"',
  },
  {
    type: 'multiple',
    question: 'What does رَأَى mean (past tense)?',
    options: ['he heard', 'he saw', 'he knew', 'he found'],
    correct: 1,
    explanation: 'رَأَى means "he saw"',
  },
  {
    type: 'multiple',
    question: 'What does عَرَفَ mean (past tense)?',
    options: ['he saw', 'he knew/recognized', 'he heard', 'he forgot'],
    correct: 1,
    explanation: 'عَرَفَ means "he knew" or "he recognized"',
  },
  {
    type: 'matching',
    question: 'Match the verbs:',
    pairs: [
      { left: 'بَكَى', right: 'he cried' },
      { left: 'ضَحِكَ', right: 'he laughed' },
      { left: 'نَظَرَ', right: 'he looked' },
      { left: 'خَافَ', right: 'he feared' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does وَجَدَ mean (past tense)?',
    options: ['he lost', 'he found', 'he took', 'he gave'],
    correct: 1,
    explanation: 'وَجَدَ means "he found"',
  },
  {
    type: 'multiple',
    question: 'What does فَقَدَ mean (past tense)?',
    options: ['he found', 'he lost', 'he took', 'he gave'],
    correct: 1,
    explanation: 'فَقَدَ means "he lost"',
  },
  {
    type: 'multiple',
    question: 'What does أَخَذَ mean (past tense)?',
    options: ['he gave', 'he took', 'he found', 'he lost'],
    correct: 1,
    explanation: 'أَخَذَ means "he took"',
  },
  {
    type: 'multiple',
    question: 'What does مَدْرَسَةٌ mean?',
    options: ['mosque', 'school', 'house', 'room'],
    correct: 1,
    explanation: 'مَدْرَسَةٌ means "school"',
  },
  {
    type: 'multiple',
    question: 'What does قَصْرٌ mean?',
    options: ['house', 'mosque', 'palace', 'school'],
    correct: 2,
    explanation: 'قَصْرٌ means "palace"',
  },
  {
    type: 'matching',
    question: 'Match the adjectives:',
    pairs: [
      { left: 'مُجْتَهِدٌ', right: 'hardworking' },
      { left: 'ذَكِيٌّ', right: 'intelligent' },
      { left: 'جَائِعٌ', right: 'hungry' },
      { left: 'صَعْبٌ', right: 'difficult' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does سَهْلٌ mean?',
    options: ['difficult', 'easy', 'hard', 'complex'],
    correct: 1,
    explanation: 'سَهْلٌ means "easy"',
  },
  {
    type: 'multiple',
    question: 'What does مَكْسُورٌ mean?',
    options: ['open', 'closed', 'broken', 'new'],
    correct: 2,
    explanation: 'مَكْسُورٌ means "broken"',
  },
  {
    type: 'multiple',
    question: 'What does مَفْتُوحٌ mean?',
    options: ['closed', 'open', 'broken', 'locked'],
    correct: 1,
    explanation: 'مَفْتُوحٌ means "open"',
  },
  {
    type: 'multiple',
    question: 'What does بَارِدٌ mean?',
    options: ['hot', 'warm', 'cool', 'cold'],
    correct: 2,
    explanation: 'بَارِدٌ means "cool"',
  },
  {
    type: 'matching',
    question: 'Match emotions and states:',
    pairs: [
      { left: 'فَرَحٌ', right: 'happiness' },
      { left: 'حُزْنٌ', right: 'sadness' },
      { left: 'غَضَبٌ', right: 'anger' },
      { left: 'خَوْفٌ', right: 'fear' },
    ],
  },
  {
    type: 'multiple',
    question: 'What does حُبٌّ mean?',
    options: ['hate', 'love', 'anger', 'fear'],
    correct: 1,
    explanation: 'حُبٌّ means "love"',
  },
  {
    type: 'multiple',
    question: 'What does حَبِيبٌ mean?',
    options: ['enemy', 'friend', 'beloved', 'stranger'],
    correct: 2,
    explanation: 'حَبِيبٌ means "beloved"',
  },
  {
    type: 'multiple',
    question: 'What is the plural of سَمَاءٌ (sky)?',
    options: ['سماءات', 'سَمَاوَاتٌ', 'سماوون', 'سماءون'],
    correct: 1,
    explanation: 'سَمَاوَاتٌ is the plural of سَمَاءٌ',
  },
  {
    type: 'multiple',
    question: 'What is the plural of طَيْرٌ (bird)?',
    options: ['طيرون', 'طيران', 'طُيُورٌ', 'طيرات'],
    correct: 2,
    explanation: 'طُيُورٌ is the broken plural of طَيْرٌ',
  },
  {
    type: 'multiple',
    question: 'What is the plural of أَسَدٌ (lion)?',
    options: ['اسدون', 'أُسُودٌ', 'اسدان', 'اسدات'],
    correct: 1,
    explanation: 'أُسُودٌ is the broken plural of أَسَدٌ',
  },
];

// Table-based questions from Useful Tables document
const tableQuestions = [
  {
    type: 'multiple',
    question: 'What is the Marfoo\' form of طَالِب in the masculine plural?',
    options: ['طَالِبُونَ', 'طَالِبِينَ', 'طَالِبَانِ', 'طَالِبَاتٌ'],
    correct: 0,
    explanation: 'The masculine plural Marfoo\' adds ُونَ: طَالِبُونَ',
  },
  {
    type: 'multiple',
    question: 'What is the Marfoo\' form of طَالِبَة in the dual?',
    options: ['طَالِبَتَيْنِ', 'طَالِبَتَانِ', 'طَالِبَتَاتٌ', 'طَالِبَتُونَ'],
    correct: 1,
    explanation: 'The feminine dual Marfoo\' adds انِ: طَالِبَتَانِ',
  },
  {
    type: 'multiple',
    question: 'What is the Mansoob form of طَالِب in the singular?',
    options: ['طَالِبٌ', 'طَالِبًا', 'طَالِبٍ', 'طَالِبُ'],
    correct: 1,
    explanation: 'The masculine singular Mansoob is طَالِبًا (fatha + alif)',
  },
  {
    type: 'multiple',
    question: 'What is the Mansoob form of طَالِب in the dual?',
    options: ['طَالِبَانِ', 'طَالِبَيْنِ', 'طَالِبُونَ', 'طَالِبِينَ'],
    correct: 1,
    explanation: 'The masculine dual Mansoob is طَالِبَيْنِ (alif changes to yaa)',
  },
  {
    type: 'multiple',
    question: 'What is the Mansoob form of طَالِب in the masculine plural?',
    options: ['طَالِبُونَ', 'طَالِبِينَ', 'طَالِبِينْ', 'طَالِبَاتٍ'],
    correct: 2,
    explanation: 'The masculine plural Mansoob is طَالِبِينْ (waaw changes to yaa, dhamma to kasra)',
  },
  {
    type: 'matching',
    question: 'Match the masculine cases (singular صَالِح):',
    pairs: [
      { left: 'Marfoo\'', right: 'صَالِحٌ' },
      { left: 'Mansoob', right: 'صَالِحًا' },
      { left: 'Majroor', right: 'صَالِحٍ' },
    ],
  },
  {
    type: 'matching',
    question: 'Match the masculine dual cases (صَالِح):',
    pairs: [
      { left: 'Marfoo\'', right: 'صَالِحَانِ' },
      { left: 'Mansoob', right: 'صَالِحَيْنِ' },
      { left: 'Majroor', right: 'صَالِحَيْنِ' },
    ],
  },
  {
    type: 'trueFalse',
    question: 'The Mansoob and Majroor forms are the same for dual nouns.',
    correct: true,
    explanation: 'Correct! Both dual Mansoob and Majroor use َيْنِ',
  },
  {
    type: 'multiple',
    question: 'What is the Majroor form of صَالِح in the masculine plural?',
    options: ['صَالِحُونَ', 'صَالِحِينَ', 'صَالِحًا', 'صَالِحٍ'],
    correct: 1,
    explanation: 'The masculine plural Majroor is صَالِحِينَ (same as Mansoob)',
  },
  {
    type: 'trueFalse',
    question: 'Broken plurals have the same case markers as singular nouns.',
    correct: true,
    explanation: 'Correct! Broken plurals use tanween like singular nouns',
  },
  {
    type: 'multiple',
    question: 'What is the Mansoob form of the broken plural كُتُب?',
    options: ['كُتُبٌ', 'كُتُبًا', 'كُتُبٍ', 'كُتُبَيْنِ'],
    correct: 1,
    explanation: 'Broken plural Mansoob adds fatha + alif: كُتُبًا',
  },
  {
    type: 'trueFalse',
    question: 'Non-human plurals are treated as grammatically feminine singular.',
    correct: true,
    explanation: 'Correct! الْكُتُبُ كَبِيْرَةٌ (books use feminine singular adjective)',
  },
  {
    type: 'matching',
    question: 'Match the prepositions:',
    pairs: [
      { left: 'فِي', right: 'in' },
      { left: 'عَلَى', right: 'on, upon' },
      { left: 'مِنْ', right: 'from' },
      { left: 'إِلَى', right: 'to, towards' },
    ],
  },
  {
    type: 'multiple',
    question: 'Which preposition means "by, with"?',
    options: ['فِي', 'بِ', 'لِ', 'كَ'],
    correct: 1,
    explanation: 'بِ means "by, with"',
  },
  {
    type: 'multiple',
    question: 'Which preposition means "for, to"?',
    options: ['فِي', 'بِ', 'لِ', 'عَنْ'],
    correct: 2,
    explanation: 'لِ means "for, to"',
  },
];

// Additional translation questions
const extraTranslationQuestions = [
  {
    type: 'multiple',
    question: 'Translate: "The teacher is patient"',
    options: ['المعلمُ صابرٌ', 'المعلمُ صابرُونَ', 'المعلمُ صابرةٌ', 'المعلمُ صابِرًا'],
    correct: 0,
    explanation: 'المعلمُ صابرٌ = The teacher is patient (Mubtada-Khabr, both Marfoo\')',
  },
  {
    type: 'multiple',
    question: 'Translate: "a big house"',
    options: ['البيتُ الكبيرُ', 'بيتٌ كبيرٌ', 'بيتُ كبيرُ', 'البيتُ كبيرٌ'],
    correct: 1,
    explanation: 'بيتٌ كبيرٌ = a big house (indefinite Sifa-Mawsoof)',
  },
  {
    type: 'multiple',
    question: 'Translate: "The two pious teachers" (masculine)',
    options: ['المعلمُ الصالحُ', 'المعلمانِ الصالحانِ', 'المعلمونَ الصالحونَ', 'المعلمَيْنِ الصالحَيْنِ'],
    correct: 1,
    explanation: 'المعلمانِ الصالحانِ = The two pious teachers (definite dual Marfoo\')',
  },
  {
    type: 'multiple',
    question: 'Translate: "The boy wrote a book"',
    options: ['كتبَ الولدُ كتابٌ', 'كتبَ الولدُ كتابًا', 'كتبَ الولدُ كتابٍ', 'كتبَ الولدَ كتابًا'],
    correct: 1,
    explanation: 'كتبَ الولدُ كتابًا = The boy wrote a book (VSO, object is Mansoob)',
  },
  {
    type: 'multiple',
    question: 'Translate: "The woman opened the door"',
    options: ['فتحَ المرأةُ البابَ', 'فتحتْ المرأةُ البابَ', 'فتحتْ المرأةَ البابَ', 'فتحَ المرأةَ البابُ'],
    correct: 1,
    explanation: 'فتحتْ المرأةُ البابَ = The woman opened the door (feminine verb, Fa\'il Marfoo\', Maf\'ool Mansoob)',
  },
  {
    type: 'multiple',
    question: 'Translate: "The student is in the mosque"',
    options: ['الطالبُ المسجدُ', 'الطالبُ على المسجدِ', 'الطالبُ في المسجدِ', 'الطالبُ من المسجدِ'],
    correct: 2,
    explanation: 'الطالبُ في المسجدِ = The student is in the mosque (في + Majroor)',
  },
  {
    type: 'multiple',
    question: 'Translate: "The teacher sat on the chair"',
    options: ['جلسَ المعلمُ الكرسيُّ', 'جلسَ المعلمُ على الكرسيِّ', 'جلسَ المعلمُ في الكرسيِّ', 'جلسَ المعلمُ عن الكرسيِّ'],
    correct: 1,
    explanation: 'جلسَ المعلمُ على الكرسيِّ = The teacher sat on the chair (على + Majroor)',
  },
  {
    type: 'multiple',
    question: 'Translate: "the man\'s house"',
    options: ['البيتُ الرجلُ', 'بيتُ الرجلِ', 'البيتُ الرجلِ', 'بيتٌ رجلٌ'],
    correct: 1,
    explanation: 'بيتُ الرجلِ = the man\'s house (mudaaf loses ال, mudaaf ilayhi is Majroor)',
  },
  {
    type: 'multiple',
    question: 'Translate: "the key of the house"',
    options: ['مفتاحُ البيتِ', 'المفتاحُ البيتِ', 'مفتاحٌ بيتٌ', 'المفتاحُ للبيتِ'],
    correct: 0,
    explanation: 'مفتاحُ البيتِ = the key of the house (definite idaafa)',
  },
  {
    type: 'multiple',
    question: 'Translate: "The pious student wrote a new book"',
    options: ['كتبَ الطالبُ الصالحُ كتابًا جديدًا', 'كتبَ الطالبُ الصالحُ كتابٌ جديدٌ', 'كتبَ الطالبَ الصالحَ كتابًا جديدًا', 'كتبتْ الطالبُ الصالحُ كتابًا جديدًا'],
    correct: 0,
    explanation: 'كتبَ الطالبُ الصالحُ كتابًا جديدًا = The pious student wrote a new book',
  },
];

// Sentence Builder Questions - Arrange words to form correct Arabic sentences
const sentenceBuilderQuestions = [
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The student is diligent"',
    correctSentence: ['الطَّالِبُ', 'مُجْتَهِدٌ'],
    words: ['الطَّالِبُ', 'مُجْتَهِدٌ', 'مُجْتَهِدًا', 'الطَّالِبَ'],
    explanation: 'Mubtada-Khabr: الطَّالِبُ مُجْتَهِدٌ (The student is diligent). Both are Marfoo\' (dhamma).',
    translation: 'The student is diligent',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The teacher is patient"',
    correctSentence: ['الْمُعَلِّمُ', 'صَابِرٌ'],
    words: ['الْمُعَلِّمُ', 'صَابِرٌ', 'صَابِرًا', 'الْمُعَلِّمَ'],
    explanation: 'Mubtada-Khabr: الْمُعَلِّمُ صَابِرٌ (The teacher is patient). Both Marfoo\'.',
    translation: 'The teacher is patient',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The book is new"',
    correctSentence: ['الْكِتَابُ', 'جَدِيدٌ'],
    words: ['الْكِتَابُ', 'جَدِيدٌ', 'جَدِيدًا', 'الْكِتَابَ'],
    explanation: 'Mubtada-Khabr: الْكِتَابُ جَدِيدٌ (The book is new). Both Marfoo\'.',
    translation: 'The book is new',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "a big house"',
    correctSentence: ['بَيْتٌ', 'كَبِيرٌ'],
    words: ['بَيْتٌ', 'كَبِيرٌ', 'الْبَيْتُ', 'الْكَبِيرُ'],
    explanation: 'Indefinite Sifa-Mawsoof: بَيْتٌ كَبِيرٌ (a big house). Both indefinite with tanween.',
    translation: 'a big house',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "the big house"',
    correctSentence: ['الْبَيْتُ', 'الْكَبِيرُ'],
    words: ['الْبَيْتُ', 'الْكَبِيرُ', 'بَيْتٌ', 'كَبِيرٌ'],
    explanation: 'Definite Sifa-Mawsoof: الْبَيْتُ الْكَبِيرُ (the big house). Both definite with ال.',
    translation: 'the big house',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The boy wrote a letter"',
    correctSentence: ['كَتَبَ', 'الْوَلَدُ', 'رِسَالَةً'],
    words: ['كَتَبَ', 'الْوَلَدُ', 'رِسَالَةً', 'رِسَالَةٌ', 'الْوَلَدَ'],
    explanation: 'VSO: كَتَبَ الْوَلَدُ رِسَالَةً (The boy wrote a letter). Fa\'il Marfoo\', Maf\'ool Mansoob.',
    translation: 'The boy wrote a letter',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The teacher opened the door"',
    correctSentence: ['فَتَحَ', 'الْمُعَلِّمُ', 'الْبَابَ'],
    words: ['فَتَحَ', 'الْمُعَلِّمُ', 'الْبَابَ', 'الْبَابُ', 'الْمُعَلِّمَ'],
    explanation: 'VSO: فَتَحَ الْمُعَلِّمُ الْبَابَ (The teacher opened the door). Object is Mansoob.',
    translation: 'The teacher opened the door',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The girl drank water"',
    correctSentence: ['شَرِبَتْ', 'الْبِنْتُ', 'مَاءً'],
    words: ['شَرِبَتْ', 'الْبِنْتُ', 'مَاءً', 'مَاءٌ', 'الْبِنْتَ'],
    explanation: 'Feminine verb: شَرِبَتْ الْبِنْتُ مَاءً (The girl drank water). Verb has تْ for feminine.',
    translation: 'The girl drank water',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The student is in the mosque"',
    correctSentence: ['الطَّالِبُ', 'فِي', 'الْمَسْجِدِ'],
    words: ['الطَّالِبُ', 'فِي', 'الْمَسْجِدِ', 'الْمَسْجِدُ', 'الطَّالِبَ'],
    explanation: 'Mubtada with prepositional phrase: الطَّالِبُ فِي الْمَسْجِدِ. Preposition makes noun Majroor.',
    translation: 'The student is in the mosque',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The book is on the table"',
    correctSentence: ['الْكِتَابُ', 'عَلَى', 'الطَّاوِلَةِ'],
    words: ['الْكِتَابُ', 'عَلَى', 'الطَّاوِلَةِ', 'الطَّاوِلَةُ', 'الْكِتَابَ'],
    explanation: 'Preposition على: الْكِتَابُ عَلَى الطَّاوِلَةِ (The book is on the table).',
    translation: 'The book is on the table',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "the man\'s house"',
    correctSentence: ['بَيْتُ', 'الرَّجُلِ'],
    words: ['بَيْتُ', 'الرَّجُلِ', 'الْبَيْتُ', 'رَجُلٌ'],
    explanation: 'Idaafa: بَيْتُ الرَّجُلِ (the man\'s house). Mudaaf loses ال, mudaaf ilayhi is Majroor.',
    translation: "the man's house",
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "the door of the house"',
    correctSentence: ['بَابُ', 'الْبَيْتِ'],
    words: ['بَابُ', 'الْبَيْتِ', 'الْبَابُ', 'بَيْتٌ'],
    explanation: 'Idaafa: بَابُ الْبَيْتِ (the door of the house). Second word is Majroor.',
    translation: 'the door of the house',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The diligent student wrote a lesson"',
    correctSentence: ['كَتَبَ', 'الطَّالِبُ', 'الْمُجْتَهِدُ', 'دَرْسًا'],
    words: ['كَتَبَ', 'الطَّالِبُ', 'الْمُجْتَهِدُ', 'دَرْسًا', 'دَرْسٌ', 'مُجْتَهِدٌ'],
    explanation: 'Verb + Sifa-Mawsoof + Object: كَتَبَ الطَّالِبُ الْمُجْتَهِدُ دَرْسًا. Adjective follows noun.',
    translation: 'The diligent student wrote a lesson',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The two students are sitting"',
    correctSentence: ['الطَّالِبَانِ', 'جَالِسَانِ'],
    words: ['الطَّالِبَانِ', 'جَالِسَانِ', 'جَالِسٌ', 'الطَّالِبُ'],
    explanation: 'Dual Mubtada-Khabr: الطَّالِبَانِ جَالِسَانِ (The two students are sitting). Both dual Marfoo\'.',
    translation: 'The two students are sitting',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The students are diligent" (masculine)',
    correctSentence: ['الطُّلَّابُ', 'مُجْتَهِدُونَ'],
    words: ['الطُّلَّابُ', 'مُجْتَهِدُونَ', 'مُجْتَهِدٌ', 'طَالِبٌ'],
    explanation: 'Broken plural + sound plural: الطُّلَّابُ مُجْتَهِدُونَ. Human broken plural takes masculine agreement.',
    translation: 'The students are diligent',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "The books are new" (non-human plural)',
    correctSentence: ['الْكُتُبُ', 'جَدِيدَةٌ'],
    words: ['الْكُتُبُ', 'جَدِيدَةٌ', 'جَدِيدٌ', 'كِتَابٌ'],
    explanation: 'Non-human plural: الْكُتُبُ جَدِيدَةٌ. Non-human plurals treated as feminine singular.',
    translation: 'The books are new',
  },
  {
    type: 'sentenceBuilder',
    prompt: 'Build: "Allah created the earth"',
    correctSentence: ['خَلَقَ', 'اللهُ', 'الأَرْضَ'],
    words: ['خَلَقَ', 'اللهُ', 'الأَرْضَ', 'الأَرْضُ', 'اللهَ'],
    explanation: 'VSO: خَلَقَ اللهُ الأَرْضَ (Allah created the earth). Classic example from lessons.',
    translation: 'Allah created the earth',
  },
];

// Exam Preparation Checklist Questions
const examPrepQuestions = [
  {
    type: 'multiple',
    question: 'What is the Arabic term for nominal sentence?',
    options: ['جُمْلَة اِسْمِيَّة', 'جُمْلَة فِعْلِيَّة', 'فِعْل', 'حَرْف'],
    correct: 0,
    explanation: 'Nominal sentence is جُمْلَة اِسْمِيَّة (jumla ismiyya). It begins with a noun.'
  },
  {
    type: 'multiple',
    question: 'How many components does a nominal sentence have?',
    options: ['1', '2', '3', '4'],
    correct: 1,
    explanation: 'A nominal sentence has 2 components: Mubtada (subject) and Khabr (predicate).'
  },
  {
    type: 'multiple',
    question: 'What is the Arabic term for the subject of a nominal sentence?',
    options: ['مُبْتَدَأ', 'خَبَر', 'فَاعِل', 'مَفْعُول'],
    correct: 0,
    explanation: 'The subject of a nominal sentence is called مُبْتَدَأ (mubtada).'
  },
  {
    type: 'multiple',
    question: 'What is the Arabic term for the predicate of a nominal sentence?',
    options: ['مُبْتَدَأ', 'خَبَر', 'فَاعِل', 'مَفْعُول'],
    correct: 1,
    explanation: 'The predicate of a nominal sentence is called خَبَر (khabr).'
  },
  {
    type: 'trueFalse',
    question: 'The Mubtada and Khabr must always match in gender.',
    correct: true,
    explanation: 'True. The Mubtada and Khabr must agree in gender (masculine/feminine).'
  },
  {
    type: 'trueFalse',
    question: 'The Mubtada and Khabr must always match in number.',
    correct: true,
    explanation: 'True. The Mubtada and Khabr must agree in number (singular/dual/plural).'
  },
  {
    type: 'multiple',
    question: 'What case (i\'raab) is the Mubtada in?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'Jazm'],
    correct: 0,
    explanation: 'The Mubtada is always Marfoo\' (nominative case) with dhamma.'
  },
  {
    type: 'multiple',
    question: 'What case (i\'raab) is the Khabr in?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'Jazm'],
    correct: 0,
    explanation: 'The Khabr is always Marfoo\' (nominative case) with dhamma.'
  },
  {
    type: 'multiple',
    question: 'What is the Arabic term for adjective (descriptor)?',
    options: ['صِفَة', 'مَوْصُوف', 'مُضَاف', 'مُضَاف إِلَيْهِ'],
    correct: 0,
    explanation: 'The adjective/descriptor is called صِفَة (sifa).'
  },
  {
    type: 'multiple',
    question: 'What is the Arabic term for the described noun?',
    options: ['صِفَة', 'مَوْصُوف', 'مُضَاف', 'مُضَاف إِلَيْهِ'],
    correct: 1,
    explanation: 'The described noun is called مَوْصُوف (mawsoof).'
  },
  {
    type: 'trueFalse',
    question: 'The Sifa (adjective) must match the Mawsoof (noun) in definiteness.',
    correct: true,
    explanation: 'True. If the noun has ال, the adjective must also have ال. If the noun has tanween, the adjective must also have tanween.'
  },
  {
    type: 'trueFalse',
    question: 'The Sifa (adjective) must match the Mawsoof (noun) in case.',
    correct: true,
    explanation: 'True. The adjective follows the noun in case (Marfoo\', Mansoob, or Majroor).'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The man is big"',
    correct: 'الرَّجُلُ كَبِيرٌ',
    options: [
      'الرَّجُلُ كَبِيرٌ',
      'رَجُلٌ كَبِيرٌ',
      'الرَّجُلُ الْكَبِيرُ',
      'كَبِيرٌ الرَّجُلُ'
    ],
    explanation: 'الرَّجُلُ كَبِيرٌ - Mubtada (الرَّجُلُ) is definite, Khabr (كَبِيرٌ) is indefinite.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The tall man is strong"',
    correct: 'الرَّجُلُ الطَّوِيلُ قَوِيٌّ',
    options: [
      'الرَّجُلُ الطَّوِيلُ قَوِيٌّ',
      'الرَّجُلُ طَوِيلٌ قَوِيٌّ',
      'رَجُلٌ طَوِيلٌ قَوِيٌّ',
      'الطَّوِيلُ الرَّجُلُ قَوِيٌّ'
    ],
    explanation: 'الرَّجُلُ الطَّوِيلُ قَوِيٌّ - الطَّوِيلُ is Sifa of الرَّجُلُ (both definite), قَوِيٌّ is Khabr (indefinite).'
  },
  {
    type: 'trueFalse',
    question: 'Non-human plurals are treated as feminine singular in Arabic grammar.',
    correct: true,
    explanation: 'True. Non-human plurals (animals, objects) take feminine singular agreement.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The dogs are big" (treating as non-human)',
    correct: 'الْكِلَابُ كَبِيرَةٌ',
    options: [
      'الْكِلَابُ كَبِيرَةٌ',
      'الْكِلَابُ كَبِيرٌ',
      'الْكِلَابُ كَبِيرُونَ',
      'كِلَابٌ كَبِيرَةٌ'
    ],
    explanation: 'الْكِلَابُ كَبِيرَةٌ - Non-human plural (الْكِلَابُ) takes feminine singular Khabr (كَبِيرَةٌ).'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The big dogs are strong" (non-human)',
    correct: 'الْكِلَابُ الْكَبِيرَةُ قَوِيَّةٌ',
    options: [
      'الْكِلَابُ الْكَبِيرَةُ قَوِيَّةٌ',
      'الْكِلَابُ الْكَبِيرُ قَوِيٌّ',
      'الْكِلَابُ كَبِيرَةٌ قَوِيَّةٌ',
      'كِلَابٌ كَبِيرَةٌ قَوِيَّةٌ'
    ],
    explanation: 'الْكِلَابُ الْكَبِيرَةُ قَوِيَّةٌ - Both Sifa and Khabr are feminine singular for non-human plural.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The man is in the school"',
    correct: 'الرَّجُلُ فِي الْمَدْرَسَةِ',
    options: [
      'الرَّجُلُ فِي الْمَدْرَسَةِ',
      'الرَّجُلُ فِي الْمَدْرَسَةُ',
      'رَجُلٌ فِي مَدْرَسَةٍ',
      'فِي الْمَدْرَسَةِ الرَّجُلُ'
    ],
    explanation: 'الرَّجُلُ فِي الْمَدْرَسَةِ - Preposition فِي makes الْمَدْرَسَةِ Majroor (kasra).'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The man is from India"',
    correct: 'الرَّجُلُ مِنَ الْهِنْدِ',
    options: [
      'الرَّجُلُ مِنَ الْهِنْدِ',
      'الرَّجُلُ مِنَ الْهِنْدُ',
      'رَجُلٌ مِنَ هِنْدٍ',
      'مِنَ الْهِنْدِ الرَّجُلُ'
    ],
    explanation: 'الرَّجُلُ مِنَ الْهِنْدِ - Preposition مِنَ makes الْهِنْدِ Majroor.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The man from India is big"',
    correct: 'الرَّجُلُ مِنَ الْهِنْدِ كَبِيرٌ',
    options: [
      'الرَّجُلُ مِنَ الْهِنْدِ كَبِيرٌ',
      'الرَّجُلُ الْكَبِيرُ مِنَ الْهِنْدِ',
      'رَجُلٌ مِنَ الْهِنْدِ كَبِيرٌ',
      'الْكَبِيرُ الرَّجُلُ مِنَ الْهِنْدِ'
    ],
    explanation: 'الرَّجُلُ مِنَ الْهِنْدِ كَبِيرٌ - Prepositional phrase (مِنَ الْهِنْدِ) describes Mubtada, كَبِيرٌ is Khabr.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The man from India is in the house"',
    correct: 'الرَّجُلُ مِنَ الْهِنْدِ فِي الْبَيْتِ',
    options: [
      'الرَّجُلُ مِنَ الْهِنْدِ فِي الْبَيْتِ',
      'الرَّجُلُ فِي الْبَيْتِ مِنَ الْهِنْدِ',
      'رَجُلٌ مِنَ الْهِنْدِ فِي بَيْتٍ',
      'مِنَ الْهِنْدِ الرَّجُلُ فِي الْبَيْتِ'
    ],
    explanation: 'الرَّجُلُ مِنَ الْهِنْدِ فِي الْبَيْتِ - First prepositional phrase describes Mubtada, second is Khabr.'
  },
  {
    type: 'multiple',
    question: 'In an Idaafa construction, what is the first word called?',
    options: ['مُضَاف', 'مُضَاف إِلَيْهِ', 'صِفَة', 'خَبَر'],
    correct: 0,
    explanation: 'The first word in Idaafa is called مُضَاف (mudaaf) - the possessed.'
  },
  {
    type: 'multiple',
    question: 'In an Idaafa construction, what is the second word called?',
    options: ['مُضَاف', 'مُضَاف إِلَيْهِ', 'صِفَة', 'خَبَر'],
    correct: 1,
    explanation: 'The second word in Idaafa is called مُضَاف إِلَيْهِ (mudaaf ilayhi) - the possessor.'
  },
  {
    type: 'trueFalse',
    question: 'In an Idaafa construction, the Mudaaf (first word) can have ال (alif laam).',
    correct: false,
    explanation: 'False. The Mudaaf never takes ال. Only the Mudaaf ilayhi can have ال.'
  },
  {
    type: 'trueFalse',
    question: 'In an Idaafa construction, the Mudaaf ilayhi (second word) is always Majroor.',
    correct: true,
    explanation: 'True. The Mudaaf ilayhi is always in the Majroor case (with kasra).'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "the man\'s house"',
    correct: 'بَيْتُ الرَّجُلِ',
    options: [
      'بَيْتُ الرَّجُلِ',
      'الْبَيْتُ الرَّجُلِ',
      'بَيْتٌ رَجُلٍ',
      'الْبَيْتُ لِلرَّجُلِ'
    ],
    explanation: 'بَيْتُ الرَّجُلِ - Mudaaf (بَيْتُ) has no ال, Mudaaf ilayhi (الرَّجُلِ) is Majroor.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The man\'s house is big"',
    correct: 'بَيْتُ الرَّجُلِ كَبِيرٌ',
    options: [
      'بَيْتُ الرَّجُلِ كَبِيرٌ',
      'الْبَيْتُ الرَّجُلِ كَبِيرٌ',
      'بَيْتُ رَجُلٍ كَبِيرٌ',
      'الرَّجُلُ بَيْتُهُ كَبِيرٌ'
    ],
    explanation: 'بَيْتُ الرَّجُلِ كَبِيرٌ - Idaafa (بَيْتُ الرَّجُلِ) is Mubtada, كَبِيرٌ is Khabr.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The man is the boy\'s dad"',
    correct: 'الرَّجُلُ أَبُو الْوَلَدِ',
    options: [
      'الرَّجُلُ أَبُو الْوَلَدِ',
      'الرَّجُلُ أَبٌ لِلْوَلَدِ',
      'رَجُلٌ أَبُو وَلَدٍ',
      'أَبُو الْوَلَدِ الرَّجُلُ'
    ],
    explanation: 'الرَّجُلُ أَبُو الْوَلَدِ - Mubtada is الرَّجُلُ, Khabr is Idaafa أَبُو الْوَلَدِ.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "The girl\'s dad is the man\'s friend"',
    correct: 'أَبُو الْبِنْتِ صَدِيقُ الرَّجُلِ',
    options: [
      'أَبُو الْبِنْتِ صَدِيقُ الرَّجُلِ',
      'الْأَبُ الْبِنْتِ صَدِيقُ الرَّجُلِ',
      'أَبٌ لِبِنْتٍ صَدِيقٌ لِرَجُلٍ',
      'الْبِنْتُ أَبُوهَا صَدِيقُ الرَّجُلِ'
    ],
    explanation: 'أَبُو الْبِنْتِ صَدِيقُ الرَّجُلِ - Both Mubtada and Khabr are Idaafa constructions.'
  },
  {
    type: 'trueFalse',
    question: 'An adjective describing the Mudaaf should be definite (have ال) if the construction is definite.',
    correct: true,
    explanation: 'True. The adjective matches the definiteness of the whole Idaafa construction.'
  },
  {
    type: 'trueFalse',
    question: 'An adjective describing the Mudaaf ilayhi must match the Mudaaf ilayhi in definiteness.',
    correct: true,
    explanation: 'True. The adjective of Mudaaf ilayhi matches its definiteness directly.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "the tall son of the mother"',
    correct: 'اِبْنُ الْأُمِّ الطَّوِيلُ',
    options: [
      'اِبْنُ الْأُمِّ الطَّوِيلُ',
      'الِابْنُ الطَّوِيلُ الْأُمِّ',
      'اِبْنٌ طَوِيلٌ أُمٍّ',
      'الطَّوِيلُ اِبْنُ الْأُمِّ'
    ],
    explanation: 'اِبْنُ الْأُمِّ الطَّوِيلُ - Adjective الطَّوِيلُ (definite) describes Mudaaf (اِبْنُ), comes after the whole Idaafa.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "a tall son of a mother"',
    correct: 'اِبْنٌ طَوِيلٌ لِأُمٍّ',
    options: [
      'اِبْنٌ طَوِيلٌ لِأُمٍّ',
      'اِبْنُ أُمٍّ طَوِيلٌ',
      'الِابْنُ الطَّوِيلُ لِأُمٍّ',
      'طَوِيلٌ اِبْنٌ لِأُمٍّ'
    ],
    explanation: 'اِبْنٌ طَوِيلٌ لِأُمٍّ - When indefinite, we often use لِ construction. Adjective طَوِيلٌ follows اِبْنٌ.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "the son of the tall mother"',
    correct: 'اِبْنُ الْأُمِّ الطَّوِيلَةِ',
    options: [
      'اِبْنُ الْأُمِّ الطَّوِيلَةِ',
      'اِبْنُ الطَّوِيلَةِ الْأُمِّ',
      'الِابْنُ الْأُمِّ الطَّوِيلَةِ',
      'اِبْنٌ أُمٍّ طَوِيلَةٍ'
    ],
    explanation: 'اِبْنُ الْأُمِّ الطَّوِيلَةِ - Adjective الطَّوِيلَةِ (definite, feminine, Majroor) describes الْأُمِّ.'
  },
  {
    type: 'translation',
    question: 'Translate to Arabic: "a son of a tall mother"',
    correct: 'اِبْنُ أُمٍّ طَوِيلَةٍ',
    options: [
      'اِبْنُ أُمٍّ طَوِيلَةٍ',
      'اِبْنٌ لِأُمٍّ طَوِيلَةٍ',
      'الِابْنُ أُمٍّ طَوِيلَةٍ',
      'أُمٍّ طَوِيلَةٍ اِبْنٌ'
    ],
    explanation: 'اِبْنُ أُمٍّ طَوِيلَةٍ - Idaafa remains indefinite. Adjective طَوِيلَةٍ (indefinite, feminine, Majroor) describes أُمٍّ.'
  },
  {
    type: 'multiple',
    question: 'In "The tall man is strong", what is الطَّوِيلُ?',
    options: ['Sifa of Mubtada', 'Khabr', 'Mudaaf', 'Mudaaf ilayhi'],
    correct: 0,
    explanation: 'الطَّوِيلُ is a Sifa (adjective) describing the Mubtada (الرَّجُلُ). The Khabr is قَوِيٌّ.'
  },
  {
    type: 'multiple',
    question: 'In "The tall man is a strong soldier", what is الطَّوِيلُ?',
    options: ['Sifa of Mubtada', 'Khabr', 'Sifa of Khabr', 'Mudaaf'],
    correct: 0,
    explanation: 'الطَّوِيلُ is Sifa of Mubtada (الرَّجُلُ). The Khabr is جُنْدِيٌّ قَوِيٌّ (a strong soldier).'
  },
  {
    type: 'multiple',
    question: 'How do you identify if an adjective is describing the Mubtada vs being the Khabr?',
    options: [
      'If there\'s another word after it that can be Khabr, it\'s a Sifa',
      'If it comes first, it\'s Khabr',
      'If it has ال, it\'s always Sifa',
      'If it\'s indefinite, it\'s always Khabr'
    ],
    correct: 0,
    explanation: 'If there\'s another word that can serve as Khabr, the adjective is a Sifa of Mubtada. Otherwise, the adjective itself is the Khabr.'
  },
];

// Rules Testing Questions - Focused on grammatical rules
const rulesQuestions = [
  {
    type: 'multiple',
    question: 'What is the case marker for Marfoo\' (nominative) on a singular noun?',
    options: ['Dhamma (ُ)', 'Fatha (َ)', 'Kasra (ِ)', 'Sukoon (ْ)'],
    correct: 0,
    explanation: 'Marfoo\' case is marked by dhamma (ُ) on singular nouns, e.g., طَالِبٌ or الطَّالِبُ.'
  },
  {
    type: 'multiple',
    question: 'What is the case marker for Mansoob (accusative) on a singular noun?',
    options: ['Dhamma (ُ)', 'Fatha (َ)', 'Kasra (ِ)', 'Sukoon (ْ)'],
    correct: 1,
    explanation: 'Mansoob case is marked by fatha (َ) on singular nouns, e.g., طَالِبًا or الطَّالِبَ.'
  },
  {
    type: 'multiple',
    question: 'What is the case marker for Majroor (genitive) on a singular noun?',
    options: ['Dhamma (ُ)', 'Fatha (َ)', 'Kasra (ِ)', 'Sukoon (ْ)'],
    correct: 2,
    explanation: 'Majroor case is marked by kasra (ِ) on singular nouns, e.g., طَالِبٍ or الطَّالِبِ.'
  },
  {
    type: 'multiple',
    question: 'For dual nouns, what changes in Mansoob and Majroor cases?',
    options: ['The alif (انِ) becomes yaa (َيْنِ)', 'Nothing changes', 'They lose the tanween', 'They add extra alif'],
    correct: 0,
    explanation: 'Dual nouns change from انِ (Marfoo\') to َيْنِ (Mansoob/Majroor), e.g., طَالِبَانِ → طَالِبَيْنِ.'
  },
  {
    type: 'multiple',
    question: 'For masculine sound plural, what changes in Mansoob and Majroor cases?',
    options: ['ونَ becomes ينَ', 'Nothing changes', 'They lose the noon', 'They add tanween'],
    correct: 0,
    explanation: 'Masculine sound plural changes from ونَ (Marfoo\') to ينَ (Mansoob/Majroor), e.g., مُسْلِمُونَ → مُسْلِمِينَ.'
  },
  {
    type: 'trueFalse',
    question: 'A noun cannot have both alif laam (ال) and tanween at the same time.',
    correct: true,
    explanation: 'True. A noun is either definite (with ال) or indefinite (with tanween), never both.'
  },
  {
    type: 'trueFalse',
    question: 'When a noun has alif laam (ال), it is definite.',
    correct: true,
    explanation: 'True. الْ makes a noun definite, e.g., الْكِتَابُ (the book) vs كِتَابٌ (a book).'
  },
  {
    type: 'trueFalse',
    question: 'When a noun has tanween (ً ٌ ٍ), it is definite.',
    correct: false,
    explanation: 'False. Tanween indicates indefiniteness, e.g., كِتَابٌ (a book) is indefinite.'
  },
  {
    type: 'multiple',
    question: 'Which of these makes a noun definite?',
    options: ['Alif laam (ال)', 'Tanween', 'Kasra', 'Fatha'],
    correct: 0,
    explanation: 'Alif laam (ال) makes a noun definite. Example: الْكِتَابُ (the book).'
  },
  {
    type: 'trueFalse',
    question: 'In Idaafa, the first word (Mudaaf) can take alif laam (ال).',
    correct: false,
    explanation: 'False. The Mudaaf never takes ال. It gets definiteness from the Mudaaf ilayhi.'
  },
  {
    type: 'multiple',
    question: 'How many things must a Sifa (adjective) match with its Mawsoof (noun)?',
    options: ['4 things', '3 things', '2 things', '1 thing'],
    correct: 0,
    explanation: 'A Sifa must match its Mawsoof in 4 things: gender, number, case, and definiteness.'
  },
  {
    type: 'trueFalse',
    question: 'In Sifa-Mawsoof, if the noun is definite, the adjective must also be definite.',
    correct: true,
    explanation: 'True. The adjective must match in definiteness: الْبَيْتُ الْكَبِيرُ (both definite).'
  },
  {
    type: 'trueFalse',
    question: 'In Sifa-Mawsoof, if the noun is indefinite, the adjective must also be indefinite.',
    correct: true,
    explanation: 'True. The adjective must match in definiteness: بَيْتٌ كَبِيرٌ (both indefinite).'
  },
  {
    type: 'trueFalse',
    question: 'The adjective always comes AFTER the noun in Arabic.',
    correct: true,
    explanation: 'True. Unlike English, in Arabic the adjective follows the noun: بَيْتٌ كَبِيرٌ (house big).'
  },
  {
    type: 'trueFalse',
    question: 'The Mubtada (subject) and Khabr (predicate) must match in definiteness.',
    correct: false,
    explanation: 'False. Typically the Mubtada is definite and the Khabr is indefinite: الطَّالِبُ مُجْتَهِدٌ.'
  },
  {
    type: 'trueFalse',
    question: 'The Mubtada (subject) and Khabr (predicate) must match in gender.',
    correct: true,
    explanation: 'True. They must agree in gender: الطَّالِبُ مُجْتَهِدٌ (masc.) or الطَّالِبَةُ مُجْتَهِدَةٌ (fem.).'
  },
  {
    type: 'trueFalse',
    question: 'The Mubtada (subject) and Khabr (predicate) must match in number.',
    correct: true,
    explanation: 'True. They must agree in number: الطَّالِبَانِ مُجْتَهِدَانِ (dual), الطُّلَّابُ مُجْتَهِدُونَ (plural).'
  },
  {
    type: 'multiple',
    question: 'What case is the Mubtada (subject) always in?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'Any case'],
    correct: 0,
    explanation: 'The Mubtada is always Marfoo\' (nominative): الطَّالِبُ مُجْتَهِدٌ.'
  },
  {
    type: 'multiple',
    question: 'What case is the Khabr (predicate) always in?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'Any case'],
    correct: 0,
    explanation: 'The Khabr is always Marfoo\' (nominative): الطَّالِبُ مُجْتَهِدٌ.'
  },
  {
    type: 'trueFalse',
    question: 'Non-human plurals are treated as feminine singular in Arabic grammar.',
    correct: true,
    explanation: 'True. Animals and objects in plural form take feminine singular agreement: الْكُتُبُ جَدِيدَةٌ.'
  },
  {
    type: 'multiple',
    question: 'How should you describe الْكُتُبُ (the books) with an adjective?',
    options: ['Feminine singular (جَدِيدَةٌ)', 'Masculine plural (جُدُدٌ)', 'Feminine plural (جَدِيدَاتٌ)', 'Any form'],
    correct: 0,
    explanation: 'Non-human plurals take feminine singular: الْكُتُبُ جَدِيدَةٌ (the books are new).'
  },
  {
    type: 'trueFalse',
    question: 'Human plurals also follow the non-human plural rule (feminine singular).',
    correct: false,
    explanation: 'False. Human plurals use regular agreement: الرِّجَالُ طَوِيلُونَ (masculine plural).'
  },
  {
    type: 'trueFalse',
    question: 'In Idaafa, the Mudaaf (first word) never has alif laam (ال).',
    correct: true,
    explanation: 'True. The Mudaaf never takes ال: بَيْتُ الرَّجُلِ (not الْبَيْتُ الرَّجُلِ).'
  },
  {
    type: 'trueFalse',
    question: 'In Idaafa, the Mudaaf (first word) never has tanween.',
    correct: true,
    explanation: 'True. The Mudaaf loses tanween in Idaafa: بَيْتُ الرَّجُلِ (not بَيْتٌ الرَّجُلِ).'
  },
  {
    type: 'trueFalse',
    question: 'In Idaafa, the Mudaaf ilayhi (second word) is always Majroor.',
    correct: true,
    explanation: 'True. The Mudaaf ilayhi is always in Majroor case: بَيْتُ الرَّجُلِ (الرَّجُلِ is Majroor).'
  },
  {
    type: 'multiple',
    question: 'In بَيْتُ الرَّجُلِ (the man\'s house), which word gives definiteness to the whole phrase?',
    options: ['الرَّجُلِ (second word)', 'بَيْتُ (first word)', 'Both words', 'Neither word'],
    correct: 0,
    explanation: 'The Mudaaf ilayhi (الرَّجُلِ) gives definiteness to the whole Idaafa. The phrase means "THE man\'s house".'
  },
  {
    type: 'trueFalse',
    question: 'You can separate the Mudaaf and Mudaaf ilayhi with other words.',
    correct: false,
    explanation: 'False. The Mudaaf and Mudaaf ilayhi must be directly connected with no words between them.'
  },
  {
    type: 'trueFalse',
    question: 'All prepositions (Harf Jar) make the following noun Majroor.',
    correct: true,
    explanation: 'True. Prepositions always make the noun after them Majroor: فِي الْبَيْتِ (in the house).'
  },
  {
    type: 'multiple',
    question: 'What case must a noun be in after a preposition (في، على، من, etc.)?',
    options: ['Majroor', 'Marfoo\'', 'Mansoob', 'Any case'],
    correct: 0,
    explanation: 'Nouns after prepositions are always Majroor: فِي الْمَسْجِدِ، عَلَى الطَّاوِلَةِ.'
  },
  {
    type: 'multiple',
    question: 'What is the typical word order in an Arabic verbal sentence?',
    options: ['Verb-Subject-Object (VSO)', 'Subject-Verb-Object (SVO)', 'Object-Verb-Subject (OVS)', 'Subject-Object-Verb (SOV)'],
    correct: 0,
    explanation: 'Arabic verbal sentences typically follow VSO order: كَتَبَ الطَّالِبُ الدَّرْسَ (wrote the-student the-lesson).'
  },
  {
    type: 'multiple',
    question: 'What case is the Fa\'il (doer/subject) in a verbal sentence?',
    options: ['Marfoo\'', 'Mansoob', 'Majroor', 'Any case'],
    correct: 0,
    explanation: 'The Fa\'il is always Marfoo\': كَتَبَ الطَّالِبُ (the student wrote).'
  },
  {
    type: 'multiple',
    question: 'What case is the Maf\'ool (object) in a verbal sentence?',
    options: ['Mansoob', 'Marfoo\'', 'Majroor', 'Any case'],
    correct: 0,
    explanation: 'The Maf\'ool is always Mansoob: كَتَبَ الطَّالِبُ الدَّرْسَ (wrote the-student the-lesson).'
  },
  {
    type: 'trueFalse',
    question: 'When the subject (Fa\'il) is feminine, the verb takes the تْ (taa marbuta) marker.',
    correct: true,
    explanation: 'True. Feminine subjects take feminine verbs: كَتَبَتْ الطَّالِبَةُ (the female student wrote).'
  },
  {
    type: 'trueFalse',
    question: 'Broken plurals use the same case endings as singular nouns.',
    correct: true,
    explanation: 'True. Broken plurals take singular case markers: كُتُبٌ (Marfoo\'), كُتُبًا (Mansoob), كُتُبٍ (Majroor).'
  },
  {
    type: 'trueFalse',
    question: 'Sound plurals change their endings based on case.',
    correct: true,
    explanation: 'True. Sound masculine plural: ونَ (Marfoo\') vs ينَ (Mansoob/Majroor). Sound feminine plural: اتٌ (Marfoo\') vs اتٍ (Majroor).'
  },
  {
    type: 'multiple',
    question: 'Which tanween indicates Marfoo\' case?',
    options: ['ٌ (dhamma tanween)', 'ً (fatha tanween)', 'ٍ (kasra tanween)', 'All of them'],
    correct: 0,
    explanation: 'Dhamma tanween (ٌ) indicates Marfoo\' case: كِتَابٌ، طَالِبٌ.'
  },
  {
    type: 'multiple',
    question: 'Which tanween indicates Mansoob case?',
    options: ['ً (fatha tanween)', 'ٌ (dhamma tanween)', 'ٍ (kasra tanween)', 'All of them'],
    correct: 0,
    explanation: 'Fatha tanween (ً) indicates Mansoob case: كِتَابًا، طَالِبًا.'
  },
  {
    type: 'multiple',
    question: 'Which tanween indicates Majroor case?',
    options: ['ٍ (kasra tanween)', 'ٌ (dhamma tanween)', 'ً (fatha tanween)', 'All of them'],
    correct: 0,
    explanation: 'Kasra tanween (ٍ) indicates Majroor case: كِتَابٍ، طَالِبٍ.'
  },
  {
    type: 'trueFalse',
    question: 'Mansoob tanween (ً) is written on an extra alif for most words.',
    correct: true,
    explanation: 'True. Mansoob tanween is usually written as ـًا with an extra alif: كِتَابًا، طَالِبًا.'
  },
  {
    type: 'trueFalse',
    question: 'Feminine nouns typically end with taa marbuta (ة).',
    correct: true,
    explanation: 'True. Most feminine nouns end with ة: طَالِبَةٌ، مَدْرَسَةٌ، سَيَّارَةٌ.'
  },
  {
    type: 'trueFalse',
    question: 'All nouns ending in taa marbuta (ة) are feminine.',
    correct: true,
    explanation: 'True. Nouns ending in ة are grammatically feminine: مَدِينَةٌ، غُرْفَةٌ.'
  },
  {
    type: 'trueFalse',
    question: 'Some nouns are feminine even without taa marbuta (ة).',
    correct: true,
    explanation: 'True. Some nouns are inherently feminine: أُمٌّ (mother), شَمْسٌ (sun), أَرْضٌ (earth).'
  },
  {
    type: 'multiple',
    question: 'How many forms does a noun have for number in Arabic?',
    options: ['3 (singular, dual, plural)', '2 (singular, plural)', '4 (singular, dual, collective)', '1 (only singular)'],
    correct: 0,
    explanation: 'Arabic nouns have 3 number forms: singular (مُفْرَد), dual (مُثَنَّى), and plural (جَمْع).'
  },
  {
    type: 'multiple',
    question: 'What is the dual ending for Marfoo\' case?',
    options: ['انِ', 'َيْنِ', 'ونَ', 'اتٌ'],
    correct: 0,
    explanation: 'Dual Marfoo\' ends in انِ: طَالِبَانِ، مُعَلِّمَانِ.'
  },
  {
    type: 'multiple',
    question: 'What is the dual ending for Mansoob and Majroor cases?',
    options: ['َيْنِ', 'انِ', 'ينَ', 'اتٍ'],
    correct: 0,
    explanation: 'Dual Mansoob/Majroor ends in َيْنِ: طَالِبَيْنِ، مُعَلِّمَيْنِ.'
  },
  {
    type: 'trueFalse',
    question: 'An adjective describing the Mudaaf in Idaafa must be definite if the whole Idaafa is definite.',
    correct: true,
    explanation: 'True. If the Idaafa is definite (due to Mudaaf ilayhi), the adjective of Mudaaf is definite: بَيْتُ الرَّجُلِ الْكَبِيرُ.'
  },
  {
    type: 'trueFalse',
    question: 'An adjective describing the Mudaaf ilayhi matches the Mudaaf ilayhi\'s definiteness directly.',
    correct: true,
    explanation: 'True. The adjective matches what it describes: بَيْتُ الرَّجُلِ الطَّوِيلِ (adjective matches الرَّجُلِ).'
  },
  {
    type: 'multiple',
    question: 'Where does an adjective of the Mudaaf appear?',
    options: ['After the complete Idaafa', 'Between Mudaaf and Mudaaf ilayhi', 'Before the Idaafa', 'Anywhere'],
    correct: 0,
    explanation: 'The adjective of Mudaaf comes AFTER the complete Idaafa: بَيْتُ الرَّجُلِ الْكَبِيرُ (the man\'s big house).'
  },
  {
    type: 'multiple',
    question: 'Where does an adjective of the Mudaaf ilayhi appear?',
    options: ['After the complete Idaafa', 'Between Mudaaf and Mudaaf ilayhi', 'Before the Idaafa', 'Anywhere'],
    correct: 0,
    explanation: 'The adjective of Mudaaf ilayhi also comes AFTER: بَيْتُ الرَّجُلِ الطَّوِيلِ (the tall man\'s house).'
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
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState([]); // Track all answers for review
  const [showReview, setShowReview] = useState(false); // Show review screen
  const [sentenceBuilderAnswer, setSentenceBuilderAnswer] = useState([]); // User's arranged sentence
  const [availableWords, setAvailableWords] = useState([]); // Words to choose from

  // Timer effect for mock exam
  useEffect(() => {
    if (quizMode === 'mock' && examStarted && timeRemaining > 0 && !quizComplete) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [quizMode, examStarted, timeRemaining, quizComplete]);

  // Track mock exam answers as they're selected (so we don't lose them)
  useEffect(() => {
    if (quizMode === 'mock' && questions.length > 0 && !quizComplete) {
      const question = questions[currentQuestion];
      
      // Only track if there's actually an answer
      const hasAnswer = question.type === 'matching' 
        ? Object.keys(matchingAnswers).length > 0
        : selectedAnswer !== null;
      
      if (hasAnswer) {
        // Check if we already have this answer saved
        const existingIndex = userAnswersHistory.findIndex(a => a.questionIndex === currentQuestion);
        
        let isCorrect = false;
        let userAnswer = null;

        if (question.type === 'matching') {
          isCorrect =
            Object.keys(matchingAnswers).length === question.pairs.length &&
            question.pairs.every((pair) => matchingAnswers[pair.left] === pair.right);
          userAnswer = { ...matchingAnswers };
        } else {
          isCorrect = selectedAnswer === question.correct;
          userAnswer = selectedAnswer;
        }

        const answerRecord = {
          question: question,
          userAnswer: userAnswer,
          isCorrect: isCorrect,
          questionIndex: currentQuestion
        };

        // Update or add the answer
        let updatedHistory;
        if (existingIndex >= 0) {
          updatedHistory = [...userAnswersHistory];
          updatedHistory[existingIndex] = answerRecord;
        } else {
          updatedHistory = [...userAnswersHistory, answerRecord];
        }
        
        setUserAnswersHistory(updatedHistory);
      }
    }
  }, [selectedAnswer, matchingAnswers, currentQuestion, quizMode]);

  // Shuffle right-side options when question changes
  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestion]?.type === 'matching') {
      const rightOptions = questions[currentQuestion].pairs.map(pair => pair.right);
      setShuffledRightOptions(shuffleArray(rightOptions));
    }
  }, [currentQuestion, questions]);

  // Initialize sentence builder words when question changes
  useEffect(() => {
    if (questions.length > 0 && questions[currentQuestion]?.type === 'sentenceBuilder') {
      const question = questions[currentQuestion];
      setAvailableWords(shuffleArray([...question.words]));
      setSentenceBuilderAnswer([]);
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
    } else if (mode === 'sentenceBuilder') {
      questionPool = [...sentenceBuilderQuestions];
    } else if (mode === 'rules') {
      questionPool = [...rulesQuestions];
    } else if (mode === 'mock') {
      // Mock exam: all questions combined
      questionPool = [
        ...theoryQuestions,
        ...vocabQuestions,
        ...tableQuestions,
        ...extraTranslationQuestions
      ];
      count = 50; // Mock exam always has 50 questions
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
    
    // Start timer for mock exam
    if (mode === 'mock') {
      setTimeRemaining(3600); // 60 minutes in seconds
      setExamStarted(true);
    }
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle mock exam submission
  const handleSubmitExam = () => {
    // Answers are already tracked in real-time via useEffect
    setQuizComplete(true);
    setExamStarted(false);
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

  // Sentence builder handlers
  const handleWordClick = (word) => {
    if (showFeedback) return;
    // Add word to answer and remove from available
    setSentenceBuilderAnswer([...sentenceBuilderAnswer, word]);
    setAvailableWords(availableWords.filter(w => w !== word));
  };

  const handleRemoveWord = (index) => {
    if (showFeedback) return;
    // Remove word from answer and add back to available
    const word = sentenceBuilderAnswer[index];
    setSentenceBuilderAnswer(sentenceBuilderAnswer.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  const handleClearSentence = () => {
    if (showFeedback) return;
    // Move all words back to available
    const question = questions[currentQuestion];
    setAvailableWords(shuffleArray([...question.words]));
    setSentenceBuilderAnswer([]);
  };

  const checkAnswer = () => {
    const question = questions[currentQuestion];
    let isCorrect = false;

    if (question.type === 'matching') {
      isCorrect =
        Object.keys(matchingAnswers).length === question.pairs.length &&
        question.pairs.every((pair) => matchingAnswers[pair.left] === pair.right);
    } else if (question.type === 'sentenceBuilder') {
      // Check if sentence matches correct order
      isCorrect =
        sentenceBuilderAnswer.length === question.correctSentence.length &&
        sentenceBuilderAnswer.every((word, index) => word === question.correctSentence[index]);
    } else {
      isCorrect = selectedAnswer === question.correct;
    }

    if (isCorrect) {
      setScore(score + 1);
    }

    // For mock exam, answers are already being tracked in useEffect
    // Just move to next question
    if (quizMode === 'mock') {
      nextQuestion();
    } else {
      setShowFeedback(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setMatchingAnswers({});
      setMatchingSelection({ left: null, right: null });
      setShuffledRightOptions([]);
      setSentenceBuilderAnswer([]);
      setAvailableWords([]);
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
    setTimeRemaining(null);
    setExamStarted(false);
    setUserAnswersHistory([]);
    setShowReview(false);
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

          <TouchableOpacity
            style={[styles.modeButton, styles.mockExamButton]}
            onPress={() => setQuizMode('mock')}>
            <Text style={styles.modeButtonText}>⏱️ Mock Exam</Text>
            <Text style={styles.modeButtonSubtext}>
              60 minutes • 50 questions • Timed assessment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeButton, styles.sentenceBuilderButton]}
            onPress={() => setQuizMode('sentenceBuilder')}>
            <Text style={styles.modeButtonText}>🔤 Sentence Builder</Text>
            <Text style={styles.modeButtonSubtext}>
              Arrange words to form correct Arabic sentences
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeButton, styles.rulesTestButton]}
            onPress={() => setQuizMode('rules')}>
            <Text style={styles.modeButtonText}>📋 Rules Test</Text>
            <Text style={styles.modeButtonSubtext}>
              Test your understanding of Arabic grammar rules
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Mock Exam setup screen
  if (quizMode === 'mock' && questionCount === null) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>⏱️ Mock Exam</Text>
            <Text style={styles.headerSubtitle}>Timed Assessment</Text>
          </View>

          <View style={styles.examInfoContainer}>
            <Text style={styles.examInfoTitle}>Exam Details:</Text>
            <Text style={styles.examInfoText}>
              ⏱️ Duration: 60 minutes{'\n'}
              📝 Questions: 50 (randomly selected){'\n'}
              🎯 Mix of all topics{'\n'}
              ❌ No feedback during exam{'\n'}
              ⏰ Timer starts immediately{'\n'}
              🔔 Auto-submit at time expiry
            </Text>
          </View>

          <TouchableOpacity
            style={styles.startExamButton}
            onPress={() => startQuiz('mock', 50)}>
            <Text style={styles.startExamButtonText}>Start Mock Exam</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setQuizMode(null)}>
            <Text style={styles.backButtonText}>← Back</Text>
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
      if (quizMode === 'sentenceBuilder') return sentenceBuilderQuestions.length;
      if (quizMode === 'rules') return rulesQuestions.length;
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
               quizMode === 'sentenceBuilder' ? '🔤 Sentence Builder' :
               quizMode === 'rules' ? '📋 Rules Test' :
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

    const timeTaken = quizMode === 'mock' ? formatTime(3600 - timeRemaining) : null;

    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>
              {quizMode === 'mock' ? 'Mock Exam Complete!' : 'Quiz Complete!'}
            </Text>
            <Text style={styles.resultScore}>
              Score: {score}/{questions.length}
            </Text>
            <Text style={styles.resultPercentage}>{percentage}%</Text>
            <Text style={styles.resultGrade}>{grade}</Text>
            
            {quizMode === 'mock' && timeTaken && (
              <Text style={styles.resultTime}>Time Taken: {timeTaken}</Text>
            )}
            
            {quizMode === 'mock' && (
              <TouchableOpacity 
                style={styles.reviewButton} 
                onPress={() => {
                  console.log('Review button clicked');
                  console.log('Answers history length:', userAnswersHistory.length);
                  console.log('Questions length:', questions.length);
                  setShowReview(true);
                }}>
                <Text style={styles.reviewButtonText}>
                  📋 Review All Answers ({userAnswersHistory.length}/{questions.length})
                </Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
              <Text style={styles.restartButtonText}>Start New Quiz</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Review screen (for mock exam)
  if (showReview && quizMode === 'mock') {
    // Recalculate score from saved answers for accuracy
    const calculatedScore = userAnswersHistory.filter(a => a.isCorrect).length;
    
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>📋 Answer Review</Text>
            <Text style={styles.headerSubtitle}>
              Score: {calculatedScore}/{questions.length} ({((calculatedScore / questions.length) * 100).toFixed(1)}%)
            </Text>
            <Text style={styles.headerSubtext}>
              Answered: {userAnswersHistory.length}/{questions.length}
            </Text>
          </View>

          {userAnswersHistory.length === 0 && (
            <View style={styles.noAnswersContainer}>
              <Text style={styles.noAnswersText}>
                ⚠️ No answers recorded. This may happen if you submitted without answering questions.
              </Text>
            </View>
          )}

          {questions.map((question, index) => {
            const answerRecord = userAnswersHistory.find(a => a.questionIndex === index);
            
            // If no answer record, skip or show as unanswered
            if (!answerRecord) {
              return (
                <View key={index} style={[styles.reviewQuestionCard, styles.reviewUnanswered]}>
                  <View style={styles.reviewQuestionHeader}>
                    <Text style={styles.reviewQuestionNumber}>Question {index + 1}</Text>
                    <Text style={[styles.reviewQuestionStatus, styles.statusUnanswered]}>
                      ⊘ Not Answered
                    </Text>
                  </View>
                  <Text style={styles.reviewQuestionText}>{question.question}</Text>
                  <View style={styles.reviewExplanationContainer}>
                    <Text style={styles.reviewExplanationTitle}>Explanation:</Text>
                    <Text style={styles.reviewExplanationText}>{question.explanation}</Text>
                  </View>
                </View>
              );
            }

            const isCorrect = answerRecord.isCorrect;

            return (
              <View key={index} style={[
                styles.reviewQuestionCard,
                isCorrect ? styles.reviewCorrect : styles.reviewIncorrect
              ]}>
                <View style={styles.reviewQuestionHeader}>
                  <Text style={styles.reviewQuestionNumber}>
                    Question {index + 1}
                  </Text>
                  <Text style={[
                    styles.reviewQuestionStatus,
                    isCorrect ? styles.statusCorrect : styles.statusIncorrect
                  ]}>
                    {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                  </Text>
                </View>

                <Text style={styles.reviewQuestionText}>{question.question}</Text>

                {question.type === 'multiple' && (
                  <View style={styles.reviewAnswersContainer}>
                    {question.options.map((option, optIndex) => {
                      const isUserAnswer = answerRecord?.userAnswer === optIndex;
                      const isCorrectAnswer = optIndex === question.correct;

                      return (
                        <View key={optIndex} style={[
                          styles.reviewAnswerOption,
                          isCorrectAnswer && styles.reviewCorrectAnswer,
                          isUserAnswer && !isCorrectAnswer && styles.reviewWrongAnswer
                        ]}>
                          <Text style={styles.reviewAnswerText}>
                            {isCorrectAnswer && '✓ '}
                            {isUserAnswer && !isCorrectAnswer && '✗ '}
                            {option}
                            {isUserAnswer && ' (Your answer)'}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}

                {question.type === 'trueFalse' && (
                  <View style={styles.reviewAnswersContainer}>
                    <View style={[
                      styles.reviewAnswerOption,
                      question.correct === true && styles.reviewCorrectAnswer,
                      answerRecord?.userAnswer === true && question.correct !== true && styles.reviewWrongAnswer
                    ]}>
                      <Text style={styles.reviewAnswerText}>
                        {question.correct === true && '✓ '}
                        {answerRecord?.userAnswer === true && question.correct !== true && '✗ '}
                        True
                        {answerRecord?.userAnswer === true && ' (Your answer)'}
                      </Text>
                    </View>
                    <View style={[
                      styles.reviewAnswerOption,
                      question.correct === false && styles.reviewCorrectAnswer,
                      answerRecord?.userAnswer === false && question.correct !== false && styles.reviewWrongAnswer
                    ]}>
                      <Text style={styles.reviewAnswerText}>
                        {question.correct === false && '✓ '}
                        {answerRecord?.userAnswer === false && question.correct !== false && '✗ '}
                        False
                        {answerRecord?.userAnswer === false && ' (Your answer)'}
                      </Text>
                    </View>
                  </View>
                )}

                {question.type === 'matching' && (
                  <View style={styles.reviewAnswersContainer}>
                    <Text style={styles.reviewMatchingTitle}>Correct Pairs:</Text>
                    {question.pairs.map((pair, pairIndex) => (
                      <Text key={pairIndex} style={styles.reviewMatchingPair}>
                        {pair.left} → {pair.right}
                      </Text>
                    ))}
                  </View>
                )}

                <View style={styles.reviewExplanationContainer}>
                  <Text style={styles.reviewExplanationTitle}>Explanation:</Text>
                  <Text style={styles.reviewExplanationText}>{question.explanation}</Text>
                </View>
              </View>
            );
          })}

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => setShowReview(false)}>
            <Text style={styles.backButtonText}>← Back to Results</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.restartButton} 
            onPress={restartQuiz}>
            <Text style={styles.restartButtonText}>Start New Quiz</Text>
          </TouchableOpacity>
        </ScrollView>
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
             quizMode === 'mock' ? '⏱️ Mock Exam' :
             '🎯 Combined Quiz'}
          </Text>
          <Text style={styles.headerProgress}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <Text style={styles.headerScore}>Score: {score}</Text>
          
          {/* Timer for mock exam */}
          {quizMode === 'mock' && timeRemaining !== null && (
            <View style={styles.timerContainer}>
              <Text style={[
                styles.timerText,
                timeRemaining < 300 && styles.timerWarning
              ]}>
                ⏰ Time: {formatTime(timeRemaining)}
              </Text>
            </View>
          )}
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

            {/* Sentence Builder */}
            {question.type === 'sentenceBuilder' && (
              <View style={styles.sentenceBuilderContainer}>
                {/* Built Sentence Area */}
                <View style={styles.builtSentenceArea}>
                  <Text style={styles.builtSentenceLabel}>Your Sentence:</Text>
                  <View style={styles.builtSentenceWords}>
                    {sentenceBuilderAnswer.length === 0 ? (
                      <Text style={styles.emptySentencePlaceholder}>
                        Tap words below to build sentence
                      </Text>
                    ) : (
                      sentenceBuilderAnswer.map((word, index) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.builtWord}
                          onPress={() => handleRemoveWord(index)}>
                          <Text style={styles.builtWordText}>{word}</Text>
                          <Text style={styles.removeWordIcon}>✕</Text>
                        </TouchableOpacity>
                      ))
                    )}
                  </View>
                </View>

                {/* Available Words */}
                <Text style={styles.availableWordsLabel}>Available Words:</Text>
                <View style={styles.availableWordsContainer}>
                  {availableWords.map((word, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.availableWord}
                      onPress={() => handleWordClick(word)}>
                      <Text style={styles.availableWordText}>{word}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Clear Button */}
                {sentenceBuilderAnswer.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearSentenceButton}
                    onPress={handleClearSentence}>
                    <Text style={styles.clearSentenceButtonText}>🔄 Clear</Text>
                  </TouchableOpacity>
                )}

                {/* Translation hint */}
                <View style={styles.translationHint}>
                  <Text style={styles.translationHintText}>
                    Translation: {question.translation}
                  </Text>
                </View>
              </View>
            )}

            {/* Submit Button */}
            {((question.type !== 'matching' && question.type !== 'sentenceBuilder' && selectedAnswer !== null) ||
              (question.type === 'matching' &&
                Object.keys(matchingAnswers).length === question.pairs.length) ||
              (question.type === 'sentenceBuilder' && sentenceBuilderAnswer.length > 0)) && (
              <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
                <Text style={styles.submitButtonText}>
                  {quizMode === 'mock' 
                    ? (currentQuestion < questions.length - 1 ? 'Next Question →' : 'Last Question →')
                    : 'Submit Answer'}
                </Text>
              </TouchableOpacity>
            )}
            
            {/* Submit Exam Button for Mock Exam */}
            {quizMode === 'mock' && (
              <TouchableOpacity 
                style={[styles.submitButton, styles.submitExamButton]} 
                onPress={handleSubmitExam}>
                <Text style={styles.submitButtonText}>🏁 Submit Exam</Text>
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
                  : question.type === 'sentenceBuilder'
                  ? sentenceBuilderAnswer.length === question.correctSentence.length &&
                    sentenceBuilderAnswer.every((word, index) => word === question.correctSentence[index])
                  : selectedAnswer === question.correct)
                  ? styles.feedbackCorrect
                  : styles.feedbackIncorrect,
              ]}>
              {question.type === 'matching'
                ? Object.keys(matchingAnswers).length === question.pairs.length &&
                  question.pairs.every((pair) => matchingAnswers[pair.left] === pair.right)
                  ? '✓ Correct!'
                  : '✗ Incorrect'
                : question.type === 'sentenceBuilder'
                ? sentenceBuilderAnswer.length === question.correctSentence.length &&
                  sentenceBuilderAnswer.every((word, index) => word === question.correctSentence[index])
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
                : question.type === 'sentenceBuilder'
                ? sentenceBuilderAnswer.length === question.correctSentence.length &&
                  sentenceBuilderAnswer.every((word, index) => word === question.correctSentence[index])
                  ? 'Perfect! ' + question.correctSentence.join(' ')
                  : 'Correct sentence: ' + question.correctSentence.join(' ')
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
  mockExamButton: {
    backgroundColor: '#e74c3c',
    borderWidth: 2,
    borderColor: '#c0392b',
  },
  timerContainer: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  timerWarning: {
    color: '#e74c3c',
    fontSize: 20,
  },
  examInfoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  examInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 12,
  },
  examInfoText: {
    fontSize: 16,
    lineHeight: 28,
    color: '#555',
  },
  startExamButton: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  startExamButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  submitExamButton: {
    backgroundColor: '#e74c3c',
    marginTop: 8,
  },
  resultTime: {
    fontSize: 18,
    color: '#666666',
    marginBottom: 16,
  },
  reviewButton: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  reviewButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  reviewQuestionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
  },
  reviewCorrect: {
    borderLeftColor: '#4CAF50',
  },
  reviewIncorrect: {
    borderLeftColor: '#F44336',
  },
  reviewQuestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewQuestionNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4788',
  },
  reviewQuestionStatus: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statusCorrect: {
    color: '#4CAF50',
  },
  statusIncorrect: {
    color: '#F44336',
  },
  reviewQuestionText: {
    fontSize: 18,
    color: '#333333',
    marginBottom: 16,
    lineHeight: 26,
  },
  reviewAnswersContainer: {
    marginBottom: 16,
  },
  reviewAnswerOption: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
  },
  reviewCorrectAnswer: {
    backgroundColor: '#e8f5e9',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  reviewWrongAnswer: {
    backgroundColor: '#ffebee',
    borderWidth: 2,
    borderColor: '#F44336',
  },
  reviewAnswerText: {
    fontSize: 16,
    color: '#333333',
  },
  reviewMatchingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 8,
  },
  reviewMatchingPair: {
    fontSize: 15,
    color: '#333333',
    marginBottom: 4,
    paddingLeft: 8,
  },
  reviewExplanationContainer: {
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  reviewExplanationTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 6,
  },
  reviewExplanationText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  reviewUnanswered: {
    borderLeftColor: '#999',
  },
  statusUnanswered: {
    color: '#999',
  },
  noAnswersContainer: {
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  noAnswersText: {
    fontSize: 16,
    color: '#856404',
    lineHeight: 24,
  },
  sentenceBuilderButton: {
    backgroundColor: '#9b59b6',
    borderWidth: 2,
    borderColor: '#8e44ad',
  },
  rulesTestButton: {
    backgroundColor: '#16a085',
    borderWidth: 2,
    borderColor: '#138d75',
  },
  sentenceBuilderContainer: {
    marginBottom: 16,
  },
  builtSentenceArea: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    minHeight: 100,
    borderWidth: 2,
    borderColor: '#1F4788',
  },
  builtSentenceLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F4788',
    marginBottom: 12,
  },
  builtSentenceWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  emptySentencePlaceholder: {
    fontSize: 15,
    color: '#999',
    fontStyle: 'italic',
  },
  builtWord: {
    backgroundColor: '#1F4788',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  builtWordText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  removeWordIcon: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  availableWordsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  availableWordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  availableWord: {
    backgroundColor: '#e8f0fe',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#1F4788',
  },
  availableWordText: {
    fontSize: 18,
    color: '#1F4788',
    fontWeight: '600',
  },
  clearSentenceButton: {
    backgroundColor: '#f39c12',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  clearSentenceButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  translationHint: {
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  translationHintText: {
    fontSize: 15,
    color: '#2e7d32',
    fontStyle: 'italic',
  },
});
