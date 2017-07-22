(function ManageSorter() {

  const tagsContainer = document.querySelector("#tags-container");
  let applicants = [],
      template = "";

  this.init = function() {
    updateApplicants();
    addApplicant();
    sortApplicant();
  }

  this.updateApplicants = function() {
    template = "";

    applicants.forEach(function(applicant, i) {
      template += '<span class="applicant" data-number="' + i + '">' + applicant + '</span>';
    });

    tagsContainer.innerHTML = "";
    tagsContainer.insertAdjacentHTML("afterbegin", template);
    deleteApplicant();
  }

  this.addApplicant = function() {
    const addApplicantBtn = document.querySelector("#add-applicant-btn"),
          applicantInput = document.querySelector("#applicant-input");

    addApplicantBtn.addEventListener("click", grabApplicant);
    window.addEventListener("keypress", grabApplicant);

    function grabApplicant(evt) {
      if(evt.type === "click" || evt.which === 13 || evt.keyCode === 13) {
        let newApplicant = applicantInput.value.toLowerCase();
        if(validate(newApplicant)) {
          applicants.push(newApplicant);
          applicantInput.value = "";
          updateApplicants();
        } else {
          console.log("Error");
        }
      }
    }
  }

  this.validate = function(value) {
    if(applicants.indexOf(value) < 0 && value !== "") {
      return true;
    }
    return false;
  }

  this.deleteApplicant = function() {
    let applicantTags = document.querySelectorAll(".applicant");

    function deleteTag(element) {
      let id = element.getAttribute("data-number");
      applicants.splice(id, 1);
      updateApplicants();
    }

    applicantTags.forEach(function(applicantTag) {
      applicantTag.addEventListener("click", function() {
        deleteTag(this);
      });
    });
  }

  this.sortApplicant = function() {
    const result = document.querySelector("#result"),
          frontCard = document.querySelector(".front-card");
    let randNumb = 0;

    function sort(evt) {
      if(evt.target.id === "sort-btn") {
        if(applicants.length > 1) {
          randNumb = Math.floor(Math.random() * applicants.length);
          result.innerHTML = applicants[randNumb];
          frontCard.classList.toggle("active");
        } else {
          console.log("Error");
        }
      } else if(evt.target.id === "sort-again-btn") {
        randNumb = Math.floor(Math.random() * applicants.length);
        result.innerHTML = applicants[randNumb];
      } else if(evt.target.id === "play-again-btn") {
        frontCard.classList.toggle("active");
      }
    }

    document.querySelector("#sort-btn").addEventListener("click", sort);
    document.querySelector("#sort-again-btn").addEventListener("click", sort);
    document.querySelector("#play-again-btn").addEventListener("click", sort);
  }

  init();
})();
