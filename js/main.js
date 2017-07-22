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

    applicants.forEach(function(applicant) {
      template += '<span class="applicant">' + applicant + '</span>';
    });

    tagsContainer.innerHTML = "";
    tagsContainer.insertAdjacentHTML("afterbegin", template);
  }

  this.addApplicant = function() {
    const addApplicantBtn = document.querySelector("#add-applicant-btn"),
          applicantInput = document.querySelector("#applicant-input");

    addApplicantBtn.addEventListener("click", grabApplicant);
    window.addEventListener("keypress", grabApplicant);

    function grabApplicant(evt) {
      if(evt.type === "click" || evt.which === 13 || evt.keyCode === 13) {
        if(validate(applicantInput.value)) {
          let newApplicant = applicantInput.value.toLowerCase();
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

  init();
})();
