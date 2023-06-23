import { useCallback, useEffect, useState } from "react";

/*
  =============== Script used for getting the URL ===============
  I figured the best way for me to do this was going to be
  grabbing all the elements whose className included 'value'.
  From there, I knew it needed to match the pattern, so I created
  a simple for loop to check that each parentNode matched the
  pattern and if it did, add it to the finalUrl string. Voila! 

  const urlElements = document.getElementsByClassName("value");

  let finalUrl = '';

  for (const node of Object.values(valueElements)) {
    if (
      node.nodeName === "SPAN" &&
      node.parentNode.nodeName === "DIV" &&
      node.parentNode.parentNode.nodeName === "LI" &&
      node.parentNode.parentNode.parentNode.nodeName === "UL"
    ) {
      finalUrl += node.getAttribute("value");
    }
  }
*/

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [flag, setFlag] = useState("");
  const [flagArr, setFlagArr] = useState([]);

  const animateFlag = useCallback(() => {
    flag.split("").map((letter, i) => {
      return setTimeout(() => {
        setFlagArr((prev) => [...prev, <li key={letter}>{letter}</li>]);
      }, i * 500 + 500); // 500ms delay on showing first letter so it starts by showing nothing
    });
  }, [flag]);

  useEffect(() => {
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/70726f"
    )
      .then((res) => res.text())
      .then((data) => {
        setFlagArr([]); // clear data if making changes to code
        setFlag(data);
        animateFlag();
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setErrorMessage("Error fetching data, check console.");
        setIsLoading(false);
      });
  }, [animateFlag]);

  return (
    <div className="App">
      <p>{isLoading ? "Loading..." : errorMessage ? errorMessage : ""}</p>
      <ul>{flagArr}</ul>
    </div>
  );
}
