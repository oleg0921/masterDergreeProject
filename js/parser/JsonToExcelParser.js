




const downloadExcelHandler = (individualPlans) => {
    const headers = {
        "Number": "Номер",
        "EducationalDisciplinesAndTypesOfWork": "Навчальні дисципліни та види робіт",
        "Department": "Кафедра",
        "Educational level": "Освітній рівень",
        "Plan number": "Номер плану",
        "Course": "Курс",
        "Number of students": "Кількість студентів",
        "Number of streams": "Кількість потоків",
        "Number of groups": "Кількість груп",
        "Number of subgroups": "Кількість підгруп",
        "Lectures (planned)": "Лекції (заплановані)",
        "Practical classes (planned)": "Практичні заняття (заплановані)",
        "Laboratory classes (planned)": "Лабораторні заняття (заплановані)",
        "Internship (weeks)": "Практика (тижні)",
        "Qualification works": "Кваліфікаційні роботи",
        "Certification/State control": "Атестація/Державний контроль",
        "Control work": "Контрольна робота",
        "Number of credits": "Кількість кредитів",
        "LecturesForDistribution": "Лекції",
        "PracticalClassesForDistribution": "Практичні заняття",
        "LaboratoryClassesForDistribution": "Лабораторні заняття",
        "CourseWorksForDistribution": "Курсові роботи, проекти",
        "ConsultationsDuringTheSemesterForDistribution": "Консультації протягом семестру",
        "ModuleControlForDistribution": "Модульний контроль",
        "ExamConsultationsForDistribution": "Консультації до екзамену",
        "ExamsForDistribution": "Екзамени",
        "InternshipForDistribution": "Практика",
        "PostgraduateStudiesForDistribution": "Аспірантура",
        "Total": "Всього",
    };

    const rows = [];

    Object.keys(individualPlans).forEach((name, index) => {
        const personData = individualPlans[name];

        personData.subjects.forEach((subject) => {
            const row = {
                [headers["Number"]]: index + 1,
                [headers["EducationalDisciplinesAndTypesOfWork"]]: subject.subject,
                [headers["LecturesForDistribution"]]: subject.workload.Lectures,
                [headers["PracticalClassesForDistribution"]]: subject.workload.PracticalClasses,
                [headers["LaboratoryClassesForDistribution"]]: subject.workload.Laboratory,
                [headers["ConsultationsDuringTheSemesterForDistribution"]]: subject.workload.ConsultationsDuringTheSemester,
                [headers["ModuleControlForDistribution"]]: subject.workload.ModuleControl,
                [headers["ExamConsultationsForDistribution"]]: subject.workload.ExamConsultations,
                [headers["ExamsForDistribution"]]: subject.workload.Exams,
                [headers["Total"]]: Object.values(subject.workload).reduce((sum, value) => sum + value, 0),
            };
            rows.push(row);
        });

        const totalRow = {
            [headers["Number"]]: "",
            [headers["EducationalDisciplinesAndTypesOfWork"]]: `${name} (Итог)`,
            [headers["LecturesForDistribution"]]: personData.totalWorkload.Lectures,
            [headers["PracticalClassesForDistribution"]]: personData.totalWorkload.PracticalClasses,
            [headers["LaboratoryClassesForDistribution"]]: personData.totalWorkload.Laboratory,
            [headers["ConsultationsDuringTheSemesterForDistribution"]]: personData.totalWorkload.ConsultationsDuringTheSemester,
            [headers["ModuleControlForDistribution"]]: personData.totalWorkload.ModuleControl,
            [headers["ExamConsultationsForDistribution"]]: personData.totalWorkload.ExamConsultations,
            [headers["ExamsForDistribution"]]: personData.totalWorkload.Exams,
            [headers["Total"]]: Object.values(personData.totalWorkload).reduce((sum, value) => sum + value, 0),
        };
        rows.push(totalRow);
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'IndividualPlans');

    XLSX.writeFile(workbook, 'IndividualPlans.xlsx');
};

const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
document.head.appendChild(script);
export default downloadExcelHandler;
