import React, { useState } from "react";

//const inputString = ("/ /* first comment */ let a = 1; const b = 22; /* comment#2 */ let c = 11; // comment#3");

const status = {
  IN_INLINE_COMMENT: "in_inline_comment",
  IN_MULTILINE_COMMENT: "in_multiline_comment",
  IN_CODE: "in_code",
};

const StateMachine = () => {
  const [outString, setOutString] = useState("");

  const onLoad = function (event) {
    var file = document.querySelector("#fileInput").files[0];
    var textType = /text.*/;

    if (file.type.match(textType)) {
      var reader = new FileReader();

      reader.onload = function (e) {
        var content = reader.result;
        createOutString(content);
        //Here the content has been read successfuly
        //alert(content);
      };

      reader.readAsText(file);
    }
  };

  const createOutString = (input) => {
    let state = status.IN_CODE;
    let preOutString = "";

    for (let i = 0; i < input.length; i += 1) {
      //      console.log(input[i] === "\n");
      if (
        state === status.IN_MULTILINE_COMMENT &&
        input[i] === "*" &&
        input[i + 1] === "/"
      ) {
        state = status.IN_CODE;
        i += 1;
      } else if (state === status.IN_INLINE_COMMENT && input[i + 1] === "\n") {
        state = status.IN_CODE;
      } else if (
        state === status.IN_CODE &&
        input[i] === "/" &&
        input[i + 1] === "/"
      ) {
        state = status.IN_INLINE_COMMENT;
      } else if (
        state === status.IN_CODE &&
        input[i] === "/" &&
        input[i + 1] === "*"
      ) {
        state = status.IN_MULTILINE_COMMENT;
      } else if (state === status.IN_CODE) {
        preOutString += input[i];
      }
    }

    setOutString(preOutString);
  };

  console.log(outString);

  return (
    <>
      <input type="file" id="fileInput" onChange={onLoad}></input>
      <div>
        <p>{outString}</p>
      </div>
    </>
  );
};

/* */
//

export default StateMachine;
