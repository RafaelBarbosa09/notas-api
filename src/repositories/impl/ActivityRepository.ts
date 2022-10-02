import IActivityRepository from "../IActivityRepository";

export default class ActivityRepository implements IActivityRepository {
    private activities: Activity[] = [];

    public async saveActivity(activity: Activity): Promise<Activity> {
        this.activities.push(activity);
        return activity;
    }

    public async populateActivities(activities: Activity[]): Promise<Activity[]> {
        this.activities = activities;

        return activities;
    }

    public async updateActivity(activity: Activity): Promise<Activity> {
        const index = this.activities.findIndex((a) => a.id === activity.id);
        this.activities[index] = activity;

        return activity;
    }

    public async getActivities(): Promise<Activity[]> {
        return this.activities;
    }

} 