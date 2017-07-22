(function ManageSorter() {

  const tagsContainer = document.querySelector("#tags-container");
  let applicants = [],
      template = "";

  this.init = function() {
    updateApplicants();
    addApplicant();
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

  init();
})();
