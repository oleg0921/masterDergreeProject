
export class ExcelToJsonParser {
    constructor() {
        this.headerTranslation = {
            "__EMPTY": "Number",
            "__EMPTY_1": "EducationalDisciplinesAndTypesOfWork",
            "__EMPTY_2": "Department",
            "__EMPTY_3": "Educational level",
            "__EMPTY_4": "Plan number",
            "__EMPTY_5": "Course",
            "__EMPTY_6": "NumberOfStudents",
            "__EMPTY_7": "NumberOfStreams",
            "__EMPTY_8": "NumberOfGroups",
            "__EMPTY_9": "Number of subgroups",
            "__EMPTY_10": "Lectures",
            "__EMPTY_11": "PracticalClasses",
            "__EMPTY_12": "LaboratoryClasses",
            "__EMPTY_13": "Internship",
            "__EMPTY_14": "Qualification works",
            "__EMPTY_15": "Certification/State control",
            "__EMPTY_16": "ControlWork",
            "__EMPTY_17": "NumberOfCredits",
            "__EMPTY_18": "LecturesForDistribution",
            "__EMPTY_19": "PracticalClassesForDistribution",
            "__EMPTY_20": "LaboratoryClassesForDistribution",
            "__EMPTY_21": "CourseWorksForDistribution",
            "__EMPTY_22": "ConsultationsDuringTheSemesterForDistribution",
            "__EMPTY_23": "ModuleControlForDistribution",
            "__EMPTY_24": "ExamConsultationsForDistribution",
            "__EMPTY_25": "ExamsForDistribution",
            "__EMPTY_26": "InternshipForDistribution",
            "__EMPTY_27": "QualificationWorksForDistribution",
            "__EMPTY_28": "CertificationForDistribution",
            "__EMPTY_29": "PostgraduateStudiesForDistribution",
            "__EMPTY_30": "Total"
        };
    }

    parseExcel(file, callback) {
        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                const convertedData = json.slice(16).reduce((result, row) => {
                    const numberValue = row[0];
                    if (!isNaN(numberValue) && numberValue !== undefined && numberValue !== null && numberValue !== "") {
                        let rowData = {};
                        Object.keys(this.headerTranslation).forEach((key, index) => {
                            rowData[this.headerTranslation[key]] = row[index] !== undefined ? row[index] : null;
                        });
                        result.push(rowData);
                    }
                    return result;
                }, []);

                callback(null, convertedData);
            } catch (error) {
                callback(error, null);
            }
        };

        reader.readAsArrayBuffer(file);
    }
}




const script = document.createElement("script");
script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
document.head.appendChild(script);
