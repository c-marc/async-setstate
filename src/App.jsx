import { useState, useRef, useEffect } from "react";

function Test() {
  const [disabled, setDisabled] = useState(false);
  const myRef = useRef();

  console.log(
    "components says state disabled=",
    disabled,
    "and ref disabled=",
    myRef.current?.disabled
  );

  useEffect(() => {
    console.log(
      "useEffect says state disabled=",
      disabled,
      "and ref disabled=",
      myRef.current?.disabled
    );
  }, [disabled]);

  useEffect(() => {
    myRef.current.addEventListener("click", () =>
      console.log("ref says click")
    );
  }, []);

  const handleClick = async () => {
    const something = async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Promise resolved");
          resolve(true);
        }, 5000);
      });
    };
    console.log("handler says click");
    setDisabled(true);
    console.log("handler asked for state disabled true");
    console.log(
      "handler says state disabled=",
      disabled,
      "and ref disabled=",
      myRef.current.disabled
    );
    console.log("handler says await");
    await something();
    console.log("handler says await resolved");
    console.log(
      "handler says state disabled=",
      disabled,
      "and ref disabled=",
      myRef.current.disabled
    );
    // Second update
    setDisabled(false);
    console.log("handler asked for state disabled false");
    console.log(
      "handler says state disabled=",
      disabled,
      "and ref disabled=",
      myRef.current.disabled
    );
  };

  return (
    <button ref={myRef} disabled={disabled} onClick={handleClick}>
      Fake
    </button>
  );
}

function App() {
  return <Test />;
}

export default App;
