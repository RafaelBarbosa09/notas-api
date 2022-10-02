class Note {
    activityId: string;
    courseId: string;
    studentId: string;
    value: number;

    constructor(activityId: string, courseId: string, studentId: string, value: number) {
        this.activityId = activityId;
        this.courseId = courseId;
        this.studentId = studentId;
        this.value = value;
    }
}