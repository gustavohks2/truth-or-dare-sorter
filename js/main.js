(function ManageSorter() {

  const applicants = [];
  let template = "";

  this.init = function() {
    updateApplicants();
  }

  this.updateApplicants = function() {
    var tagsContainer = document.querySelector("#tags-container");
    template = "";

    applicants.forEach(function(applicant) {
      template += '<span class="applicant" style="background-color: #FFC153;">' + applicant + '</span>';
    });

    tagsContainer.innerHTML = "";
    tagsContainer.insertAdjacentHTML("afterbegin", template);
  }

  init();
})();
