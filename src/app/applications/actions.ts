"use server";

const applicationConfig = {
    name: "Launch Pad Application Portal",
    time: {
        start: new Date("2021-09-01"),
        end: new Date("2024-09-30")
    },
};

export async function getApplicationConfig() {
    return applicationConfig;
}