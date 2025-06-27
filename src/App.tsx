import { useState } from "react";
import SearchBox from "./components/SearchBox";
import { useDictionary } from "./hooks/useDictionary";
import "./App.css";

function playTTS(text: string) {
  if (!("speechSynthesis" in window)) {
    alert("Sorry, your browser does not support text-to-speech.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error } = useDictionary(searchTerm);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6">
      <h1 className="text-3xl font-bold text-center">Dictionary App</h1>
      <SearchBox onSearch={handleSearch} />

      <div className="mt-8 max-w-xl mx-auto">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {data && data.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-2">{data[0].word}</h2>

            {/* Phonetics */}
            {data[0].phonetics.map((phonetic, idx) => {
              const hasAudio = !!phonetic.audio;
              const displayText = phonetic.text || data[0].word;

              return (
                <div key={idx} className="flex items-center gap-3 mb-2">
                  {displayText && (
                    <span className="italic text-gray-700 dark:text-gray-300">
                      {displayText}
                    </span>
                  )}

                  {hasAudio ? (
                    <audio controls src={phonetic.audio} className="h-6" />
                  ) : (
                    <button
                      onClick={() => playTTS(data[0].word)}
                      className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                      aria-label={`Play pronunciation for ${data[0].word}`}
                    >
                      🔈 Play Pronunciation
                    </button>
                  )}
                </div>
              );
            })}

            {/* Meanings */}
            {data[0].meanings.map((meaning, idx) => (
              <div key={idx} className="mb-4">
                <h3 className="font-semibold">{meaning.partOfSpeech}</h3>
                <ul className="list-disc list-inside">
                  {meaning.definitions.map((def, i) => (
                    <li key={i}>
                      {def.definition}
                      {def.example && (
                        <em className="block text-sm text-gray-600 dark:text-gray-400">
                          Example: {def.example}
                        </em>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
