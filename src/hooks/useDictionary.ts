import { useState, useEffect } from "react";

export interface Phonetic {
  text?: string;
  audio?: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: {
    definition: string;
    example?: string;
  }[];
}

export interface DictionaryEntry {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

export function useDictionary(word: string) {
  const [data, setData] = useState<DictionaryEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!word) return;

    setLoading(true);
    setError(null);
    setData(null);

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Word not found");
        const json = await res.json();
        setData(json);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [word]);

  return { data, loading, error };
}
