import React, { useEffect, useState } from "react";
import styles from "@/styles/index.module.css";
import CustomHead from "@/components/CustomHead";
export default function Home() {
  const [isDead, setIsDead] = useState(false);
  const [age, setAge] = useState("");
  const [deathDate, setDeathDate] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    async function getDeadStatus() {
      const response = await fetch("/api/deadStatus");
      const data = await response.json();

      setIsBirthday(data.is_birthday)
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
    <><CustomHead
      title="Is Jimmy Carter Dead Yet?"
      description="We all know Jimmy Carter is going to die soon. But is he dead yet? Find out here!"
      image="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/JimmyCarterPortrait2.jpg/640px-JimmyCarterPortrait2.jpg"
      url="https://isjimmydeadyet.com" /><div className={styles.container}>
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


            {isBirthday && (
                <h3 className={styles.birthday}>🎉🎉 Happy birthday Jimmy! 🎉🎉</h3>
            )}

          </>
        ) : (
          <p className={styles.loading}>Asking God...</p>
        )}
      </div></>
  );
}
