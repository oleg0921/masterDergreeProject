





export function createPlans(subjects, teachers, likes) {
    const workloadWeights = {
        "професор, доктор": { "Lectures": 10, "PracticalClasses": 5, "LaboratoryClasses": 5, "CourseWorks": 8, "ConsultationsDuringTheSemester": 10, "ModuleControl": 6, "ExamConsultations": 10, "Exams": 10, "Internship": 5, "QualificationWorks": 10, "Certification": 10, "PostgraduateStudies": 10 },
        "доктор": { "Lectures": 10, "PracticalClasses": 5, "LaboratoryClasses": 5, "CourseWorks": 8, "ConsultationsDuringTheSemester": 10, "ModuleControl": 6, "ExamConsultations": 10, "Exams": 10, "Internship": 5, "QualificationWorks": 10, "Certification": 10, "PostgraduateStudies": 10 },
        "доцент": { "Lectures": 10, "PracticalClasses": 5, "LaboratoryClasses": 8, "CourseWorks": 8, "ConsultationsDuringTheSemester": 10, "ModuleControl": 8, "ExamConsultations": 10, "Exams": 10, "Internship": 8, "QualificationWorks": 10, "Certification": 10, "PostgraduateStudies": 10 },
        "ст.викладач, к.т.н": { "Lectures": 10, "PracticalClasses": 8, "LaboratoryClasses": 10, "CourseWorks": 10, "ConsultationsDuringTheSemester": 10, "ModuleControl": 10, "ExamConsultations": 10, "Exams": 10, "Internship": 10, "QualificationWorks": 10, "Certification": 8, "PostgraduateStudies": 0 },
        "ст.викладач": { "Lectures": 8, "PracticalClasses": 10, "LaboratoryClasses": 10, "CourseWorks": 10, "ConsultationsDuringTheSemester": 10, "ModuleControl": 8, "ExamConsultations": 10, "Exams": 10, "Internship": 10, "QualificationWorks": 10, "Certification": 1, "PostgraduateStudies": 0 },
        "викладач": { "Lectures": 5, "PracticalClasses": 10, "LaboratoryClasses": 10, "CourseWorks": 10, "ConsultationsDuringTheSemester": 8, "ModuleControl": 6, "ExamConsultations": 10, "Exams": 5, "Internship": 8, "QualificationWorks": 5, "Certification": 1, "PostgraduateStudies": 0 }
    };

    const plans = {};

    for (const subject of subjects) {
        const subjectWorkload = {
            Lectures: subject.Lectures || 0,
            PracticalClasses: subject.PracticalClasses || 0,
            Laboratory: subject.Laboratory || 0,
            CourseWorks: subject.CourseWorks || 0,
            ConsultationsDuringTheSemester: subject.ConsultationsDuringTheSemeste || 0,
            ModuleControl: subject.ModuleControl || 0,
            ExamConsultations: subject.ExamConsultations || 0,
            Exams: subject.Exams || 0,
            Internship: subject.Internship || 0,
            QualificationWorks: subject.QualificationWorks || 0,
            Certification: subject.Certification || 0,
            PostgraduateStudies: subject.PostgraduateStudies || 0
        };

        const totalWorkload = Object.values(subjectWorkload).reduce((sum, hours) => sum + (hours || 0), 0);

        const subjectTeachers = likes
            .filter(like => like.subjectId === subject.Number)
            .flatMap(like =>
                like.ownerTeacherId.map(owner => {
                    const teacher = teachers.find(t => t.NamberKey === owner.teacherId);
                    return teacher ? { ...teacher, priority: owner.priority } : null;
                })
            )
            .filter(t => t !== null);

        const totalPriority = subjectTeachers.reduce((sum, t) => sum + t.priority, 0);

        if (totalPriority === 0) {
            console.warn(`Total priority for subject ${subject.EducationalDisciplinesAndTypesOfWork} is zero.`);
            continue;
        }

        for (const teacher of subjectTeachers) {
            if (!plans[teacher.TeacherName]) {
                plans[teacher.TeacherName] = [];
            }

            const teacherPlan = {};

            for (const type in subjectWorkload) {
                const typeHours = subjectWorkload[type] || 0;
                const typeProportion = typeHours / totalWorkload;
                const weight = workloadWeights[teacher.TeacherStatus]?.[type] || 0;

                const teacherShare = ((teacher.priority / totalPriority) * typeProportion * totalWorkload * weight) / 10;
                teacherPlan[type] = Math.round(teacherShare * 10) / 10; // Округление до 1 знака после запятой
            }

            plans[teacher.TeacherName].push({
                subject: subject.EducationalDisciplinesAndTypesOfWork,
                workload: teacherPlan
            });
        }
    }

    return plans;
}
