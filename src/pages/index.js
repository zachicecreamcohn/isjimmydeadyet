import React, { useEffect, useState } from "react";
import styles from "@/styles/index.module.css";

export default function Home() {
  const [isDead, setIsDead] = useState(false);
  const [age, setAge] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function getDeadStatus() {
      const response = await fetch("/api/deadStatus");
      const data = await response.json();

      setIsDead(data.is_dead);
      setAge(data.age);
      if (data.is_dead) {
        setDeathDate(data.death_date);
      }

      setLoaded(true);
    }
    getDeadStatus();
  }, []);

  return (
    <div className={styles.container}>
      {loaded ? (
        <>
          <p className={styles.answer}>
            {isDead ? "YES (sorry)" : "NOT YET"}
          </p>
          <p className={styles.age}>
            {isDead ? `He was ${age} years old` : `He is ${age} years old`}
          </p>
          {isDead && (
            <p className={styles.deathDate}>He died on {deathDate}</p>
          )}
        </>
      ) : (
        <p className={styles.loading}>Asking God...</p>
      )}
    </div>
  );
}
