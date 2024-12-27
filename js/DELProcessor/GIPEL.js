

export function DistributeCEL(subjects, likes) {
    const Result = [];

    subjects.forEach(Subject => {

        let MaxPriority = 0;
        const OwnerTeacher = [];

        likes.forEach(Like => {

            if (parseInt(Like.subjectId) === parseInt(Subject.Number)) {
                const CombinedPriority = parseInt(Like.teacherPriority) * parseInt(Like.headPriority);

                if (CombinedPriority > MaxPriority) {
                    MaxPriority = CombinedPriority;
                    OwnerTeacher.push({
                        teacherId: Like.teacherId,
                        priority: CombinedPriority
                    });
                }
            }
        });

        if(OwnerTeacher.length){
            Result.push({
                subjectName: Subject.EducationalDisciplinesAndTypesOfWork,
                subjectId: Subject.Number,
                ownerTeacherId: OwnerTeacher,
                maxPriority: MaxPriority,
                Lectures: Subject.LecturesForDistribution,
                PracticalClasses: Subject.PracticalClassesForDistribution,
                Laboratory: Subject.LaboratoryClassesForDistribution,
                CourseWorks: Subject.CourseWorksForDistribution,
                ConsultationsDuringTheSemeste: Subject.ConsultationsDuringTheSemesterForDistribution,
                ModuleControl: Subject.ModuleControlForDistribution,
                ExamConsultations: Subject.ExamConsultationsForDistribution,
                Exams: Subject.ExamsForDistribution,
                Internship: Subject.InternshipForDistribution,
                QualificationWorks: Subject.QualificationWorksForDistribution,
                Certification: Subject.CertificationForDistribution,
                PostgraduateStudies: Subject.PostgraduateStudiesForDistribution,
                totalHours: Subject.Total
            });
        }





    });

    return Result;
}

