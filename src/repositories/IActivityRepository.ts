export default interface IActivityRepository {
    populateActivities(activities: Activity[]): Promise<Activity[]>;
    saveActivity(activity: Activity): Promise<Activity>;
    getActivities(): Promise<Activity[]>;
    updateActivity(activity: Activity): Promise<Activity>;
}