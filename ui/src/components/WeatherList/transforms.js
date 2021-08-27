export const transformData = (data = {} ) => ({
    ...data,
    daily: data?.daily?.map(day => ({
        ...day,
        dt: (day.dt ?? 0) * 1000,
    }))
});