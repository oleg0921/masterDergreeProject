





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
            Lectures: subject.LecturesForDistribution || 0,
            PracticalClasses: subject.PracticalClassesForDistribution || 0,
            Laboratory: subject.LaboratoryClassesForDistribution || 0,
            CourseWorks: subject.CourseWorksForDistribution || 0,
            ConsultationsDuringTheSemester: subject.ConsultationsDuringTheSemesterForDistribution || 0,
            ModuleControl: subject.ModuleControlForDistribution || 0,
            ExamConsultations: subject.ExamConsultationsForDistribution || 0,
            Exams: subject.ExamsForDistribution || 0,
            Internship: subject.InternshipForDistribution || 0,
            QualificationWorks: subject.QualificationWorksForDistribution || 0,
            Certification: subject.CertificationForDistribution || 0,
            PostgraduateStudies: subject.PostgraduateStudiesForDistribution || 0
        };

        const totalWorkload = Object.values(subjectWorkload).reduce((sum, hours) => sum + hours, 0);
        const subjectTeachers = likes
            .filter(like => like.subjectId === subject.Number)
            .flatMap(like =>
                like.ownerTeacherId.map(owner => {
                    const teacher = teachers.find(t => t.NamberKey === owner.teacherId);
                    return teacher ? { ...teacher, priority: owner.priority } : null;
                })
            )
            .filter(Boolean);

        const totalPriority = subjectTeachers.reduce((sum, t) => sum + t.priority, 0);

        if (totalPriority === 0) continue;

        const uniquePositions = new Set(subjectTeachers.map(t => t.TeacherStatus));
        const useWeights = uniquePositions.size > 1;

        for (const teacher of subjectTeachers) {
            if (!plans[teacher.TeacherName]) {
                plans[teacher.TeacherName] = [];
            }

            const teacherPlan = {};

            for (const type in subjectWorkload) {
                const typeHours = subjectWorkload[type] || 0;
                const typeProportion = typeHours / totalWorkload;

                let teacherShare;
                if (useWeights) {
                    const weight = workloadWeights[teacher.TeacherStatus]?.[type] || 0;
                    teacherShare = ((teacher.priority / totalPriority) * typeProportion * totalWorkload * weight) / 10;
                } else {
                    teacherShare = (teacher.priority / totalPriority) * typeProportion * totalWorkload;
                }

                teacherPlan[type] = Math.round(teacherShare * 10) / 10;
            }

            plans[teacher.TeacherName].push({
                subject: subject.EducationalDisciplinesAndTypesOfWork,
                workload: teacherPlan
            });
        }
    }

    // Финальный шаг: объединение нагрузки по преподавателю
    const mergedPlans = {};
    for (const [teacherName, workloads] of Object.entries(plans)) {
        const aggregatedWorkload = {};
        const subjectDetails = [];

        for (const workload of workloads) {
            subjectDetails.push({ subject: workload.subject, workload: workload.workload });
            for (const [type, hours] of Object.entries(workload.workload)) {
                aggregatedWorkload[type] = (aggregatedWorkload[type] || 0) + hours;
            }
        }

        mergedPlans[teacherName] = {
            subjects: subjectDetails,
            totalWorkload: aggregatedWorkload
        };
    }

    return mergedPlans;
}
