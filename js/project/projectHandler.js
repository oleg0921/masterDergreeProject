

const projectHandler = (() => {

  let project = {
    educationalLoad: [],
    votingFiles: [],
    metadata: {},
    versionAndLogCorrectionFiles: [],
    individualPlans: [],
    distributionResult: [],
    teachers: []
  };

  const get = () => {
    console.log("Получение текущей сущности:", project);
    return project;
  };

  const updateProjectName =(newName) =>  {
    if (window.notifyProjectNameChange) {

      window.notifyProjectNameChange();
      return newName; // Повертаємо нове ім'я
    } else {
      console.error("Функція notifyProjectNameChange не знайдена.");
      return null;
    }
  }

  const updateEducationalLoad = () =>  {
    if(window.notifyEducationLoadChange) {
      window.notifyEducationLoadChange();
    }
  }

  const updateIndividualPlans = () =>  {
    if(window.notifyIndividualPlansChange) {
      window.notifyIndividualPlansChange();
    }
  }


  const updateDistributionResultPlans = () =>  {
    if(window.notifyDistributionResultChange) {
      window.notifyDistributionResultChange();
    }
  }

  const updateVotingFiles = () =>  {
    if(window.notifyVotingFileChange) {
      window.notifyVotingFileChange();
    }
  }

  const create = (newData) => {
    project = {
      educationalLoad: newData.educationalLoad || [],
      votingFiles: newData.votingFiles || [],
      metadata: {...newData.metaData, project_name: updateProjectName(newData.metaData.project_name)}||{},
      versionAndLogCorrectionFiles: newData.versionAndLogCorrectionFiles || [],
      individualPlans: newData.individualPlans || [],
      distributionResult: newData.distributionResult || [],
      teachers: getHardcodedTeachers()
    };
    updateIndividualPlans()
    updateDistributionResultPlans()
    updateEducationalLoad()
    updateVotingFiles()
    console.log("Создана новая сущность:", project);
  };

  // Функция для обновления сущности
  const update = (updatedData) => {
    project = {
      ...project,
      ...updatedData
    };
    updateIndividualPlans()
    updateDistributionResultPlans()
    updateEducationalLoad()
    updateVotingFiles()
    console.log("Обновленная сущность:", project);
  };

 function getHardcodedTeachers() {
    return [
      { "NamberKey": "TK1", "TeacherName": "Супруненко О.О.", "TeacherStatus": "доцент" },
      { "NamberKey": "TK2", "TeacherName": "Онищенко Б.О.", "TeacherStatus": "доцент" },
      { "NamberKey": "TK3", "TeacherName": "Бушин І.М.", "TeacherStatus": "доцент" },
      { "NamberKey": "TK4", "TeacherName": "Ярмілко А.В.", "TeacherStatus": "доцент" },
      { "NamberKey": "TK5", "TeacherName": "Мисник Б.В.", "TeacherStatus": "ст.викладач" },
      { "NamberKey": "TK6", "TeacherName": "Гук В.І.", "TeacherStatus": "ст.викладач" },
      { "NamberKey": "TK7", "TeacherName": "Гребенович Ю.Є.", "TeacherStatus": "ст.викладач" },
      { "NamberKey": "TK8", "TeacherName": "Порубльов І.М", "TeacherStatus": "ст.викладач" }
    ];
  }

  return {
    getEntity: get,
    createEntity: create,
    updateEntity: update
  };
})();

export default projectHandler;
