//check browser can run this code or not
if (typeof window === "object") {
  init();
} else {
}

function Avrage(array) {
  array = array.sort((a, b) => {
    if ("total" in a && "total" in b) {
      if (a.obtain < b.obtain) {
        return 1;
      } else if (a.obtain > b.obtain) {
        return -1;
      } else {
        return 0;
      }
    }
  });

  var total = 0;
  var obtain = 0;
  var counter = 0;

  var topFour = 0;
  var topFourCounter = 0;

  for (var i = 0; i < array.length; i++) {
    if (array[i].obtain == undefined || array[i].total == undefined) {
      continue;
    } else {
      obtain = obtain + array[i].obtain;
      total = total + array[i].total;
      counter = counter + 1;
    }
  }

  for (let i = 0; topFourCounter < 4; i++) {
    if (array[i].obtain == undefined || array[i].total == undefined) {
      break;
    } else {
      topFour = topFour + array[i].obtain;
      topFourCounter = topFourCounter + 1;
    }
  }

  return {
    avrage: obtain / counter,
    per: (obtain / total) * 100,
    topFour: topFour / topFourCounter,
  };
}

function Calculate(results) {
  // if (results[0].result == null) {
  //   var error = document.getElementById("Error-msg");
  //   error.style = " display: block;";
  //   return;
  // }
  // var error = document.getElementById("Error-msg");
  // error.style = " display: none;";

  // // create table
  var table = document.getElementById("percentage-table");
  table.style = "border: 1px solid black; border-collapse: collapse;";
  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  var firstRow = document.createElement("tr");
  var firstRowHeader = document.createElement("th");
  var secondRowHeader = document.createElement("th");
  var thirdRowHeader = document.createElement("th");
  firstRowHeader.rowSpan = 2;
  secondRowHeader.colSpan = 2;
  thirdRowHeader.colSpan = 2;
  firstRowHeader.style = "text-align: center; font-size: 16px;";

  firstRowHeader.appendChild(document.createTextNode("Subjects"));
  secondRowHeader.appendChild(document.createTextNode("Overall ISA"));
  thirdRowHeader.appendChild(document.createTextNode("Top 4 ISA"));
  firstRow.appendChild(firstRowHeader);
  firstRow.appendChild(secondRowHeader);
  firstRow.appendChild(thirdRowHeader);
  tableBody.appendChild(firstRow);

  var header = document.createElement("tr");
  // var subjectHeader = document.createElement("th");
  var percentageHeader = document.createElement("th");
  var averagePercentageHeader = document.createElement("th");
  var averageHeaderTopFour = document.createElement("th");
  var outOf30 = document.createElement("th");

  // subjectHeader.appendChild(document.createTextNode("Subject"));
  percentageHeader.appendChild(document.createTextNode("Percentage"));
  averagePercentageHeader.appendChild(document.createTextNode("Average"));
  averageHeaderTopFour.appendChild(
    document.createTextNode("Average ISA")
  );
  outOf30.appendChild(document.createTextNode("Out of 30"));

  // header.appendChild(subjectHeader);
  header.appendChild(percentageHeader);
  header.appendChild(averagePercentageHeader);
  header.appendChild(averageHeaderTopFour);
  header.appendChild(outOf30);
  tableBody.appendChild(header);

  obj = results[0].result;

  let totalPercentage = 0;
  let toAverageMark = 0;
  let toAverageMarkTopFour = 0;
  let toAverageMarkOutOf30 = 0;

  for (var i = 0; i < obj.length; i++) {
    var result = Avrage(obj[i].marks);

    totalPercentage += result.per;
    toAverageMark += result.avrage;
    toAverageMarkTopFour += result.topFour;
    toAverageMarkOutOf30 += result.topFour * 1.5;

    var row = document.createElement("tr");
    var subject = document.createElement("td");
    var percentage = document.createElement("td");
    var averageMarks = document.createElement("td");
    var averageMarksTopFour = document.createElement("td");
    var outOf30 = document.createElement("td");

    // aline the text to center
    percentage.style = "text-align: center;";
    averageMarks.style = "text-align: center;";
    averageMarksTopFour.style = "text-align: center;";
    outOf30.style = "text-align: center;";
    subject.style = "font-weight: bold;";

    subject.appendChild(document.createTextNode(obj[i].subjectName));
    percentage.appendChild(
      document.createTextNode(result.per.toFixed(2) + "%")
    );
    averageMarks.appendChild(document.createTextNode(result.avrage.toFixed(2)));
    averageMarksTopFour.appendChild(
      document.createTextNode(result.topFour.toFixed(2))
    );
    outOf30.appendChild(
      document.createTextNode((result.topFour * 1.5).toFixed(2))
    );

    row.appendChild(subject);
    row.appendChild(percentage);
    row.appendChild(averageMarks);
    row.appendChild(averageMarksTopFour);
    row.appendChild(outOf30);

    tableBody.appendChild(row);
  }

  const averagePercentage = totalPercentage / obj.length;
  const toAverageMarks = toAverageMark / obj.length;
  const toAverageMarksTopFour = toAverageMarkTopFour / obj.length;
  const toAverageMarksOutOf30 = toAverageMarkOutOf30;

  var row = document.createElement("tr");
  var subject = document.createElement("td");
  var percentage = document.createElement("td");
  var averageMarks = document.createElement("td");
  var averageMarksTopFour = document.createElement("td");
  var outOf30 = document.createElement("td");

  // aline the text to center
  percentage.style = "text-align: center; font-weight: bold;";
  averageMarks.style = "text-align: center; font-weight: bold;";
  averageMarksTopFour.style = "text-align: center; font-weight: bold;";
  outOf30.style = "text-align: center; font-weight: bold;";
  subject.style = "font-weight: bold;";

  subject.appendChild(document.createTextNode("Average"));
  percentage.appendChild(
    document.createTextNode(averagePercentage.toFixed(2) + "%")
  );
  averageMarks.appendChild(document.createTextNode(toAverageMarks.toFixed(2)));
  averageMarksTopFour.appendChild(
    document.createTextNode(toAverageMarksTopFour.toFixed(2))
  );
  outOf30.appendChild(document.createTextNode(toAverageMarksOutOf30.toFixed(2)));

  row.appendChild(subject);
  row.appendChild(percentage);
  row.appendChild(averageMarks);
  row.appendChild(averageMarksTopFour);
  row.appendChild(outOf30);

  tableBody.appendChild(row);
}

function exicuting_scripts(tabid) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabid[0].id, allFrames: true },
      function: generate,
    },
    (results) => {
      // console.log(results[0]);
      results[0].result[0].marks != undefined
        ? Calculate(results)
        : printAttendenceTable(results);
    }
  );
}

function init() {
  document.addEventListener("DOMContentLoaded", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      exicuting_scripts(tabs);
    });
  });
}

const generate = () => {
  var pageName = document
    ?.querySelector("#studentAttendanceSemester")
    ?.getClientRects()[0]?.x;

  function getAttendence() {
    var attendence_info = document.getElementById("studentAttendanceSemester");

    attendence_info = attendence_info
      .querySelectorAll("tbody")[0]
      .querySelectorAll("tr");

    var attendence_list = [];

    for (var i = 0; i < attendence_info.length; i++) {
      var subject = attendence_info[i].cells[1].innerText;
      var attendence = attendence_info[i].cells[2].innerText;
      var percentage = attendence_info[i].cells[3].innerText;

      attendence_list.push({
        subject,
        attented_classes: parseInt(attendence.split("/")[0]),
        total_classes: parseInt(attendence.split("/")[1]),
        percentage: parseInt(percentage),
      });
    }

    return attendence_list;
  }

  // document
  //   .getElementById("desired-percentage")
  //   .addEventListener("change", () => {
  //     getAttendence();
  //   });

  if (pageName) {
    return getAttendence();
  } else {
    // result
    var isa = null;
    try {
      isa = document
        .querySelector("#isaEsaResult_3")
        .querySelector(".elem-info-wrapper")
        .querySelectorAll(".clearfix");
    } catch (error) {}
    if (isa == null) {
      return null;
    }

    function SubjectName(elemnt) {
      return elemnt.querySelector("h6").innerText.split("-")[1].trim();
    }

    function getMarks(element) {
      list = [];
      for (var i = 0; i < element.length; i++) {
        var obtain = parseFloat(element[i].querySelector("span").innerText);
        var total = parseFloat(
          element[i].childNodes[4].data.replace(/[\s/]/g, "")
        );
        if (
          total != "" ||
          total != " " ||
          total == null ||
          total == undefined ||
          total == NaN
        ) {
          list.push({ obtain: obtain, total: total });
        }
      }
      return list;
    }

    var MarksList = [];

    for (var i = 0; i < isa.length; i++) {
      var subject = SubjectName(isa[i]);
      var marks = getMarks(
        isa[i].querySelector(".dashboard-info-bar").querySelectorAll("div")
      );
      MarksList.push({ subjectName: subject, marks: marks });
    }

    return MarksList;
  }
};

const printAttendenceTable = (results) => {
  const inputcontainer = document.getElementById("input-container");
  inputcontainer.style = "display: block;";
  results = results[0].result;
  // create table
  var table = document.getElementById("attendence-table");
  table.style = "border: 1px solid black; border-collapse: collapse;";
  var tableBody = document.createElement("tbody");
  table.appendChild(tableBody);

  // create header
  var header = document.createElement("tr");
  var subjectHeader = document.createElement("th");
  var attendenceHeader = document.createElement("th");
  var percentageHeader = document.createElement("th");
  var bunksHeader = document.createElement("th");

  // aline the text to center
  subjectHeader.style = "text-align: center; ";
  attendenceHeader.style = "text-align: center; ";
  percentageHeader.style = "text-align: center;";
  bunksHeader.style = "text-align: center;";

  subjectHeader.appendChild(document.createTextNode("Subject"));
  attendenceHeader.appendChild(document.createTextNode("Attendence"));
  percentageHeader.appendChild(document.createTextNode("Percentage"));
  bunksHeader.appendChild(document.createTextNode("Bunks"));

  header.appendChild(subjectHeader);
  header.appendChild(attendenceHeader);
  header.appendChild(percentageHeader);
  header.appendChild(bunksHeader);

  tableBody.appendChild(header);

  // create rows
  for (var i = 0; i < results.length; i++) {
    var row = document.createElement("tr");
    var subject = document.createElement("td");
    var attendence = document.createElement("td");
    var percentage = document.createElement("td");
    var bunks = document.createElement("td");

    var desiredPercentage = document.getElementById("desired-percentage").value;

    // calculate bunks
    if (results[i].percentage > parseInt(desiredPercentage)) {
      desiredPercentage = parseFloat(parseInt(desiredPercentage) / 100);
      var totalClasses = results[i].total_classes;
      var attented_classes = results[i].attented_classes;

      var requiredAttendence = desiredPercentage * totalClasses;
      var noOfBunks = attented_classes - requiredAttendence;
    } else {
      var noOfBunks = 0;
    }

    // aline the text to center
    attendence.style = "text-align: center;";
    percentage.style = "text-align: center;";

    if (noOfBunks == 0) {
      bunks.style = "text-align: center; background-color: #ea9999;";
    } else {
      bunks.style = "text-align: center; background-color: #b7e1cd;";
    }

    subject.appendChild(document.createTextNode(results[i].subject));
    attendence.appendChild(
      document.createTextNode(
        results[i].attented_classes + "/" + results[i].total_classes
      )
    );
    percentage.appendChild(document.createTextNode(results[i].percentage));
    bunks.appendChild(document.createTextNode(Math.floor(noOfBunks)));

    row.appendChild(subject);
    row.appendChild(attendence);
    row.appendChild(percentage);
    row.appendChild(bunks);

    tableBody.appendChild(row);
  }
};
