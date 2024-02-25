window.onload = () => {
  let ranodNum = Math.floor(Math.random() * arrQus.length);
  console.log(ranodNum);
  let qus = [];
  let str = "";
  for (let i = 0; i < arrQus[ranodNum].length; i++) {
    str += arrQus[ranodNum][i];
    if ((i + 1) % 9 == 0) {
      qus.push(str);
      str = "";
    }
  }
  console.log(qus);
  let ans = [];
  str = "";
  for (let i = 0; i < arrAns[ranodNum].length; i++) {
    str += arrAns[ranodNum][i];
    if ((i + 1) % 9 == 0) {
      ans.push(str);
      str = "";
    }
  }
  console.log(ans);
  setGame(qus, ans);
};
//selected number in 1-9 digit sec
var selectedNumber = null;

let error = 0;

// game started on loding
function setGame(question, solution) {
  document.getElementById("new").addEventListener("click", function () {
    location.reload();
  });

  //digits 1-9 & select function
  for (let i = 1; i <= 9; i++) {
    let digit = document.createElement("div");
    digit.classList.add("number");
    digit.id = i;
    digit.innerText = i;
    digit.addEventListener("click", function selectNumber() {
      if (selectedNumber != null) {
        selectedNumber.classList.remove("selectedNumber");
      }
      selectedNumber = this;
      this.classList.add("selectedNumber");
    });
    document.getElementById("digits").appendChild(digit);
  }

  //boxes of 9*9 row&col
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let box = document.createElement("div");
      box.classList.add("box");
      box.id = r + "-" + c;

      // starting qustion displayed in board whith light color
      if (question[r][c] != 0) {
        box.innerText = question[r][c];
        box.classList.add("box-start");
      }
      document.getElementById("solve").addEventListener("click", function () {
        box.innerText = solution[r][c];
      });
      // for border to know that it is a 3*3 cube
      if (r == 2 || r == 5 || r == 8) {
        box.style.borderBottom = "2px solid black";
      }
      if (c == 0) {
        box.style.borderLeft = "2px solid black";
      }
      if (r == 0) {
        box.style.borderTop = "2px solid black";
      }
      if (c == 2 || c == 5 || c == 8) {
        box.style.borderRight = "2px solid black";
      }

      //   when we select a single box the value will be the selected digit
      box.addEventListener("click", function selectbox() {
        //if and only when the digit select the value of selcted digit will show in box
        if (selectedNumber) {
          //if the box has empty value
          if (this.innerText == "") {
            //it update the box value to the selected digit value
            this.innerText = selectedNumber.innerText;

            // to convert selected box id in to a single row & col in number
            let row_col = this.id.split("-");
            let r = parseInt(row_col[0]);
            let c = parseInt(row_col[1]);

            //to erase a value in the box
            document
              .getElementById("erase")
              .addEventListener("click", function () {
                document.getElementById(`${r}-${c}`).innerText = "";
              });
            // comparing the value in the box with the solution
            if (solution[r][c] != this.innerText) {
              error += 1; // errors count
              document.getElementById("error").innerText = error;
              this.style.color = "red";

              //   error popup box
              let chance = 5;
              if (error >= chance) {
                let popup = document.getElementById("pop-box");
                popup.style.display = "block";
                document.getElementById("wrongCnt").innerText = error;
                document
                  .getElementById("replay")
                  .addEventListener("click", () => {
                    location.reload();
                  });
              }
            }
          }
        } else {
          alert("select a digit first");
        }
      });
      document.getElementById("board").appendChild(box);
    }
  }
}
