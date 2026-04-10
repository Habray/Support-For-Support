/** Example spicy drafts and matching polished replies (UI placeholder + demo). */
export const REWRITE_EXAMPLES = [
  {
    draft: "I literally cannot make this any simpler for you.",
    polished:
      "I apologize if my previous explanations weren't clear. Let me try to simplify this further for you.",
  },
  {
    draft: "Hey, I already told you this won't work. Read the docs maybe?",
    polished:
      "I apologize for the confusion. Could you please refer to the documentation for more details on how to resolve this? I'm happy to help further if you have more questions!",
  },
  {
    draft: "This is the third time you've asked. I'm begging you.",
    polished:
      "I apologize for the repetition. I understand this is frustrating, and I'm sorry for the inconvenience.",
  },
  {
    draft: "That's not a bug, that's a skill issue.",
    polished:
      "I'm sorry you're experiencing some difficulty with this. It appears to be working as intended, but I'd be happy to help you get a handle on how to use this feature!",
  },
  {
    draft: "Sure, let me just drop everything for your 47th follow-up.",
    polished:
      "Thank you for your patience. I'm sorry for the delay in getting back to you, and I'm looking into this for you now.",
  },
] as const;

export const REWRITE_PLACEHOLDERS = REWRITE_EXAMPLES.map((x) => x.draft);
