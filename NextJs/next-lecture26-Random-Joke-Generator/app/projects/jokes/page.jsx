"use client";
import { useEffect, useState } from "react";

const RandomJokes = () => {
  const [randomJokes, setRandomJokes] = useState({});
  const [showPunchline, setShowPunchline] = useState(false);

  const URL = "https://official-joke-api.appspot.com/random_joke";

  const fetchRandomJokes = async () => {
    const res = await fetch(URL);
    const data = await res.json();
    setRandomJokes(data);
    setShowPunchline(false); // new joke → punchline hide
  };

  useEffect(() => {
    fetchRandomJokes();
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h3 style={styles.type}>{randomJokes.type}</h3>

        <p style={styles.setup}>{randomJokes.setup}</p>

        {showPunchline && (
          <p style={styles.punchline}>{randomJokes.punchline}</p>
        )}

        <div style={styles.btnGroup}>
          <button
            style={styles.btn}
            onClick={() => setShowPunchline(!showPunchline)}
          >
            {showPunchline ? "Hide Answer" : "Show Answer"}
          </button>

          <button style={styles.btn} onClick={fetchRandomJokes}>
            Next Joke 😂
          </button>
        </div>
      </div>
    </div>
  );
};

export default RandomJokes;

/* Simple inline styles */
const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f6f8",
  },
  card: {
    width: "400px",
    padding: "20px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  type: {
    color: "#888",
    marginBottom: "10px",
  },
  setup: {
    fontSize: "18px",
    fontWeight: "600",
  },
  punchline: {
    marginTop: "15px",
    fontSize: "16px",
    color: "#2c3e50",
  },
  btnGroup: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
  },
  btn: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#0070f3",
    color: "#fff",
  },
};
